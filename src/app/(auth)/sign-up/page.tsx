"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

import {
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Check,
  X,
  CircleAlert,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function getAuthErrorMessage(
  error: { code?: string; message?: string } | null
) {
  switch (error?.code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with this email already exists. Try signing in instead.";
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "VALIDATION_ERROR":
      return "Please enter a valid email address and a password that meets the requirements.";
    case "PASSWORD_TOO_SHORT":
      return "Password must be at least 8 characters long.";
    case "PASSWORD_TOO_LONG":
      return "Password must be 128 characters or fewer.";
    default:
      return (
        error?.message ||
        "We couldn't create your account. Please try again."
      );
  }
}

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    imageUrl: false,
    password: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedImageUrl = imageUrl.trim();

  // Password validation rules (keep in sync with the server config in
  // src/lib/auth.ts: 8–128 characters).
  const passwordRules = [
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
  ];

  const isPasswordValid =
    passwordRules.every((rule) => rule.valid) &&
    password.length <= 128;

  // Email validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
    trimmedEmail
  );

  // Name validation
  const isNameValid = trimmedName.length >= 2;

  // Image URL validation (optional)
  const isImageValid = (() => {
    if (!trimmedImageUrl) return true;

    try {
      const url = new URL(trimmedImageUrl);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  })();

  // Error messages
  const errors = {
    name: !trimmedName
      ? "Full name is required."
      : !isNameValid
        ? "Name must contain at least 2 characters."
        : "",

    email: !trimmedEmail
      ? "Email address is required."
      : !isEmailValid
        ? "Please enter a valid email address."
        : "",

    imageUrl: !isImageValid
      ? "Please enter a valid http(s) image URL."
      : "",

    password: !password
      ? "Password is required."
      : password.length > 128
        ? "Password must be 128 characters or fewer."
        : !isPasswordValid
          ? "Please meet all password requirements."
          : "",
  };

  // Show errors after blur or submit
  const showError = (field: keyof typeof touched) =>
    (touched[field] || submitted) && !!errors[field];

  // Handle form submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitted(true);
    setAuthError("");

    const isFormValid =
      isNameValid &&
      isEmailValid &&
      isImageValid &&
      isPasswordValid &&
      agreeTerms;

    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        image: trimmedImageUrl || undefined,
      });
      console.log(data, error)

      if (error) {
        setAuthError(getAuthErrorMessage(error));
        return;
      }

      toast.success("Account created successfully. Welcome to EventPulse!");
      router.push("/");
      router.refresh();
    } catch {
      setAuthError(
        "We couldn't create your account right now. Check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-rose-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">

        {/* Signup Card */}
        <Card className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-indigo-950/5 p-6 sm:p-8">

          <CardHeader className="p-0 mb-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 shadow-lg shadow-indigo-500/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              Create Account
            </CardTitle>

            <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              Join the community and start driving social change
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">

            <form
              onSubmit={handleSubmit}
              noValidate
              onChange={() => {
                if (authError) setAuthError("");
              }}
              className="space-y-4"
            >

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-xs font-semibold"
                >
                  Full Name
                </Label>

                <div className="relative">
                  <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        name: true,
                      }))
                    }
                    placeholder="Tanvir Ahmed"
                    aria-invalid={showError("name") || undefined}
                    aria-describedby={
                      showError("name") ? "name-error" : undefined
                    }
                    className={`pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("name")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  />
                </div>

                {showError("name") && (
                  <p id="name-error" className="text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold"
                >
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        email: true,
                      }))
                    }
                    placeholder="name@example.com"
                    aria-invalid={showError("email") || undefined}
                    aria-describedby={
                      showError("email") ? "email-error" : undefined
                    }
                    className={`pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("email")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  />
                </div>

                {showError("email") && (
                  <p id="email-error" className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Profile Image URL */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="image"
                  className="text-xs font-semibold"
                >
                  Profile Photo URL
                </Label>

                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    id="image"
                    name="imageUrl"
                    type="url"
                    autoComplete="url"
                    maxLength={2048}
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        imageUrl: true,
                      }))
                    }
                    placeholder="https://images.unsplash.com/..."
                    aria-invalid={showError("imageUrl") || undefined}
                    aria-describedby={
                      showError("imageUrl")
                        ? "image-error"
                        : "image-hint"
                    }
                    className={`pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("imageUrl")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  />
                </div>

                {showError("imageUrl") ? (
                  <p id="image-error" className="text-xs text-red-500">
                    {errors.imageUrl}
                  </p>
                ) : (
                  <p
                    id="image-hint"
                    className="text-[11px] text-slate-400"
                  >
                    Optional: Leave empty for default avatar.
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold"
                >
                  Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    maxLength={128}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        password: true,
                      }))
                    }
                    placeholder="Create a strong password"
                    aria-invalid={showError("password") || undefined}
                    aria-describedby={
                      showError("password")
                        ? "password-rules password-error"
                        : "password-rules"
                    }
                    className={`pl-10 pr-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 text-sm ${
                      showError("password")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Validation Checklist */}
                <ul
                  id="password-rules"
                  className="space-y-1.5 pt-2"
                  aria-live="polite"
                >
                  {passwordRules.map((rule) => (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 text-[11px] transition-colors duration-200 ${
                        rule.valid
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {rule.valid ? (
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <X
                          className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600"
                          strokeWidth={2.5}
                        />
                      )}

                      <span>{rule.label}</span>
                    </li>
                  ))}
                </ul>

                {showError("password") && (
                  <p id="password-error" className="text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-1">
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked === true)
                    }
                    aria-invalid={
                      submitted && !agreeTerms ? true : undefined
                    }
                    aria-describedby={
                      submitted && !agreeTerms ? "terms-error" : undefined
                    }
                    className="mt-0.5"
                  />

                  <Label
                    htmlFor="terms"
                    className="text-xs text-slate-600 dark:text-slate-400 leading-snug cursor-pointer font-normal"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>

                {submitted && !agreeTerms && (
                  <p id="terms-error" className="text-xs text-red-500">
                    Please agree to the Terms of Service.
                  </p>
                )}
              </div>

              {authError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-relaxed text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400"
                >
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 hover:opacity-95 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>
                  {isLoading ? "Registering..." : "Register"}
                </span>

                <ArrowRight className="h-4 w-4" />
              </Button>

            </form>
          </CardContent>

          {/* Login Link */}
          <CardFooter className="p-0 mt-6 pt-5 pb-5 border-t border-slate-100 dark:border-slate-800 justify-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Login here
              </Link>
            </p>
          </CardFooter>

        </Card>
      </div>
    </div>
  );
}
