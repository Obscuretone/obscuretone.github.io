import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

const copy = {
  en: {
    heading: "Analytics cookies",
    summary: "Obscuretone uses Google Analytics to count visits and see which public pages people read. Analytics is optional.",
    allow: "Allow analytics",
    decline: "Decline analytics",
    settings: "Analytics settings",
    privacy: "Privacy",
  },
  fr: {
    heading: "Témoins de mesure d’audience",
    summary: "Obscuretone utilise Google Analytics pour compter les visites et connaître les pages publiques consultées. Ce choix est facultatif.",
    allow: "Accepter la mesure d’audience",
    decline: "Refuser la mesure d’audience",
    settings: "Préférences de mesure d’audience",
    privacy: "Confidentialité",
  },
};

export default function AnalyticsConsent() {
  const router = useRouter();
  const lang = router.query.lang === "fr" ? "fr" : "en";
  const c = copy[lang];

  useEffect(() => {
    const track = () => window.dispatchEvent(new Event("analytics-page-change"));
    router.events.on("routeChangeComplete", track);
    return () => router.events.off("routeChangeComplete", track);
  }, [router.events]);

  return (
    <>
      <div className="analytics-footer-links">
        <a href={lang === "fr" ? "/privacy#fr" : "/privacy"}>{c.privacy}</a>
        <button type="button" data-analytics-open hidden>{c.settings}</button>
      </div>
      <section className="analytics-banner" lang={lang} hidden data-analytics-id="G-GEVFD7WK71" aria-labelledby="analytics-heading">
        <div className="analytics-inner">
          <div>
            <h2 id="analytics-heading">{c.heading}</h2>
            <p>{c.summary} <a href={lang === "fr" ? "/privacy#fr" : "/privacy"}>{c.privacy}</a></p>
          </div>
          <div className="analytics-choices">
            <button type="button" data-analytics-choice="granted">{c.allow}</button>
            <button type="button" data-analytics-choice="denied">{c.decline}</button>
          </div>
        </div>
      </section>
      <Script src="/analytics-consent.js" strategy="afterInteractive" />
    </>
  );
}
