import { Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkOrderActionsProps {
  setup: boolean;
  machine: boolean;
  hasAssignedResource: boolean;
  assignedResourceCount: number;
  onToggleSetup: () => void;
  onToggleMachine: () => void;
  onUnassignResources: () => void;
  onFilterResources: () => void;
}

export const WorkOrderActions = ({
  setup,
  machine,
  hasAssignedResource,
  assignedResourceCount,
  onToggleSetup,
  onToggleMachine,
  onUnassignResources,
  onFilterResources,
}: WorkOrderActionsProps) => {
  return (
    <div className="flex justify-start gap-2">
      <div className="w-1/8">
        <Button
          variant={setup ? "default" : "secondary"}
          size="sm"
          onClick={onToggleSetup}
          className={`w-full ${
            setup 
              ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/80' 
              : ''
          }`}
        >
          Setup
        </Button>
      </div>
      <div className="w-1/8">
        <Button
          variant={machine ? "default" : "secondary"}
          size="sm"
          onClick={onToggleMachine}
          className={`w-full ${
            machine 
              ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/80' 
              : ''
          }`}
        >
          Machine
        </Button>
      </div>
      <div className="w-1/8 relative flex items-center">
        <Button
          variant="secondary"
          size="sm"
          className={`w-full ${hasAssignedResource ? 'bg-[#0EA5E9] hover:bg-[#0EA5E9]/80' : ''}`}
          onClick={hasAssignedResource ? onUnassignResources : undefined}
        >
          <Users2 className="h-4 w-4 mr-1" />
          Labor
        </Button>
        {assignedResourceCount > 0 && (
          <Badge 
            variant="secondary" 
            className="ml-2 bg-white text-black min-w-[24px] h-6 flex items-center justify-center rounded-full text-sm cursor-pointer hover:bg-gray-200"
            onClick={onFilterResources}
          >
            {assignedResourceCount}
          </Badge>
        )}
      </div>
    </div>
  );
};