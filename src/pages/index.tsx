import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../components/Layout";

const HomePage: NextPage<{ name: string }> = (props) => {
  const [name, setName] = useState(props.name);

  const handleGetReviews = async () => {
    // Client-side request are mocked by `mocks/browser.js`.
    const res = await fetch("/name");
    const data = await res.json();
    setName(data);
  };

  return (
    <Layout>
      <h1>Make your pokeball full</h1>
      <button type="button" onClick={handleGetReviews}>
        Fetch
      </button>
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.js`.
  const res = await fetch("https://my.backend/name");
  const name = await res.json();

  return {
    props: {
      name: name,
    },
  };
}
