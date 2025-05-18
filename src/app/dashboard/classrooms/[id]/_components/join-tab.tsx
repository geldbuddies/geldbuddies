import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Temporary mock data for members
const mockMembers = [
  { id: 1, name: 'John Doe', avatar: null },
  { id: 2, name: 'Jane Smith', avatar: null },
  { id: 3, name: 'Bob Johnson', avatar: null },
  { id: 4, name: 'Alice Brown', avatar: null },
];

function MemberList() {
  return (
    <ScrollArea className="h-[300px] rounded-md border p-4">
      <div className="space-y-4">
        {mockMembers.map((member) => (
          <div key={member.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.avatar || undefined} />
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{member.name}</p>
              <p className="text-sm text-muted-foreground">Joined just now</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function JoinTab() {
  // For now, we'll use a random 6-letter code
  const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Join Code</CardTitle>
          <CardDescription>
            Share this code with your students so they can join your classroom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Badge variant="outline" className="text-6xl tracking-widest font-mono px-4 flex py-2">
              {joinCode.slice(0, 3)}—{joinCode.slice(3)}
            </Badge>
            <p className="text-sm text-muted-foreground">This code will expire in 24 hours</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>{mockMembers.length} students have joined</CardDescription>
        </CardHeader>
        <CardContent>
          <MemberList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>How to join the classroom</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to geldbuddies.com/join</li>
            <li>Enter the code shown above</li>
            <li>Enter your name</li>
            <li>Click Join Classroom</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
