import { ResourceCard } from "@/components/ResourceCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Droppable } from "@hello-pangea/dnd";
import { Resource } from "@/types/resource";
import { RefObject } from "react";

interface ResourceListContentProps {
  scrollAreaRef: RefObject<HTMLDivElement>;
  resources: Resource[];
  onResourceStatusChange?: (resourceId: number, newStatus: Resource["status"]) => void;
  onDragEnd: (result: any) => void;
}

export const ResourceListContent = ({
  scrollAreaRef,
  resources,
  onResourceStatusChange,
  onDragEnd,
}: ResourceListContentProps) => {
  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="h-[500px] w-full pr-4 overflow-y-auto touch-pan-y resource-scroll-area"
    >
      <Droppable droppableId="resources" type="resource" direction="vertical">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
            onDragEnd={onDragEnd}
          >
            {resources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={index}
                onStatusChange={onResourceStatusChange}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ScrollArea>
  );
};