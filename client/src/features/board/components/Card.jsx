export default function Card({ children }) {
  return (
    <div className="flex flex-col shadow border min-w-[250px] rounded-md">
      {children}
    </div>
  );
}
