import { NextResponse } from 'next/server';
import { createClient } from '@/src/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // Log the userId to debug and track the flow
  // console.log('Retrieved User ID:', userId);

  const { data, error } = await supabase
    .from('user')
    .select(
      `
      history (
        gallons_requested, delivery_address, delivery_date, amount_due, request_date
      )
    `
    )
    .eq('user_id', userId);

  // Log the query results for debugging
  if (error) {
    // console.log('Error fetching user history:', error.message);
    return NextResponse.json({ hasHistory: false }, { status: 200 });
  }

  // Log the output of history check
  // console.log('History data retrieved:', data);
  const hasHistory = data.length > 0;
  // console.log('Has history:', hasHistory);

  return NextResponse.json({ hasHistory }, { status: 200 });
}
