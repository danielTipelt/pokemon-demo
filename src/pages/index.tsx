import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { PokebalCssImage } from "../components/pokebal-css-image";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1>Make your pokéballs full</h1>
      <p data-testid="description">
        You can pick pokémons and prepare your own pokéballs in this app.
        Excited like hell, right?
      </p>
      <PokebalCssImage className="w-24 h-24" />
      <Link href="/pokeballs">
        <a data-testid="cta-button">Go catch &apos;em!</a>
      </Link>
    </Layout>
  );
};

export default HomePage;
