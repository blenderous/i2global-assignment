import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <h2 className="text-4xl">Welcome!</h2>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
      <p>
        New user?{" "}
        <Link className="text-blue-600 hover:underline" href="/signup">
          Create an Account
        </Link>
      </p>
    </div>
  );
}
