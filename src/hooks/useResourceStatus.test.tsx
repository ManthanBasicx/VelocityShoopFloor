import { renderHook, act } from "@testing-library/react";
import { useResourceStatus } from "./useResourceStatus";
import { useToast } from "@/components/ui/use-toast";

// Mock the useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

describe("useResourceStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default status", () => {
    const { result } = renderHook(() => useResourceStatus());
    expect(result.current.status).toBe("Unassigned");
  });

  it("should initialize with provided status", () => {
    const { result } = renderHook(() => useResourceStatus("WIP"));
    expect(result.current.status).toBe("WIP");
  });

  it("should update status and call onStatusChange callback", () => {
    const onStatusChange = jest.fn();
    const { result } = renderHook(() => useResourceStatus("Unassigned", onStatusChange));

    act(() => {
      result.current.handleStatusChange("WIP");
    });

    expect(result.current.status).toBe("WIP");
    expect(onStatusChange).toHaveBeenCalledWith("WIP");
  });

  it("should show toast notification on status change", () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockImplementation(() => ({
      toast: mockToast,
    }));

    const { result } = renderHook(() => useResourceStatus("Unassigned"));

    act(() => {
      result.current.handleStatusChange("Break");
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Status Updated",
      description: "Status changed from Unassigned to Break",
    });
  });

  it("should not update status or show toast if new status is same as current", () => {
    const mockToast = jest.fn();
    const onStatusChange = jest.fn();
    (useToast as jest.Mock).mockImplementation(() => ({
      toast: mockToast,
    }));

    const { result } = renderHook(() => useResourceStatus("Unassigned", onStatusChange));

    act(() => {
      result.current.handleStatusChange("Unassigned");
    });

    expect(result.current.status).toBe("Unassigned");
    expect(mockToast).not.toHaveBeenCalled();
    expect(onStatusChange).not.toHaveBeenCalled();
  });

  it("should correctly set isWIP and canChangeWorkOrder flags", () => {
    const { result } = renderHook(() => useResourceStatus("WIP"));
    
    expect(result.current.isWIP).toBe(true);
    expect(result.current.canChangeWorkOrder).toBe(false);

    act(() => {
      result.current.handleStatusChange("Break");
    });

    expect(result.current.isWIP).toBe(false);
    expect(result.current.canChangeWorkOrder).toBe(true);
  });
});