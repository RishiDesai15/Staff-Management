import { useState } from "react";
import { STAFF_LIST } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StaffModal } from "./StaffModal";

interface StaffListProps {
  view: "overview" | "week" | "month" | "staff";
  onViewChange: (value: "overview" | "week" | "month" | "staff") => void;
}

export function StaffList({ view, onViewChange }: StaffListProps) {
  const [selectedStaff, setSelectedStaff] = useState<{
    name: string;
    pronunciation: string;
    phone: string;
    email: string;
  } | null>(null);

  const handleStaffClick = (staff: typeof STAFF_LIST[0]) => {
    if (view !== "staff") {
      setSelectedStaff({
        name: staff.role,
        pronunciation: staff.role === "Pharmacist1" ? "Farm-a-sis-t won" : "",
        phone: staff.role === "Pharmacist1" ? "905-867-5309" : "",
        email: staff.role === "Pharmacist1" ? "p1@medmehealth.com" : "",
      });
    }
  };

  return (
    <div className="w-[200px] border-r bg-white">
      <div className="h-[52px] border-b flex items-center justify-center px-4">
        <Select
          defaultValue={view}
          onValueChange={onViewChange}
        >
          <SelectTrigger className={cn("w-full h-9")}>
            <SelectValue>{view === "overview" ? "Overview" : `${view.charAt(0).toUpperCase() + view.slice(1)} View`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
            <SelectItem value="staff">Staff View</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {STAFF_LIST.map((staff) => (
        <div 
          key={staff.id}
          className="flex items-center gap-3 px-4 py-6 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
          onClick={() => handleStaffClick(staff)}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className={staff.color}></AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{staff.role}</span>
        </div>
      ))}
      {selectedStaff && (
        <StaffModal
          open={!!selectedStaff}
          onOpenChange={(open) => !open && setSelectedStaff(null)}
          staff={selectedStaff}
        />
      )}
    </div>
  );
}
