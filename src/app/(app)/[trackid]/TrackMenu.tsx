import { ChevronDownMicroIcon } from "@/app/components/icons/ChevronDownMicroIcon";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { CompleteTrackButton } from "./CompleteTrackButton";
import { DeleteButton } from "./DeleteButton";

export function TrackMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"icon"}>
          <ChevronDownMicroIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CompleteTrackButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
