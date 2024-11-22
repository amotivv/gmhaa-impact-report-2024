"use client"

import { useState } from "react"
import { Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SeasonalExplanation() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          <Info className="mr-2 h-4 w-4" />
          Why the mid-year dip?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seasonal Trends Explained</DialogTitle>
          <DialogDescription>
            The mid-year dip in sessions and dollars granted is due to two main factors:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Info className="h-4 w-4 col-span-1" />
            <div className="col-span-3">
              School is out for summer, resulting in no dollars allocated to our educational partner, Truth Spring Academy.
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Info className="h-4 w-4 col-span-1" />
            <div className="col-span-3">
              There's a natural drop in mental health counseling appointments during the summer months.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

