// app/actions/history/insert/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/src/utils/supabase/server';

export async function POST(request: Request) {
  // const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const gallonsRequested = formData.get('gallonsRequested') || '';
  const deliveryAddress = formData.get('deliveryAddress') || '';
  const deliveryDate = formData.get('deliveryDate') || '';
  const suggestedPrice = formData.get('suggestedPrice') || '';
  const totalAmountDue = formData.get('totalAmountDue') || '';
  const requestDate = new Date().toISOString().slice(0, 10);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const historyId = await supabase.from('user').select('history_id').eq('user_id', userId);

  if (historyId.error) {
    return NextResponse.json({ error: historyId.error }, { status: 401 });
  }

  const insertHistory = await supabase.from('history').insert({
    history_id: historyId['data'][0]['history_id'],
    request_date: requestDate,
    gallons_requested: gallonsRequested,
    suggested_price: suggestedPrice,
    amount_due: totalAmountDue,
    delivery_address: deliveryAddress,
    delivery_date: deliveryDate,
  });

  if (insertHistory.error) {
    return NextResponse.json({ error: insertHistory.error }, { status: 401 });
  } else {
    return NextResponse.json({ status: 200 });
  }
}
