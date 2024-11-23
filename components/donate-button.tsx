'use client'

import { useEffect, useState } from 'react'

export function DonateButton() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex justify-center">
      <a href="#XQABMKDY" style={{ display: 'none' }}></a>
    </div>
  )
}