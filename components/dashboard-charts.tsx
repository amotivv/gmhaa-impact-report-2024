"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CounselingCostInfo } from "@/components/counseling-cost-info"

const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-blue-500">
              Monthly: {payload[0].value}
            </span>
            <span className="font-bold text-green-500">
              Running Total: {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

interface MonthData {
  month: string;
  sessions: number;
  dollars: number;
}

export function DashboardCharts({ data }: { data: MonthData[] }) {
  // Calculate running totals
  let sessionTotal = 0
  let dollarsTotal = 0
  const enrichedData = data.map(month => {
    sessionTotal += month.sessions
    dollarsTotal += month.dollars
    return {
      ...month,
      runningTotalSessions: sessionTotal,
      runningTotalDollars: dollarsTotal
    }
  })

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Sessions</CardTitle>
            <CardDescription>Blue bars show monthly sessions, green bars show running total</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrichedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="sessions" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                  name="Monthly Sessions"
                />
                <Bar 
                  dataKey="runningTotalSessions" 
                  fill="#16a34a" 
                  radius={[4, 4, 0, 0]} 
                  name="Total Sessions"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Monthly Dollars</CardTitle>
            <CardDescription>Blue bars show monthly amount, green bars show running total</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrichedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="dollars" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                  name="Monthly Dollars"
                />
                <Bar 
                  dataKey="runningTotalDollars" 
                  fill="#16a34a" 
                  radius={[4, 4, 0, 0]} 
                  name="Total Dollars"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 w-full max-w-2xl">  {/* Added max-w-2xl */}
          <CounselingCostInfo />
        </div>
      </div>
    </div>
  )
}

