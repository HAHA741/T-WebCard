import { useState } from "react";
import Head from "@/components/head/head";
import Content from "@/views/content/content";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Head />
      <Content />
    </>
  );
}

export default App;
