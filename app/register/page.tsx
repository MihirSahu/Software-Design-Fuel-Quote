'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    console.log(email);
    console.log(password);

    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    if (response.status === 200) {
      console.log('Success')
    }
    else {
      console.log('Error')
    }
  };

  return (
    <>
      <Form title="Register">
        <FloatingLabelInput label="Email" placeholder="new_user_1" required setState={setEmail} />
        <FloatingLabelInput label="Password" placeholder="********" required type="password" setState={setPassword} />
        <div>
          New user? <Link href="/login">Login here!</Link>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
