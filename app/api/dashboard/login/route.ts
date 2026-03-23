import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.DASHBOARD_PASSWORD || 'sunexa2024admin';

    if (password === correctPassword) {
      const cookieStore = await cookies();
      cookieStore.set('sunexa_dash_auth', '1', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 8, // 8 hours
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
  }
}
