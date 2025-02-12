import clsx from "clsx"
import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(inter.variable)}>
      <body
        className="bg-gray-100 antialiased overscroll-none h-screen w-screen relative overflow-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
