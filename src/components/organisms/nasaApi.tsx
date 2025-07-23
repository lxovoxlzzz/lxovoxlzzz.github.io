import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchApiData } from "@/utils/api";
import type { NasaDataType } from "@/types/demo";

export default function NasaApiDemo() {
  const { t } = useTranslation();
  const [nasaData, setNasaData] = useState<NasaDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: 最後に消す
  console.log(nasaData);

  useEffect(() => {
    handleGetNasaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetNasaData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiData<NasaDataType>(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`,
      );
      setNasaData(data);
    } catch (err) {
      setError(t("error_fetch"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">2. NASA API</h1>
      <p className="mb-4">{t("nasa_text")}</p>
      <div className="flex flex-row gap-4">
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {nasaData && (
            <>
              {nasaData.media_type === "image" && (
                <img
                  src={nasaData.url}
                  alt={t("nasa_text")}
                  className="max-w-md mb-4"
                />
              )}
              {nasaData.media_type === "video" && (
                <video
                  src={nasaData.url}
                  poster={nasaData.thumbnail_url}
                  controls
                  className="max-w-md mb-4"
                />
              )}
            </>
          )}
        </div>
        <div>
          {nasaData && (
            <>
              <ul>
                <li>
                  <span className="mr-2 font-bold">Title:</span>
                  {nasaData.title}
                </li>
                <li>
                  <span className="mr-2 font-bold">Date:</span>
                  {nasaData.date}
                </li>
                <li>
                  <span className="mr-2 font-bold">Explanation:</span>
                  {nasaData.explanation}
                </li>
                {nasaData.copyright && (
                  <li>
                    <span className="mr-2 font-bold">CopyRight:</span>
                    {nasaData.copyright}
                  </li>
                )}
                <li className="mt-4 text-sm text-blue-600 underline hover:text-blue-800 border-none">
                  <a
                    href="https://api.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    API: Courtesy of NASA
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
