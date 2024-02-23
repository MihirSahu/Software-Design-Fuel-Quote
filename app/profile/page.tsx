import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { FloatingLabelSelect } from '../../components/FloatingLabelSelect';

export default function ProfilePage() {
  const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ].map((state) => ({ label: state, value: state }));

  return (
    <>
      <Form title="Profile" top="20vh">
        <FloatingLabelInput label="Full Name" placeholder="John Doe" required maxLength={50} />
        <FloatingLabelInput
          label="Address Line 1"
          placeholder="1234 Main Street"
          required
          maxLength={100}
        />
        <FloatingLabelInput label="Address Line 2" placeholder="Apt 5" maxLength={100} />
        <FloatingLabelInput label="City" placeholder="New York City" maxLength={100} required />
        <FloatingLabelSelect
          label="State"
          placeholder="NY"
          initialValue="NY"
          data={states}
          required
        />
        <FloatingLabelInput
          label="Zip Code"
          placeholder="12345"
          maxLength={9}
          minLength={5}
          required
          number
        />
        <Button>Save</Button>
      </Form>
    </>
  );
}
