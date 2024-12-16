export interface WorkOrder {
  id: string;
  header: string;
  projectId: string;
  item: string;
  startDate: string;
  requiredDate: string;  // Added this field
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

export interface Resource {
  id: number;
  name: string;
  status: string;
}

export interface WorkCenterContextType {
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedWorkCenter: string;
  setSelectedWorkCenter: (value: string) => void;
  selectedWorkCell: string;
  setSelectedWorkCell: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  workOrdersList: WorkOrder[];
  setWorkOrdersList: (orders: WorkOrder[]) => void;
}