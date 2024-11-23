'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TrendingDown, Wallet } from "lucide-react"

interface DonationCardsProps {
  data: {
    totalDonations: number;
    deficit: number;
    donationCount: number;
  }
}

// ... existing imports remain the same ...

export function DonationCards({ data }: DonationCardsProps) {
    const { totalDonations, deficit } = data
  
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-green-50 dark:bg-green-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base sm:text-base font-medium">Total Donations</CardTitle>
            <Wallet className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
              ${totalDonations.toLocaleString()}
            </div>
            <p className="text-base sm:text-base text-green-600/80 dark:text-green-400/80 mt-1">
              Received in 2024
            </p>
          </CardContent>
        </Card>
  
        <Card className="bg-red-50 dark:bg-red-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base sm:text-base font-medium">Current Need</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
              ${deficit.toLocaleString()}
            </div>
            <p className="text-base sm:text-base text-red-600/80 dark:text-red-400/80 mt-1">
              Additional funding needed
            </p>
          </CardContent>
        </Card>
  
        <Card 
          className="bg-purple-50 dark:bg-purple-950 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            if (window.FundraiseUp) window.FundraiseUp.openCheckout('#XGZDYZAY');
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base sm:text-base font-medium">Donate Now</CardTitle>
            <Heart className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
              Support Us
            </div>
            <p className="text-base sm:text-base text-purple-600/80 dark:text-purple-400/80 mt-1">
              Make a difference today
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }