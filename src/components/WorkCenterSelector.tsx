import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkCenterSelectorProps {
  workCenters: string[];
  selectedWorkCenter: string;
  setSelectedWorkCenter: (value: string) => void;
  selectedWorkCell: string;
  setSelectedWorkCell: (value: string) => void;
  workCells: Record<string, string[]>;
}

export const WorkCenterSelector = ({
  workCenters,
  selectedWorkCenter,
  setSelectedWorkCenter,
  selectedWorkCell,
  setSelectedWorkCell,
  workCells,
}: WorkCenterSelectorProps) => {
  return (
    <div className="flex space-x-4">
      <Select 
        value={selectedWorkCenter} 
        onValueChange={setSelectedWorkCenter}
      >
        <SelectTrigger className="bg-slate-800">
          <SelectValue placeholder="Select Work Center" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800">
          {Object.keys(workCells).map((center) => (
            <SelectItem key={center} value={center}>
              {center}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedWorkCell} 
        onValueChange={setSelectedWorkCell}
        disabled={!selectedWorkCenter}
      >
        <SelectTrigger className="bg-slate-800">
          <SelectValue placeholder="Select Work Cell" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800">
          {selectedWorkCenter && workCells[selectedWorkCenter]?.map((cell) => (
            <SelectItem key={cell} value={cell}>
              {cell}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};