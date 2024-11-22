import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface DashboardCardsProps {
  data: {
    totalSessions: number;
    totalDisbursed: number;
    averagePerSession: number;
    firstTimeSessions: number;
  }
}

export function DashboardCards({ data }: DashboardCardsProps) {
  const { totalSessions, totalDisbursed, averagePerSession, firstTimeSessions } = data

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-50 dark:bg-blue-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium sm:text-base">Funded Sessions</CardTitle>
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />  {/* Added here */}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 sm:text-4xl">{totalSessions}</div>
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1 sm:text-base">Total sessions funded this year</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 dark:bg-green-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium sm:text-base">Total Disbursed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 sm:text-4xl">${totalDisbursed.toLocaleString()}</div>
          <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1 sm:text-base">Amount granted to support mental health</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50 dark:bg-purple-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium sm:text-base">Avg. Per Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 sm:text-4xl">${averagePerSession}</div>
          <p className="text-sm text-purple-600/80 dark:text-purple-400/80 mt-1 sm:text-base">Average amount per funded session</p>
        </CardContent>
      </Card>
      <Card className="bg-rose-50 dark:bg-rose-950">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium sm:text-base">First-time Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 sm:text-4xl">{firstTimeSessions}</div>
          <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mt-1 sm:text-base">New individuals receiving support</p>
        </CardContent>
      </Card>
    </div>
  )
}

