import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TeacherDashboardStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Actieve Klassen</CardTitle>
          <CardDescription>Momenteel actieve sessies</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">3</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Totaal Studenten</CardTitle>
          <CardDescription>In actieve klassen</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">45</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Afgeronde Sessies</CardTitle>
          <CardDescription>Deze maand</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">12</p>
        </CardContent>
      </Card>
    </div>
  );
}
