import { ClassroomCodeEntry } from '@/components/classroom/code-entry';

export const metadata = {
  title: 'Join Classroom - GeldBuddies',
  description: 'Join a classroom using a code to start learning about financial literacy.',
};

export default function JoinPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Join a Classroom</h1>
        <ClassroomCodeEntry />
      </div>
    </div>
  );
} 