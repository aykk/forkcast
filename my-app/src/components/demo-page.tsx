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
import { GripHorizontal, Maximize2, ArrowLeft, Settings } from "lucide-react";

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

export function DemoPageComponent() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeBlock, setActiveBlock] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [descriptionData, setDescriptionData] = useState("");
  const [prescriptionData, setPrescriptionData] = useState("");
  const [predictionData, setPredictionData] = useState("");
  const boardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeBlock !== null) {
        const boardRect = boardRef.current.getBoundingClientRect();
        const newBlocks = [...blocks];
        const block = newBlocks[activeBlock];

        if (isResizing) {
          block.width = Math.max(200, snapToGrid(e.clientX - boardRect.left - block.x));
          block.height = Math.max(100, snapToGrid(e.clientY - boardRect.top - block.y));
        } else {
          block.x = snapToGrid(Math.max(0, Math.min(e.clientX - boardRect.left - 50, boardRect.width - block.width)));
          block.y = snapToGrid(Math.max(80, Math.min(e.clientY - boardRect.top - 20, boardRect.height - block.height)));
        }

        setBlocks(newBlocks);
      }
    };

    const handleMouseUp = () => {
      setActiveBlock(null);
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeBlock, blocks, isResizing]);

  const snapToGrid = (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

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

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <nav className="bg-orange-500 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="flex items-center text-white hover:text-orange-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-white">Demo Dashboard</h1>
          </div>
        </div>
      </nav>
      <div ref={boardRef} className="w-full h-screen p-4 pt-20 relative">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] grid-rows-[repeat(auto-fill,minmax(20px,1fr))] opacity-10 pointer-events-none">
          {Array.from({ length: 1000 }).map((_, i) => (
            <div key={i} className="border border-orange-200" />
          ))}
        </div>
        {blocks
          .filter((block) => block.visible)
          .map((block, index) => (
            <Card
              key={block.id}
              className="absolute shadow-lg overflow-hidden cursor-pointer bg-white border-orange-200 hover:border-orange-300 transition-colors"
              style={{
                left: `${block.x}px`,
                top: `${block.y}px`,
                width: `${block.width}px`,
                height: `${block.height}px`,
              }}
            >
              <CardHeader
                className="p-2 cursor-move bg-orange-50"
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
                    className="p-2 h-[calc(100%-40px)] flex items-center justify-center text-orange-600 cursor-pointer"
                    onClick={() => handleBlockClick(block)}
                  >
                    Click for insights
                  </CardContent>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-3xl w-[90vw] max-h-[80vh] flex flex-col p-0 overflow-hidden">
                  <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-orange-800">{selectedBlock?.title}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-grow overflow-y-auto px-6 py-4">
                    <div className="space-y-6 text-orange-900">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p>
                          {descriptionData?.body?.response
                            ? descriptionData.body.response
                            : "Loading description..."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Prescription</h3>
                        <p>
                          {prescriptionData?.body?.response
                            ? prescriptionData.body.response
                            : "Loading prescription..."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Prediction</h3>
                        <p>
                          {predictionData?.body?.response
                            ? predictionData.body.response
                            : "Loading prediction..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
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
              className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg bg-orange-500 text-white hover:bg-orange-600"
              aria-label="Edit dashboard"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle className="text-orange-800">Edit Dashboard</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Checkbox
                    id={block.id}
                    checked={block.visible}
                    onCheckedChange={() => toggleBlockVisibility(block.id)}
                    className="border-orange-300 text-orange-500"
                  />
                  <Label htmlFor={block.id} className="text-orange-800">{block.title}</Label>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}