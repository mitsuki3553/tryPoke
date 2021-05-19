import { typeCheck } from "src/components";

export const ShowPokemons = ({ pokemons, onLoad, fetchFail }) => {
  if (onLoad)
    return (
      <div
        className="text-center"
        style={{ fontFamily: "pokemon-font", fontSize: "32px" }}
      >
        つうしんちゅう...
      </div>
    );
  if (fetchFail)
    return (
      <div
        className="text-center"
        style={{ fontFamily: "pokemon-font", fontSize: "32px" }}
      >
        つうしんにしっぱいしました
      </div>
    );
  return (
    <div className="mt-5 mx-auto flex flex-wrap text-center">
      {pokemons.map((item, i) => {
        return (
          <div key={i} className="h-40 w-40 ml-2">
            <img
              src={item.sprites.front_default}
              alt="pokemon"
              className="mx-auto "
            ></img>

            <div style={{ fontFamily: "pokemon-font", fontSize: "8px" }}>
              <div>
                {item.id}.{item.Ja}
              </div>
              <div>
                {item.types.map((t) => (
                  <div key={t} className="inline-block">
                    {typeCheck(t)}
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
