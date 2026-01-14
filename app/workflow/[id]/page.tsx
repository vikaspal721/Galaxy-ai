"use client";

import { FlowCanvas } from "@/ui/canvas/FlowCanvas";
import Sidebar from "@/ui/sidebar/Sidebar";
import { useWorkflowStore } from "@/store/workflowStore";

export default function WorkflowPage({ params }: { params: { id: string } }) {
  const { nodes, edges } = useWorkflowStore();

  const handleImportWorkflow = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      // TODO: Implement workflow import logic
      console.log("Import workflow:", data);
    } catch (error) {
      console.error("Failed to import workflow:", error);
      alert("Failed to import workflow. Please check the file format.");
    }
  };

  const handleExportWorkflow = () => {
    const workflowData = {
      nodes,
      edges,
      version: "1.0",
    };
    const blob = new Blob([JSON.stringify(workflowData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative h-screen w-full">
      <Sidebar
        onImportWorkflow={handleImportWorkflow}
        onExportWorkflow={handleExportWorkflow}
      />
      <FlowCanvas />
      
    </div>
  );
}
