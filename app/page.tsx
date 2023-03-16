import "../styles/globals.css";

function HomePage() {
  return (
    <div>
      <h1>Hello World</h1>
      <button className="btn bg-slate-500">Hello daisyUI</button>
    </div>
  );
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center py-2">
  //       {/* For SEO */}
  //       <Head>
  //         <title>Garden App</title>
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>

  //       {/* Intro */}
  //       <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center ">
  //         <h1 className="text-6xl font-bold">
  //           Welcome to <p className="text-blue-600 inline-block">Gardening</p>
  //         </h1>

  //         <p className="mt-3 text-2xl">
  //           Map out your
  //           <code className="rounded-md bg-gray-100 p-3 font-mono text-lg ml-2">
  //             planters
  //           </code>
  //         </p>
  //         <button
  //           className="btn btn-primary"
  //           onClick={() => alert("Hello World")}
  //         >
  //           Button
  //         </button>

  //         <div className="flex-1 my-10 w-full h-full">
  //           <Stage />
  //         </div>
  //       </main>

  //       <footer className="flex h-24 w-full items-center justify-center border-t">
  //         <a
  //           className="flex items-center justify-center gap-2"
  //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Powered by Matthew Malone
  //           {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
  //         </a>
  //       </footer>
  //     </div>
  //   );
}

export default HomePage;
