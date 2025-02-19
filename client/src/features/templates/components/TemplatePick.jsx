import { cn } from "@/lib/utils";

function TemplatePick({ templateName, backgroundImage, className }) {
  return (
    <div
      id="template-pick"
      className={cn(
        "overflow-hidden w-56 h-24 rounded-md flex-shrink-0",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="inner-template-card"
        className="py-2 px-4 h-full peer-not-checked:backdrop-blur-sm"
      >
        <h2 className="text-white text-sm bg-primary px-2 py-1 rounded-md w-fit">
          Template
        </h2>
        <h3 className="text-inherit font-bold">{templateName}</h3>
      </div>
    </div>
  );
}

export default TemplatePick;
