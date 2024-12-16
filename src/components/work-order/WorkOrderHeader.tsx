import { Flame } from "lucide-react";
import { useState, useEffect } from "react";

interface WorkOrderHeaderProps {
  id: string;
  projectId: string;
  header: string;
  sequence: number;
  onFireballsChange: (count: number) => void;
}

export const WorkOrderHeader = ({
  id,
  projectId,
  header,
  sequence,
  onFireballsChange,
}: WorkOrderHeaderProps) => {
  const [litFireballs, setLitFireballs] = useState<boolean[]>([false, false, false, false, false]);

  const toggleFireball = (index: number) => {
    setLitFireballs(prev => {
      const newState = [...prev];
      if (prev[index]) {
        // If the clicked fireball is already lit, turn it and all subsequent fireballs off
        for (let i = index; i < newState.length; i++) {
          newState[i] = false;
        }
      } else {
        // If the clicked fireball is not lit, light up all fireballs up to and including this index
        for (let i = 0; i <= index; i++) {
          newState[i] = true;
        }
      }
      return newState;
    });
  };

  useEffect(() => {
    const litCount = litFireballs.filter(Boolean).length;
    onFireballsChange(litCount);
  }, [litFireballs, onFireballsChange]);

  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-base font-semibold text-white">{id}</h3>
          <span className="text-sm text-gray-400">Project ID: {projectId}</span>
        </div>
        <h4 className="text-lg font-medium text-white mt-1">{header}</h4>
      </div>
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Flame
            key={`${id}-${i}`}
            className={`w-4 h-4 cursor-pointer transition-colors duration-300 ${
              litFireballs[i] 
                ? 'text-orange-500 hover:text-orange-400 animate-pulse' 
                : 'text-gray-500 hover:text-gray-400'
            }`}
            onClick={() => toggleFireball(i)}
          />
        ))}
        <span className="text-sm text-gray-400 ml-2">Sequence {sequence}</span>
      </div>
    </div>
  );
};