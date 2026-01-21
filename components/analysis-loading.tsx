"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, GitBranch, FileSearch, Brain, FileCode, CheckCircle } from "lucide-react"

const loadingSteps = [
  { message: "Analyzing repository...", icon: GitBranch, duration: 12000 },
  { message: "Reading files...", icon: FileSearch, duration: 12000 },
  { message: "Understanding the structure...", icon: Brain, duration: 12000 },
  { message: "Generating files...", icon: FileCode, duration: 12000 },
  { message: "Finalizing...", icon: CheckCircle, duration: 12000 },
]

export function AnalysisLoading() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, loadingSteps[currentStep].duration)

    return () => clearInterval(interval)
  }, [currentStep])

  const CurrentIcon = loadingSteps[currentStep].icon

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <CurrentIcon className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-foreground flex items-center gap-2 justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
              {loadingSteps[currentStep].message}
            </p>
            <p className="text-sm text-muted-foreground">
              This may take about a minute. Please wait...
            </p>
          </div>

          <div className="w-full max-w-md space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                  index < currentStep
                    ? "bg-green-500/10 text-green-600"
                    : index === currentStep
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : index === currentStep ? (
                  <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-current flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{step.message}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
