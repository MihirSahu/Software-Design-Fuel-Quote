import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

export default function QuotePage() {
  const getCurrentDate = () => {
    const timestamp = new Date().toISOString();
    return timestamp.substring(0, timestamp.lastIndexOf(':'));
  };

  return (
    <>
      <Form title="Fuel Quote" top="20vh">
        <FloatingLabelInput label="Gallons Requested" placeholder="15" type="number" required />
        <FloatingLabelInput
          label="Delivery Address"
          placeholder="1234 Main Street"
          required
          disabled
        />
        <FloatingLabelInput
          label="Delivery Date"
          placeholder=""
          type="datetime-local"
          required
          initialValue={getCurrentDate()}
        />
        <FloatingLabelInput label="Price / Gallon" placeholder="" type="number" disabled />
        <FloatingLabelInput label="Total Amount Due" placeholder="" type="number" disabled />
        <Button>Request</Button>
      </Form>
    </>
  );
}
