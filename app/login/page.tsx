// app/login/page.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'You have been logged in!',
        color: 'teal',
      });
      push('/quote');
    } else {
      const error = await response.json();
      notifications.show({
        title: 'Error',
        message: error['error'],
        color: 'red',
      });
    }
  };

  return (
    <>
      <Form title="Login">
        <FloatingLabelInput label="Email" placeholder="new_user_1" required setState={setEmail} />
        <FloatingLabelInput
          label="Password"
          placeholder="********"
          required
          type="password"
          setState={setPassword}
        />
        <div>
          New user? <Link href="/register">Register here!</Link>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
