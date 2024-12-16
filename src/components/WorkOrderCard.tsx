import { Card } from "@/components/ui/card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { WorkOrderHeader } from "./work-order/WorkOrderHeader";
import { WorkOrderDetails } from "./work-order/WorkOrderDetails";
import { WorkOrderActions } from "./work-order/WorkOrderActions";
import { WorkOrderToolbar } from "./work-order/WorkOrderToolbar";

interface WorkOrder {
  id: string;
  header: string;
  projectId: string;
  item: string;
  startDate: string;
  requiredDate: string; // Added this field
  revision: number;
  sequence: number;
  required: number;
  completed: number;
  moved: number;
  rejected: number;
  scrap: number;
  remaining: number;
  setup: boolean;
  machine: boolean;
}

interface WorkOrderCardProps {
  order: WorkOrder;
  index: number;
  hasAssignedResource: boolean;
  assignedResourceCount: number;
  onUnassignResources: () => void;
  onFilterResources: () => void;
  onToggleSetup: (id: string) => void;
  onToggleMachine: (id: string) => void;
  onFireballsChange: (count: number) => void;
}

export const WorkOrderCard = ({
  order,
  index,
  hasAssignedResource,
  assignedResourceCount,
  onUnassignResources,
  onFilterResources,
  onToggleSetup,
  onToggleMachine,
  onFireballsChange,
}: WorkOrderCardProps) => {
  return (
    <Draggable draggableId={order.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-[#1A1F2C] border-slate-700 p-4"
        >
          <Droppable droppableId={`workorder-${order.id}`} type="resource">
            {(droppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className="flex justify-between items-start"
              >
                <div className="flex-1">
                  <WorkOrderHeader
                    id={order.id}
                    projectId={order.projectId}
                    header={order.header}
                    sequence={order.sequence}
                    onFireballsChange={onFireballsChange}
                  />

                  <WorkOrderDetails
                    item={order.item}
                    revision={order.revision}
                    startDate={order.startDate}
                    requiredDate={order.requiredDate}
                    required={order.required}
                    completed={order.completed}
                    moved={order.moved}
                    rejected={order.rejected}
                    scrap={order.scrap}
                    remaining={order.remaining}
                  />
                </div>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="flex justify-between items-center mt-4">
            <WorkOrderActions
              setup={order.setup}
              machine={order.machine}
              hasAssignedResource={hasAssignedResource}
              assignedResourceCount={assignedResourceCount}
              onToggleSetup={() => onToggleSetup(order.id)}
              onToggleMachine={() => onToggleMachine(order.id)}
              onUnassignResources={onUnassignResources}
              onFilterResources={onFilterResources}
            />
            <WorkOrderToolbar />
          </div>
        </Card>
      )}
    </Draggable>
  );
};
