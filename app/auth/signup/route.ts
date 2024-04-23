'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/src/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();

  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const signup = await supabase.auth.signUp({ email, password });

  if (signup.error) {
    return NextResponse.json({ error: signup.error.message }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const insertUser = await supabase.from('user').insert({ user_id: user?.id });

  if (insertUser.error) {
    return NextResponse.json({ error: insertUser.error.message }, { status: 401 });
  }

  revalidatePath('/', 'layout');
  return NextResponse.json({ status: 200 });
}
