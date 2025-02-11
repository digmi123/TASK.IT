function BoardSkeletonCard() {
  return (
    <div id="board" className="w-56 h-24 bg-card rounded-md">
      <div id="inner-template-card" className="py-2 px-4 animate-pulse">
        <h2 className="w-32 h-4 bg-slate-600 rounded-full" />
      </div>
    </div>
  );
}

export default BoardSkeletonCard;
