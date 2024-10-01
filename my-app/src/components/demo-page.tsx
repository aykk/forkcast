"use client";

import { useState, useRef, useEffect, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripHorizontal, Maximize2, ArrowLeft, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GRID_SIZE = 20; // Size of grid cells in pixels

const initialBlocks = [
  {
    id: "server ranking",
    title: "Server Rankings",
    x: 0,
    y: 80,
    width: 300,
    height: 200,
    visible: true,
  },
  {
    id: "item performance",
    title: "Menu Item Rankings",
    x: 320,
    y: 80,
    width: 300,
    height: 200,
    visible: true,
  },
  {
    id: "high traffic days",
    title: "High Traffic Days",
    x: 0,
    y: 300,
    width: 300,
    height: 200,
    visible: true,
  },
  {
    id: "inventory-tracker",
    title: "Inventory/Supply Tracker",
    x: 320,
    y: 300,
    width: 300,
    height: 200,
    visible: true,
  },
];

// Mock data based on the provided CSVs
const orderData = [
  { server: "Bob", tips: 30.76, orders: 8 },
  { server: "Charlie", tips: 8.43, orders: 4 },
  { server: "Dana", tips: 8.41, orders: 3 },
  { server: "Alice", tips: 4.15, orders: 3 },
];

const menuData = [
  { itemName: "Iced Lemon Tea", unitsSold: 50 },
  { itemName: "Classic Cheeseburger", unitsSold: 45 },
  { itemName: "Margherita Pizza", unitsSold: 30 },
  { itemName: "Grilled Chicken Wrap", unitsSold: 28 },
  { itemName: "Caesar Salad", unitsSold: 22 },
];

const trafficData = [
  { day: "Mon", orders: 3 },
  { day: "Tue", orders: 2 },
  { day: "Wed", orders: 4 },
  { day: "Thu", orders: 5 },
  { day: "Fri", orders: 6 },
];

const inventoryData = [
  { date: "9/27", items: "Beef Patty, Sugar, Bacon, Cabbage" },
  { date: "9/24", items: "Beef Patty, Chicken Breast, Mixed Vegetables, Lemon" },
  { date: "9/20", items: "Tomato, Parmesan, Tea Leaves, Bacon, Basil, Chicken Breast, Burger Buns, Pasta" },
  { date: "9/15", items: "Burger Buns, Cabbage, Pork Ribs, Parmesan, Butter" },
  { date: "9/15", items: "Basil, Lettuce, Parmesan" },
];

export function DemoPageComponent() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeBlock, setActiveBlock] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [descriptionData, setDescriptionData] = useState("");
  const [prescriptionData, setPrescriptionData] = useState("");
  const [predictionData, setPredictionData] = useState("");
  const boardRef = useRef(null);
  const router = useRouter();

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  useEffect(() => {
    let animationFrameId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (activeBlock !== null) {
        const boardRect = boardRef.current.getBoundingClientRect();
        const newX = e.clientX - boardRect.left;
        const newY = e.clientY - boardRect.top;

        if (Math.abs(newX - lastX) < 1 && Math.abs(newY - lastY) < 1) {
          return; // Skip small movements to reduce jitter
        }

        lastX = newX;
        lastY = newY;

        animationFrameId = requestAnimationFrame(() => {
          setBlocks(prevBlocks => {
            const newBlocks = [...prevBlocks];
            const block = newBlocks[activeBlock];

            if (isResizing) {
              block.width = Math.max(200, snapToGrid(newX - block.x));
              block.height = Math.max(100, snapToGrid(newY - block.y));
            } else {
              block.x = snapToGrid(Math.max(0, Math.min(newX - 50, boardRect.width - block.width)));
              block.y = snapToGrid(Math.max(80, Math.min(newY - 20, boardRect.height - block.height)));
            }

            return newBlocks;
          });
        });
      }
    };

    const handleMouseUp = () => {
      setActiveBlock(null);
      setIsResizing(false);
      cancelAnimationFrame(animationFrameId);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeBlock, isResizing]);

  const makeApiCalls = async (blockId: any) => {
    const payload = {
      data_point: blockId,
      timeframe: "1 week",
    };

    try {
      const descriptionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-description",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let descriptionData = await descriptionResponse.json();
      if (typeof descriptionData.body === "string") {
        descriptionData = {
          ...descriptionData,
          body: JSON.parse(descriptionData.body),
        };
      }
      setDescriptionData(descriptionData);

      const prescriptionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-prescription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let prescriptionData = await prescriptionResponse.json();
      if (typeof prescriptionData.body === "string") {
        prescriptionData = {
          ...prescriptionData,
          body: JSON.parse(prescriptionData.body),
        };
      }
      setPrescriptionData(prescriptionData);

      const predictionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-prediction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let predictionData = await predictionResponse.json();
      if (typeof predictionData.body === "string") {
        predictionData = {
          ...predictionData,
          body: JSON.parse(predictionData.body),
        };
      }
      setPredictionData(predictionData);
    } catch (error) {
      console.error("Error making API calls:", error);
    }
  };

  const handleBlockClick = (block: SetStateAction<null>) => {
    setSelectedBlock(block);
    setDescriptionData("");
    setPrescriptionData("");
    setPredictionData("");
    makeApiCalls(block.id);
  };

  const toggleBlockVisibility = (id: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, visible: !block.visible } : block
      )
    );
  };

  const renderBlockContent = (block) => {
    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: '100%',
      width: '100%',
      padding: '0.5rem',
      overflow: 'hidden',
    };

    const itemStyle = {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.5',
      textAlign: 'left',
      width: '100%',
      padding: '0.25rem 0',
    };

    switch (block.id) {
      case "server ranking":
        return (
          <div style={contentStyle}>
            {orderData.slice(0, 3).map((server, index) => (
              <div key={index} style={itemStyle} className="flex justify-between items-center w-full">
                <span className="font-medium">{server.server}</span>
                <span>${server.tips.toFixed(2)} ({server.orders} orders)</span>
              </div>
            ))}
          </div>
        );
      case "item performance":
        return (
          <div style={contentStyle}>
            {menuData.slice(0, 5).map((item, index) => (
              <div key={index} style={itemStyle} className="flex justify-between items-center w-full">
                <span className="font-medium">{item.itemName}</span>
                <span>{item.unitsSold} sold</span>
              </div>
            ))}
          </div>
        );
      case "high traffic days":
        return (
          <div style={{ ...contentStyle, height: '100%', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "inventory-tracker":
        return (
          <div style={contentStyle}>
            <div style={{ overflowY: 'auto', flex: 1, width: '100%' }}>
              {inventoryData.map((run, index) => (
                <p key={index} style={itemStyle}>
                  <span className="font-medium">{run.date}:</span> {run.items}
                </p>
              ))}
            </div>
          </div>
        );
      default:
        return <p style={itemStyle}>Click for insights</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white overflow-hidden">
      <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              className="flex items-center text-white hover:text-orange-100 transition-colors duration-200"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
          </div>
        </div>
      </nav>
      <div ref={boardRef} className="w-full h-screen p-6 pt-24 relative">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] grid-rows-[repeat(auto-fill,minmax(20px,1fr))] opacity-5 pointer-events-none">
          {Array.from({ length: 1000 }).map((_, i) => (
            <div key={i} className="border border-orange-200" />
          ))}
        </div>
        {blocks
          .filter((block) => block.visible)
          .map((block, index) => (
            <Card
              key={block.id}
              className="absolute shadow-lg overflow-hidden cursor-pointer bg-white border-orange-200 hover:border-orange-300 transition-all duration-200 rounded-lg"
              style={{
                left: `${block.x}px`,
                top: `${block.y}px`,
                width: `${block.width}px`,
                height: `${block.height}px`,
              }}
            >
              <CardHeader
                className="p-3 cursor-move bg-gradient-to-r from-orange-100 to-orange-50"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setActiveBlock(index);
                }}
              >
                <CardTitle className="text-sm font-medium flex justify-between items-center text-orange-800">
                  {block.title}
                  <GripHorizontal className="h-4 w-4 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <Dialog>
                <DialogTrigger asChild>
                  <CardContent 
                    className="p-0 h-[calc(100%-48px)] flex items-center justify-center text-orange-600 cursor-pointer hover:bg-orange-50 transition-colors duration-200"
                    onClick={() => handleBlockClick(block)}
                  >
                    {renderBlockContent(block)}
                  </CardContent>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-3xl w-[90vw]
 max-h-[80vh] flex flex-col p-0 overflow-hidden rounded-lg">
                  <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-100 to-orange-50">
                    <DialogTitle className="text-xl font-bold text-orange-800">{selectedBlock?.title}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-grow px-6 py-4">
                    <div className="space-y-6 text-orange-900">
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-orange-700">Description</h3>
                        <p className="text-sm leading-relaxed">
                          {descriptionData?.body?.response
                            ? descriptionData.body.response
                            : "Loading description..."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-orange-700">Prescription</h3>
                        <p className="text-sm leading-relaxed">
                          {prescriptionData?.body?.response
                            ? prescriptionData.body.response
                            : "Loading prescription..."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-orange-700">Prediction</h3>
                        <p className="text-sm leading-relaxed">
                          {predictionData?.body?.response
                            ? predictionData.body.response
                            : "Loading prediction..."}
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setActiveBlock(index);
                  setIsResizing(true);
                }}
              >
                <Maximize2 className="h-4 w-4 text-orange-400" />
              </div>
            </Card>
          ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
              aria-label="Edit dashboard"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-orange-800">Edit Dashboard</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center space-x-3 mb-4"
                >
                  <Checkbox
                    id={block.id}
                    checked={block.visible}
                    onCheckedChange={() => toggleBlockVisibility(block.id)}
                    className="border-orange-300 text-orange-500"
                  />
                  <Label htmlFor={block.id} className="text-orange-800 text-sm font-medium cursor-pointer">{block.title}</Label>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}