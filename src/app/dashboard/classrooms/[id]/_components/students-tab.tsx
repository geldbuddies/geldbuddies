import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function StudentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>View and manage your classroom students</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Student list will be displayed here</p>
      </CardContent>
    </Card>
  );
}
