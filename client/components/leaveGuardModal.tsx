// components/LeaveGuardModal.tsx
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface LeaveGuardModalProps {
  open: boolean;
  onSaveAndLeave: () => void;
  onDiscardAndLeave: () => void;
  onKeepEditing: () => void;
  // Customize wording per page
  title?: string;
  description?: string;
  showSaveDraft?: boolean;
}

export function LeaveGuardModal({
  open,
  onSaveAndLeave,
  onDiscardAndLeave,
  onKeepEditing,
  title = "You have unsaved changes",
  description = "Your progress will be lost if you leave now.",
  showSaveDraft = true,
}: LeaveGuardModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          {showSaveDraft && (
            <Button variant="outline" onClick={onSaveAndLeave}>
              Save Draft
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={onDiscardAndLeave}
          >
            Discard & Leave
          </Button>
          <Button onClick={onKeepEditing}>Keep Editing</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
