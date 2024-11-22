import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardDemographics } from "@/components/dashboard-demographics"
import { AnimatedSection } from "@/components/animated-section"
import { fetchData, getDashboardData, getMonthlyData, getDemographicData } from "@/lib/data"
import Logo from '@/public/gmhaa-logo.svg' 

export default async function DashboardPage() {
  const records = await fetchData();
  const dashboardData = getDashboardData(records);
  const monthlyData = getMonthlyData(records);
  const demographicData = getDemographicData(records);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-12">
      <div className="flex justify-center -mt-8 -mb-8"> 
        <div className="w-[min(90vw,800px)] h-[min(25vh,240px)]">
          <Logo className="w-full h-full object-contain  aspect-[6=3/1]" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8 sm:mb-8 text-foreground">
          Your 2024 Community Impact
      </h1>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Your generosity + GMHAA&apos;s partnerships have made a huge difference in our community!
        </p>
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Key Metrics</h2>
          <DashboardCards data={dashboardData} />
        </AnimatedSection>
        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Monthly Trends</h2>
          <DashboardCharts data={monthlyData} />
        </AnimatedSection>
        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Session Demographics</h2>
          <DashboardDemographics data={demographicData} />
        </AnimatedSection>
      </main>
    </div>
  )
}

