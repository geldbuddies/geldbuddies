import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your classroom settings</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Settings will be displayed here</p>
      </CardContent>
    </Card>
  );
}
