import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"http://localhost:8000/login"}>Login</Link>
    </div>
  );
}
