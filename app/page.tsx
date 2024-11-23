import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardDemographics } from "@/components/dashboard-demographics"
import { AnimatedSection } from "@/components/animated-section"
import { DonationCards } from "@/components/donation-cards"
import { fetchData, getDashboardData, getMonthlyData, getDemographicData, fetchDonations, getDonationData } from "@/lib/data"
import Logo from '@/public/gmhaa-logo.svg' 

export default async function DashboardPage() {
  const [records, donations] = await Promise.all([
    fetchData(),
    fetchDonations()
  ]);
  const dashboardData = getDashboardData(records);
  const monthlyData = getMonthlyData(records);
  const demographicData = getDemographicData(records);
  const donationStats = getDonationData(donations, records);

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
      <p className="text-center text-muted-foreground mb-10 text-lg">
          Your generosity + GMHAA&apos;s partnerships have made a huge difference in our community!
        </p>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-lg p-8 shadow-md border border-amber-100 dark:border-amber-900/50">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-amber-600 dark:text-amber-400 mb-3">
              <span>🎉</span> {/* Celebration emoji */}
              <span>{dashboardData.firstTimeSessions} People</span>
              <span>🎉</span> {/* Celebration emoji */}
            </div>
            <p className="text-amber-700/90 dark:text-amber-300/90 text-lg">
              attended their first counseling session with our partners this year, taking an important step toward better mental health
            </p>
          </div>
        </div>
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Program Highlights</h2>
          <DashboardCards data={dashboardData} />
        </AnimatedSection>
        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Monthly Growth and Impact</h2>
          <DashboardCharts data={monthlyData} />
        </AnimatedSection>
        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Who You&apos;ve Helped</h2>
          <DashboardDemographics data={demographicData} />
        </AnimatedSection>
        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Donations & Needs</h2>
          <DonationCards data={donationStats} />
        </AnimatedSection>
      </main>
    </div>
  )
}

