import { List, CheckSquare, PlusSquare, UserPlus, RefreshCw, User } from "lucide-react";

export const ActionsSidebar = () => {
  return (
    <div className="col-span-2">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <button className="action-button">
          <List className="w-4 h-4" />
          <span>Dispatch List</span>
        </button>
        <button className="action-button">
          <CheckSquare className="w-4 h-4" />
          <span>Complete Nest</span>
        </button>
        <button className="action-button">
          <PlusSquare className="w-4 h-4" />
          <span>Add Work Order</span>
        </button>
        <button className="action-button">
          <PlusSquare className="w-4 h-4" />
          <span>Add NestID</span>
        </button>
        <button className="action-button">
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
        <button className="action-button">
          <User className="w-4 h-4" />
          <span>Supervisor</span>
        </button>
        <button className="action-button">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Display</span>
        </button>
      </div>
    </div>
  );
};