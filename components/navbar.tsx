"use client"

import { Cloud, Files, FolderOpen, Share2, Settings } from "lucide-react"

interface NavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Navbar({ activeTab = "files", onTabChange }: NavbarProps) {
  const navItems = [
    { id: "files", label: "My Files", icon: Files },
    { id: "folders", label: "Folders", icon: FolderOpen },
    { id: "shared", label: "Shared", icon: Share2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Cloud className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CloudVault</h1>
            <p className="text-xs text-muted-foreground">Storage</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">v0.1.0</p>
      </div>
    </aside>
  )
}
