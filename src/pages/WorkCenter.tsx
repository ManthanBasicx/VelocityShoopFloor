import { WorkCenterProvider } from "@/components/work-center/WorkCenterProvider";
import { WorkCenterLayout } from "@/components/work-center/WorkCenterLayout";

const WorkCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <WorkCenterProvider>
        <WorkCenterLayout />
      </WorkCenterProvider>
    </div>
  );
};

export default WorkCenter;