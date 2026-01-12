"use client";

import { FlowCanvas } from "@/ui/canvas/FlowCanvas";
import { NodePalette } from "@/ui/sidebar/NodePalette";

export default function WorkflowPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen">
      <NodePalette />
      <div className="flex-1">
        <FlowCanvas />
      </div>
    </div>
  );
}
