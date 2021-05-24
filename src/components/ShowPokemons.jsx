import { typeCheck, addFirestore } from "src/components";

export const ShowPokemons = ({ pokemons, onLoad, prevPoke, setPrevPoke }) => {
  if (onLoad)
    return (
      <div
        className="text-center"
        style={{ fontFamily: "pokemon-font", fontSize: "32px" }}
      >
        つうしんちゅう...
      </div>
    );
  // if (fetchFail)
  //   return (
  //     <div
  //       className="text-center"
  //       style={{ fontFamily: "pokemon-font", fontSize: "32px" }}
  //     >
  //       つうしんにしっぱいしました
  //     </div>
  //   );
  return (
    <div className="w-full h-96 mt-5 bg-blue-50 flex flex-wrap text-center border border-green-500 overflow-y-auto h-64">
      {pokemons.map((item, i) => {
        return (
          <div
            key={i}
            className="h-40 w-40 ml-2"
            onClick={() => OnPreserve(prevPoke, setPrevPoke, item)}
          >
            <img
              src={item.sprites.front_default}
              alt="pokemon"
              className="mx-auto "
            ></img>

            <div style={{ fontFamily: "pokemon-font", fontSize: "8px" }}>
              <div>
                {item.id}.{item.Japanese}
              </div>
              <div>
                {item.types.map((t) => (
                  <div key={t} className="inline-block">
                    {typeCheck(t)}
                  </div>
                ))}
              </div>
              <button>保存</button>
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

const OnPreserve = (prevPoke, setPrevPoke, item) => {
  if (prevPoke.includes(item.id)) return;
  const newArr = [...prevPoke, item.id].sort((a, b) => a - b);
  setPrevPoke(newArr);
  addFirestore(item.id);
  console.log(newArr);
};
