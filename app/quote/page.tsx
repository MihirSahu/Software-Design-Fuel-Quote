'use client';

import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { HeaderTabs } from '@/components/Navbar/HeaderTabs';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuotePage() {
  /*
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }
  */
  const { push } = useRouter();
  const [gallonsRequested, setGallonsRequested] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>(new Date().toISOString());
  const [pricePerGallon, setPricePerGallon] = useState<string>('');
  const [totalAmountDue, setTotalAmountDue] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('gallonsRequested', gallonsRequested);
    formData.append('deliveryAddress', deliveryAddress);
    formData.append('deliveryDate', deliveryDate);
    formData.append('pricePerGallon', pricePerGallon);
    formData.append('totalAmountDue', totalAmountDue);

    const response = await fetch('/actions/history/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Quote requested!',
        color: 'teal',
      });
      // push('/quote')
    } else {
      const error = await response.json();
      notifications.show({
        title: 'Error',
        message: error['error'],
        color: 'red',
      });
    }
  };

  const getCurrentDate = () => {
    const timestamp = new Date().toISOString();
    return timestamp.substring(0, timestamp.lastIndexOf(':'));
  };

  return (
    <>
      <HeaderTabs />
      <Form title="Fuel Quote" top="20vh">
        <FloatingLabelInput
          label="Gallons Requested"
          placeholder="15"
          type="number"
          required
          setState={setGallonsRequested}
        />
        <FloatingLabelInput
          label="Delivery Address"
          placeholder="1234 Main Street"
          required
          setState={setDeliveryAddress}
        />
        <FloatingLabelInput
          label="Delivery Date"
          placeholder=""
          type="datetime-local"
          required
          initialValue={getCurrentDate()}
          setState={setDeliveryDate}
        />
        <FloatingLabelInput
          label="Price / Gallon"
          placeholder=""
          type="number"
          setState={setPricePerGallon}
        />
        <FloatingLabelInput
          label="Total Amount Due"
          placeholder=""
          type="number"
          setState={setTotalAmountDue}
        />
        <Button onClick={handleSubmit}>Request</Button>
      </Form>
    </>
  );
}
