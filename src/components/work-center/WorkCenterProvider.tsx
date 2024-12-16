import React, { createContext, useContext, useState } from 'react';
import { WorkCenterContextType, WorkOrder } from './WorkCenterTypes';
import { initialWorkOrders } from './WorkCenterData';

const WorkCenterContext = createContext<WorkCenterContextType | undefined>(undefined);

export const useWorkCenter = () => {
  const context = useContext(WorkCenterContext);
  if (!context) {
    throw new Error('useWorkCenter must be used within a WorkCenterProvider');
  }
  return context;
};

export const WorkCenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedWorkCenter, setSelectedWorkCenter] = useState("");
  const [selectedWorkCell, setSelectedWorkCell] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [workOrdersList, setWorkOrdersList] = useState(initialWorkOrders);

  return (
    <WorkCenterContext.Provider
      value={{
        selectedDepartment,
        setSelectedDepartment,
        selectedWorkCenter,
        setSelectedWorkCenter,
        selectedWorkCell,
        setSelectedWorkCell,
        searchQuery,
        setSearchQuery,
        workOrdersList,
        setWorkOrdersList,
      }}
    >
      {children}
    </WorkCenterContext.Provider>
  );
};