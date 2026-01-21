export interface AnalysisResult {
  status: string
  repository: string
  owner: string
  files_analyzed: string[]
  generated_content: {
    readme: string
    tests: string
  }
}

export interface AnalysisRequest {
  repoUrl: string
  githubToken: string
  geminiApiKey: string
}
