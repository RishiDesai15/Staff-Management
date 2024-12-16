import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock } from "lucide-react";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    staffMember: string;
    task: string;
    time: string;
    details?: string;
  };
}

export function TaskModal({ open, onOpenChange, data }: TaskModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Schedule Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Staff Member
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full ${
                  data.staffMember === "Pharmacist 1" ? "bg-sky-100 border-2 border-sky-600" :
                  data.staffMember === "Pharmacist 2" ? "bg-green-100 border-2 border-green-600" :
                  data.staffMember === "Technician 1" ? "bg-orange-100 border-2 border-orange-600" :
                  data.staffMember === "Assistant 1" ? "bg-yellow-100 border-2 border-yellow-600" :
                  data.staffMember === "Assistant 2" ? "bg-pink-100 border-2 border-pink-600" :
                  "bg-gray-100 border-2 border-gray-600"
                }`}></div>
                <span className={`text-base font-medium ${
                  data.staffMember === "Pharmacist 1" ? "text-sky-600" :
                  data.staffMember === "Pharmacist 2" ? "text-green-600" :
                  data.staffMember === "Technician 1" ? "text-orange-600" :
                  data.staffMember === "Assistant 1" ? "text-yellow-600" :
                  data.staffMember === "Assistant 2" ? "text-pink-600" :
                  "text-gray-600"
                }`}>{data.staffMember}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Task
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-2">
                <span className="text-base">{data.task}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Time
            </label>
            <div className="mt-2 px-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-base">{data.time}</span>
              </div>
            </div>
          </div>
          {data.details && (
            <div>
              <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
                Details
              </label>
              <div className="mt-2 px-3">
                <p className="text-base text-gray-600">{data.details}</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            className="inline-flex items-center justify-center rounded-md w-8 h-8 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => console.log("Edit clicked")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              <path d="m15 5 4 4"/>
            </svg>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
