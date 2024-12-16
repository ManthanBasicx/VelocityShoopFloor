import { Button } from "@/components/ui/button";
import { Resource } from "@/types/resource";
import { List, HelpCircle, Wrench, Coffee, Sandwich, DoorOpen, ChevronUp, ChevronDown, SortAsc, SortDesc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LongPressEvent } from "@/hooks/useLongPress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResourceListControlsProps {
  statusFilter: Resource["status"] | "ALL";
  localFilterWorkOrderId?: string;
  isAscending: boolean;
  scrollUpProps: LongPressEvent;
  scrollDownProps: LongPressEvent;
  onAllButtonClick: () => void;
  onStatusButtonClick: (status: Resource["status"]) => void;
  onToggleSort: () => void;
}

export const ResourceListControls = ({
  statusFilter,
  localFilterWorkOrderId,
  isAscending,
  scrollUpProps,
  scrollDownProps,
  onAllButtonClick,
  onStatusButtonClick,
  onToggleSort,
}: ResourceListControlsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "ALL" && !localFilterWorkOrderId ? "default" : "outline"}
            size="sm"
            onClick={onAllButtonClick}
          >
            <List className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show all resources</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "Unassigned" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusButtonClick("Unassigned")}
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show unassigned resources</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "WIP" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusButtonClick("WIP")}
            className="relative"
          >
            <Wrench className={`w-4 h-4 ${localFilterWorkOrderId ? "text-[#0EA5E9]" : ""}`} />
            {localFilterWorkOrderId && (
              <Badge className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0EA5E9] text-white text-xs px-2 py-0.5">
                {localFilterWorkOrderId}
              </Badge>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show resources in work</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "Break" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusButtonClick("Break")}
          >
            <Coffee className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show resources on break</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "Lunch" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusButtonClick("Lunch")}
          >
            <Sandwich className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show resources at lunch</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={statusFilter === "Offsite" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusButtonClick("Offsite")}
          >
            <DoorOpen className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show offsite resources</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" {...scrollUpProps}>
            <ChevronUp className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scroll up</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" {...scrollDownProps}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scroll down</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" onClick={onToggleSort}>
            {isAscending ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isAscending ? 'Sort descending' : 'Sort ascending'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};