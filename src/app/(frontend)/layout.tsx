import type { Metadata } from 'next'

import { cn } from '@/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '../components/AdminBar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MegaMenu } from '../components/MegaMenu'
import { LivePreviewListener } from '../components/LivePreviewListener'
import { Providers } from '../providers'
import { InitTheme } from '../providers/Theme/InitTheme'
import { mergeOpenGraph } from '../utilities/mergeOpenGraph'
import './globals.css'
import { ModalProvider,ModalContainer } from '@faceless-ui/modal'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { GridProvider } from '@faceless-ui/css-grid'

import { PathTracker } from '../components/PathTracker'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
     <WindowInfoProvider
      breakpoints={{
        xs: `(max-width: 560px)`,
        sm: `(min-width: 640px)`,
        md: `(min-width: 768px)`,
        lg: `(min-width: 1024px)`,
        xl: `(min-width: 1280px)`,
      }}>
      <ModalProvider>
        <GridProvider>

      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main>
            <PathTracker />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
        <ModalContainer />
        </GridProvider>
      </ModalProvider>
      </WindowInfoProvider>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
