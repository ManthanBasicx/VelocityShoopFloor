import { useRef } from "react";
import { Resource } from "@/types/resource";
import { useLongPress } from "@/hooks/useLongPress";
import { useResourceListState } from "@/hooks/useResourceListState";
import { ResourceListHeader } from "./resource-list/ResourceListHeader";
import { ResourceListControls } from "./resource-list/ResourceListControls";
import { ResourceListContent } from "./resource-list/ResourceListContent";

interface ResourceListProps {
  resources: Resource[];
  filterWorkOrderId?: string;
  onResourceStatusChange?: (resourceId: number, newStatus: Resource["status"]) => void;
  onReorder?: (startIndex: number, endIndex: number) => void;
}

export const ResourceList = ({
  resources,
  filterWorkOrderId: initialFilterWorkOrderId,
  onResourceStatusChange,
  onReorder,
}: ResourceListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const {
    statusFilter,
    setStatusFilter,
    bulkStatusEnabled,
    setBulkStatusEnabled,
    localFilterWorkOrderId,
    setLocalFilterWorkOrderId,
    isAscending,
    sortedAndFilteredResources,
    handleDragEnd,
    toggleSort,
  } = useResourceListState(resources, initialFilterWorkOrderId);

  const handleScrollUp = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollBy({ top: -100, behavior: 'smooth' });
      }
    }
  };

  const handleScrollDown = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollBy({ top: 100, behavior: 'smooth' });
      }
    }
  };

  const scrollUpProps = useLongPress({
    onLongPress: handleScrollUp,
    onClick: handleScrollUp,
    ms: 100,
  });

  const scrollDownProps = useLongPress({
    onLongPress: handleScrollDown,
    onClick: handleScrollDown,
    ms: 100,
  });

  const handleAllButtonClick = () => {
    setStatusFilter("ALL");
    setLocalFilterWorkOrderId(undefined);
  };

  const handleStatusButtonClick = (newStatus: Resource["status"]) => {
    if (bulkStatusEnabled) {
      sortedAndFilteredResources.forEach((resource) => {
        if (onResourceStatusChange) {
          onResourceStatusChange(resource.id, newStatus);
        }
      });
      setBulkStatusEnabled(false);
      setStatusFilter("ALL");
    } else {
      setStatusFilter(statusFilter === newStatus ? "ALL" : newStatus);
    }
  };

  return (
    <div className="col-span-3">
      <div className="bg-card rounded-lg p-4">
        <ResourceListHeader
          bulkStatusEnabled={bulkStatusEnabled}
          onBulkStatusChange={setBulkStatusEnabled}
        />
        <ResourceListControls
          statusFilter={statusFilter}
          localFilterWorkOrderId={localFilterWorkOrderId}
          isAscending={isAscending}
          scrollUpProps={scrollUpProps}
          scrollDownProps={scrollDownProps}
          onAllButtonClick={handleAllButtonClick}
          onStatusButtonClick={handleStatusButtonClick}
          onToggleSort={toggleSort}
        />
        <ResourceListContent
          scrollAreaRef={scrollAreaRef}
          resources={sortedAndFilteredResources}
          onResourceStatusChange={onResourceStatusChange}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};