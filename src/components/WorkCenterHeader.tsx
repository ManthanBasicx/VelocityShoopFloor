import { DepartmentSelector } from "./work-center/DepartmentSelector";
import { WorkCenterSelect } from "./work-center/WorkCenterSelect";
import { WorkCellCarousel } from "./work-center/WorkCellCarousel";

interface WorkCenterHeaderProps {
  selectedDepartment: string;
  selectedWorkCenter: string;
  selectedWorkCell: string;
  onDepartmentChange: (value: string) => void;
  onWorkCenterChange: (value: string) => void;
  onWorkCellChange: (value: string) => void;
  departments: string[];
  workCenters: Record<string, string[]>;
}

export const WorkCenterHeader = ({
  selectedDepartment,
  selectedWorkCenter,
  selectedWorkCell,
  onDepartmentChange,
  onWorkCenterChange,
  onWorkCellChange,
  departments,
  workCenters,
}: WorkCenterHeaderProps) => {
  const distinctDepartments = Array.from(new Set(
    Object.keys(workCenters).map(center => {
      const match = center.match(/^([^-]+)/);
      return match ? match[1] : center;
    })
  )).sort();

  const filteredWorkCenters = departments.filter(dept => {
    if (!selectedDepartment || selectedDepartment === "_Select Department") {
      return true;
    }
    return dept.startsWith(selectedDepartment);
  });

  const getWorkCellsForWorkCenter = (workCenter: string) => {
    if (!workCenter || workCenter === "_Select Work Center") return [];
    
    return [
      `${workCenter}-Cell 01`,
      `${workCenter}-Cell 02`,
      `${workCenter}-Cell 03`,
      `${workCenter}-Hold`,
      `${workCenter}-Inspect`,
      `${workCenter}-Move`
    ];
  };

  const handleDepartmentChange = (value: string) => {
    onDepartmentChange(value);
    onWorkCenterChange("_Select Work Center");
    onWorkCellChange("_Select Work Cell");
  };

  const handleWorkCenterChange = (value: string) => {
    onWorkCenterChange(value);
    onWorkCellChange("_Select Work Cell");
  };

  const handleWorkCellToggle = (cell: string) => {
    if (selectedWorkCell === cell) {
      onWorkCellChange("_Select Work Cell");
    } else {
      onWorkCellChange(cell);
    }
  };

  const workCells = getWorkCellsForWorkCenter(selectedWorkCenter);

  return (
    <header className="border-b border-border/10 bg-card">
      <div className="container flex items-center h-16">
        <h1 className="text-xl font-bold mr-8">
          Velocity ShopFloor Manager
        </h1>
        <div className="flex space-x-8">
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            distinctDepartments={distinctDepartments}
          />

          <WorkCenterSelect
            selectedWorkCenter={selectedWorkCenter}
            onWorkCenterChange={handleWorkCenterChange}
            filteredWorkCenters={filteredWorkCenters}
            disabled={!selectedDepartment || selectedDepartment === "_Select Department"}
          />

          <WorkCellCarousel
            workCells={workCells}
            selectedWorkCell={selectedWorkCell}
            onWorkCellToggle={handleWorkCellToggle}
          />
        </div>
      </div>
    </header>
  );
};