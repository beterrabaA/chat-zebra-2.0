import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Zebra Chatbot',
  description: 'A chatbot for your finances',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-3">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
