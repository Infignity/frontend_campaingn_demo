import SideBar from '@/components/SideBar';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magicpitch Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex h-screen overflow-hidden bg-[#FFF]">
          {/* <SideBar /> */}
          <div className="flex-grow flex flex-col overflow-hidden">
            <Header />
            <Separator />
            
            <div className="flex-grow overflow-auto"> 
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
