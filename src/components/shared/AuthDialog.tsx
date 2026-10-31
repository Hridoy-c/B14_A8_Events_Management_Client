"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  LogIn,
  UserPlus,
} from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "sign-in" | "sign-up";
}

export default function AuthDialog({
  open,
  onOpenChange,
  defaultMode = "sign-in",
}: AuthDialogProps) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">(defaultMode);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync defaultMode when dialog opens
  React.useEffect(() => {
    if (open) {
      setMode(defaultMode);
    }
  }, [open, defaultMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "sign-up" && !agreeTerms) {
      alert("Please agree to the Terms of Service to continue.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        mode === "sign-in"
          ? `Welcome back, ${email}!`
          : `Account successfully created for ${name}!`
      );
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] w-full rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xl z-[100] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br from-indigo-500/20 to-rose-500/20 blur-2xl pointer-events-none" />

        {/* Dialog Header */}
        <DialogHeader className="text-center sm:text-center space-y-0.5">
          <div className="flex justify-center mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 shadow-xs">
              <Sparkles className="h-3 w-3 text-rose-500" />
              EventPulse Passport
            </span>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
            {mode === "sign-in" ? "Welcome back" : "Create an account"}
          </DialogTitle>

          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            {mode === "sign-in"
              ? "Sign in to access your event passes and tickets"
              : "Discover and book unforgettable live experiences"}
          </DialogDescription>
        </DialogHeader>

        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium text-xs"
          >
            <svg className="h-3.5 w-3.5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium text-xs"
          >
            <svg className="h-3.5 w-3.5 mr-2 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-1.5 flex items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          <span className="mx-2.5 flex-shrink text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            {mode === "sign-in" ? "Or with email" : "Or with email"}
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        {/* Form without internal scroll */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* SIGN UP ONLY: Name Field */}
          {mode === "sign-up" && (
            <div className="space-y-1">
              <Label
                htmlFor="dialog-name"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <Input
                  id="dialog-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="pl-9 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Email Field (Both Sign-in and Sign-up) */}
          <div className="space-y-1">
            <Label
              htmlFor="dialog-email"
              className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                id="dialog-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-9 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* SIGN UP ONLY: Image URL Field */}
          {mode === "sign-up" && (
            <div className="space-y-1">
              <Label
                htmlFor="dialog-image"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Profile Image URL
              </Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <Input
                  id="dialog-image"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="pl-9 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Password Field (Both Sign-in and Sign-up) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="dialog-password"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Password
              </Label>
              {mode === "sign-in" && (
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions sent to your email!");
                  }}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                id="dialog-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9 pr-9 h-9 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs focus-visible:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign-in: Remember Me / Sign-up: Agree to Terms */}
          {mode === "sign-in" ? (
            <div className="flex items-center gap-2 pt-0.5">
              <Checkbox
                id="dialog-remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label
                htmlFor="dialog-remember"
                className="text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal"
              >
                Remember me on this device
              </Label>
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-0.5">
              <Checkbox
                id="dialog-terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                className="mt-0.5"
              />
              <Label
                htmlFor="dialog-terms"
                className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight cursor-pointer font-normal"
              >
                I agree to the{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                  Terms
                </span>{" "}
                &{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                  Privacy
                </span>
                .
              </Label>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-1.5"
          >
            {mode === "sign-in" ? (
              <>
                <LogIn className="h-4 w-4" />
                <span>{isLoading ? "Signing in..." : "Sign In to EventPulse"}</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>{isLoading ? "Creating account..." : "Create Free Account"}</span>
              </>
            )}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </form>

        {/* Footer Toggle Shifted Upward */}
        <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800 -mb-1">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === "sign-in"
              ? "Don't have an account yet? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer inline-flex items-center gap-0.5 ml-1"
            >
              {mode === "sign-in" ? "Register now" : "Sign In"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
