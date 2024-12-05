import templateIcon from "@/assets/template.svg";
import DeskSection from "../desks/components/DeskSection";
import { useDesks } from "@/shared/providers/DesksProvider";

export default function Desks() {
  const { desks } = useDesks();

  return (
    <div id="section-wrapper" className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <img src={templateIcon} alt="templates" className="w-6 h-6" />
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
