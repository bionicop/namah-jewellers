import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen ">
      <Link href='/product'>Product Page</Link>
      <Link href='/buy'>Buy Page</Link>
      <Link href='/about'>About Page</Link>
      <Link href='/contact'>Contact Page</Link>
    </div>
  );
}
