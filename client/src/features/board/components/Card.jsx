export default function Card({ children }) {
  return (
    <div className="flex flex-col shadow-sm border min-w-[250px] rounded-md">
      {children}
    </div>
  );
}
