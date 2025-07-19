import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { fetchApiData } from "@/utils/api";
import type { FoxDataType } from "@/types/demo";

export default function FoxApiDemo() {
  const { t } = useTranslation();
  const [foxData, setFoxData] = useState<FoxDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetFoxData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetFoxData = useCallback(
    async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApiData<FoxDataType>(
          `https://randomfox.ca/floof`,
        );
        setFoxData(data);
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
      <h1 className="mb-8 text-2xl font-bold">② Fox API</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {foxData && (
        <div>
          <img src={foxData.image} alt="fox" className="max-w-xs mb-4" />
          <p>
            <a
              href={foxData.link}
              className="text-sm text-blue-600 underline hover:text-blue-800 border-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              API: Created by xinitrc
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
