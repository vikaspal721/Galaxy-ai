"use client";

import { Handle, Position } from "reactflow";
import { BaseNode } from "@/types/node";

interface CustomNodeProps {
  data: BaseNode;
  selected: boolean;
}

export function CustomNode({ data, selected }: CustomNodeProps) {
  const statusColors = {
    idle: "bg-gray-200",
    running: "bg-blue-500",
    completed: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`px-4 py-2 bg-white border-2 rounded-lg shadow-md min-w-[150px] ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${statusColors[data.status ?? "idle"]}`}
        />
        <div className="font-semibold text-sm">{data.type}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {data.data.label as string}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
