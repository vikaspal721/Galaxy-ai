"use client";

import { useCallback } from "react";
import { FiDownload, FiUpload } from "react-icons/fi";

type WorkflowActionsProps = {
  onImport: (file: File) => void;
  onExport: () => void;
};

export default function WorkflowActions({
  onImport,
  onExport,
}: WorkflowActionsProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImport(file);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [onImport]
  );

  return (
    <div className="px-4 py-4 border-t border-[#302E33] flex gap-2">
      <label
        className="
          flex-1 px-3 py-2 rounded-md
          bg-[#353539] hover:bg-[#3f3f46]
          text-white/70 hover:text-white
          text-xs font-medium
          cursor-pointer
          transition-colors
          flex items-center justify-center gap-2
        "
      >
        <FiUpload size={14} />
        Import
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <button
        onClick={onExport}
        className="
          flex-1 px-3 py-2 rounded-md
          bg-[#353539] hover:bg-[#3f3f46]
          text-white/70 hover:text-white
          text-xs font-medium
          transition-colors
          flex items-center justify-center gap-2
        "
      >
        <FiDownload size={14} />
        Export
      </button>
    </div>
  );
}
