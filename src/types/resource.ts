export interface Resource {
  id: number;
  name: string;
  status: "Unassigned" | "WIP" | "Break" | "Lunch" | "Offsite";
  workOrderId?: string;
}