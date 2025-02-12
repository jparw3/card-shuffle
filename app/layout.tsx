import { Inter } from "next/font/google"
import localFont from "next/font/local"
import clsx from "clsx"
import "./globals.css"

const satoshi = localFont({
  src: "../public/_static/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "400 600",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(satoshi.variable, inter.variable)}>
      <body
        className="bg-gray-100 antialiased overscroll-none h-screen w-screen relative overflow-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
