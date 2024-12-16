import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Toggle } from "@/components/ui/toggle";

interface WorkCellCarouselProps {
  workCells: string[];
  selectedWorkCell: string;
  onWorkCellToggle: (cell: string) => void;
}

export const WorkCellCarousel = ({
  workCells,
  selectedWorkCell,
  onWorkCellToggle,
}: WorkCellCarouselProps) => {
  return (
    <div className="relative min-w-[90px] px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {workCells.map((cell) => (
            <CarouselItem key={cell} className="pl-1 basis-auto">
              <Toggle
                variant="outline"
                pressed={selectedWorkCell === cell}
                onPressedChange={() => onWorkCellToggle(cell)}
                className={`${
                  selectedWorkCell === cell ? 'bg-primary text-primary-foreground' : ''
                } [&[data-state=on]]:bg-primary [&[data-state=on]]:text-primary-foreground whitespace-nowrap min-w-[60px] text-sm`}
              >
                {cell.split('-').pop()}
              </Toggle>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 h-6 w-6 -ml-10" />
        <CarouselNext className="right-0 h-6 w-6 -mr-10" />
      </Carousel>
    </div>
  );
};