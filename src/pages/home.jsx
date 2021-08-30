import * as React from "react";
import { Link } from "wouter";
import { Random } from "../components/random.jsx";
import { Drop } from "../components/drop.jsx";

export default function Home() {
  return (
    <>
      <Random />
      <Drop />
    </>
  );
}
