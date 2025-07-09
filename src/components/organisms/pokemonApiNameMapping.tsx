import { useState } from "react";
import type { NameMappingType, NameEntry } from "@/types/demo";

const BASE_URL = "https://pokeapi.co/api/v2/";

export default function PokemonApiNameMapping() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [mapping, setMapping] = useState<NameMappingType>({});

  /**
   * 全てのポケモンデータの英語名とURLを取得
   * @returns 英語名とURLのリスト
   */
  const fetchAllSpeciesNames = async (): Promise<
    { name: string; url: string }[]
  > => {
    const res = await fetch(`${BASE_URL}pokemon-species?limit=10000`);
    const data = await res.json();
    return data.results.map((item: { name: string; url: string }) => ({
      name: item.name,
      url: item.url,
    }));
  };

  /**
   * ポケモンの日本語名を取得
   * @param url ポケモン情報のURL
   * @returns ポケモンの日本語名
   */
  const fetchJapaneseName = async (url: string): Promise<string | null> => {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const names: NameEntry[] = data.names;
    const jaNameObj = names.find((n) => n.language.name === "ja-Hrkt");
    return jaNameObj ? jaNameObj.name : null;
  };

  /**
   * ポケモンの日本語名と英語名をマッピングする
   */
  const generateMapping = async () => {
    setIsLoading(true);
    const englishNames = await fetchAllSpeciesNames();
    const result: NameMappingType = {};

    for (let i = 0; i < englishNames.length; i++) {
      const en = englishNames[i];
      const ja = await fetchJapaneseName(en.url);
      if (ja) result[ja] = en.name;

      setProgress(Math.floor(((i + 1) / englishNames.length) * 100));
      await new Promise((res) => setTimeout(res, 100)); // レート制限対策
    }

    setMapping(result);
    setIsLoading(false);
    downloadJson(result);
  };

  /**
   * Jsonをダウンロードする処理
   * @param data マッピングしたjsonデータ
   */
  const downloadJson = (data: NameMappingType) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pokemon-ja-en.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        ポケモン日本語-英語名マッピング作成ツール
      </h1>
      <button
        className="px-3 pt-2 pb-1 border-2 border-neutral-800 rounded-md"
        onClick={generateMapping}
        disabled={isLoading}
      >
        {isLoading ? "作成中..." : "マッピングJSONを作成＆ダウンロード"}
      </button>
      {isLoading && <p className="mt-4 font-bold">進捗: {progress}%</p>}
      {!isLoading && Object.keys(mapping).length > 0 && (
        <p className="mt-4">
          データが完成したので、JSONをダウンロードしました。
        </p>
      )}
    </div>
  );
}
