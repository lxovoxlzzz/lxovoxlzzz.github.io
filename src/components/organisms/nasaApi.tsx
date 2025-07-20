import { useState, useEffect, useCallback } from "react";
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

  const handleGetNasaData = useCallback(
    async () => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">② NASA API</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {nasaData && (
        <>
          <p>{nasaData.copyright}</p>
          <p>{nasaData.date}</p>
          <p>{nasaData.explanation}</p>
          <p>{nasaData.hdurl}</p>
          <p>{nasaData.media_type}</p>
          <p>{nasaData.service_version}</p>
          <p>{nasaData.title}</p>
          <p>{nasaData.url}</p>
          <p className="text-sm text-blue-600 underline hover:text-blue-800 border-none">
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API: Courtesy of NASA
            </a>
          </p>
        </>
      )}
    </section>
  );
}
