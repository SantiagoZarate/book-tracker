import { ChevronDownMicroIcon } from "@/app/components/icons/ChevronDownMicroIcon";
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
      <DropdownMenuTrigger className="border rounded-full p-1 hover:bg-input transition">
        <ChevronDownMicroIcon />
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
