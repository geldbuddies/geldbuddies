import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

type AudienceCardProps = {
  title: string;
  description: string;
};

function AudienceCard({ title, description }: AudienceCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const AUDIENCES = [
  {
    title: 'Scholieren (16-18 jaar)',
    description:
      'Focus op basiskennis over budgetteren, sparen en eerste financiële verantwoordelijkheden.',
  },
  {
    title: 'Studenten (18-25 jaar)',
    description:
      'Aandacht voor studiefinanciering, op kamers wonen, en het voorkomen van studieschulden.',
  },
  {
    title: 'Docenten',
    description:
      'Tools om financiële educatie in de klas te integreren en de voortgang van leerlingen te monitoren.',
  },
];

export function TargetAudienceSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Voor Wie is GeldBuddies?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AUDIENCES.map((audience, index) => (
          <AudienceCard key={index} title={audience.title} description={audience.description} />
        ))}
      </div>
    </section>
  );
}
