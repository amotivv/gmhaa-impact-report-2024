"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const COLORS = [
  '#2563eb', // blue-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#e11d48', // rose-600
  '#0891b2', // cyan-600
]

type DashboardDemographicsProps = {
  data: {
    raceEthnicity: { name: string; value: number; }[];
    gender: { name: string; value: number; }[];
    ageGroups: { name: string; value: number; }[];
  };
};

export function DashboardDemographics({ data }: DashboardDemographicsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">  {/* Changed from lg:grid-cols-4 to md:grid-cols-3 */}
      <DemographicCard title="Sessions by Race/Ethnicity" data={data.raceEthnicity} />
      <DemographicCard title="Sessions by Gender" data={data.gender} />
      <DemographicCard title="Sessions by Age Group" data={data.ageGroups} />
    </div>
  )
}

function DemographicCard({ title, data }: { title: string; data: { name: string; value: number; }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Distribution of sessions across {title.toLowerCase().replace('Sessions by ', '')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-1 mx-auto max-w-[80%]">  {/* Added mx-auto and max-w-[80%] */}
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="font-medium">{item.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

