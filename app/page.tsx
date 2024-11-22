import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardDemographics } from "@/components/dashboard-demographics"
import { AnimatedSection } from "@/components/animated-section"
import { fetchData, getDashboardData, getMonthlyData, getDemographicData } from "@/lib/data"

export default async function DashboardPage() {
  const records = await fetchData();
  const dashboardData = getDashboardData(records);
  const monthlyData = getMonthlyData(records);
  const demographicData = getDemographicData(records);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-1 text-foreground">  {/* Changed mb-2 to mb-1 */}
          Your 2024 Community Impact
        </h1>
        <p className="text-center text-muted-foreground mb-8 text-lg">  {/* Added -mt-1 */}
        Your generosity + GMHAA's partnerships have made a huge difference!
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
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Demographics</h2>
          <DashboardDemographics data={demographicData} />
        </AnimatedSection>
      </main>
    </div>
  )
}

