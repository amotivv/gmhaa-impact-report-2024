import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GMHAA Impact Report 2024",
  description: "Non-profit impact report detailing monetary disbursements to pay for individual mental health counseling sessions in Muscogee County, Georgia.",
  metadataBase: new URL('https://impact2024.gmhaa.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://impact2024.gmhaa.org',
    title: 'GMHAA Impact Report 2024',
    description: 'Non-profit impact report detailing monetary disbursements to pay for individual mental health counseling sessions in Muscogee County, Georgia.',
    siteName: 'GMHAA Impact Report',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GMHAA Impact Report 2024',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMHAA Impact Report 2024',
    description: 'Non-profit impact report detailing monetary disbursements to pay for individual mental health counseling sessions in Muscogee County, Georgia.',
    images: ['/og-image.jpg'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,n,a){if(!w[n]){var l='call,catch,on,once,set,then,track,openCheckout'.split(','),i,o=function(n){return'function'==typeof n?o.l.push([arguments])&&o:function(){return o.l.push([n,arguments])&&o}},t=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=!0;j.src='https://cdn.fundraiseup.com/widget/'+a+'';t.parentNode.insertBefore(j,t);o.s=Date.now();o.v=5;o.h=w.location.href;o.l=[];for(i=0;i<8;i++)o[l[i]]=o(l[i]);w[n]=o}})(window,document,'script','FundraiseUp','ARYLXNQW');`
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

