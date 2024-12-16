import { cn } from "@/lib/utils";

interface TimeSlotProps {
  time: string;
  color: string;
  className?: string;
  staff?: string;
  onClick?: () => void;
}

export function TimeSlot({ time, color, className, staff, onClick }: TimeSlotProps) {
  return (
    <div 
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium inline-block shadow-sm cursor-pointer",
        color,
        className
      )}
      onClick={onClick}
    >
      {time}
    </div>
  );
}