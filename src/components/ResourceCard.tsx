import { User, HelpCircle, Wrench, Coffee, Sandwich, DoorOpen, MoreVertical } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Resource } from "@/types/resource";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useResourceStatus } from "@/hooks/useResourceStatus";

interface ResourceCardProps {
  resource: Resource;
  index: number;
  onStatusChange?: (resourceId: number, newStatus: Resource["status"]) => void;
}

const getStatusIcon = (status: Resource["status"]) => {
  switch (status) {
    case "Unassigned":
      return <HelpCircle className="w-5 h-5" />;
    case "WIP":
      return <Wrench className="w-5 h-5" />;
    case "Break":
      return <Coffee className="w-5 h-5" />;
    case "Lunch":
      return <Sandwich className="w-5 h-5" />;
    case "Offsite":
      return <DoorOpen className="w-5 h-5" />;
    default:
      return <User className="w-5 h-5" />;
  }
};

export const ResourceCard = ({ resource, index, onStatusChange }: ResourceCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { status: selectedStatus, handleStatusChange } = useResourceStatus(
    resource.status,
    (newStatus) => {
      if (onStatusChange) {
        onStatusChange(resource.id, newStatus);
      }
    }
  );

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <Draggable draggableId={`resource-${resource.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 bg-secondary rounded-md flex items-center justify-between mb-2"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(resource.status)}
            <div>
              <p className="font-medium">{resource.name}</p>
              <p className="text-sm text-muted-foreground">ID: {resource.id}</p>
              <div className="flex items-center gap-2">
                {resource.workOrderId ? (
                  <Badge variant="default" className="bg-green-600">
                    {resource.workOrderId}
                  </Badge>
                ) : (
                  <p className="text-sm text-muted-foreground">{resource.status}</p>
                )}
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Status</DialogTitle>
                <DialogDescription>
                  Select a new status for {resource.name}.
                  {resource.status === "WIP" && " Changing from WIP will unassign from current work order."}
                </DialogDescription>
              </DialogHeader>
              <RadioGroup
                value={selectedStatus}
                onValueChange={handleStatusChange}
                className="grid gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Unassigned" id="unassigned" />
                  <Label htmlFor="unassigned">Unassigned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Break" id="break" />
                  <Label htmlFor="break">Break</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lunch" id="lunch" />
                  <Label htmlFor="lunch">Lunch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Offsite" id="offsite" />
                  <Label htmlFor="offsite">Offsite</Label>
                </div>
              </RadioGroup>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Draggable>
  );
};