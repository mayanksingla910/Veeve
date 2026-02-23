"use client";

import { useState } from "react";
import BackPageButton from "@/components/backPageButton";
import JobPostingForm from "./_components/jobPostingForm";
import { LeaveGuardModal } from "@/components/leaveGuardModal";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";

function Page() {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [onSaveDraft, setOnSaveDraft] = useState<(() => Promise<void>) | null>(
    null,
  );

  const {
    showModal,
    guardNavigation,
    handleSaveAndLeave,
    handleDiscardAndLeave,
    handleKeepEditing,
  } = useLeaveGuard({
    isDirty: isFormDirty,
    onSaveDraft: onSaveDraft ?? undefined,
  });

  return (
    <div className="space-y-6 px-4 py-6 mx-auto">
      <div className="flex gap-3 items-center">
        <BackPageButton onBeforeNavigate={guardNavigation} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details to publish your listing.
          </p>
        </div>
      </div>

      <JobPostingForm
        onDirtyChange={setIsFormDirty}
        onSaveDraftReady={setOnSaveDraft}
      />

      <LeaveGuardModal
        open={showModal}
        onSaveAndLeave={handleSaveAndLeave}
        onDiscardAndLeave={handleDiscardAndLeave}
        onKeepEditing={handleKeepEditing}
      />
    </div>
  );
}

export default Page;
