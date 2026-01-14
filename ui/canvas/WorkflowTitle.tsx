"use client";

import { useWorkflowStore } from "@/store/workflowStore";
import { useState } from "react";

export function WorkflowTitle() {
  const { name, setName } = useWorkflowStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSubmit = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    } else {
      setTempName(name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setTempName(name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex-1">
      {isEditing ? (
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white text-sm font-medium outline-none border-b border-transparent focus:border-white/30"
          autoFocus
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="text-white text-sm font-medium cursor-pointer hover:text-white/80 transition-colors"
        >
          {name}
        </h1>
      )}
    </div>
  );
}
