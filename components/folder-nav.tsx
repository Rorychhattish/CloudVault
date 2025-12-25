"use client"

import { ChevronRight, Home, Folder } from "lucide-react"

interface FolderNavProps {
  currentFolder: string
  onFolderChange: (folder: string) => void
  files: any[]
}

export function FolderNav({ currentFolder, onFolderChange, files }: FolderNavProps) {
  const folders = new Set<string>()

  files.forEach((file) => {
    const path = file.filename.split("/")
    if (path.length > 1) {
      const folderPath = path.slice(0, -1).join("/")
      folders.add(folderPath)
    }
  })

  const breadcrumbs = currentFolder === "/" ? ["Root"] : currentFolder.split("/").filter(Boolean)

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <button
          onClick={() => onFolderChange("/")}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
            currentFolder === "/" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
          }`}
        >
          <Home className="w-4 h-4" />
          Root
        </button>

        {breadcrumbs.slice(1).map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{crumb}</span>
          </div>
        ))}
      </div>

      {/* Folder List */}
      {folders.size > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Folders</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from(folders)
              .sort()
              .map((folder) => (
                <button
                  key={folder}
                  onClick={() => onFolderChange(folder)}
                  className="flex items-center gap-2 p-3 bg-muted/50 hover:bg-muted rounded-lg transition text-foreground text-sm font-medium"
                >
                  <Folder className="w-4 h-4 text-primary" />
                  {folder.split("/").pop()}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
