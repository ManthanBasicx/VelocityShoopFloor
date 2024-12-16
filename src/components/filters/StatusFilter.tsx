import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusFilterProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const StatusFilter = ({ statusFilter, setStatusFilter }: StatusFilterProps) => {
  return (
    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-[180px] bg-slate-800">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectItem value="ALL">All Work Orders</SelectItem>
        <SelectItem value="Setup">Setup</SelectItem>
        <SelectItem value="Machine">Machine</SelectItem>
        <SelectItem value="Setup + Machine">Setup + Machine</SelectItem>
        <SelectItem value="Setup + Labor">Setup + Labor</SelectItem>
        <SelectItem value="Labor">Labor</SelectItem>
        <SelectItem value="No Labor">No Labor</SelectItem>
      </SelectContent>
    </Select>
  );
};