import Link from "next/link";

export default function Index() {
  return (
    <div>
      <Link href="/login">
        <a>Fazer Login</a>
      </Link>
    </div>
  );
}
