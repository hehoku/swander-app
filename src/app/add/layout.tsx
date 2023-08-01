export default function AddQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <header className="h-20 sticky flex flex-row items-center justify-start px-20 border-b-2 bg-gray-50 border-gray-200">
          <h2 className="text-2xl font-bold">Add Quote</h2>
          <nav className="h-20 flex bg-[hsla(0,0%,100%,.8)] backdrop-saturate-[1.8] blur-sm">
            <div className="w-2/3 h-20"></div>
          </nav>
        </header>
        <main className="w-3/4 items-center justify-center flex mx-auto">{children}</main>
      </body>
    </html>
  );
}
