'use client';

import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { FloatingLabelSelect } from '../../components/FloatingLabelSelect';
import { createClient } from '@/src/utils/supabase/client';
import { redirect } from 'next/navigation';
import { HeaderTabs } from '@/components/Navbar/HeaderTabs';
import { notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import { stat } from 'fs';

export default function ProfilePage() {
  /*
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }
  */

  const [fullName, setFullName] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('NY');
  const [zipCode, setZipCode] = useState<string>('');

  useEffect(() => {
    const fetchHistory = async () => {
      const formData = new URLSearchParams();
      formData.append('offset', '0');
      formData.append('numImages', '10');

      const response = await fetch('/actions/profile/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (response.status !== 200) {
        notifications.show({
          title: 'Something went wrong',
          message: 'History could not be fetched',
          color: 'red',
          closeButtonProps: { display: 'none' },
        });
      }

      const parsedResponse = await response.json();
      // console.log(parsedResponse['data'][0])

      setFullName(parsedResponse['data'][0]['name']);
      setAddressLine1(parsedResponse['data'][0]['address_line_1']);
      setAddressLine2(parsedResponse['data'][0]['address_line_2']);
      setCity(parsedResponse['data'][0]['city']);
      setState(parsedResponse['data'][0]['state']);
      setZipCode(parsedResponse['data'][0]['zip_code']);

      //console.log(fullName, addressLine1, addressLine2, city, state, zipCode)
    };
    fetchHistory();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('fullName', fullName);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zipCode', zipCode);

    const response = await fetch('/actions/profile/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Profile updated!',
        color: 'teal',
      });
    } else {
      const error = await response.json();
      notifications.show({
        title: 'Error',
        message: error['error'],
        color: 'red',
      });
    }
  };

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
      <HeaderTabs />
      <Form title="Profile" top="20vh">
        <FloatingLabelInput
          label="Full Name"
          placeholder="John Doe"
          required
          maxLength={50}
          initialValue={fullName}
          setState={setFullName}
        />
        <FloatingLabelInput
          label="Address Line 1"
          placeholder="1234 Main Street"
          required
          maxLength={100}
          setState={setAddressLine1}
          initialValue={addressLine1}
        />
        <FloatingLabelInput
          label="Address Line 2"
          placeholder="Apt 5"
          maxLength={100}
          setState={setAddressLine2}
          initialValue={addressLine2}
        />
        <FloatingLabelInput
          label="City"
          placeholder="New York City"
          maxLength={100}
          required
          setState={setCity}
          initialValue={city}
        />
        <FloatingLabelSelect
          label="State"
          placeholder="NY"
          initialValue="NY"
          data={states}
          required
          setState={setState}
        />
        <FloatingLabelInput
          label="Zip Code"
          placeholder="12345"
          maxLength={9}
          minLength={5}
          required
          number
          setState={setZipCode}
          initialValue={zipCode}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </Form>
    </>
  );
}
