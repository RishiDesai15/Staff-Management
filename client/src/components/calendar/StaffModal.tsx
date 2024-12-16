import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";

interface StaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: {
    name: string;
    pronunciation: string;
    phone: string;
    email: string;
  };
}

export function StaffModal({ open, onOpenChange, staff }: StaffModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-10 w-10 rounded-full ${staff.name === "Assistant2" ? "bg-pink-100" : staff.name === "Technician" ? "bg-orange-100" : staff.name === "Assistant1" ? "bg-yellow-100" : staff.name === "Pharmacist2" ? "bg-[#ECFDF3]" : "bg-[#F0F9FF]"}`}></div>
              <DialogTitle className="text-xl">{staff.name}</DialogTitle>
            </div>
            <Settings2 className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="text-sm font-medium">Pronunciation:</div>
            <div className="text-sm text-gray-700">{staff.pronunciation}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="text-sm font-medium">Phone:</div>
            <div className="text-sm text-gray-700">{staff.phone}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="text-sm font-medium">Email:</div>
            <div className="text-sm text-gray-700">{staff.email}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
