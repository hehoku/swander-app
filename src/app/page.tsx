import ExampleClientComponent from "./client";
import Quote from "./getNote";

export default function Home() {
  return (
    <div className="h-screen bg-[#F3FCFB] p-10">
      <h1 className="text-4xl text-[#245C7C] font-extrabold text-center">
        Swander
      </h1>
      <div className="flex flex-col items-center justify-center h-3/4">
        <ExampleClientComponent>
          <Quote />
        </ExampleClientComponent>
      </div>
    </div>
  );
}
