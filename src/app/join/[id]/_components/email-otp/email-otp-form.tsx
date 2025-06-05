'use client';

import { useState } from 'react';
import { EmailForm } from './email-form';
import { OTPForm } from './otp-form';

interface EmailOTPFormProps {
  organizationId: string;
}

export function EmailOTPForm({ organizationId }: EmailOTPFormProps) {
  const [email, setEmail] = useState<string | null>(null);

  if (email) {
    return <OTPForm email={email} organizationId={organizationId} />;
  }

  return <EmailForm onEmailSent={setEmail} />;
}
