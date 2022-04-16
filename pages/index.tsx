import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    // start user on PageA (Word Averager)
    // TODO: Change this back to PageA when done working on PageB
    router.push("/PageB");
  }, [router]);
  return null;
};

export default Home;
