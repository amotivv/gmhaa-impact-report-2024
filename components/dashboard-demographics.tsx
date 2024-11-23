"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Home } from "lucide-react" 

const COLORS = [
  '#2563eb', // blue-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#e11d48', // rose-600
  '#0891b2', // cyan-600
]

function LocationCard({ data }: { data: { name: string; value: number; }[] }) {
  const muscogeeData = data.find(item => item.name === "Muscogee");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Counties Served</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Distribution of sessions across counties
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
                innerRadius={42}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={false}
                labelLine={false}
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
        <div className="mt-2 space-y-1 mx-auto max-w-[80%]">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="font-medium">{item.value}</div>
            </div>
          ))}
        </div>
        {/* Modified indicator with home icon */}
        {muscogeeData && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 py-2 rounded-md">
            <Home className="h-4 w-4 text-blue-600" />
            <span>
              <span className="font-medium text-foreground">{muscogeeData.value}</span>
              &nbsp;sessions in our local community
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


type DashboardDemographicsProps = {
  data: {
    raceEthnicity: { name: string; value: number; }[];
    gender: { name: string; value: number; }[];
    ageGroups: { name: string; value: number; }[];
    locations: { name: string; value: number; }[];
  };
};

export function DashboardDemographics({ data }: DashboardDemographicsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">  {/* Changed from lg:grid-cols-4 to md:grid-cols-3 */}
      <LocationCard data={data.locations} />
      <DemographicCard title="Sessions by Age Group" data={data.ageGroups} />
      <DemographicCard title="Sessions by Race/Ethnicity" data={data.raceEthnicity} />
    </div>
  )
}

function DemographicCard({ title, data }: { title: string; data: { name: string; value: number; }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // First, calculate exact percentages without rounding
  let remainingPercent = 100;
  const normalizedData = data
    .sort((a, b) => b.value - a.value) // Sort by value descending
    .map((item, index, arr) => {
      if (index === arr.length - 1) {
        // Last item gets whatever percent is remaining
        return {
          name: item.name,
          value: remainingPercent
        };
      }
      
      const exactPercent = (item.value / total) * 100;
      const roundedPercent = Math.round(exactPercent);
      remainingPercent -= roundedPercent;
      
      return {
        name: item.name,
        value: roundedPercent
      };
    });

  const nonAdultPercentage = 100 - (normalizedData.find(item => item.name === "Adult")?.value || 0);

  const isAgeGroupCard = title.includes("Age Group");
  const isRaceCard = title.includes("Race/Ethnicity");
  const whitePercentage = data.find(item => item.name === "White")?.value || 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Distribution of sessions across {title.toLowerCase().replace('sessions by ', '')}
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
                innerRadius={42}
                outerRadius={70}
                paddingAngle={2}
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
        <div className="mt-2 space-y-1 mx-auto max-w-[80%]">
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
        {/* Age Group indicator */}
        {isAgeGroupCard && nonAdultPercentage > 50 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 py-2 rounded-md">
            <span className="text-green-600">👥</span>
            <span>
              <span className="font-medium text-foreground">{nonAdultPercentage}%</span>
              &nbsp;of sessions supporting children and youth
            </span>
          </div>
        )}
        {/* Race/Ethnicity indicator */}
        {isRaceCard && whitePercentage > 60 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 py-2 rounded-md">
            <span className="text-purple-600">🤝</span>
            <span>
              Help us expand to reach more diverse communities!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

