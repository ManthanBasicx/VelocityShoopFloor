import { Switch } from "@/components/ui/switch";
import { Flag } from "lucide-react";

interface ResourceListHeaderProps {
  bulkStatusEnabled: boolean;
  onBulkStatusChange: (enabled: boolean) => void;
}

export const ResourceListHeader = ({ bulkStatusEnabled, onBulkStatusChange }: ResourceListHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Resources</h2>
      <div className="flex items-center gap-2">
        <Flag className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Set status all:</span>
        <Switch checked={bulkStatusEnabled} onCheckedChange={onBulkStatusChange} />
      </div>
    </div>
  );
};