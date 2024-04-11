import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data, error } = await supabase.from('user').select().eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } else {
    if (data.length === 0) {
      return NextResponse.json({ error: 'No history found' }, { status: 401 });
    }
    return NextResponse.json({ data: data }, { status: 200 });
  }
}
