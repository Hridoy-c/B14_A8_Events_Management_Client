"use client";

import { toast as toastManager } from "@/components/ui/toast";

export type ToastType = "success" | "info" | "warning" | "error";

const DEFAULT_TIMEOUT = 4000;

function show(type: ToastType, message: string, description?: string) {
  return toastManager.add({
    type,
    title: message,
    description,
    timeout: DEFAULT_TIMEOUT,
    priority: type === "error" ? "high" : "low",
  });
}

/**
 * Drop-in replacement for `react-toastify`'s `toast` helper, backed by the
 * shadcn/Base UI toaster mounted in `ToastProvider`.
 */
export const toast = {
  success: (message: string, description?: string) =>
    show("success", message, description),
  info: (message: string, description?: string) =>
    show("info", message, description),
  warning: (message: string, description?: string) =>
    show("warning", message, description),
  error: (message: string, description?: string) =>
    show("error", message, description),
  dismiss: (id?: string) => toastManager.close(id),
};
