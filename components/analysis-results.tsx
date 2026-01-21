"use client"

import { useState } from "react"
import type { AnalysisResult } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  FileText, 
  TestTube, 
  CheckCircle, 
  FolderIcon,
  UserIcon,
  FileCodeIcon
} from "lucide-react"

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("readme")

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadAllAsZip = async () => {
    const { default: JSZip } = await import("jszip")
    const zip = new JSZip()
    
    zip.file("README.md", result.generated_content.readme)
    zip.file("tests.py", result.generated_content.tests)
    
    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${result.repository}-generated.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Success Header */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-semibold text-foreground">Analysis Complete</p>
              <p className="text-sm text-muted-foreground">
                Successfully analyzed repository and generated content
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5" />
            Repository Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FolderIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Repository:</span>
              <span className="font-medium">{result.repository}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Owner:</span>
              <span className="font-medium">{result.owner}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileCodeIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Files Analyzed ({result.files_analyzed.length}):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.files_analyzed.map((file, index) => (
                <Badge key={index} variant="secondary" className="font-mono text-xs">
                  {file}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                Download individual files or get everything as a ZIP
              </CardDescription>
            </div>
            <Button onClick={downloadAllAsZip} className="gap-2">
              <Download className="h-4 w-4" />
              Download All (ZIP)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="readme" className="gap-2">
                <FileText className="h-4 w-4" />
                README.md
              </TabsTrigger>
              <TabsTrigger value="tests" className="gap-2">
                <TestTube className="h-4 w-4" />
                Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="readme" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(result.generated_content.readme, "README.md")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download README.md
                  </Button>
                </div>
                <div className="relative">
                  <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap">
                    {result.generated_content.readme}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(result.generated_content.tests, "tests.py")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download tests
                  </Button>
                </div>
                <div className="relative">
                  <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap">
                    {result.generated_content.tests}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
