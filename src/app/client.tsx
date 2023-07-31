"use client";
import { useState } from "react";

export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <>

      {children}
      <button onClick={() => setCount(count + 1)}>❤️{count}</button>
    </>
  );
}
