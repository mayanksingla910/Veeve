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
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:grid sm:grid-cols-3 gap-2">
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={onDiscardAndLeave}
          >
            Discard & Leave
          </Button>
          <div className="grid grid-cols-2 sm:col-span-2 gap-2">
            {showSaveDraft && (
              <Button variant="outline" onClick={onSaveAndLeave}>
                Save Draft
              </Button>
            )}
            <Button onClick={onKeepEditing}>Keep Editing</Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
