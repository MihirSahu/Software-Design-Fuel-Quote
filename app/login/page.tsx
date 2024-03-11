import Link from 'next/link';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

export default function LoginPage() {
  return (
    <>
      <Form title="Login">
        <FloatingLabelInput label="Username" placeholder="new_user_1" required />
        <FloatingLabelInput label="Password" placeholder="********" required type="password" />
        <div>
          New user? <Link href="/register">Register here!</Link>
        </div>
        <Button>Submit</Button>
      </Form>
    </>
  );
}
