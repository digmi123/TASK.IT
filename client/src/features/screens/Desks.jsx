import TemplateIcon from "@/assets/template.svg?react";
import DeskSection from "../desks/components/DeskSection";
import { useDesks } from "@/shared/providers/DesksProvider";

export default function Desks() {
  const { desks } = useDesks();

  return (
    <div id="section-wrapper" className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <TemplateIcon />
        <h2 className="text-2xl font-semibold">Your Desks</h2>
      </div>

      <div id="desk-section-wrapper" className="flex flex-col gap-6">
        {desks.map((desk) => (
          <DeskSection key={desk.id} desk={desk} />
        ))}
      </div>
    </div>
  );
}
