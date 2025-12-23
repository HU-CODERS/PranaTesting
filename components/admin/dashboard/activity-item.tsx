import type React from "react"
import { cn } from "@/lib/utils"

interface ActivityItemProps {
  icon: React.ReactNode
  iconBgColor?: string
  iconColor?: string
  title: string
  description?: string
  time: string
  className?: string
}

export function ActivityItem({
  icon,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  title,
  description,
  time,
  className,
}: ActivityItemProps) {
  return (
    <div className={cn("flex items-start", className)}>
      <div className={cn("flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3", iconBgColor)}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}
