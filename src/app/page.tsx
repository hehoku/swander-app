import Link from "next/link";
import ExampleClientComponent from "./client";
import Quote from "./getNote";

export default function Home() {
  return (
    <div className="h-screen bg-[#F3FCFB] p-10">
      <h1 className="text-4xl text-[#245C7C] font-extrabold text-center">
        Swander
      </h1>
      <div className="flex flex-col items-center justify-center w-3/4 gap-10 mx-auto mt-20">
        <ExampleClientComponent>
          <Quote />
        </ExampleClientComponent>
        <Link href="/add">
          <button className="px-4 py-2 bg-green-300 rounded-md">
            Add Quote
          </button>
        </Link>
      </div>
    </div>
  );
}
