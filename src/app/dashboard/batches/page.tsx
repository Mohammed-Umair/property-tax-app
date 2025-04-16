
import { BatchCalendar } from "@/components/BatchCalendar";
import { Toaster } from "@/components/ui/sonner";

export default function Batches() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Batches</h1>
      <BatchCalendar />
      <Toaster />
    </div>
  );
}