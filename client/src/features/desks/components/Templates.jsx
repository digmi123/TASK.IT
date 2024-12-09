import TemplateIcon from "@/assets/template.svg?react";
import TemplatePick from "@/shared/components/TemplatePick";

const templateTypes = ["Product", "Testing", "Design", "Marketing"];

export default function Templates() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <TemplateIcon />
        <h2 className="text-2xl font-semibold">Most Popular templates</h2>
      </div>
      <p className="text-xl">
        Get going faster with a template from the TASK.IT community
      </p>

      <div id="templates-wrapper" className="flex gap-4 py-4">
        {templateTypes.map((type) => (
          <TemplatePick key={type} />
        ))}
      </div>
    </div>
  );
}
