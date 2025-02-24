import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const TemplatePick = forwardRef(
  ({ templateName, backgroundImage, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id="template-pick"
        className={cn(
          "overflow-hidden w-56 h-24 rounded-md flex-shrink-0 cursor-pointer",
          className
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
      >
        <div id="inner-template-card" className="py-2 px-4 h-full">
          <h2 className="text-white text-sm bg-primary px-2 py-1 rounded-md w-fit">
            Template
          </h2>
          <h3 className="text-inherit font-bold">{templateName}</h3>
        </div>
      </div>
    );
  }
);

TemplatePick.displayName = "TemplatePick";
export default TemplatePick;
