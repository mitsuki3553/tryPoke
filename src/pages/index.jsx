import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import { HomeLayout } from "src/components/";
import { FontAwesomeIcon, faGithub, faSearchPlus } from "src/components";

export default function Home() {
  const [P, setP] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [getOffset, setGetOffset] = useState(1);
  const [getLim, setGetLim] = useState(1);

  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
  }, []);

  const getPoke = async () => {
    const res = await P.resource(`/api/v2/pokemon?limit=${getLim}`);
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

    !isNaN(val) && val <= 898 && setGetLim(val.trim());
  };

  return (
    <>
      <HomeLayout>
        <div className="text-right p-2 underline">
          <a href="https://github.com/mitsuki3553/tryPoke" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="x"
              style={{
                backgroundColor: "white",
                borderRadius: "9999px",
              }}
            />
            <span className="pl-1 text-blue-700">github</span>
          </a>
        </div>
        <div className="text-center text-lg">
          <span>No. {getOffset}</span>
          {/* <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value="1"
          /> */}
          <span> から No.</span>
          <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value={getLim}
            onChange={(e) => isOffset(e)}
          />
          <span>までのポケモン</span>
        </div>
        <div className="text-center text-sm text-blue-700">
          ※ No. 898 までだよ！
        </div>
        <div
          disabled={!getLim}
          onClick={() => getPoke()}
          className={
            getLim
              ? "w-20 mx-auto my-5 text-center border border-green-700 rounded-md bg-green-700 text-white cursor-pointer"
              : "w-20 mx-auto my-5 text-center border border-green-700 rounded-md bg-green-700 text-white opacity-20 "
          }
        >
          <FontAwesomeIcon icon={faSearchPlus} />
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
