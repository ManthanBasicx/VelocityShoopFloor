import { AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const WorkOrderToolbar = () => {
  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 p-0 hover:bg-yellow-500/20"
            >
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Alert</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 p-0 hover:bg-blue-500/20"
            >
              <FileText className="h-6 w-6 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Production Report</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};