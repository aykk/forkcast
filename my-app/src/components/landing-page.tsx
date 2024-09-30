'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="text-orange-500 h-10 w-10 transform -rotate-12"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
              <span className="text-2xl font-bold text-gray-800">Forkcast</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a className="text-gray-600 hover:text-orange-500 transition-colors" href="#features">
                Features
              </a>
              <a className="text-gray-600 hover:text-orange-500 transition-colors" href="#about">
                About
              </a>
              <a className="text-gray-600 hover:text-orange-500 transition-colors" href="#contact">
                Contact
              </a>
            </nav>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">Sign Up</Button>
          </div>
        </div>
      </header>
      <main>
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Serve Up Success with AI-Powered Insights
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Forkcast delivers customizable dashboards and predictive analytics to revolutionize your restaurant's performance.
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-full">
                    Get Started
                  </Button>
                  <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="relative">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <img 
                    className="relative max-w-md w-full mx-auto" 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-09-29_at_8.51.44_PM-removebg-preview(1)-G6PG0qZwqL2uR2h7KXVhSc7XdHEmX4.png" 
                    alt="Restaurant staff illustration" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 transform -skew-y-6"></div>
          <div className="relative z-10 py-32 bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <svg
                    className="text-orange-500 h-12 w-12 mb-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Predictive Analytics</h3>
                  <p className="text-gray-600">Forecast demand and optimize inventory with AI-driven predictions.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 md:translate-y-8">
                  <svg
                    className="text-orange-500 h-12 w-12 mb-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Customizable Dashboards</h3>
                  <p className="text-gray-600">Tailor your analytics view to focus on what matters most to your business.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <svg
                    className="text-orange-500 h-12 w-12 mb-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Insights</h3>
                  <p className="text-gray-600">Make informed decisions with up-to-the-minute data and analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to optimize your restaurant?</h2>
                <p className="text-xl text-gray-600 mb-8">Join Forkcast today and unlock the power of AI-driven analytics.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Input className="bg-white text-gray-900 border-2 border-orange-500 rounded-full" placeholder="Enter your email" type="email" />
                  <Button className="bg-orange-500 text-white hover:bg-orange-600 rounded-full">Get Started</Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                  <img 
                    className="relative max-w-md w-full mx-auto" 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-09-29_at_8.51.44_PM-removebg-preview(1)-G6PG0qZwqL2uR2h7KXVhSc7XdHEmX4.png" 
                    alt="Restaurant staff illustration" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <svg
                className="text-orange-500 h-10 w-10 inline-block mr-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
              <span className="text-2xl font-bold">Forkcast</span>
            </div>
            <nav className="flex flex-wrap justify-center space-x-6">
              <a className="hover:text-orange-500 transition-colors" href="#features">Features</a>
              <a className="hover:text-orange-500 transition-colors" href="#about">About</a>
              <a className="hover:text-orange-500 transition-colors" href="#contact">Contact</a>
              <a className="hover:text-orange-500 transition-colors" href="#privacy">Privacy</a>
              <a className="hover:text-orange-500 transition-colors" href="#terms">Terms</a>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 Forkcast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}