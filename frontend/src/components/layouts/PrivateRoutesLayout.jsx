import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function PrivateRoutesLayout() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-24 md:pb-8 max-w-7xl mx-auto px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}
