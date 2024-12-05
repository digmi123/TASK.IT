import templateIcon from "@/assets/template.svg";
import TemplateCard from "@/shared/components/TemplateCard";

export default function Templates() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <img src={templateIcon} alt="templates" className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Most Popular templates</h2>
      </div>
      <p className="text-xl">
        Get going faster with a template from the TASK.IT community
      </p>

      <div id="templates-wrapper" className="flex gap-4 py-4">
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
      </div>
    </div>
  );
}
