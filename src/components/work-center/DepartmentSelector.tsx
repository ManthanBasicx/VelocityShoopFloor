import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepartmentSelectorProps {
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  distinctDepartments: string[];
}

export const DepartmentSelector = ({
  selectedDepartment,
  onDepartmentChange,
  distinctDepartments,
}: DepartmentSelectorProps) => {
  return (
    <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
      <SelectTrigger className="w-[180px] bg-slate-800">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectItem value="_Select Department">Select Department</SelectItem>
        {distinctDepartments.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};