import React from 'react';
import { WorkCenterHeader } from "@/components/WorkCenterHeader";
import { WorkCenterContent } from "./WorkCenterContent";
import { useWorkCenter } from './WorkCenterProvider';
import { departments, workCenters } from './WorkCenterData';

export const WorkCenterLayout = () => {
  const {
    selectedDepartment,
    setSelectedDepartment,
    selectedWorkCenter,
    setSelectedWorkCenter,
    selectedWorkCell,
    setSelectedWorkCell,
  } = useWorkCenter();

  return (
    <div className="flex flex-col h-screen">
      <WorkCenterHeader
        selectedDepartment={selectedDepartment}
        selectedWorkCenter={selectedWorkCenter}
        selectedWorkCell={selectedWorkCell}
        onDepartmentChange={setSelectedDepartment}
        onWorkCenterChange={setSelectedWorkCenter}
        onWorkCellChange={setSelectedWorkCell}
        departments={departments}
        workCenters={workCenters}
      />
      <main className="flex-1 overflow-hidden">
        <WorkCenterContent />
      </main>
    </div>
  );
};