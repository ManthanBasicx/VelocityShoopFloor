interface WorkOrderDetailsProps {
  item: string;
  revision: number;
  startDate: string;
  requiredDate: string;
  required: number;
  completed: number;
  moved: number;
  rejected: number;
  scrap: number;
  remaining: number;
}

export const WorkOrderDetails = ({
  item,
  revision,
  startDate,
  requiredDate,
  required,
  completed,
  moved,
  rejected,
  scrap,
  remaining,
}: WorkOrderDetailsProps) => {
  return (
    <div className="mt-2 space-y-1">
      <div className="grid grid-cols-2 text-sm text-gray-400">
        <div>
          <p>Item: {item}</p>
          <p>Revision Level {revision}</p>
          <p>Start Date: {startDate}</p>
          <p>Required Date: {requiredDate}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <p>Required: {required}</p>
            <p>Completed: {completed}</p>
            <p>Moved: {moved}</p>
          </div>
          <div>
            <p>Rejected: {rejected}</p>
            <p>Scrap: {scrap}</p>
            <p>Remaining: {remaining}</p>
          </div>
        </div>
      </div>
    </div>
  );
};