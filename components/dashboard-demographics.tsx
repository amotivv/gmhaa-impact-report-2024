"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDemographicData } from "@/lib/data"

const COLORS = [
  '#2563eb', // blue-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#e11d48', // rose-600
  '#0891b2', // cyan-600
]

type DashboardDemographicsProps = {
  data: {
    sessionTypes: { name: string; value: number; }[];
    raceEthnicity: { name: string; value: number; }[];
    gender: { name: string; value: number; }[];
    ageGroups: { name: string; value: number; }[];
  };
};


export function DashboardDemographics({ data }: DashboardDemographicsProps) {

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DemographicCard title="Sessions by Type" data={data.sessionTypes} />
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
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                {item.name}
              </div>
              <div className="font-medium">{item.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

