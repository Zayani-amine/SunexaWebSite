import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ source: string }> }
) {
  const { source } = await params;
  
  // Store the utm/source in a cookie for 7 days
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'sunexa_src',
    value: source,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
  });

  // Redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
}
