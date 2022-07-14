import Link from "next/link";
import { Layout } from "@/components/common/Layout";
import { PokebalCssImage } from "@/components/domain/pokebal-css-image/PokeballCssImage";

export default function HomePage() {
  return (
    <Layout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row lg:gap-8">
          <PokebalCssImage className="w-36 h-36" />

          <div>
            <h1 className="text-5xl font-bold">Make your pokéballs full</h1>
            <p className="py-6" data-testid="description">
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
}
