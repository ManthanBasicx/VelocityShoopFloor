import { Resource } from "@/types/resource";

export const sortResourcesByName = (resources: Resource[], ascending: boolean): Resource[] => {
  return [...resources].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};