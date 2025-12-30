import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ReactQueryProviders } from "@/lib/provider/Provider"
import { ThemeProvider } from "@/components/theme-provider"
import { MathJaxContext } from "better-react-mathjax"
import { Toaster as SonnerToaster } from "sonner"
import { Toaster } from "@/components/ui/toaster"
import AIMentor from "@/components/landing/AIMentor"
import { RewardInitializerWrapper } from "@/components/RewardInitializerWrapper"




const geist = Geist({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during font load
  preload: true,
  variable: "--font-geist",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-geist-mono",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.math4code.com"),
  title: {
    default: "math4code - Master IIT-JAM, CSIR NET & GATE Mathematics | By Hiranmoy Mandal",
    template: "%s | math4code",
  },
  description: "Premium online mathematics learning platform by Hiranmoy Mandal. Expert-curated courses, AI-powered tutoring, practice tests, and personalized learning paths for IIT-JAM, CSIR NET & GATE Mathematics preparation. Join thousands of successful students.",
  keywords: [
    // Brand & Creator
    "math4code",
    "Hiranmoy Mandal",
    "Hiranmoy",
    "mathematics online courses",
    "math learning platform",

    // Exams
    "IIT-JAM",
    "IIT JAM",
    "JAM Mathematics",
    "CSIR NET",
    "CSIR NET Mathematics",
    "GATE Mathematics",
    "GATE Maths",
    "competitive exam preparation",

    // Features
    "AI math tutor",
    "AI-powered learning",
    "step-by-step solutions",
    "mathematics test series",
    "mock tests",
    "practice problems",
    "online mathematics coaching",
    "mathematics courses",

    // Topics
    "calculus",
    "linear algebra",
    "real analysis",
    "complex analysis",
    "differential equations",
    "abstract algebra",
    "topology",
    "number theory",

    // General
    "mathematics education",
    "online learning",
    "exam preparation",
    "study material",
    "mathematics tutor"
  ],
  authors: [{ name: "Hiranmoy Mandal", url: "https://www.math4code.com" }],
  creator: "Hiranmoy Mandal",
  publisher: "math4code",
  generator: "Next.js",
  applicationName: "math4code",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "math4code",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.math4code.com",
    title: "math4code - Master IIT-JAM, CSIR NET & GATE Mathematics | By Hiranmoy Mandal",
    description: "Premium mathematics learning platform by Hiranmoy Mandal. AI-powered tutoring, expert courses, and comprehensive test series for IIT-JAM, CSIR NET & GATE Mathematics.",
    siteName: "math4code",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "math4code - Mathematics Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "math4code - Master IIT-JAM, CSIR NET & GATE Mathematics",
    description: "Premium mathematics learning platform by Hiranmoy Mandal. AI-powered tutoring and expert courses for competitive exam preparation.",
    creator: "@math4code",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.math4code.com",
  },
  category: "Education",
}

const config = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`font-sans antialiased `} suppressHydrationWarning>
        <ReactQueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MathJaxContext version={3} config={config}>
              {children}
              {/* <AIMentor /> */}
              <RewardInitializerWrapper />
            </MathJaxContext>
            <SonnerToaster richColors position="top-center" toastOptions={{ style: { zIndex: 9999 } }} />
            <Toaster />
          </ThemeProvider>
        </ReactQueryProviders>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
