import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-36 mt-4 md:mt-0" />
      </div>

      <div className="overflow-x-auto">
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}
