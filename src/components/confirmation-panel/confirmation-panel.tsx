import { AlertTriangleIcon, CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDestructive } from "../ui/alert-destructive";

interface ConfirmationPanelProps {
  title: string;
  message: string;
  error?: string | null;
  warningMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  isLoading: boolean;
}

export default function ConfirmationPanel({
  title,
  message,
  error,
  warningMessage,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  onConfirm,
  onCancel,
  isDestructive = false,
  isLoading,
}: ConfirmationPanelProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-lg bg-white">
      {error && <AlertDestructive title={error} />}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          {isDestructive ? (
            <AlertTriangleIcon className="h-6 w-6 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
          )}
          <h6 className="text-xl font-semibold text-gray-800">{title}</h6>
        </div>

        <div className="pl-8 leading-relaxed text-gray-600">{message}</div>
      </div>

      {warningMessage && (
        <div className="px-5">
          <div className="flex items-start gap-3 rounded-md border-l-4 border-amber-400 bg-amber-50 p-4 text-amber-800">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <div className="text-sm">{warningMessage}</div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant={"outline"} onClick={onCancel} disabled={isLoading}>
          <div className="flex items-center gap-1.5">
            <XCircleIcon className="h-4 w-4" />
            {cancelButtonText}
          </div>
        </Button>
        <Button
          variant={`${isDestructive ? "destructive" : "default"}`}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : isDestructive ? (
            <AlertTriangleIcon className="h-4 w-4" />
          ) : (
            <CheckCircleIcon className="h-4 w-4" />
          )}
          {confirmButtonText}
        </Button>
      </div>
    </div>
  );
}
