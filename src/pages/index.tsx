import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { PokebalCssImage } from "../components/pokebal-css-image";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row lg:gap-8">
          <PokebalCssImage className="w-36 h-36" />

          <div>
            <h1 className="text-5xl font-bold">Make your pokéballs full</h1>
            <p className="py-6">
              You can pick pokémons and prepare your own pokéballs in this app.
              Excited like hell, right?
            </p>
            <Link href="/pokeballs">
              <a className="btn btn-primary" data-testid="cta-button">
                Go catch &apos;em!
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
