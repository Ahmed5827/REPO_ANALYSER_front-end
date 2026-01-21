"use client"

import React from "react"
import { Loader2 } from "lucide-react" // Import Loader2

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, LinkIcon, KeyIcon, ArrowRight } from "lucide-react"

interface AnalyzerFormProps {
  onAnalyze: (repoUrl: string, githubToken: string, geminiApiKey: string) => void
}

export function AnalyzerForm({ onAnalyze }: AnalyzerFormProps) {
  const [repoUrl, setRepoUrl] = useState("")
  const [githubToken, setGithubToken] = useState("")
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [showGithubToken, setShowGithubToken] = useState(false)
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Declare isLoading variable

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // Set isLoading to true before analysis
    if (repoUrl && githubToken && geminiApiKey) {
      onAnalyze(repoUrl, githubToken, geminiApiKey)
    }
    setIsLoading(false) // Set isLoading to false after analysis
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle>Repository Details</CardTitle>
        <CardDescription>
          Enter your repository URL and API credentials to start the analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="repo-url" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              GitHub Repository URL
            </Label>
            <Input
              id="repo-url"
              type="url"
              placeholder="https://github.com/username/repository.git"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github-token" className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              GitHub Token
            </Label>
            <div className="relative">
              <Input
                id="github-token"
                type={showGithubToken ? "text" : "password"}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                required
                className="font-mono text-sm pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowGithubToken(!showGithubToken)}
              >
                {showGithubToken ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showGithubToken ? "Hide" : "Show"} GitHub token
                </span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Generate a token at GitHub Settings → Developer settings → Personal access tokens
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-key" className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="gemini-key"
                type={showGeminiKey ? "text" : "password"}
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                required
                className="font-mono text-sm pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
              >
                {showGeminiKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showGeminiKey ? "Hide" : "Show"} Gemini API key
                </span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from Google AI Studio
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!repoUrl || !githubToken || !geminiApiKey}
          >
            Analyze Repository
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
