import { XMarkMicroIcon } from "@/app/components/icons/XMarkMicroIcon";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export function DeleteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <XMarkMicroIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete book track</DialogTitle>
          <DialogDescription>
            Are you sure you wanna delete your progress? once deleted it cannot
            be back
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
