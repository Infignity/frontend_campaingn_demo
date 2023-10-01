"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(90), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center align-center">
      <Progress value={progress} className="w-[60%] flex items-center bg-[#F2EFF8] text-blue-50" />
    </div>
  )
}

export default ProgressBar;