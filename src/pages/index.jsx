import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import { HomeLayout, ShowPokemons } from "src/components/";
//fontAwesomeから
import { FontAwesomeIcon, faGithub, faSearchPlus } from "src/components";

export default function Home() {
  const [P, setP] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [Limit, setLimit] = useState(1);
  const [Offset, setOffset] = useState(1);
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
  }, []);

  const getPoke = async () => {
    setOnLoad(true);
    const res = await P.resource(`/api/v2/pokemon?limit=${Limit}`);
    const getDetails = async (results) => {
      let arr = [];
      for (let item of results) {
        const res = await P.resource(item.url);
        arr = [...arr, res];
      }
      setPokemons(() => [...arr]);
    };
    getDetails(res["results"]);
    setOnLoad(false);
  };

  const isOffset = (e) => {
    const val = e.target.value;

    !isNaN(val) && val <= 898 && setLimit(val.trim());
  };

  return (
    <>
      <HomeLayout>
        <div className="text-center mt-4">
          <div style={{ fontFamily: "pokemon-font", fontSize: "2rem" }}>
            ポケモンリスト
          </div>
        </div>
        <div className="text-right p-2 underline">
          <a href="https://github.com/mitsuki3553/tryPoke" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="1x"
              style={{
                backgroundColor: "white",
                borderRadius: "9999px",
              }}
            />
            <span className="pl-1 text-blue-700">github</span>
          </a>
        </div>
        <div className="text-center text-lg">
          <span>No. {Offset}</span>
          {/* <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value="1"
          /> */}
          <span> から No. </span>
          <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value={Limit}
            onChange={(e) => isOffset(e)}
          />
          <span>までのポケモン</span>
        </div>
        <div
          className="text-center text-sm text-blue-700"
          style={{ fontFamily: "pokemon-font" }}
        >
          ※ No. 898 までだよ！
        </div>
        <div
          disabled={!Limit}
          onClick={() => getPoke()}
          className={
            Limit
              ? "w-32 mx-auto m-5 text-center border border-green-700 rounded-md bg-green-700 text-white cursor-pointer"
              : "w-32 mx-auto m-5 text-center border border-green-700 rounded-md bg-green-700 text-white opacity-20 "
          }
        >
          <FontAwesomeIcon icon={faSearchPlus} />
          <span
            style={{
              fontFamily: "pokemon-font",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            ひょうじ
          </span>
        </div>

        <ShowPokemons pokemons={pokemons} onLoad={onLoad} />
      </HomeLayout>
    </>
  );
}
