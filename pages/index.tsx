import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    // start user on PageA (Word Averager)
    router.push("/PageA");
  }, [router]);
  return null;
};

export default Home;
