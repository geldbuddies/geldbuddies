import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TeacherDashboardHistorySection() {
  return (
    <div className="text-center">
      <Button asChild variant="outline">
        <Link href="/class-history">Bekijk Klassengeschiedenis</Link>
      </Button>
    </div>
  );
}
