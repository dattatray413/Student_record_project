function Card({title, value, color, onClick}) {
  return (
    <div className={`p-6 rounded-lg shadow text-white ${color} ${onClick ? "cursor-pointer" : ""}`}
    onClick={onClick}>
      
      <h2 className="text-lg">{title}</h2>
      
      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

export default Card;