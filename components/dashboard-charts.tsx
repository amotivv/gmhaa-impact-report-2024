"use client"


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { 
  Bar,  
  ComposedChart,  // Add this
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Area, 
  AreaChart, 
  Line 
} from "recharts"

interface TooltipPayloadItem {
  value: number;
  name: string;
  dataKey: string;
}

const formatValue = (value: number, type: 'sessions' | 'dollars') => {
  if (type === 'dollars') {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  return value.toLocaleString();
}

const CustomTooltip = ({ 
  active, 
  payload, 
  label,
  type = 'sessions'
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  type?: 'sessions' | 'dollars';
}) => {
  if (active && payload && payload.length) {
    // Format the month label from YYYY-MM format
    const [year, month] = label!.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const formattedMonth = date.toLocaleString('default', { month: 'short' });

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {formattedMonth}
            </span>
            <span className="font-bold text-blue-500">
              {type === 'sessions' ? 'Monthly: ' : 'Amount: '}
              {formatValue(payload[0]?.value, type)}
            </span>
            {payload.length > 1 && (
              <span className="font-bold text-green-500">
                Running Total: {formatValue(payload[1]?.value, type)}
              </span>
            )}
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
    <CardTitle>Monthly Counseling Sessions</CardTitle>
    <CardDescription>
      Monthly sessions (bars) and cumulative impact (line) over time
    </CardDescription>
  </CardHeader>
  <CardContent className="h-[300px] px-0">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={enrichedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey="monthKey" 
          tickFormatter={(value) => {
            const [year, month] = value.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return date.toLocaleString('default', { month: 'short' });
          }}
        />
        <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
        <YAxis yAxisId="right" orientation="right" stroke="#16a34a" />
        <Tooltip content={<CustomTooltip type="sessions" />} />
        <Bar 
          yAxisId="left"
          dataKey="sessions" 
          fill="#2563eb" 
          radius={[4, 4, 0, 0]} 
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="runningTotalSessions"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

<Card className="col-span-4 lg:col-span-3">
  <CardHeader>
    <CardTitle>Cumulative Financial Impact</CardTitle>
    <CardDescription>
      Total dollars granted over time, showing growing community investment
    </CardDescription>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={enrichedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey="monthKey" 
          tickFormatter={(value) => {
            const [year, month] = value.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return date.toLocaleString('default', { month: 'short' });
          }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip type="dollars" />} />
        <Area
          type="monotone"
          dataKey="runningTotalDollars"
          fill="#16a34a"
          stroke="#16a34a"
          fillOpacity={0.2}
        />
        <Bar 
          dataKey="dollars" 
          fill="#2563eb" 
          radius={[4, 4, 0, 0]} 
        />
      </AreaChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
      </div>
    </div>
  )
}

