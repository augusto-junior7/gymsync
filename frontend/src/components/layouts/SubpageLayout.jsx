import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function SubpageLayout() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="pt-0 md:pt-32 pb-0 md:pb-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
