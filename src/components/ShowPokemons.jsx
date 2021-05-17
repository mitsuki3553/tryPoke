export const ShowPokemons = ({ pokemons, onLoad }) => {
  if (onLoad) return <div className="text-center">読込中...</div>;
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
              {item.name}
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};