'use client';

import { JoinForm } from './_components/join-form';

export default function JoinPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Join a Classroom</h1>
          <p className="text-sm text-muted-foreground">Enter the code provided by your teacher</p>
        </div>
        <JoinForm />
      </div>
    </div>
  );
}
