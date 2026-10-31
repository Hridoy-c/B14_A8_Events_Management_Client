"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { toast } from "react-toastify";

function getSignInErrorMessage(
  error: { code?: string; message?: string } | null
) {
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
    case "INVALID_PASSWORD":
      return "Incorrect email or password. Please try again.";
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "EMAIL_NOT_VERIFIED":
      return "Please verify your email address before signing in.";
    case "VALIDATION_ERROR":
      return "Please check your email and password and try again.";
    default:
      return error?.message || "We couldn't sign you in. Please try again.";
  }
}

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const trimmedEmail = email.trim();
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail);

  const errors = {
    email: !trimmedEmail
      ? "Email address is required."
      : !isEmailValid
        ? "Please enter a valid email address."
        : "",
    password: !password ? "Password is required." : "",
  };

  const showError = (field: keyof typeof touched) =>
    (touched[field] || submitted) && !!errors[field];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isEmailValid || !password) return;

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: trimmedEmail,
        password,
        rememberMe,
      });

      if (error) {
        toast.error(getSignInErrorMessage(error));
        return;
      }

      const redirectParam = new URLSearchParams(window.location.search).get(
        "redirect"
      );
      const redirectTo =
        redirectParam &&
        redirectParam.startsWith("/") &&
        !redirectParam.startsWith("//") &&
        redirectParam !== "/sign-in"
          ? redirectParam
          : "/";

      toast.success("Signed in successfully. Welcome back!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error(
        "We couldn't sign you in right now. Check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-rose-500/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            EventPulse Passport
          </div>
        </div>

        {/* Shadcn Card for Sign In */}
        <Card className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-indigo-950/5 p-6 sm:p-8">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              Sign in to manage your tickets, bookings, and live events
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            {/* Social Logins */}
            <SocialAuthButtons />

            {/* Divider */}
            <div className="relative my-4 flex items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="mx-3 flex-shrink text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, email: true }))
                    }
                    placeholder="name@example.com"
                    aria-invalid={showError("email") || undefined}
                    aria-describedby={
                      showError("email") ? "signin-email-error" : undefined
                    }
                    className={`pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("email")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                    }`}
                  />
                </div>

                {showError("email") && (
                  <p
                    id="signin-email-error"
                    className="text-xs text-red-500"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </Label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info(
                        "Password reset instructions sent to your email!"
                      );
                    }}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    maxLength={128}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                    placeholder="••••••••"
                    aria-invalid={showError("password") || undefined}
                    aria-describedby={
                      showError("password")
                        ? "signin-password-error"
                        : undefined
                    }
                    className={`pl-10 pr-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("password")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {showError("password") && (
                  <p
                    id="signin-password-error"
                    className="text-xs text-red-500"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label
                  htmlFor="remember"
                  className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  Remember me on this device
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 hover:opacity-95 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "Signing in..." : "Sign In to EventPulse"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-0 mt-6 pt-5 pb-5 border-t border-slate-100 dark:border-slate-800 justify-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create free account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
