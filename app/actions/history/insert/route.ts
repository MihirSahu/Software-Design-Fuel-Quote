import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const gallonsRequested = String(formData.get('gallonsRequested'));
  const deliveryAddress = String(formData.get('deliveryAddress'));
  const deliveryDate = String(formData.get('deliveryDate'));
  const pricePerGallon = String(formData.get('pricePerGallon'));
  const totalAmountDue = String(formData.get('totalAmountDue'));
  const requestDate = new Date().toISOString();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const historyId = await supabase.from('user').select('history_id').eq('user_id', userId);

  if (historyId.error) {
    return NextResponse.json({ error: historyId.error }, { status: 401 });
  }

  const insertHistory = await supabase
    .from('history')
    .insert({
      history_id: historyId['data'][0]['history_id'],
      gallons_requested: gallonsRequested,
      delivery_address: deliveryAddress,
      delivery_date: deliveryDate,
      price: pricePerGallon,
      amount_due: totalAmountDue,
      request_date: requestDate,
    });

  if (insertHistory.error) {
    return NextResponse.json({ error: insertHistory.error }, { status: 401 });
  } else {
    return NextResponse.json({ status: 200 });
  }
}
