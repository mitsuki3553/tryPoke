import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import { HomeLayout, ShowPokemons } from "src/components/";
//fontAwesomeから
import { FontAwesomeIcon, faGithub, faSearchPlus } from "src/components";

export default function Home() {
  const [P, setP] = useState(); //pokeAPIを使うためのメソッド入れ
  const [pokemons, setPokemons] = useState([]); //fetchした詳細データ入れ
  const [limit, setLimit] = useState(0); //取得するデータ数
  const [offset, setOffset] = useState(1); //この番号からのデータ取得
  const [until, setUntil] = useState(1); //この番号までのデータ取得
  const [onLoad, setOnLoad] = useState(false); //fetch中かどうか

  //pokeAPIメソッドを使えるようにする
  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
    setLimit(limit - offset + 1);
  }, []);
  console.log(`データ数：${limit}, 開始値：${offset}, 終了値：${until}`);

  //データを取得
  const getPoke = async () => {
    setOnLoad(true);
    const start = offset - 1;
    const res = await P.resource(
      `/api/v2/pokemon?limit=${limit}&offset=${start}`
    );
    console.log(res);
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

  //○番〜の入力時の処理
  const isOffset = (e) => {
    const val = e.target.value;
    //数字かつ898以下なら
    if (!isNaN(val) && val <= 898) {
      setOffset(val.trim()); //入力した番号のポケモンから
      setLimit(until - val + 1); //データ数を更新
    }
  };
  //〜○番の入力時の処理
  const isUntil = (e) => {
    const val = e.target.value;
    //数字かつ898以下なら
    if (!isNaN(val) && val <= 898) {
      setUntil(val.trim()); //入力した番号のポケモンまで
      setLimit(val - offset + 1); //データ数を更新
    }
  };

  return (
    <>
      <HomeLayout>
        <div className="text-center mt-4">
          <div
            style={{
              fontFamily: "pokemon-font",
              fontSize: "2rem",
              color: "gray",
            }}
          >
            ポケモンリスト
          </div>
        </div>
        <div className="text-right p-4 underline">
          <a href="https://github.com/mitsuki3553/tryPoke" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="1x"
              style={{
                backgroundColor: "white",
                borderRadius: "9999px",
              }}
            />
            <span
              className="ml-1 text-blue-700"
              style={{ fontFamily: "pokemon-font", fontSize: "12px" }}
            >
              github
            </span>
          </a>
        </div>
        <div className="text-center text-lg">
          <span>No. </span>
          <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value={offset}
            onChange={(e) => isOffset(e)}
          />
          <span> から No. </span>
          <input
            type="text"
            className="bg-black text-white px-2 rounded-md w-16 mt-5 mx-auto outline-none"
            value={until}
            onChange={(e) => isUntil(e)}
          />
          <span>までのポケモン</span>
        </div>
        <div
          className="text-center text-sm text-blue-700"
          style={{ fontFamily: "pokemon-font" }}
        >
          ※ No. 898 までだよ！
        </div>
        <button
          disabled={!offset || !until || limit === 0}
          onClick={() => getPoke()}
          className={
            offset > 0 && limit > 0 && offset <= until
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
        </button>

        <ShowPokemons pokemons={pokemons} onLoad={onLoad} />
      </HomeLayout>
    </>
  );
}
