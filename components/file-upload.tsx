"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"

interface FileUploadProps {
  currentFolder: string
  onUpload: () => void
}

export function FileUpload({ currentFolder, onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      const fileName = currentFolder === "/" ? file.name : `${currentFolder}/${file.name}`
      formData.append("file", file)
      formData.append("filename", fileName)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      onUpload()
      e.target.value = ""
    } catch (err) {
      setError("Failed to upload file")
      console.error("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition font-medium gap-2">
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload File
          </>
        )}
        <input type="file" onChange={handleFileChange} disabled={uploading} className="hidden" />
      </label>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  )
}
