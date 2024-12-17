import cryingBaby from "@/assets/crying-baby.png";
import AddIcon from "@/assets/add.svg?react";
import { Button } from "@/components/ui/button";

export default function ZeroDeskMembers() {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-4xl font-bold">We're Sorry</h1>
      <img src={cryingBaby} alt="crying-baby" className="m-2 w-80 h-80" />
      <p className="text-2xl font-semibold">There is no desk members yet</p>
      <p>You can invite members to join your desk by clicking on the button</p>
      <Button>
        <AddIcon />
        Invite With Link
      </Button>
    </div>
  );
}
