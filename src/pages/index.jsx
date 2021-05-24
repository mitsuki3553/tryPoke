import { useCallback, useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import { HomeLayout, ShowPokemons, Header, Search } from "src/components/";
import { getFirestore } from "src/components/addFirestore";

export default function Home() {
  const [P, setP] = useState(); //pokeAPIを使うためのメソッド入れ
  const [pokeIndex, setPokeIndex] = useState(); //1~898までの簡略データ
  const [pokemons, setPokemons] = useState([]); //fetchした詳細データ入れ
  const [limit, setLimit] = useState(1); //取得するデータ数
  const [offset, setOffset] = useState(1); //この番号からのデータ取得
  const [until, setUntil] = useState(1); //この番号までのデータ取得
  const [prevPoke, setPrevPoke] = useState([]); //お気に入りで抜粋したポケモン
  const [onLoad, setOnLoad] = useState(false); //fetch中かどうか
  // const [fetchFail, setFetchFail] = useState(false); //fetchが失敗したか

  //pokeAPIメソッドを使えるようにする
  useEffect(() => {
    setOnLoad(true);
    getInit();
    getFirestore(setPrevPoke);
    setOnLoad(false);
  }, []);

  //初期設定
  const getInit = useCallback(() => {
    const Poke = new Pokedex();
    setP(Poke);
    setLimit(limit - offset + 1);
    getIndex(Poke);
  });

  const getIndex = async (Poke) => {
    setOnLoad(true);

    const start = 0;
    const Allpokemon = 898; //ポケモンの種類　※フォルムチェンジなし
    const res = await Poke.resource(
      `/api/v2/pokemon?limit=${Allpokemon}&offset=${start}`
    );

    const data = res.results.map((d, i) => {
      return { ...d, id: i + 1 };
    });

    setPokeIndex(data);
    setOnLoad(false);
  };

  //データを取得する関数
  const getPoke = async () => {
    setOnLoad(true);

    //取得するデータのurl配列を作成
    const index = pokeIndex.slice(offset - 1, until);
    //取得データをfetch・配列化
    const arr = await Promise.all(
      index.map(async (item, i) => {
        const res = await P.resource(item.url); //個別情報
        //日本語名
        const res2 = await P.getPokemonSpeciesByName(item.id);

        //必要なデータだけ抜粋
        const newFeature = {
          id: res.id,
          name: res.name,
          height: res.height,
          weight: res.weight,
          sprites: res.sprites,
          types: res.types.map((t) => t.type.name),
          Japanese: res2.names[0].name,
        };
        return newFeature;
      })
    );

    setPokemons(() => [...arr]);
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
        <Header />
        <Search
          offset={offset}
          until={until}
          limit={limit}
          isOffset={isOffset}
          isUntil={isUntil}
          getPoke={getPoke}
          onLoad={onLoad}
        />
        <ShowPokemons
          pokemons={pokemons}
          onLoad={onLoad}
          setPrevPoke={setPrevPoke}
          prevPoke={prevPoke}
          // fetchFail={fetchFail}
        />
        <div>お気に入り</div>
        <Data prevPoke={prevPoke} />
      </HomeLayout>
    </>
  );
}

const Data = ({ prevPoke }) => {
  if (!prevPoke.length) {
    return <div>読み込み。。。</div>;
  }
  return (
    <div>
      {prevPoke.map((i) => (
        <span key={i}>No.{i}</span>
      ))}
    </div>
  );
};
