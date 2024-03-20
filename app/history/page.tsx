import { Form } from '../../components/Form';
import { QuoteTable } from '../../components/QuoteTable';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function HistoryPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <>
      <Form title="Fuel Quote History" width="80vw" top="20vh">
        <QuoteTable />
      </Form>
    </>
  );
}
