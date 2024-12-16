import { Flame } from "lucide-react";

interface FireballSortProps {
  isFireballSortActive: boolean;
  onToggleFireballSort: () => void;
}

export const FireballSort = ({ isFireballSortActive, onToggleFireballSort }: FireballSortProps) => {
  return (
    <Flame 
      className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
        isFireballSortActive ? 'text-orange-500' : 'text-[#0EA5E9]'
      } hover:text-orange-400`}
      onClick={onToggleFireballSort}
    />
  );
};