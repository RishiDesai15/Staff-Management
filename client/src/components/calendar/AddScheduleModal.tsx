import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    staffMember: string;
    date: string;
    time: string;
  };
}

export function AddScheduleModal({ open, onOpenChange, data }: AddScheduleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Staff Member
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full ${
                  data.staffMember === "Pharmacist 1" ? "bg-[#F0F9FF]" : 
                  data.staffMember === "Pharmacist 2" ? "bg-[#ECFDF3]" : 
                  data.staffMember === "Technician 1" ? "bg-orange-100" :
                  data.staffMember === "Assistant 1" ? "bg-yellow-100" :
                  data.staffMember === "Assistant 2" ? "bg-pink-100" :
                  "bg-gray-200"
                }`}></div>
                <span className="text-base">{data.staffMember}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Date
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-2">
                <span className="text-base">{data.date}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Time
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Start</span>
                    <Input type="time" defaultValue="09:00" className="w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">End</span>
                    <Input type="time" defaultValue="17:00" className="w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Recurrence
            </label>
            <div className="mt-2 px-3">
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="none">Does not repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}