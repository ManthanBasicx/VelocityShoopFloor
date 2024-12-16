import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkCenterSelectProps {
  selectedWorkCenter: string;
  onWorkCenterChange: (value: string) => void;
  filteredWorkCenters: string[];
  disabled: boolean;
}

export const WorkCenterSelect = ({
  selectedWorkCenter,
  onWorkCenterChange,
  filteredWorkCenters,
  disabled,
}: WorkCenterSelectProps) => {
  return (
    <Select 
      value={selectedWorkCenter} 
      onValueChange={onWorkCenterChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px] bg-slate-800">
        <SelectValue placeholder="Select Work Center" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectItem value="_Select Work Center">Select Work Center</SelectItem>
        {filteredWorkCenters.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};