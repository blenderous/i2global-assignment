import SignUpForm from "../../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
