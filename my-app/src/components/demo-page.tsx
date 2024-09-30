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

  // State to hold the API responses
  const [descriptionData, setDescriptionData] = useState("");
  const [prescriptionData, setPrescriptionData] = useState("");
  const [predictionData, setPredictionData] = useState("");

  const boardRef = useRef(null);

  // API call function
  // API call function
  const makeApiCalls = async (blockId: any) => {
    const payload = {
      data_point: blockId,
      timeframe: "1 week",
    };

    try {
      // POST request to Description API
      const descriptionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-description",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let descriptionData = await descriptionResponse.json();

      // Parse the 'body' field from the response if it's a JSON string
      if (typeof descriptionData.body === "string") {
        descriptionData = {
          ...descriptionData,
          body: JSON.parse(descriptionData.body),
        };
      }
      setDescriptionData(descriptionData); // Store the description data

      // POST request to Prescription API
      const prescriptionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-prescription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let prescriptionData = await prescriptionResponse.json();

      // Parse the 'body' field from the response if it's a JSON string
      if (typeof prescriptionData.body === "string") {
        prescriptionData = {
          ...prescriptionData,
          body: JSON.parse(prescriptionData.body),
        };
      }
      setPrescriptionData(prescriptionData); // Store the prescription data

      // POST request to Prediction API
      const predictionResponse = await fetch(
        "https://a3eb0xe1r7.execute-api.us-east-1.amazonaws.com/dev/get-prediction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      let predictionData = await predictionResponse.json();

      // Parse the 'body' field from the response if it's a JSON string
      if (typeof predictionData.body === "string") {
        predictionData = {
          ...predictionData,
          body: JSON.parse(predictionData.body),
        };
      }
      setPredictionData(predictionData); // Store the prediction data
    } catch (error) {
      console.error("Error making API calls:", error);
    }
  };

  const handleBlockClick = (block: SetStateAction<null>) => {
    setSelectedBlock(block); // Set the selected block for the dialog
    setDescriptionData(""); // Clear previous data
    setPrescriptionData(""); // Clear previous data
    setPredictionData(""); // Clear previous data
    makeApiCalls(block.id); // Trigger API calls
  };

  // Toggle visibility of blocks in the dashboard
  const toggleBlockVisibility = (id: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, visible: !block.visible } : block
      )
    );
  };

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
        {blocks
          .filter((block) => block.visible)
          .map((block, index) => (
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
                  onClick={() => handleBlockClick(block)} // API calls triggered here
                >
                  <CardHeader
                    className="p-2 cursor-move"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setActiveBlock(index);
                    }}
                  >
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
                      e.stopPropagation();
                      setActiveBlock(index);
                      setIsResizing(true);
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
                  {/* Displaying API data here */}
                  <p>
                    <strong>Description:</strong>{" "}
                    {descriptionData?.body?.response
                      ? descriptionData.body.response
                      : "Loading description..."}
                  </p>
                  <p>
                    <strong>Prescription:</strong>{" "}
                    {prescriptionData?.body?.response
                      ? prescriptionData.body.response
                      : "Loading prescription..."}
                  </p>
                  <p>
                    <strong>Prediction:</strong>{" "}
                    {predictionData?.body?.response
                      ? predictionData.body.response
                      : "Loading prediction..."}
                  </p>
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
                <div
                  key={block.id}
                  className="flex items-center space-x-2 mb-2"
                >
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
  );
}
