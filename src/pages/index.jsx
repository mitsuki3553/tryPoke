import { useEffect, useState } from "react";
import { HomeLayout } from "src/components/HomeLayout";
import { Pokedex } from "pokeapi-js-wrapper";

export default function Home() {
  const [P, setP] = useState();
  const [pokeUrl, setPokeUrl] = useState();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [getNum, setGetNum] = useState(20);

  const getPoke = async (Poke = P) => {
    const res = await Poke.resource(`/api/v2/pokemon?limit=${getNum}`);

    // console.log(res["results"]);

    const getDetails = (Poke = P, results) => {
      results.forEach(async (poke, i) => {
        const res = await Poke.resource(poke.url);

        setPokemons((current) => [...current, res]);
      });
    };
    getDetails(Poke, res["results"]);
  };

  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
    setPokeUrl(`/api/v2/pokemon?limit=${getNum}`);
    getPoke(Poke);
  }, []);
  console.log(pokemons);

  // console.log(pokemonData);
  return (
    <>
      <HomeLayout>
        <button
          className="bg-black text-white p-3 rounded-xl w-40 mt-5 mx-auto"
          onClick={() => onClickChange()}
        >
          random pokemon!
        </button>

        <div className="mt-5 mx-auto flex flex-wrap text-center">
          {pokemons.map((item, i) => {
            return (
              <div key={i} className="h-40 w-40 ">
                <img
                  src={item.sprites.front_default}
                  alt="pokemon"
                  className="mx-auto"
                ></img>
                <div>{item.name}</div>
              </div>
            );
          })}
        </div>
      </HomeLayout>
    </>
  );
}
