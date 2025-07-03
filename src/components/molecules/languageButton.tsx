import { useTranslation } from "react-i18next";
import type { LangType } from "../../types/global";

const LangButton = ({ lang, label }: { lang: LangType; label: string }) => {
  const { i18n } = useTranslation();
  return (
    <button
      onClick={() => i18n.changeLanguage(lang)}
      className={`px-4 pt-2 pb-1 border-2 border-neutral-800 text-sm rounded ${i18n.language === lang ? "bg-yellow-400" : "bg-transparent"}`}
    >
      {label}
    </button>
  );
};

const LanguageButton = () => {
  const langs = [
    { lang: "ja", label: "日本語" },
    { lang: "en", label: "English" },
  ] as const;

  return (
    <div className="header--language flex flex-row gap-2 justify-center mt-4 transition-opacity duration-700">
      {langs.map(({ lang, label }) => (
        <LangButton key={lang} lang={lang} label={label} />
      ))}
    </div>
  );
};

export default LanguageButton;
