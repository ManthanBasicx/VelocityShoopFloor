import { WorkOrderFilterButtons } from "@/components/WorkOrderFilterButtons";
import { WorkOrderCard } from "@/components/WorkOrderCard";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { WorkOrder } from "./work-center/WorkCenterTypes";

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  assignedResources: Record<string, number[]>;
  onUnassignResources: (workOrderId: string) => void;
  onFilterResources: (workOrderId: string) => void;
  onUpdateWorkOrder: (workOrderId: string, updates: Partial<WorkOrder>) => void;
  onReorderWorkOrders?: (workOrders: WorkOrder[]) => void;
}

export const WorkOrderList = ({ 
  workOrders, 
  searchQuery, 
  onSearchChange,
  assignedResources,
  onUnassignResources,
  onFilterResources,
  onUpdateWorkOrder,
  onReorderWorkOrders
}: WorkOrderListProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isFireballSortActive, setIsFireballSortActive] = useState(false);
  const [workOrderFireballs, setWorkOrderFireballs] = useState<Record<string, number>>({});

  const updateWorkOrderFireballs = (workOrderId: string, litCount: number) => {
    setWorkOrderFireballs(prev => ({
      ...prev,
      [workOrderId]: litCount
    }));
  };

  const clearFilters = () => {
    onSearchChange("");
    setDateRange({ from: undefined, to: undefined });
    setStatusFilter("ALL");
  };

  const handleToggleFireballSort = () => {
    setIsFireballSortActive(prev => !prev);
  };

  const filteredWorkOrders = workOrders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(searchLower) ||
      order.header.toLowerCase().includes(searchLower) ||
      order.projectId.toLowerCase().includes(searchLower) ||
      order.item.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Date range filtering
    if (dateRange.from || dateRange.to) {
      const orderDate = new Date(order.startDate);
      
      if (dateRange.from && orderDate < dateRange.from) {
        return false;
      }
      
      if (dateRange.to) {
        // Set the time to the end of the day for the "to" date
        const toDateEnd = new Date(dateRange.to);
        toDateEnd.setHours(23, 59, 59, 999);
        if (orderDate > toDateEnd) {
          return false;
        }
      }
    }

    if (statusFilter !== "ALL") {
      const hasLabor = Boolean(assignedResources[order.id]?.length);
      
      switch (statusFilter) {
        case "Setup":
          return order.setup;
        case "Machine":
          return order.machine;
        case "Setup + Machine":
          return order.setup && order.machine;
        case "Setup + Labor":
          return order.setup && hasLabor;
        case "Labor":
          return hasLabor;
        case "No Labor":
          return !hasLabor;
        default:
          return true;
      }
    }

    return true;
  });

  const sortedWorkOrders = isFireballSortActive
    ? [...filteredWorkOrders].sort((a, b) => 
        (workOrderFireballs[b.id] || 0) - (workOrderFireballs[a.id] || 0)
      )
    : filteredWorkOrders;

  const hasActiveFilters = Boolean(
    searchQuery || 
    dateRange.from || 
    dateRange.to || 
    (statusFilter !== "ALL")
  );

  return (
    <div className="col-span-7">
      <WorkOrderFilterButtons
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        isFireballSortActive={isFireballSortActive}
        onToggleFireballSort={handleToggleFireballSort}
      />

      <Droppable 
        droppableId="workorders" 
        type="WORKORDER"
        direction="vertical"
      >
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="work-order-scroll"
          >
            {sortedWorkOrders.map((order, index) => (
              <WorkOrderCard 
                key={order.id}
                order={order}
                index={index}
                hasAssignedResource={Boolean(assignedResources[order.id]?.length)}
                assignedResourceCount={assignedResources[order.id]?.length || 0}
                onUnassignResources={() => onUnassignResources(order.id)}
                onFilterResources={() => onFilterResources(order.id)}
                onToggleSetup={() => onUpdateWorkOrder(order.id, { setup: !order.setup })}
                onToggleMachine={() => onUpdateWorkOrder(order.id, { machine: !order.machine })}
                onFireballsChange={(count) => updateWorkOrderFireballs(order.id, count)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};