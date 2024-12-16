import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export const ClearFiltersButton = ({ hasActiveFilters, clearFilters }: ClearFiltersButtonProps) => {
  if (!hasActiveFilters) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={clearFilters}
      className="h-8 bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/80"
    >
      <X className="h-4 w-4 mr-2" />
      Clear filters
    </Button>
  );
};