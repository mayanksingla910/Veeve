// hooks/useLeaveGuard.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface UseLeaveGuardOptions {
  isDirty: boolean;
  onSaveDraft?: () => Promise<void>;
}

export function useLeaveGuard({ isDirty, onSaveDraft }: UseLeaveGuardOptions) {
  const [showModal, setShowModal] = useState(false);
  const [resolveLeave, setResolveLeave] = useState<
    ((val: boolean) => void) | null
  >(null);

  // Browser tab close / refresh warning
  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Returns a promise — resolves true (can leave) or false (stay)
  const guardNavigation = useCallback((): Promise<boolean> => {
    if (!isDirty) return Promise.resolve(true);

    return new Promise((resolve) => {
      setResolveLeave(() => resolve);
      setShowModal(true);
    });
  }, [isDirty]);

  async function handleSaveAndLeave() {
    await onSaveDraft?.();
    setShowModal(false);
    resolveLeave?.(true);
  }

  function handleDiscardAndLeave() {
    setShowModal(false);
    resolveLeave?.(true);
  }

  function handleKeepEditing() {
    setShowModal(false);
    resolveLeave?.(false);
  }

  return {
    showModal,
    guardNavigation,
    handleSaveAndLeave,
    handleDiscardAndLeave,
    handleKeepEditing,
  };
}
