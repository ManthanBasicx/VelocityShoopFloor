import { useDataQuery } from '@/hooks/useDataQuery';
import { useToast } from '@/components/ui/use-toast';

export const DataDisplay = () => {
  const { toast } = useToast();
  const { data, isLoading, isError } = useDataQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch data",
    });
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};