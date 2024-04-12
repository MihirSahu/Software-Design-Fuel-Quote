'use client';

import { Form } from '../../components/Form';
import { QuoteTable } from '../../components/QuoteTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { HeaderTabs } from '@/components/Navbar/HeaderTabs';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function HistoryPage() {
  /*
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }
  */
  const [history, setHistory] = useState('{}');

  useEffect(() => {
    const fetchHistory = async () => {
      const formData = new URLSearchParams();
      formData.append('offset', '0');
      formData.append('numImages', '10');

      const response = await fetch('/actions/history/read', {
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

      const tempHistory = await response.json();
      setHistory(tempHistory['data'][0]);
      // console.log(tempHistory['data'][0]['history'])
    };
    fetchHistory();
  }, []);

  return (
    <>
      <HeaderTabs />
      <Form title="Fuel Quote History" width="80vw" top="20vh">
        {history === '{}' ? 'Loading...' : <QuoteTable history={history['history']} />}
      </Form>
    </>
  );
}
