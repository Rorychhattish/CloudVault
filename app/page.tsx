"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { FileList } from "@/components/file-list"
import { FolderNav } from "@/components/folder-nav"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  const [files, setFiles] = useState([])
  const [currentFolder, setCurrentFolder] = useState("/")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("files")

  useEffect(() => {
    loadFiles()
  }, [currentFolder])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/list")
      const data = await response.json()

      if (data.files) {
        const filteredFiles = data.files.filter((file: any) => {
          const folderMatch = file.filename.startsWith(currentFolder === "/" ? "" : currentFolder)
          return folderMatch
        })
        setFiles(filteredFiles)
      }
    } catch (error) {
      console.error("Failed to load files:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    await loadFiles()
  }

  const handleDelete = async () => {
    await loadFiles()
  }

  const filteredFiles = files.filter((file: any) => file.filename.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Cloud Storage</h1>
              <p className="text-muted-foreground">Manage and organize your files in one place</p>
            </div>

            {/* Search and Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div>
                <FileUpload currentFolder={currentFolder} onUpload={handleUpload} />
              </div>
            </div>

            {/* Folder Navigation */}
            <FolderNav currentFolder={currentFolder} onFolderChange={setCurrentFolder} files={files} />

            {/* Files Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {currentFolder === "/" ? "All Files" : `Folder: ${currentFolder}`}
              </h2>
              <FileList files={filteredFiles} onDelete={handleDelete} loading={loading} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
