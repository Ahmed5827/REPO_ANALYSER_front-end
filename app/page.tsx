"use client"

import { useRouter } from "next/navigation"
import { AnalyzerForm } from "@/components/analyzer-form"
import { GithubIcon } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const handleAnalyze = (
    repoUrl: string,
    githubToken: string,
    geminiApiKey: string
  ) => {
    sessionStorage.setItem(
      "analysisRequest",
      JSON.stringify({ repoUrl, githubToken, geminiApiKey })
    )
    router.push("/results")
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
            GitHub Repo Analyzer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Analyze any GitHub repository and automatically generate README documentation and test files using AI.
          </p>
        </header>

        <AnalyzerForm onAnalyze={handleAnalyze} />
      </div>
    </main>
  )
}
