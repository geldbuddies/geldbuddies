import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function TeacherDashboardClassesSection() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Actieve Klassen</h2>
        <Button asChild variant="outline">
          <Link href="/teacher-dashboard/new-class">Nieuwe Klas Aanmaken</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Klas 4A Economie</CardTitle>
            <CardDescription>Code: ABC123</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>15 studenten actief</p>
              <p>Gestart: 10 minuten geleden</p>
              <Button className="w-full">Beheren</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Klas 5B Finance</CardTitle>
            <CardDescription>Code: XYZ789</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>12 studenten actief</p>
              <p>Gestart: 25 minuten geleden</p>
              <Button className="w-full">Beheren</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
