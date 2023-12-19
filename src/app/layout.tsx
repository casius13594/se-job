
import { Navbar } from '@/app/(content)/Hero'
import './globals.css'

export const metadata = {
  title: 'Jelp',
  description: 'The best recruitment website you can find',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
