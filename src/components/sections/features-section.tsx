import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityIcon, GamepadIcon, LineChart } from "lucide-react";
import clsx from "clsx";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  iconBgColor: string;
};

function FeatureCard({
  title,
  description,
  icon,
  borderColor,
  iconBgColor,
}: FeatureCardProps) {
  return (
    <Card
      className={clsx(
        "h-full min-h-[320px] rounded-xl bg-white shadow-md text-left border-t-4",
        borderColor
      )}
    >
      <CardHeader className="items-start">
        <div className={clsx("p-3 rounded-full mb-4", iconBgColor)}>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

const FEATURES = [
  {
    title: "Leer door te doen",
    description:
      "Maak financiële beslissingen in een veilige omgeving en zie direct de gevolgen.",
    icon: <GamepadIcon className="h-6 w-6 text-blue-600" />,
    borderColor: "border-blue-500",
    iconBgColor: "bg-blue-100",
  },
  {
    title: "Spaar en investeer",
    description:
      "Leer hoe je geld kunt laten groeien door slim te sparen en te investeren.",
    icon: <LineChart className="h-6 w-6 text-green-600" />,
    borderColor: "border-green-500",
    iconBgColor: "bg-green-100",
  },
  {
    title: "Feedback",
    description:
      "Krijg tips en feedback die aansluiten bij jouw financiële leerdoelen.",
    icon: <ActivityIcon className="h-6 w-6 text-purple-600" />,
    borderColor: "border-purple-500",
    iconBgColor: "bg-purple-100",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Waarom Geldbuddies?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Onze innovatieve aanpak maakt financiële educatie toegankelijk en
            leuk voor jongeren.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              borderColor={feature.borderColor}
              iconBgColor={feature.iconBgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
