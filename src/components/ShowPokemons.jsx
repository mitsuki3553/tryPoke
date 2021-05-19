export const ShowPokemons = ({ pokemons, onLoad }) => {
  if (onLoad)
    return (
      <div
        className="text-center"
        style={{ fontFamily: "pokemon-font", fontSize: "32px" }}
      >
        つうしんちゅう...
      </div>
    );
  return (
    <div className="mt-5 mx-auto flex flex-wrap text-center">
      {pokemons.map((item, i) => {
        return (
          <div key={i} className="h-40 w-40 ">
            <img
              src={item.sprites.front_default}
              alt="pokemon"
              className="mx-auto "
            ></img>

            <div style={{ fontFamily: "pokemon-font", fontSize: "8px" }}>
              <div>
                {item.order}.{item.Ja}
              </div>
              <div>
                {item.types.map((t) => (
                  <div key={t} className="inline-block">
                    {Check(t)}
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export const Check = (t) => {
  const tag = (a, b) => (
    <div className={`${a} w-20 py-1 m-1 rounded-xl`}>{b}</div>
  );
  switch (t) {
    case "normal":
      return tag("bg-white", "ノーマル");
    case "fighting":
      return tag("bg-yellow-600", "かくとう");
    case "flying":
      return tag("bg-blue-300", "ひこう");
    case "poison":
      return tag("bg-purple-600 text-white", "どく");
    case "ground":
      return tag("bg-yellow-800 text-white", "じめん");
    case "rock":
      return tag("bg-gray-300", "いわ");
    case "bug":
      return tag("bg-green-300", "むし");
    case "ghost":
      return tag("bg-purple-800 text-white", "ゴースト");
    case "steel":
      return tag("bg-yellow-600 text-white", "はがね");
    case "fire":
      return tag("bg-red-600 text-white", "ほのお");
    case "water":
      return tag("bg-blue-800 text-white", "みず");
    case "grass":
      return tag("bg-green-800 text-white", "くさ");
    case "electric":
      return tag("bg-yellow-500 text-white", "でんき");
    case "psychic":
      return tag("bg-indigo-500", "エスパー");
    case "ice":
      return tag("bg-indigo-200", "こおり");
    case "dragon":
      return tag("bg-indigo-800 text-white", "ドラゴン");
    case "dark":
      return tag("bg-black text-white", "あく");
    case "fairy":
      return tag("bg-red-200 ", "フェアリー");
    default:
      return tag("bg-yellow-900 text-white", "???");
  }
};
