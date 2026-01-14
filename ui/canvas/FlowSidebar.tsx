"use client";

import { useCallback } from "react";
import {
  RiImageAiLine,
  RiVideoAiLine,
  RiChat3Line,
} from "react-icons/ri";
import { FiMusic, FiCrop, FiLayers } from "react-icons/fi";
import { useWorkflowStore } from "@/store/workflowStore";
import { BaseNode, NodeType } from "@/types/node";

const NODE_ITEMS: Array<{
  type: NodeType;
  label: string;
  icon: React.ElementType;
}> = [
  {
    type: "seedream",
    label: "Seedream",
    icon: RiImageAiLine,
  },
  {
    type: "seedance",
    label: "Seedance",
    icon: RiVideoAiLine,
  },
  {
    type: "openrouter",
    label: "OpenRouter",
    icon: RiChat3Line,
  },
  {
    type: "elevenlabs",
    label: "ElevenLabs",
    icon: FiMusic,
  },
  {
    type: "crop-image",
    label: "Crop Image",
    icon: FiCrop,
  },
  {
    type: "merge-video",
    label: "Merge Video",
    icon: FiLayers,
  },
];

export function FlowSidebar() {
  const { addNode } = useWorkflowStore();

  const handleDragStart = useCallback(
    (e: React.DragEvent, nodeType: NodeType) => {
      e.dataTransfer.setData("application/reactflow", nodeType);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleAddNode = useCallback(
    (type: NodeType) => {
      const node: BaseNode = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: 200, y: 200 },
        data: { label: type },
        status: "idle",
      };
      addNode(node);
    },
    [addNode]
  );

  return (
    <div className="h-full flex flex-col text-white">
    

      <div className="flex-1 p-3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {NODE_ITEMS.map(({ type, label, icon: Icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
              onClick={() => handleAddNode(type)}
              className="
                group flex flex-col items-center justify-center
                aspect-square rounded-[3px]
                cursor-pointer
               
                border border-[#2a2a2a]
                hover:border-[#404040]
                hover:bg-[#343131]
                transition-all duration-200
                p-4
              "
            >
              <div className="text-white/80 group-hover:text-white mb-3 transition-colors">
                <Icon size={19} />
              </div>

              <span className="text-[11px] font-medium text-white/80 group-hover:text-white text-center leading-tight transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
