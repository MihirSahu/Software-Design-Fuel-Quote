import Link from 'next/link';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

export default function RegisterPage() {
  return (
    <>
      <Form title="Register">
        <FloatingLabelInput label="Username" placeholder="new_user_1" required />
        <FloatingLabelInput label="Password" placeholder="********" required type="password" />
        <div>
          Returning user? <Link href="/login">Login here!</Link>
        </div>
        <Button>Submit</Button>
      </Form>
    </>
  );
}
