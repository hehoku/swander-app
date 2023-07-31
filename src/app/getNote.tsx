async function getData() {
  const res = await fetch(
    `https://api.api-ninjas.com/v1/quotes?category=great`,
    {
      headers: {
        "X-Api-Key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      // 默认情况下， fetch 会自动获取并无限期地缓存数据
      // 要在定时间隔内重新验证缓存数据，您可以使用 next.revalidate 选项在 fetch() 中设置资源的 cache 生命周期（以秒为单位）。

      next: { revalidate: 1 },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Quote() {
  const data = await getData();

  return (
    <main className="h-full flex flex-col gap-10 justify-center items-center">
      <p className="text-2xl font-bold">{data[0].quote}</p>
      <p className="text-xl font-bold italic justify-self-end items-end">
        ——{data[0].author}
      </p>
    </main>
  );
}
