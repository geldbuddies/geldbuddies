'use client';

import { useState } from 'react';
import { EmailForm } from './email-form';
import { OTPForm } from './otp-form';

export function EmailOTPForm() {
  const [email, setEmail] = useState<string | null>(null);

  if (email) {
    return <OTPForm email={email} />;
  }

  return <EmailForm onEmailSent={setEmail} />;
}
