import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="grid place-items-center min-h-[70svh]">
      <Loader2 className="animate-spin" />
    </div>
  );
}
