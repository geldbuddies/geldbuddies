import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JoinTab } from './join-tab';
import { SettingsTab } from './settings-tab';
import { StudentsTab } from './students-tab';

export function ClassroomTabs() {
  return (
    <Tabs defaultValue="join" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="join">Join</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="join">
        <JoinTab />
      </TabsContent>

      <TabsContent value="students">
        <StudentsTab />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}
