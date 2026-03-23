import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CampaignRedirect({ params }: { params: Promise<{ source: string }> }) {
  const { source } = await params;
  
  // Store the utm/source in a cookie for 7 days
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'sunexa_src',
    value: source,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false, // So JS can also read it easily if needed
  });

  // Handle /c/ref/[code] correctly (if it was implemented as a subfolder, Next.js params handling might be different
  // but if we hit /c/[source] directly, params.source = 'ref' won't easily catch the code without a catch-all)
  // We'll manage standard /c/fb, /c/wa, etc. here.
  
  redirect('/');
}
