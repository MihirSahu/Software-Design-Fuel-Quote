import { NextResponse } from 'next/server';
import { createClient } from '@/src/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const fullName = String(formData.get('fullName'));
  const addressLine1 = String(formData.get('addressLine1'));
  const addressLine2 = String(formData.get('addressLine2'));
  const city = String(formData.get('city'));
  const state = String(formData.get('state'));
  const zipCode = String(formData.get('zipCode'));

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const { error } = await supabase
    .from('user')
    .update({
      name: fullName,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      state: state,
      zip_code: zipCode,
    })
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } else {
    return NextResponse.json({ status: 200 });
  }
}
