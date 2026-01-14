"use client";

import { ReactNode } from "react";
import { FiSearch, FiBox, FiHelpCircle } from "react-icons/fi";
import { IconType } from "react-icons";
import { TfiBag } from "react-icons/tfi";
import { RiBardFill, RiImageAiLine, RiVideoAiLine } from "react-icons/ri";
import { VscHistory } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { useUIStore, type SidebarItemId } from "@/store/uiStore";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { TbArrowsDownUp } from "react-icons/tb";
import { FlowSidebar } from "../canvas/FlowSidebar";
import WorkflowActions from "./WorkflowActions";
import { WorkflowTitle } from "../canvas/WorkflowTitle";
import { useWorkflowStore } from "@/store/workflowStore";

const ICON_BAR_WIDTH = 56;
const CONTENT_WIDTH = 241;

type SidebarItem = {
  id: Exclude<SidebarItemId, null>;
  icon: IconType;
};

type SidebarProps = {
  onImportWorkflow: (file: File) => void;
  onExportWorkflow: () => void;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "search", icon: IoSearchOutline },
  { id: "recent", icon: VscHistory },
  { id: "folder", icon: TfiBag },
  { id: "image", icon: RiImageAiLine },
  { id: "video", icon: RiVideoAiLine },
  { id: "box", icon: FiBox },
  { id: "zap", icon: RiBardFill },
];

export default function Sidebar({
  onImportWorkflow,
  onExportWorkflow,
}: SidebarProps) {
  const {
    isSidebarCollapsed,
    toggleSidebar,
    activeSidebarItem,
    setActiveSidebarItem,
  } = useUIStore();

  const handleIconClick = (id: Exclude<SidebarItemId, null>) => {
    if (activeSidebarItem === id) {
      toggleSidebar();
      setActiveSidebarItem(null);
      return;
    }

    setActiveSidebarItem(id);

    if (isSidebarCollapsed) {
      toggleSidebar();
    }
  };

  
  return (
    <aside className="absolute inset-y-0 left-0 z-50">
      <div
        className="relative z-20 h-full flex flex-col items-center gap-3
                   bg-[#212126] text-white/60
                   border border-[#302E33] pt-6 pb-6"
        style={{ width: ICON_BAR_WIDTH }}
      >
        <div className="w-6 h-6 mb-7">
          <div className="w-full h-full rounded flex items-center justify-center text-white text-xs font-bold">
            <img src="https://galaxy-ai-4fzw.vercel.app/images/logo.svg" alt="" />
          </div>
        </div>

        {SIDEBAR_ITEMS.map(({ id, icon: Icon }) => (
          <Menu
            key={id}
            active={activeSidebarItem === id}
            onClick={() => handleIconClick(id)}
            icon={<Icon size={19} />}
          />
        ))}

        <div className="mt-auto flex flex-col gap-11 text-xl">
          <MdOutlinePhotoLibrary />
          <FiHelpCircle />
          <FaDiscord />
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 h-full bg-[#212126]
          border-r border-[#302E33]
          transition-transform
          ${isSidebarCollapsed ? "duration-150" : "duration-300"}
          z-10`}
        style={{
          width: ICON_BAR_WIDTH + CONTENT_WIDTH,
          transform: isSidebarCollapsed
            ? `translateX(-${CONTENT_WIDTH}px)`
            : "translateX(0)",
        }}
      >
        <div
          className="h-full text-white flex flex-col"
          style={{ marginLeft: ICON_BAR_WIDTH }}
        >
          <div className="flex px-4 border-b border-[#302E33] py-7">
            <WorkflowTitle />
          </div>

          <div className="px-4 py-4.25 border-b border-[#302E33]">
            <div className="flex items-center justify-between">
              <div className="rounded-[3px] px-3 w-[88%] py-1 flex items-center border border-[#302E33] gap-2">
                <FiSearch size={15} className="text-[#aaaaaa]" />
                <input
                  placeholder="Search"
                  className="bg-transparent text-[11px] outline-none text-white/70 placeholder:text-[#aaaaaa]"
                />
              </div>
              <TbArrowsDownUp size={14} className="text-[#aaaaaa]" />
            </div>

            <p className="text-[11px] mt-3 text-white/60">
              From{" "}
              <span className="mx-1 px-1 bg-[#353539] font-mono text-[#9e9e9e] font-normal rounded">
                Input
              </span>{" "}
              to{" "}
              <span className="mx-1 px-1 bg-[#353539] font-mono text-[#9e9e9e] font-normal rounded">
                Output
              </span>
            </p>
          </div>

          <div className="flex-1 mt-6 overflow-y-auto">
            {activeSidebarItem === "box" && <FlowSidebar />}
            {activeSidebarItem === "search" && (
              <div className="px-4 py-2 text-white/60 text-sm">Search functionality coming soon</div>
            )}
            {activeSidebarItem === "recent" && (
              <div className="px-4 py-2 text-white/60 text-sm">Recent workflows coming soon</div>
            )}
            {activeSidebarItem === "folder" && (
              <div className="px-4 py-2 text-white/60 text-sm">Folders coming soon</div>
            )}
            {activeSidebarItem === "image" && (
              <div className="px-4 py-2 text-white/60 text-sm">Image nodes coming soon</div>
            )}
            {activeSidebarItem === "video" && (
              <div className="px-4 py-2 text-white/60 text-sm">Video nodes coming soon</div>
            )}
            {activeSidebarItem === "zap" && (
              <div className="px-4 py-2 text-white/60 text-sm">Zap nodes coming soon</div>
            )}
          </div>

          <WorkflowActions
            onImport={onImportWorkflow}
            onExport={onExportWorkflow}
          />
        </div>
      </div>
    </aside>
  );
}

type MenuProps = {
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
};

function Menu({ icon, active, onClick }: MenuProps) {
  return (
    <div
      onClick={onClick}
      className={`h-10 w-10 flex items-center justify-center
        cursor-pointer rounded-sm duration-200
        ${active ? "bg-[#faffc7f0] text-black/80" : "hover:bg-[#353539]"}`}
    >
      {icon}
    </div>
  );
}
