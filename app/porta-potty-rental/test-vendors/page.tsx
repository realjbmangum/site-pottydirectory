"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Database, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface TestResult {
  step: string
  status: "loading" | "success" | "error"
  message: string
  details?: any
}

export default function TestVendorsPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (result: TestResult) => {
    setTestResults((prev) => [...prev, result])
  }

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    // Test 1: Environment Variables
    addResult({
      step: "Environment Variables",
      status: "loading",
      message: "Checking environment variables...",
    })

    const envVars = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT_SET",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "NOT_SET",
      useSupabase: process.env.NEXT_PUBLIC_USE_SUPABASE || "NOT_SET",
      // Also check if they exist at all
      urlExists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      useSupabaseExists: !!process.env.NEXT_PUBLIC_USE_SUPABASE,
    }

    if (envVars.urlExists && envVars.keyExists) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.step === "Environment Variables"
            ? { ...r, status: "success", message: "Environment variables found!", details: envVars }
            : r,
        ),
      )
    } else {
      setTestResults((prev) =>
        prev.map((r) =>
          r.step === "Environment Variables"
            ? { ...r, status: "error", message: "Missing environment variables", details: envVars }
            : r,
        ),
      )
      setIsRunning(false)
      return
    }

    // Test 2: Supabase Connection
    addResult({
      step: "Supabase Connection",
      status: "loading",
      message: "Testing Supabase connection...",
    })

    try {
      if (!supabase) {
        throw new Error("Supabase client not initialized")
      }

      // Test basic connection
      const { data, error } = await supabase.from("vendors").select("count", { count: "exact", head: true })

      if (error) {
        setTestResults((prev) =>
          prev.map((r) =>
            r.step === "Supabase Connection"
              ? { ...r, status: "error", message: `Connection failed: ${error.message}`, details: error }
              : r,
          ),
        )
      } else {
        setTestResults((prev) =>
          prev.map((r) =>
            r.step === "Supabase Connection"
              ? { ...r, status: "success", message: "Successfully connected to Supabase!", details: { count: data } }
              : r,
          ),
        )
      }
    } catch (err) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.step === "Supabase Connection"
            ? { ...r, status: "error", message: `Connection error: ${err}`, details: err }
            : r,
        ),
      )
    }

    // Test 3: Vendors Table
    addResult({
      step: "Vendors Table",
      status: "loading",
      message: "Checking vendors table...",
    })

    try {
      const { data, error, count } = await supabase!.from("vendors").select("*", { count: "exact" }).limit(5)

      if (error) {
        setTestResults((prev) =>
          prev.map((r) =>
            r.step === "Vendors Table"
              ? { ...r, status: "error", message: `Table error: ${error.message}`, details: error }
              : r,
          ),
        )
      } else {
        setTestResults((prev) =>
          prev.map((r) =>
            r.step === "Vendors Table"
              ? {
                  ...r,
                  status: "success",
                  message: `Found ${count || 0} vendors in table`,
                  details: { count, sampleData: data?.slice(0, 2) },
                }
              : r,
          ),
        )
      }
    } catch (err) {
      setTestResults((prev) =>
        prev.map((r) =>
          r.step === "Vendors Table"
            ? { ...r, status: "error", message: `Table check failed: ${err}`, details: err }
            : r,
        ),
      )
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "loading":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Connection Test</h1>
          <p className="text-gray-600">Testing your Supabase integration step by step</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? "Running Tests..." : "Run Tests Again"}
            </button>
          </div>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(result.status)}
                  <h3 className="font-semibold text-gray-900">{result.step}</h3>
                </div>
                <p className="text-gray-700 mb-2">{result.message}</p>
                {result.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">View Details</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>

          {testResults.length === 0 && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">Initializing tests...</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/porta-potty-rental"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">View Homepage</h3>
            <p className="text-sm text-gray-600">See how the vendors display on the main page</p>
          </a>
          <a
            href="/porta-potty-rental/vendors"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">View All Vendors</h3>
            <p className="text-sm text-gray-600">Browse the complete vendors page</p>
          </a>
        </div>
      </div>
    </div>
  )
}
