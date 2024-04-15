import "./globals.css";
import Link from "next/link";
import { myServerClient } from "../../utils/supabase/server";
import { Control } from "./Control";
import { Nav } from "./Nav";

export const revalidate = 0;

export const metadata = {
  title: "WEB tutorial",
  description: "Generated by KIDOHU",
};

export default async function RootLayout({ children }) {
  const supabase = myServerClient();
  let { data: page, error } = await supabase.from('page').select('*');

  return (
    <html>
      <body>
        <Nav />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
        <header>
          <h1><Link href="/">공감</Link></h1>
          <nav>
            <ul>
              <li><Link href="/reservation">예약</Link></li>
              <li><Link href="/therapist">치료사</Link></li>
              <li><Link href="/patients">환자</Link></li>
            </ul>
          </nav>
        </header>
        <ol>
          {page.map(p => 
            <li key={p.id}>
              <Link href={`/read/${p.id}`}>{p.title}</Link>
            </li>
          )}
        </ol>
          
          <Control />
      </body>
    </html>
  );
}
