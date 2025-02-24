import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ConfirmDialog({
  children,
  onConfirm,
  innerText,
  open,
  setOpen,
  title,
  icon,
}) {
  const handleConfirm = () => {
    onConfirm && onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogTitle className="flex items-center gap-4">
          {icon && <img src={icon} alt="dialog-icon" />}
          {title}
        </DialogTitle>
        <div id="dialog-body">
          <p className="font-medium text-xl">{innerText}</p>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="primary">Close</Button>
          </DialogClose>
          <Button onClick={handleConfirm}>Sure</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
