import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import { HomeLayout, ShowPokemons, Header, Search } from "src/components/";

export default function Home() {
  const [P, setP] = useState(); //pokeAPIを使うためのメソッド入れ
  const [pokeIndex, setPokeIndex] = useState(); //1~898までの簡略データ
  const [pokemons, setPokemons] = useState([]); //fetchした詳細データ入れ
  const [limit, setLimit] = useState(1); //取得するデータ数
  const [offset, setOffset] = useState(1); //この番号からのデータ取得
  const [until, setUntil] = useState(1); //この番号までのデータ取得
  const [onLoad, setOnLoad] = useState(false); //fetch中かどうか

  //pokeAPIメソッドを使えるようにする
  useEffect(() => {
    const Poke = new Pokedex();
    setP(Poke);
    setLimit(limit - offset + 1);
    getIndex(Poke);
  }, []);

  const getIndex = async (Poke) => {
    setOnLoad(true);
    const start = 0;
    const Allpokemon = 898; //ポケモンの種類　※フォルムチェンジなし
    const res = await Poke.resource(
      `/api/v2/pokemon?limit=${Allpokemon}&offset=${start}`
    );
    setPokeIndex(res.results);
    setOnLoad(false);
  };

  //データを取得
  const getPoke = async () => {
    setOnLoad(true);
    let index = pokeIndex.slice(offset - 1, until);
    let arr = [];
    for (let item of index) {
      const res = await P.resource(item.url);
      //必要なデータだけ抜粋
      const newFeature = {
        id: res.id,
        name: res.name,
        height: res.height,
        weight: res.weight,
        sprites: res.sprites,
        types: res.types.map((t) => t.type.name),
      };
      //抜き出したデータで配列作成
      arr = [...arr, newFeature];
    }
    let jp = [];
    for (let i in index) {
      //日本語名が入ってるデータをfetch
      const res = await P.getPokemonSpeciesByName(index[i].name);
      //日本語のポケモン名だけ抽出
      const jName = await res.names[0].name;

      //上で作ったデータと合体！
      const addJp = { ...arr[i], Ja: jName };
      // 合体したものを配列化
      jp = [...jp, addJp];
    }
    setPokemons(() => [...jp]);
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
        <ShowPokemons pokemons={pokemons} onLoad={onLoad} offset={offset} />
      </HomeLayout>
    </>
  );
}
