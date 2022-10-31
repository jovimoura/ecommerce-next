import Head from 'next/head'

export default function FourOhFour() {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/color/48/000000/search--v1.png"
          type="image/x-icon"
        />
        <title>Page not founded...</title>
      </Head>
      <div className="h-[calc(100vh-65px)] flex flex-1 justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold">
          This page doesn't exists, please come back with navigation bar{' '}
        </h1>
      </div>
    </>
  )
}
