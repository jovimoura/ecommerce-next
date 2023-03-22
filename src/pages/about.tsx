import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <div className='flex flex-1 flex-col items-center pt-4'>
      <Head>
        <title>About me - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full py-10 flex items-center justify-center bg-indigo-500 text-white mb-4'>
        <h1 className='font-primary leading-5 text-4xl font-bold'>Sobre mim</h1>
      </div>
      <div className='flex mx-auto justify-around w-4/5 h-full md:h-screen flex-col md:flex-row'>
        <div>
          <Image
            src={`https://avatars.githubusercontent.com/u/82558597?v=4`}
            width='400'
            height='400'
            alt='dev-jovimoura'
          />
        </div>
        <div className='w-full md:w-[400px] flex flex-col gap-4 text-gray-900'>
          <p className='flex items-start justify-start gap-2'>
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
            {`In that project I used all technologies, frameworks and everything I learned about UI/UX in the 2022.
              I updated my E-commerce, now I use not only Next.js, in its version 13, but I also use GraphQL with GraphCMS, Redux, Prisma and other libs in the Front-end of the project.
              In it you have everything an e-commerce has so if you find a bug or if you want to leave feedback, use the feedback box, I will be very happy to hear from you! ✌`}
          </p>
          <p>
            I hope you liked this project and if you want to see others of my
            projects, access my{" "}
            <a
              className='hover:underline text-indigo-500'
              target='_blank'
              rel='noreferrer'
              href='https://portfolio-jovimoura.vercel.app/'
            >
              Portfolio
            </a>{" "}
            or my{" "}
            <a
              className='hover:underline text-indigo-500'
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
