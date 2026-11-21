import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";

export default function Privacy() {
  return (
    <>
      <Head><title>Privacy · Obscuretone</title></Head>
      <SiteHeader />
      <main className="analytics-privacy">
        <section lang="en">
          <h1>Privacy</h1>
          <p>When analytics is allowed, Obscuretone loads Google Analytics and uses cookies to count visits and measure views of public pages. Analytics reports receive the page address without query strings. The choice can be changed using Analytics settings at the bottom of the site.</p>
          <p><a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites that use its services</a></p>
        </section>
        <section id="fr" lang="fr">
          <h2>Confidentialité</h2>
          <p>Lorsque la mesure d’audience est acceptée, Obscuretone charge Google Analytics et utilise des témoins pour compter les visites et mesurer la consultation des pages publiques. L’adresse de la page est transmise sans ses paramètres. Le choix peut être modifié dans les préférences de mesure d’audience, au bas du site.</p>
          <p><a href="https://policies.google.com/technologies/partner-sites?hl=fr">Comment Google utilise les renseignements provenant de sites qui utilisent ses services</a></p>
        </section>
      </main>
    </>
  );
}
