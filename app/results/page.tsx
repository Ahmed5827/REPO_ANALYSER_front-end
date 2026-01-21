"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnalysisResults } from "@/components/analysis-results"
import { AnalysisLoading } from "@/components/analysis-loading"
import { Button } from "@/components/ui/button"
import { GithubIcon, ArrowLeft } from "lucide-react"
import type { AnalysisResult, AnalysisRequest } from "@/lib/types"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedRequest = sessionStorage.getItem("analysisRequest")
    
    if (!storedRequest) {
      router.push("/")
      return
    }

    const request: AnalysisRequest = JSON.parse(storedRequest)
    
    const analyzeRepo = async () => {
      try {
        const response = await fetch("http://localhost:5000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-GitHub-Token": request.githubToken,
            "X-Gemini-API-Key": request.geminiApiKey,
          },
          body: JSON.stringify({ repo_url: request.repoUrl }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Request failed with status ${response.status}`)
        }

        const data: AnalysisResult = await response.json()
        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
        sessionStorage.removeItem("analysisRequest")
      }
    }

    analyzeRepo()
  }, [router])

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <GithubIcon className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            {isLoading ? "Analyzing Repository" : error ? "Analysis Failed" : "Analysis Complete"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isLoading
              ? "Please wait while we analyze your repository and generate the files."
              : error
              ? "Something went wrong during the analysis."
              : "Your repository has been analyzed successfully."}
          </p>
        </header>

        {isLoading && <AnalysisLoading />}

        {error && (
          <div className="space-y-6">
            <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <p className="text-destructive font-medium text-lg mb-2">Error</p>
              <p className="text-destructive/80">{error}</p>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleBackToHome} variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <AnalysisResults result={result} />
            <div className="flex justify-center pt-4">
              <Button onClick={handleBackToHome} variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Analyze Another Repository
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
