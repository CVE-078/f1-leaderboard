'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Game } from "@/types/database";

export function SupabaseDebug() {
  const [envCheck, setEnvCheck] = useState<{
    url: string | undefined;
    keyPresent: boolean;
  }>({ url: undefined, keyPresent: false });

  const [testResults, setTestResults] = useState<{
    gamesCount: number | null;
    tracksCount: number | null;
    gamesData: Game[] | null;
    error: string | null;
    loading: boolean;
  }>({
    gamesCount: null,
    tracksCount: null,
    gamesData: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    setEnvCheck({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyPresent: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    // Test database connectivity
    async function testDatabase() {
      const supabase = createClient();

      try {
        console.log("Testing Supabase connection...");
        
        // Test games table with detailed logging
        console.log("Testing games table access...");
        
        // First, try a simple select with no count to see if we can access the table at all
        const simpleGamesQuery = supabase.from("games").select("id, name, release_year").limit(5);
        const simpleGamesResult = await simpleGamesQuery;
        console.log("Simple games query result:", simpleGamesResult);
        
        // Then try with count
        const gamesQuery = supabase.from("games").select("*", { count: "exact" });
        console.log("Games query created, executing...");
        
        const {
          data: gamesData,
          error: gamesError,
          count: gamesCount,
        } = await gamesQuery;
        
        console.log("Games result:", { gamesData, gamesError, gamesCount });
        
        // Log RLS-specific information
        if (gamesError && gamesError.code === "42501") {
          console.log("RLS ERROR DETECTED: Insufficient privilege. This means RLS is blocking access to the games table.");
        }

        // Test tracks table
        const tracksQuery = supabase.from("tracks").select("*", { count: "exact", head: true });
        console.log("Tracks query created, executing...");
        
        const { count: tracksCount, error: tracksError } = await tracksQuery;
        
        console.log("Tracks result:", { tracksCount, tracksError });

        if (gamesError || tracksError) {
          const errorDetails = {
            gamesError: gamesError ? {
              message: gamesError.message,
              details: gamesError.details,
              hint: gamesError.hint,
              code: gamesError.code
            } : null,
            tracksError: tracksError ? {
              message: tracksError.message,
              details: tracksError.details,
              hint: tracksError.hint,
              code: tracksError.code
            } : null
          };
          
          console.log("Database errors:", errorDetails);
          
          setTestResults({
            gamesCount: null,
            tracksCount: null,
            gamesData: null,
            error: `Games Error: ${
              gamesError ? `${gamesError.message} (${gamesError.code})` : "None"
            }, Tracks Error: ${
              tracksError ? `${tracksError.message} (${tracksError.code})` : "None"
            }`,
            loading: false,
          });
        } else {
          setTestResults({
            gamesCount: gamesCount || 0,
            tracksCount: tracksCount || 0,
            gamesData: gamesData || [],
            error: null,
            loading: false,
          });
        }
      } catch (err) {
        setTestResults({
          gamesCount: null,
          tracksCount: null,
          gamesData: null,
          error: err instanceof Error ? err.message : "Unknown error",
          loading: false,
        });
      }
    }

    testDatabase();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
      <h4 className="text-white font-medium mb-3">
        Supabase Configuration & Data Debug
      </h4>

      {/* Environment Check */}
      <div className="mb-4">
        <h5 className="text-gray-300 font-medium mb-2">Environment:</h5>
        <div className="text-sm space-y-1">
          <p className="text-gray-300">
            URL:{" "}
            <span className="text-white font-mono text-xs">
              {envCheck.url || "Not set"}
            </span>
          </p>
          <p className="text-gray-300">
            API Key:{" "}
            <span
              className={
                envCheck.keyPresent ? "text-green-300" : "text-red-300"
              }
            >
              {envCheck.keyPresent ? "Present" : "Missing"}
            </span>
          </p>
        </div>
      </div>

      {/* Database Test Results */}
      <div>
        <h5 className="text-gray-300 font-medium mb-2">Database Test:</h5>
        {testResults.loading ? (
          <p className="text-yellow-300 text-sm">
            Testing database connection...
          </p>
        ) : testResults.error ? (
          <div className="text-red-300 text-sm">
            <p className="font-medium">Error:</p>
            <p className="font-mono text-xs mt-1">{testResults.error}</p>
          </div>
        ) : (
          <div className="text-sm space-y-2">
            <p className="text-gray-300">
              Games Count:{" "}
              <span className="text-white">{testResults.gamesCount}</span>
            </p>
            <p className="text-gray-300">
              Tracks Count:{" "}
              <span className="text-white">{testResults.tracksCount}</span>
            </p>
            {testResults.gamesData && testResults.gamesData.length > 0 && (
              <div>
                <p className="text-gray-300 mb-1">Sample Games Data:</p>
                <pre className="text-xs bg-black/30 p-2 rounded font-mono overflow-auto max-h-32">
                  {JSON.stringify(testResults.gamesData.slice(0, 2), null, 2)}
                </pre>
              </div>
            )}
            {testResults.gamesCount === 0 && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded p-2 mt-2">
                <p className="text-yellow-300 text-sm font-medium mb-2">
                  ⚠️ No games data returned
                </p>
                <p className="text-yellow-200 text-xs mb-2">
                  This could be due to:
                </p>
                <ul className="text-yellow-200 text-xs space-y-1 ml-4">
                  <li>• Empty games table (no data inserted yet)</li>
                  <li>• RLS (Row Level Security) policy blocking access</li>
                  <li>• Database connection issues</li>
                </ul>
                <p className="text-yellow-200 text-xs mt-2">
                  Check the browser console for detailed error messages.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
