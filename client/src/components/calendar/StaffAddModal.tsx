import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const staffFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pronunciation: z.string(),
  pronouns: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address").optional(),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StaffAddModal({ open, onOpenChange }: StaffAddModalProps) {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      pronunciation: "",
      pronouns: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (data: StaffFormValues) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <Input 
                placeholder="Staff Member Name" 
                className="flex-1 border-none focus:ring-0 text-lg font-medium"
                {...form.register("name")}
              />
            </div>
          </div>
          <Settings2 className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center">
              <span className="text-sm font-medium">Pronunciation:</span>
              <div className="col-span-3">
                <Input {...form.register("pronunciation")} className="bg-[#F0F9FF] border-none" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="text-sm font-medium">Pronouns:</span>
              <div className="col-span-3">
                <Input {...form.register("pronouns")} className="bg-[#F0F9FF] border-none" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="text-sm font-medium">Phone:</span>
              <div className="col-span-3">
                <Input type="tel" {...form.register("phone")} className="bg-[#F0F9FF] border-none" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="text-sm font-medium">Email:</span>
              <div className="col-span-3">
                <Input type="email" {...form.register("email")} className="bg-[#F0F9FF] border-none" />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
