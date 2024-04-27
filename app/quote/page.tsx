// app/quote/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { HeaderTabs } from '@/components/Navbar/HeaderTabs';
import { Text, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { calculateTotalAmount } from '../../src/utils/businessLogic/pricingModule';
import { useRouter } from 'next/navigation';

export default function QuotePage() {
  const router = useRouter();
  const [gallonsRequested, setGallonsRequested] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>(new Date().toISOString());
  const [suggestedPrice, setSuggestedPrice] = useState<string>('');
  const [totalAmountDue, setTotalAmountDue] = useState<string>('');
  const [quoteGenerated, setQuoteGenerated] = useState<boolean>(false);
  const addressRegex = /^\d+\s[a-zA-Z\s]+,\s[a-zA-Z\s]+,\s[A-Z]{2}\s\d{5}$/;

  const validateAddress = (address: string): boolean => {
    return addressRegex.test(address);
  };

  const handleGetQuote = async () => {
    if (!gallonsRequested) {
      notifications.show({
        title: 'Missing Amount',
        message: 'Please specify the gallons requested.',
        color: 'red',
      });
      return;
    }
    if (!deliveryDate) {
      notifications.show({
        title: 'Missing Delivery Date',
        message: 'Please specify the delivery date.',
        color: 'red',
      });
      return;
    }
    if (!validateAddress(deliveryAddress)) {
      notifications.show({
        title: 'Invalid Address',
        message: 'Please enter a valid address.',
        color: 'red',
      });
      return;
    }

    try {
      const isTexas = /,\sTX\s\d{5}$/.test(deliveryAddress); // Check if the address is in Texas
      const totalAmountData = await calculateTotalAmount(parseInt(gallonsRequested), isTexas);
      setSuggestedPrice(totalAmountData.suggestedPrice);
      setTotalAmountDue(totalAmountData.totalAmount);
      setQuoteGenerated(true);

      notifications.show({
        title: 'Quote Calculated!',
        message: `Your quote is on screen.`,
        color: 'green',
      });
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({
          title: 'Error',
          message: `Failed to process the request: ${error.message}`,
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Error',
          message: 'An unknown error occurred during the processing of your request.',
          color: 'red',
        });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!gallonsRequested) {
      notifications.show({
        title: 'Error',
        message: 'Please specify the number of gallons.',
        color: 'red',
      });
      return;
    }
    if (!deliveryDate) {
      notifications.show({
        title: 'Error',
        message: 'Please specify the delivery date.',
        color: 'red',
      });
      return;
    }
    if (!validateAddress(deliveryAddress)) {
      notifications.show({
        title: 'Invalid Address',
        message: 'Please enter a valid address.',
        color: 'red',
      });
      return; // Stop the form submission if the address is invalid
    }

    const formData = new URLSearchParams();
    formData.append('gallonsRequested', gallonsRequested);
    formData.append('deliveryAddress', deliveryAddress);
    formData.append('deliveryDate', deliveryDate);
    formData.append('suggestedPrice', suggestedPrice);
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

      router.push('/history');
    } else {
      const errorMsg = await response.json();
      notifications.show({
        title: 'Error',
        message: errorMsg.error.message || 'An unknown error occurred',
        color: 'red',
      });
    }
  };

  const getCurrentDate = (): string => {
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
          placeholder="45 Park Place, New York, NY 10007"
          required
          setState={setDeliveryAddress}
        />
        <FloatingLabelInput
          label="Delivery Date"
          placeholder=""
          type="date"
          required
          initialValue={getCurrentDate()}
          setState={setDeliveryDate}
        />
        <Group style={{ margin: '10px 0', flexDirection: 'column' }}>
          <Text size="sm" style={{ marginBottom: 5, fontWeight: 500 }}>
            Suggested Price per Gallon:{' '}
            <span style={{ fontWeight: 'bold' }}>${suggestedPrice}</span>
          </Text>
          <Text size="sm" style={{ fontWeight: 500 }}>
            Total Amount Due: <span style={{ fontWeight: 'bold' }}>${totalAmountDue}</span>
          </Text>
        </Group>
        <Button onClick={handleGetQuote}>Get Quote</Button>
        <Button onClick={handleSubmit} disabled={!quoteGenerated}>
          Request
        </Button>
      </Form>
    </>
  );
}
