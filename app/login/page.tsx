'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    console.log(email);
    console.log(password);

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    if (response.status === 200) {
      push('/private')
    }
    else {
      console.log('Error')
    }
  };

  return (
    <>
      <Form title="Login">
        <FloatingLabelInput label="Email" placeholder="new_user_1" required setState={setEmail} />
        <FloatingLabelInput label="Password" placeholder="********" required type="password" setState={setPassword} />
        <div>
          New user? <Link href="/register">Register here!</Link>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
