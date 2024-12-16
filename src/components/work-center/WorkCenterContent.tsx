import { DragDropContext } from "@hello-pangea/dnd";
import { WorkOrderList } from "@/components/WorkOrderList";
import { ResourceList } from "@/components/ResourceList";
import { ActionsSidebar } from "@/components/ActionsSidebar";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useWorkCenter } from './WorkCenterProvider';
import { initialResources } from './WorkCenterData';

export const WorkCenterContent = () => {
  const { searchQuery, setSearchQuery, workOrdersList, setWorkOrdersList } = useWorkCenter();

  const {
    resources,
    setResources,
    assignedResources,
    filterWorkOrderId,
    handleDragEnd: originalHandleDragEnd,
    handleUnassignResources,
    setFilterWorkOrderId,
    handleResourceStatusChange,
    workOrders: dragAndDropWorkOrders,
    setWorkOrders: setDragAndDropWorkOrders
  } = useDragAndDrop({
    initialResources,
    workOrdersList,
    onReorderWorkOrders: (reorderedWorkOrders) => {
      setWorkOrdersList(reorderedWorkOrders);
    }
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.type === "resource" && result.source.droppableId === "resources" && result.destination.droppableId === "resources") {
      const items = Array.from(resources);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setResources(items);
    } else {
      originalHandleDragEnd(result);
    }
  };

  const handleFilterWorkOrderId = (workOrderId: string) => {
    setFilterWorkOrderId(workOrderId === filterWorkOrderId ? undefined : workOrderId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-6 py-4 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 h-full">
            <ActionsSidebar />
            <WorkOrderList 
              workOrders={workOrdersList}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              assignedResources={assignedResources}
              onUnassignResources={handleUnassignResources}
              onFilterResources={handleFilterWorkOrderId}
              onUpdateWorkOrder={(workOrderId, updates) => {
                const updatedWorkOrders = workOrdersList.map(wo => 
                  wo.id === workOrderId ? { ...wo, ...updates } : wo
                );
                setWorkOrdersList(updatedWorkOrders);
                setDragAndDropWorkOrders(updatedWorkOrders);
              }}
            />
            <ResourceList 
              resources={resources}
              filterWorkOrderId={filterWorkOrderId}
              onResourceStatusChange={handleResourceStatusChange}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};