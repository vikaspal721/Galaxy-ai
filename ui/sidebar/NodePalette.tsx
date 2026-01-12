"use client";

import { useCallback } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import { BaseNode, NodeType } from "@/types/node";

const nodeTypes: Array<{ type: NodeType; label: string; description: string }> = [
  { type: "seedream", label: "Seedream (Image)", description: "Generate images with AI" },
  { type: "seedance", label: "Seedance (Video)", description: "Generate videos from images" },
  { type: "elevenlabs", label: "ElevenLabs (Audio)", description: "Generate speech from text" },
  { type: "openrouter", label: "OpenRouter (LLM)", description: "Chat with LLM models" },
  { type: "crop-image", label: "Crop Image", description: "Crop images" },
  { type: "merge-video", label: "Merge Video", description: "Merge multiple videos" },
  { type: "extract-audio", label: "Extract Audio", description: "Extract audio from video" },
];

export function NodePalette() {
  const { addNode } = useWorkflowStore();

  const handleDragStart = useCallback(
    (event: React.DragEvent, nodeType: NodeType) => {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleAddNode = useCallback(
    (nodeType: NodeType) => {
      const newNode: BaseNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: nodeTypes.find((nt) => nt.type === nodeType)?.label ?? nodeType,
        },
        status: "idle",
      };
      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="w-64 h-full bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Node Palette</h2>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            draggable
            onDragStart={(e) => handleDragStart(e, nodeType.type)}
            onClick={() => handleAddNode(nodeType.type)}
            className="p-3 bg-white border border-gray-300 rounded-lg cursor-move hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="font-medium text-sm">{nodeType.label}</div>
            <div className="text-xs text-gray-500 mt-1">{nodeType.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
