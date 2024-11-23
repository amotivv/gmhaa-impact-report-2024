import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface DashboardCardsProps {
  data: {
    totalSessions: number;
    totalDisbursed: number;
    averagePerSession: number;
    truthSpringCount: number;
  }
}

export function DashboardCards({ data }: DashboardCardsProps) {
  const { totalSessions, totalDisbursed, averagePerSession, truthSpringCount } = data

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-50 dark:bg-blue-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base sm:text-base font-medium">Funded Sessions</CardTitle>
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
            {totalSessions}
          </div>
          <p className="text-base sm:text-base text-blue-600/80 dark:text-blue-400/80 mt-1">
            Total counseling sessions funded this year
          </p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 dark:bg-green-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base sm:text-base font-medium">Total Disbursed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
            ${totalDisbursed.toLocaleString()}
          </div>
          <p className="text-base sm:text-base text-green-600/80 dark:text-green-400/80 mt-1">
            Total granted to support mental health
          </p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50 dark:bg-purple-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base sm:text-base font-medium">Avg. Per Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
            ${averagePerSession}
          </div>
          <p className="text-base sm:text-base text-purple-600/80 dark:text-purple-400/80 mt-1">
            Average amount funded per session
          </p>
        </CardContent>
      </Card>
      <Card className="bg-amber-50 dark:bg-amber-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base sm:text-base font-medium">Partner Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">
            {truthSpringCount}
          </div>
          <p className="text-base sm:text-base text-amber-600/80 dark:text-amber-400/80 mt-1">
            Sessions provided to Truth Spring Academy students!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

