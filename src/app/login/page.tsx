"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams?.get("registered") === "true";
  const [loginOpen, setLoginOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLoginClick={() => setLoginOpen(true)} onSignupClick={() => router.push("/")} />

      <main className="flex-1 container mx-auto px-4 py-20">
        {registered && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded bg-accent/10 border border-accent text-accent text-center">
            Account created successfully — please sign in.
          </div>
        )}

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Sign in to watchAura</h1>
          <p className="text-muted-foreground">Enter your credentials to access your dashboard.</p>
        </div>
      </main>

      <Footer />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          router.push("/");
        }}
        onSwitchToSignup={() => {
          setLoginOpen(false);
          router.push("/");
        }}
      />
    </div>
  );
}
