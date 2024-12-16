import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchFilter = ({ searchQuery, onSearchChange }: SearchFilterProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search work orders..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 w-[120px]"  // Reduced from w-[180px] to w-[120px]
      />
    </div>
  );
};