'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notifications.show({
        title: 'Error',
        message: 'Please enter a valid email address.',
        color: 'red',
      });
      return; // Stop form submission process
    }

    // Check if the password length is less than 6 characters
    if (password.length < 6) {
      notifications.show({
        title: 'Error',
        message: 'Password must be at least 6 characters long.',
        color: 'red',
      });
      return; // Stop the form submission process
    }

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('/auth/signup', {
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
      <Form title="Register">
        <FloatingLabelInput label="Email" placeholder="new_user_1" required setState={setEmail} />
        <FloatingLabelInput
          label="Password"
          placeholder="********"
          required
          type="password"
          setState={setPassword}
        />
        <div>
          Previous user? <Link href="/login">Login here!</Link>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
