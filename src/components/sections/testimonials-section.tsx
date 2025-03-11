import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Quote } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
};

function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <Quote className="text-primary mb-4 h-6 w-6" />
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{quote}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </CardFooter>
    </Card>
  );
}

const TESTIMONIALS = [
  {
    quote:
      'Dankzij GeldBuddies heb ik geleerd hoe ik mijn geld beter kan beheren. De game maakt het echt leuk om te leren!',
    author: 'Emma de Vries',
    role: 'Student, 16 jaar',
  },
  {
    quote:
      'Als docent zie ik hoe GeldBuddies mijn leerlingen helpt om financiële concepten beter te begrijpen. Een geweldig leermiddel!',
    author: 'Mark Jansen',
    role: 'Docent Economie',
  },
  {
    quote:
      'Mijn zoon is veel bewuster met geld omgegaan sinds hij GeldBuddies gebruikt. Ik ben erg onder de indruk!',
    author: 'Linda Bakker',
    role: 'Ouder',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Wat Anderen Zeggen</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ontdek hoe GeldBuddies al veel jongeren heeft geholpen met hun financiële educatie.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
