import { AboutCTASection } from '@/components/sections/about-cta-section';
import { ApproachSection } from '@/components/sections/approach-section';
import { MissionSection } from '@/components/sections/mission-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { TargetAudienceSection } from '@/components/sections/target-audience-section';
import { TeamSection } from '@/components/sections/team-section';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Over GeldBuddies</h1>
      <MissionSection />
      <ProblemSolutionSection />
      <ApproachSection />
      <TargetAudienceSection />
      <TeamSection />
      <AboutCTASection />
    </div>
  );
}
