import { SearchFilter } from "./filters/SearchFilter";
import { StatusFilter } from "./filters/StatusFilter";
import { FireballSort } from "./filters/FireballSort";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { ClearFiltersButton } from "./filters/ClearFiltersButton";

interface WorkOrderFilterButtonsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  isFireballSortActive: boolean;
  onToggleFireballSort: () => void;
}

export const WorkOrderFilterButtons = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  clearFilters,
  hasActiveFilters,
  isFireballSortActive,
  onToggleFireballSort,
}: WorkOrderFilterButtonsProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Work Orders</h2>
        <ClearFiltersButton 
          hasActiveFilters={hasActiveFilters} 
          clearFilters={clearFilters} 
        />
      </div>
      <div className="flex items-center space-x-4">
        <SearchFilter 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange} 
        />
        <StatusFilter 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
        <FireballSort 
          isFireballSortActive={isFireballSortActive} 
          onToggleFireballSort={onToggleFireballSort} 
        />
        <DateRangeFilter 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
        />
      </div>
    </div>
  );
};