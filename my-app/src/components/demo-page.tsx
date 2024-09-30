'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { GripHorizontal, Maximize2, ArrowLeft, Settings } from 'lucide-react'

const initialBlocks = [
  { id: 'server-rankings', title: 'Server Rankings', x: 0, y: 80, width: 300, height: 200, visible: true },
  { id: 'menu-item-rankings', title: 'Menu Item Rankings', x: 320, y: 80, width: 300, height: 200, visible: true },
  { id: 'high-traffic-days', title: 'High Traffic Days', x: 0, y: 300, width: 300, height: 200, visible: true },
  { id: 'inventory-tracker', title: 'Inventory/Supply Tracker', x: 320, y: 300, width: 300, height: 200, visible: true },
]

export function DemoPageComponent() {
  const [blocks, setBlocks] = useState(initialBlocks)
  const [activeBlock, setActiveBlock] = useState(null)
  const [isResizing, setIsResizing] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const boardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeBlock !== null) {
        const boardRect = boardRef.current.getBoundingClientRect()
        const newBlocks = [...blocks]
        const block = newBlocks[activeBlock]

        if (isResizing) {
          block.width = Math.max(200, e.clientX - boardRect.left - block.x)
          block.height = Math.max(100, e.clientY - boardRect.top - block.y)
        } else {
          block.x = Math.max(0, Math.min(e.clientX - boardRect.left - 50, boardRect.width - block.width))
          block.y = Math.max(80, Math.min(e.clientY - boardRect.top - 20, boardRect.height - block.height))
        }

        setBlocks(newBlocks)
      }
    }

    const handleMouseUp = () => {
      setActiveBlock(null)
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [activeBlock, blocks, isResizing])

  const toggleBlockVisibility = (id) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, visible: !block.visible } : block
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Demo Dashboard</h1>
          </div>
        </div>
      </nav>
      <div ref={boardRef} className="w-full h-screen p-4 pt-20 relative">
        {blocks.filter(block => block.visible).map((block, index) => (
          <Dialog key={block.id}>
            <DialogTrigger asChild>
              <Card
                className="absolute shadow-lg overflow-hidden cursor-pointer"
                style={{
                  left: `${block.x}px`,
                  top: `${block.y}px`,
                  width: `${block.width}px`,
                  height: `${block.height}px`,
                }}
                onClick={() => setSelectedBlock(block)}
              >
                <CardHeader className="p-2 cursor-move" onMouseDown={(e) => {
                  e.stopPropagation()
                  setActiveBlock(index)
                }}>
                  <CardTitle className="text-sm font-medium flex justify-between items-center">
                    {block.title}
                    <GripHorizontal className="h-4 w-4 text-gray-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 h-[calc(100%-40px)] flex items-center justify-center text-gray-400">
                  Click for insights
                </CardContent>
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    setActiveBlock(index)
                    setIsResizing(true)
                  }}
                >
                  <Maximize2 className="h-4 w-4 text-gray-400" />
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedBlock?.title}</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p>DATA INSIGHTS HERE FOR {selectedBlock?.title}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
              aria-label="Edit dashboard"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Dashboard</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {blocks.map((block) => (
                <div key={block.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id={block.id} 
                    checked={block.visible}
                    onCheckedChange={() => toggleBlockVisibility(block.id)}
                  />
                  <Label htmlFor={block.id}>{block.title}</Label>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}