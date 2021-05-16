import { useEffect, useState } from "react";
import { HomeLayout } from "src/components/HomeLayout";
import { Pokedex } from "pokeapi-js-wrapper";

export default function Home() {
  const [P, setP] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [getNum, setGetNum] = useState(1);

  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
  }, []);

  const getPoke = async () => {
    const res = await P.resource(`/api/v2/pokemon?limit=${getNum}`);
    const getDetails = async (results) => {
      let arr = [];
      for (let item of results) {
        const res = await P.resource(item.url);
        arr = [...arr, res];
      }
      setPokemons(() => [...arr]);
    };
    getDetails(res["results"]);
  };

  const isOffset = (e) => {
    const val = e.target.value;

    !isNaN(val) && val <= 898 && setGetNum(val.trim());
  };

  return (
    <>
      <HomeLayout>
        <div className="text-center text-lg">
          <span>No. 1</span>
          {/* <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value="1"
          /> */}
          <span> から No.</span>
          <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value={getNum}
            onChange={(e) => isOffset(e)}
          />
          <span>までのポケモン</span>
        </div>
        <div className="text-center text-sm text-blue-700">
          ※ No. 898 までだよ！
        </div>
        <div
          disabled={!getNum}
          onClick={() => getPoke()}
          className={
            getNum
              ? "w-20 mx-auto my-5 text-center border border-green-700 rounded-md bg-green-700 text-white cursor-pointer"
              : "w-20 mx-auto my-5 text-center border border-green-700 rounded-md bg-green-700 text-white opacity-20 "
          }
        >
          表示
        </div>

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
                <div></div>
              </div>
            );
          })}
        </div>
      </HomeLayout>
    </>
  );
}
