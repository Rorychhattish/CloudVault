export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"

  const units = ["B", "KB", "MB", "GB"]
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, index)

  return `${size.toFixed(2)} ${units[index]}`
}

export function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()

  const iconMap: Record<string, string> = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    txt: "📄",
    xlsx: "📊",
    csv: "📊",
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    mp3: "🎵",
    mp4: "🎥",
    zip: "📦",
    rar: "📦",
    folder: "📁",
  }

  return iconMap[ext] || "📎"
}
