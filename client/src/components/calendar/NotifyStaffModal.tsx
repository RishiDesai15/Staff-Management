
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { STAFF_LIST } from "@/lib/types";

interface NotifyStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotifyStaffModal({ open, onOpenChange }: NotifyStaffModalProps) {
  const [method, setMethod] = useState("SMS");
  const [selectedStaff, setSelectedStaff] = useState<string[]>(STAFF_LIST.map(s => s.role));

  const toggleStaffSelection = (staffRole: string) => {
    if (selectedStaff.includes(staffRole)) {
      setSelectedStaff(prev => prev.filter(role => role !== staffRole));
    } else {
      setSelectedStaff(prev => [...prev, staffRole]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg mb-6">
            Do you want to notify staff about the upcoming weekly schedule?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <div className="rounded-full bg-gray-200 px-6 py-2">Method</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full bg-gray-200 px-6 py-2">
                {method}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setMethod("SMS")}>SMS</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMethod("Email")}>Email</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <div className="rounded-full bg-gray-200 px-6 py-2">Staff</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full bg-gray-200 px-6 py-2">
                {selectedStaff.length === STAFF_LIST.length ? "Everyone" : `${selectedStaff.length} Selected`}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedStaff(STAFF_LIST.map(s => s.role))}>
                  Everyone
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStaff([])}>
                  None
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            {STAFF_LIST.map((staff) => (
              <div
                key={staff.role}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                  staff.color.replace('text-', 'bg-').replace('hover:', '')
                }`}
                onClick={() => toggleStaffSelection(staff.role)}
              >
                <div className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded bg-white">
                  {selectedStaff.includes(staff.role) && <Check className="h-4 w-4" />}
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <span>{staff.name}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
