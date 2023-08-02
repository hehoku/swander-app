L## App Router
使用 `page.js` 文件使路由公开可访问。如果文件夹内没有 `page.js` 文件，则这个路由不可公开访问。

## Server Component & Client Component
App Router内的所有组件默认都是服务器组件，还可以选择使用“use client”指令来选择性地使用客户端组件。

- 非交互式的组件可以作为服务器组件在服务器上渲染。
- 较小的交互式 UI 部分，可以加入客户端组件。

### Server Component 优势
- 更好地利用服务器基础设施。例如，您可以将数据获取移动到服务器上，靠近数据库，并在服务器上保留以前可能会影响客户端JavaScript包大小的大型依赖项，从而提高性能。
- 初始页面加载速度更快，客户端JavaScript包的大小减小。基本的客户端运行时大小可缓存且可预见，并且不会随着应用程序的增长而增加。只有在应用程序通过客户端组件使用客户端交互性时，才会添加额外的JavaScript。

### Client Server
客户端组件使您能够为应用程序添加客户端交互性。在Next.js中，它们在服务器上进行预渲染，并在客户端上进行水合物处理。您可以将客户端组件视为页面路由中组件的工作方式。

一旦在文件中定义了 "use client" ，所有导入到它的其他模块，包括子组件，都被视为客户端包的一部分。

### 何时使用 Server and Client Component
#### 选择使用 Server Component
- 获取数据
- 直接访问后端资源
- 将敏感信息（访问令牌、API 密钥）保存在服务器上

#### 使用 Client Component
- 添加互动性和事件监听器（ onClick() ， onChange() ，等等）
- 使用状态和生命周期效果（ useState() ， useReducer() ， useEffect() 等）
- 使用仅限浏览器的API
- 使用依赖于状态、效果或仅在浏览器中可用的自定义钩子
- 使用React类组件

## Patterns
### 将客户端组件移至叶子节点
不要将整个布局作为客户端组件，而是将交互逻辑移至客户端组件（例如， <SearchBar /> ），并将布局保留为服务器端组件。这意味着您不必将布局的所有组件Javascript发送到客户端。

> 注：不能将服务器组件导入客户端组件中。推荐将服务器组件作为属性传递给客户端组件。

```tsx
// bad case
'use client'
 
// This pattern will **not** work!
// You cannot import a Server Component into a Client Component.
import ExampleServerComponent from './example-server-component'
 
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      <ExampleServerComponent />
    </>
  )
}
```

推荐方法:
```tsx
'use client'
 
import { useState } from 'react'
 
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      {children}
    </>
  )
}
```

### Fetch 数据
默认情况下， fetch 会自动获取并无限期地缓存数据。
要在定时间隔内重新验证缓存数据，您可以使用 next.revalidate 选项在 fetch() 中设置资源的 cache 生命周期（以秒为单位）。

```tsx
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
```

## Routing
Next.js 13 引入了一个基于 React Server Components 构建的新的 App Router,支持共享
布局、嵌套路由，加载状态，错误处理.

App Router 在一个名为 app 的新目录中工作。 app 目录与 pages 目录一起工作，以实现
增量采用。

App Router 优先于 Pages Router。默认情况下，app 内的组件是 React Sever Component

Next.js 使用基于文件系统的路由器，文件夹用于定义路由。

特殊的文件:
layout 用于段落及其子段落的共享用户界面
page 唯一的路由页面，使 routes 可公开访问
loading 为 segment 及其 children 加载页面
not-found
error
global-error 全局错误界面
route 服务器端API端点
template 重新渲染的 UI 布局页面

### Layout
Layout 在当前 segment 上共享。app 目录必须包含一个 root layout 文件，root layout
必须定义 `<html>` 和 `<body>` 标签。

### Linking and Navigating
使用 `<Link href="/url>Go</Link>` 进行导航

支持动态 Link `<Link href={`/blog/${post.slug}`}`

支持滚动到特定的 id
`<Link href="/dashboard#settings">Settings</Link>`

使用 `useRouter()`:

```js
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

### 文件组织
- project
  - app
    - components
      ...
    - lib
      ...
    - url
      - components
      - lib
      - page.js
    page.js

### Route Handler 后端 API 处理
route handler 在 app 目录内的 `route.ts | js` 文件中定义

```ts
export async function GET(request: Request) {}
```
