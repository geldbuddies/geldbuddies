import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

type ApproachCardProps = {
  number: number;
  title: string;
  description: string;
};

function ApproachCard({ number, title, description }: ApproachCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-primary dark:text-primary">
          {number}
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const APPROACHES = [
  {
    number: 1,
    title: 'Educatief',
    description:
      'We combineren financiële theorie met praktische toepassingen, zodat jongeren niet alleen weten wat ze moeten doen, maar ook waarom.',
  },
  {
    number: 2,
    title: 'Interactief',
    description:
      'Door actieve participatie en directe feedback leren gebruikers sneller en onthouden ze de lesstof beter.',
  },
  {
    number: 3,
    title: 'Motiverend',
    description:
      'Met achievements, levels en uitdagingen houden we gebruikers gemotiveerd om te blijven leren en groeien.',
  },
];

export function ApproachSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Onze Aanpak</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {APPROACHES.map((approach, index) => (
          <ApproachCard
            key={index}
            number={approach.number}
            title={approach.title}
            description={approach.description}
          />
        ))}
      </div>
    </section>
  );
}
