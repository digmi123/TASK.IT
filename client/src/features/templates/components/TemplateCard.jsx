import { cn } from "@/lib/utils";
import TemplatePick from "./TemplatePick";

export default function TemplateCard({
  templateName,
  backgroundImage,
  className,
  checked = false,
}) {
  return (
    <label
      id="template"
      className={cn(
        "overflow-hidden rounded-md flex-shrink-0 cursor-pointer not-has-checked:backdrop-blur-sm has-checked:scale-110 transition-all",
        className
      )}
    >
      <input
        hidden
        type="radio"
        name="template"
        value={JSON.stringify({ templateName, backgroundImage })}
        defaultChecked={checked}
        className="peer"
      />

      <TemplatePick
        templateName={templateName}
        key={templateName}
        backgroundImage={backgroundImage}
        className={cn(
          "peer-checked:border-2 peer-checked:border-primary",
          className
        )}
      />
    </label>
  );
}
