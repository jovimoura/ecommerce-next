import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <div className='flex flex-1 flex-col items-center pt-4'>
      <Head>
        <title>About me</title>
        <link
          rel='icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
        />
      </Head>
      <div className='flex mx-auto justify-around w-4/5 flex-col md:flex-row'>
        <div>
          <Image
            src={`https://avatars.githubusercontent.com/u/82558597?v=4`}
            width='400'
            height='400'
            alt='dev-jovimoura'
          />
        </div>
        <div className='w-full md:w-[400px] flex flex-col gap-4 text-gray-900'>
          <p>
            Hi!
            <Image
              src='https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif'
              width='28'
              height='28'
              alt='gif'
            />{" "}
            My name is John Moura.
          </p>
          <p>
            {`This project it's a Ecommerce and then we have 2 types of perfil.
            The first one, it's a Admin perfil, and we can create new items on
            Marketplace and the second one it's a user perfil and the user can
            buy and see your items.`}
          </p>
          <p>
            {`It's a simple Ecommerce, so we don't have much pages, just the
            principal pages, to user and to Admin person.`}
          </p>
          <p>
            I hope you liked this project and if you want to see others of my
            projects, access my{" "}
            <a
              className='hover:underline'
              target='_blank'
              rel='noreferrer'
              href='https://portfolio-jovimoura.vercel.app/'
            >
              Portfolio
            </a>{" "}
            or my{" "}
            <a
              className='hover:underline'
              target='_blank'
              rel='noreferrer'
              href='https://github.com/jovimoura'
            >
              Github
            </a>{" "}
            perfil.
          </p>
          <p>Have a great day!</p>
        </div>
      </div>
    </div>
  );
}
