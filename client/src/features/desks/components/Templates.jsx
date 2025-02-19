import TemplateIcon from "@/assets/template.svg?react";
import { templateCards } from "@/features/templates/consts";
import TemplatePick from "@/features/templates/components/TemplatePick";

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
        {templateCards.map(({ templateName, backgroundImage }) => (
          <TemplatePick
            templateName={templateName}
            key={templateName}
            backgroundImage={backgroundImage}
            className="text-white"
          />
        ))}
        <TemplatePick
          templateName="None"
          backgroundImage=""
          className="border-2 border-slate-300 text-primary"
        />
      </div>
    </div>
  );
}
