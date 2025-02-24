import { backgrounds } from "@/features/board/consts";
function BackgroundsList() {
  return (
    <div
      id="backgrounds-cards-wrapper"
      className="flex items-center gap-4 overflow-x-auto w-full p-4 flex-wrap justify-center"
    >
      <label
        id="background-card"
        className="flex items-center justify-center border border-slate-300  cursor-pointer w-56 h-24 rounded-md has-checked:border-2 has-checked:border-primary has-checked:scale-110 transition-all"
      >
        <p className="text-primary">No background</p>
        <input type="radio" name="background" hidden defaultChecked value="" />
      </label>

      {backgrounds.map((background) => (
        <label
          key={background.id}
          id="background-card"
          className="cursor-pointer w-56 h-24 bg-card rounded-md flex has-checked:border-2 has-checked:border-primary has-checked:scale-110 transition-all"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <input
            type="radio"
            id={background.id}
            name="background"
            hidden
            value={background}
          />
        </label>
      ))}
    </div>
  );
}

export default BackgroundsList;
