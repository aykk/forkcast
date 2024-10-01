'use client'

import { Button } from "@/components/ui/button"
import { useRef } from "react"
import Link from "next/link"

export function LandingPageComponent() {
  const diagramRef = useRef<HTMLDivElement>(null)

  const scrollToDiagram = () => {
    diagramRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
            <Link href="/demo" passHref>
              <Button className="bg-orange-500 text-white hover:bg-orange-600">Demo</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Serve up success with AI-powered insights
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Forkcast delivers customizable dashboards and prescriptive analytics to optimize your restaurant's performance.
                </p>
                <div className="flex space-x-4">
                  <Link href="/demo" passHref>
                    <Button className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-full">
                      Try Now
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="text-orange-500 border-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full"
                    onClick={scrollToDiagram}
                  >
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
                    className="relative w-full rounded-lg shadow-2xl"
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-01%20at%2012.35.30%E2%80%AFAM-O1k6x0KfmUPk8rSJOVdXQBeSsU81XI.png"
                    alt="Forkcast Dashboard Demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={diagramRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col items-center mb-8 md:mb-0">
                  <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">POS System</p>
                </div>
                <svg className="w-8 h-8 text-gray-400 transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex flex-col items-center mb-8 md:mb-0">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">Database</p>
                </div>
                <svg className="w-8 h-8 text-gray-400 transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">Forkcast Analytics</p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-xl text-gray-600">
                Forkcast seamlessly integrates with your existing POS system, transforming raw data into actionable insights for your restaurant.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <svg
                className="text-orange-500 h-8 w-8 mr-2"
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
              <span className="text-xl font-bold">Forkcast</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>&copy; 2024 Forkcast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}