import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export const DateRangeFilter = ({ dateRange, setDateRange }: DateRangeFilterProps) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(dateRange.from);
  const [toDate, setToDate] = useState<Date | undefined>(dateRange.to);

  // Calculate the minimum allowed date (1 year ago from today)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);

  useEffect(() => {
    if (fromDate) {
      // Calculate max date (2 months from fromDate)
      const maxDate = new Date(fromDate);
      maxDate.setMonth(maxDate.getMonth() + 2);
      
      // If current toDate is beyond maxDate or before fromDate, reset it
      if (toDate && (toDate > maxDate || toDate < fromDate)) {
        setToDate(undefined);
      }
    }
  }, [fromDate]);

  useEffect(() => {
    setDateRange({ from: fromDate, to: toDate });
  }, [fromDate, toDate]);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[140px] justify-start text-left font-normal",
              !fromDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate ? format(fromDate, "MM/dd/yy") : <span>From</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={setFromDate}
            disabled={(date) => date < minDate || date > new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[140px] justify-start text-left font-normal",
              !toDate && "text-muted-foreground"
            )}
            disabled={!fromDate}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {toDate ? format(toDate, "MM/dd/yy") : <span>To</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={setToDate}
            disabled={(date) => {
              if (!fromDate) return true;
              const maxDate = new Date(fromDate);
              maxDate.setMonth(maxDate.getMonth() + 2);
              return date < fromDate || date > maxDate;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};