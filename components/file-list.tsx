"use client"

import { useState } from "react"
import { Download, Trash2, Loader2, FileIcon } from "lucide-react"
import { formatFileSize, getFileIcon } from "@/lib/file-utils"

interface File {
  url: string
  filename: string
  size: number
  uploadedAt: string
}

interface FileListProps {
  files: File[]
  onDelete: () => void
  loading: boolean
}

export function FileList({ files, onDelete, loading }: FileListProps) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (url: string) => {
    setDeleting(url)
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Delete failed")
      onDelete()
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-card rounded-lg border border-border">
        <FileIcon className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">No files yet</p>
        <p className="text-muted-foreground text-sm">Upload your first file to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {files.map((file) => (
        <div
          key={file.url}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary transition"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="text-2xl">{getFileIcon(file.filename)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{file.filename}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload(file.url, file.filename)}
              className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(file.url)}
              disabled={deleting === file.url}
              className="p-2 hover:bg-destructive/10 rounded-lg transition text-muted-foreground hover:text-destructive disabled:opacity-50"
              title="Delete"
            >
              {deleting === file.url ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
