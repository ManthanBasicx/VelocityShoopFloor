import { useState, useEffect } from "react";
import { Resource } from "@/types/resource";
import { sortResourcesByName } from "@/utils/resourceSort";

export const useResourceListState = (resources: Resource[], initialFilterWorkOrderId?: string) => {
  const [statusFilter, setStatusFilter] = useState<Resource["status"] | "ALL">("ALL");
  const [bulkStatusEnabled, setBulkStatusEnabled] = useState(false);
  const [localFilterWorkOrderId, setLocalFilterWorkOrderId] = useState(initialFilterWorkOrderId);
  const [isAscending, setIsAscending] = useState(true);
  const [manualOrder, setManualOrder] = useState<Resource[]>([]);
  const [isManualOrderActive, setIsManualOrderActive] = useState(false);

  useEffect(() => {
    setLocalFilterWorkOrderId(initialFilterWorkOrderId);
  }, [initialFilterWorkOrderId]);

  useEffect(() => {
    setManualOrder([]);
    setIsManualOrderActive(false);
  }, [statusFilter, localFilterWorkOrderId]);

  const filteredResources = resources.filter(resource => {
    if (localFilterWorkOrderId) {
      return resource.workOrderId === localFilterWorkOrderId;
    }
    
    if (statusFilter === "ALL") {
      return true;
    }
    
    return resource.status === statusFilter;
  });

  const sortedAndFilteredResources = isManualOrderActive 
    ? manualOrder
    : sortResourcesByName(filteredResources, isAscending);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sortedAndFilteredResources);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setManualOrder(items);
    setIsManualOrderActive(true);
  };

  const toggleSort = () => {
    setIsAscending(!isAscending);
    setIsManualOrderActive(false);
    setManualOrder([]);
  };

  return {
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
  };
};