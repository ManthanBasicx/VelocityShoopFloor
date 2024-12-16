import { Toggle } from "@/components/ui/toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkCenterCarouselProps {
  departments: string[];
  selectedDepartment: string;
  onDepartmentChange: (dept: string) => void;
  selectedProductionDept: string;
  onProductionDeptChange: (dept: string) => void;
}

export const WorkCenterCarousel = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  selectedProductionDept,
  onProductionDeptChange,
}: WorkCenterCarouselProps) => {
  const productionDepts = [
    "Machine Shop", 
    "Paint", 
    "Assembly", 
    "Packaging", 
    "Quality Control", 
    "Inspection", 
    "Welding",
    "Laser"
  ];

  const filteredDepartments = departments.filter(dept => {
    switch(selectedProductionDept) {
      case "Machine Shop":
        return dept.startsWith("CNC");
      case "Paint":
        return dept.startsWith("Paint");
      case "Assembly":
        return dept.startsWith("Assembly");
      case "Packaging":
        return dept.startsWith("Packaging");
      case "Quality Control":
        return dept.startsWith("QC");
      case "Inspection":
        return dept.startsWith("Inspection");
      case "Welding":
        return dept.startsWith("Welding");
      case "Laser":
        return dept.startsWith("Laser");
      default:
        return true;
    }
  });

  const handleToggle = (dept: string) => {
    if (selectedDepartment === dept) {
      onDepartmentChange('');
    } else {
      onDepartmentChange(dept);
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="w-32">
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-300">Department</label>
        </div>
        <Select value={selectedProductionDept} onValueChange={onProductionDeptChange}>
          <SelectTrigger className="bg-slate-800 w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800">
            {productionDepts.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-300">Work Center</label>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {filteredDepartments.map((dept) => (
                <CarouselItem key={dept} className="pl-2 basis-auto">
                  <Toggle
                    variant="outline"
                    pressed={selectedDepartment === dept}
                    onPressedChange={() => handleToggle(dept)}
                    className={`${
                      selectedDepartment === dept ? 'bg-primary text-primary-foreground' : ''
                    } [&[data-state=on]]:bg-primary [&[data-state=on]]:text-primary-foreground whitespace-nowrap min-w-[120px]`}
                  >
                    {dept}
                  </Toggle>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};