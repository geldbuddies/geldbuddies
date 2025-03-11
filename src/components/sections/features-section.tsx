import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityIcon, GamepadIcon, LineChart } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const FEATURES = [
  {
    title: 'Interactieve Game',
    description:
      'Leer financiële concepten door middel van een leuke en interactieve game-ervaring.',
    icon: <GamepadIcon className="h-6 w-6" />,
  },
  {
    title: 'Praktische Kennis',
    description: 'Leer vaardigheden die direct toepasbaar zijn in je dagelijks leven.',
    icon: <ActivityIcon className="h-6 w-6" />,
  },
  {
    title: 'Persoonlijke Voortgang',
    description: 'Volg je eigen voortgang en zie hoe je financiële kennis groeit.',
    icon: <LineChart className="h-6 w-6" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Waarom GeldBuddies?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Onze innovatieve aanpak maakt financiële educatie toegankelijk en leuk voor jongeren.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
