import { useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { Resource } from "@/types/resource";
import { useToast } from "@/components/ui/use-toast";

interface UseDragAndDropProps {
  initialResources: Resource[];
  workOrdersList: any[];
  onReorderWorkOrders?: (reorderedWorkOrders: any[]) => void;
}

export const useDragAndDrop = ({ initialResources, workOrdersList, onReorderWorkOrders }: UseDragAndDropProps) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [assignedResources, setAssignedResources] = useState<Record<string, number[]>>({});
  const [filterWorkOrderId, setFilterWorkOrderId] = useState<string | undefined>(undefined);
  const [workOrders, setWorkOrders] = useState(workOrdersList);
  const { toast } = useToast();

  const handleResourceStatusChange = (resourceId: number, newStatus: Resource["status"]) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    if (resource.status === "WIP" && newStatus !== "WIP" && resource.workOrderId) {
      setAssignedResources(prev => {
        const newAssignedResources = { ...prev };
        if (newAssignedResources[resource.workOrderId!]) {
          newAssignedResources[resource.workOrderId!] = newAssignedResources[resource.workOrderId!]
            .filter(id => id !== resourceId);
          
          if (newAssignedResources[resource.workOrderId!].length === 0) {
            delete newAssignedResources[resource.workOrderId!];
          }
        }
        return newAssignedResources;
      });

      setResources(prev => prev.map(r => 
        r.id === resourceId 
          ? { ...r, status: newStatus, workOrderId: undefined }
          : r
      ));
    } else {
      setResources(prev => prev.map(r => 
        r.id === resourceId 
          ? { ...r, status: newStatus }
          : r
      ));
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId, type } = result;

    // Handle work order reordering
    if (type === "WORKORDER") {
      const reorderedWorkOrders = Array.from(workOrders);
      const [removed] = reorderedWorkOrders.splice(source.index, 1);
      reorderedWorkOrders.splice(destination.index, 0, removed);
      
      setWorkOrders(reorderedWorkOrders);
      if (onReorderWorkOrders) {
        onReorderWorkOrders(reorderedWorkOrders);
      }
      return;
    }

    // Handle resource assignments and reassignments
    if (destination.droppableId.startsWith('workorder-')) {
      const resourceId = parseInt(draggableId.split('-')[1]);
      const workOrderId = destination.droppableId.split('-')[1];
      const resource = resources.find(r => r.id === resourceId);
      
      if (!resource) return;

      // If resource is already assigned to a work order, remove it first
      if (resource.workOrderId) {
        setAssignedResources(prev => {
          const newAssignedResources = { ...prev };
          if (newAssignedResources[resource.workOrderId!]) {
            newAssignedResources[resource.workOrderId!] = newAssignedResources[resource.workOrderId!]
              .filter(id => id !== resourceId);
            
            if (newAssignedResources[resource.workOrderId!].length === 0) {
              delete newAssignedResources[resource.workOrderId!];
            }
          }
          return newAssignedResources;
        });

        toast({
          title: "Resource Reassigned",
          description: `${resource.name} has been reassigned from ${resource.workOrderId} to ${workOrderId}`,
        });
      } else {
        toast({
          title: "Resource Assigned",
          description: `${resource.name} has been assigned to ${workOrderId}`,
        });
      }

      // Assign to new work order
      setResources(prev => prev.map(r =>
        r.id === resourceId
          ? { ...r, status: "WIP", workOrderId }
          : r
      ));

      setAssignedResources(prev => ({
        ...prev,
        [workOrderId]: [...(prev[workOrderId] || []), resourceId]
      }));
    }
  };

  return {
    resources,
    setResources,
    assignedResources,
    filterWorkOrderId,
    setFilterWorkOrderId,
    handleDragEnd,
    handleResourceStatusChange,
    workOrders,
    setWorkOrders,
    handleUnassignResources: (workOrderId: string) => {
      const resourcesInWorkOrder = resources.filter(r => r.workOrderId === workOrderId);
      
      setResources(prev => prev.map(r => 
        r.workOrderId === workOrderId
          ? { ...r, status: "Unassigned", workOrderId: undefined }
          : r
      ));

      setAssignedResources(prev => {
        const newAssignedResources = { ...prev };
        delete newAssignedResources[workOrderId];
        return newAssignedResources;
      });

      if (resourcesInWorkOrder.length > 0) {
        toast({
          title: "Resources Unassigned",
          description: `${resourcesInWorkOrder.length} resource(s) have been unassigned from ${workOrderId}`,
        });
      }
    }
  };
};