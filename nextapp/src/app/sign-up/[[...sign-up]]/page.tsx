import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
          variables: {
            colorPrimary: "#0f766e",
            colorBackground: "#ffffff",
            borderRadius: "0.5rem",
          },
        }}
        afterSignUpUrl="/"
      />
    </div>
  );
}
