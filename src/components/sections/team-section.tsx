import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

type TeamMemberProps = {
  name: string;
  role: string;
  description: string;
};

function TeamMember({ name, role, description }: TeamMemberProps) {
  return (
    <Card className="p-0 text-center">
      <CardContent className="p-6">
        <div className="w-24 h-24 bg-muted dark:bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-muted-foreground dark:text-muted-foreground text-xl">Foto</span>
        </div>
        <CardTitle className="text-xl mb-1">{name}</CardTitle>
        <p className="text-muted-foreground dark:text-muted-foreground mb-3">{role}</p>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

// Placeholder team members - replace with actual team members
const TEAM_MEMBERS = [
  {
    name: 'Teamlid 1',
    role: 'Functie',
    description:
      'Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies project.',
  },
  {
    name: 'Teamlid 2',
    role: 'Functie',
    description:
      'Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies project.',
  },
  {
    name: 'Teamlid 3',
    role: 'Functie',
    description:
      'Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies project.',
  },
  {
    name: 'Teamlid 4',
    role: 'Functie',
    description:
      'Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies project.',
  },
];

export function TeamSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Ons Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
          />
        ))}
      </div>
    </section>
  );
}
