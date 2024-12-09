export default function TemplateCard({ templateName }) {
  console.log({ templateName });

  return (
    <div id="template" className="w-56 h-24 bg-slate-600 rounded-md relative">
      <label className="absolute top-2 right-2">
        <input
          type="radio"
          name="template"
          value={templateName}
          className="appearance-none h-5 w-5 cursor-pointer rounded-full border border-primary checked:bg-primary"
        />
      </label>
      <div id="inner-template-card" className="py-2 px-4">
        <h2 className="text-white text-sm bg-primary px-2 py-1 rounded-md w-fit">
          Template
        </h2>
        <h3 className="text-white font-bold">{templateName}</h3>
      </div>
    </div>
  );
}
