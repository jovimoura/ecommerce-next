import Image from "next/image";
import Link from "next/link";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

export const Footer = () => {
  return (
    <>
      <div className='w-full bg-[#FAFAFA] flex flex-col md:flex-row gap-10 md:gap-0 text-center md:text-left items-center justify-around py-10'>
        <Link href='/'>
          <div className='flex-shrink-0 flex items-center justify-center gap-2'>
            <Image
              height={32}
              width={32}
              className='h-8 w-8'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
              alt='Workflow'
            />
            <span className='text-xl font-medium text-indigo-500 font-primary'>
              J.M. Shop
            </span>
          </div>
        </Link>
        <div className='flex flex-col md:flex-row items-start h-full justify-center gap-[47px] md:gap-[70px]'>
          <div className='flex flex-col items-center md:items-start justify-start h-full w-full md:w-auto'>
            <h1 className='font-primary font-bold text-lg leading-6 mb-[26px] uppercase'>
              FALE CONOSCO
            </h1>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              Whatsapp: <br />
              <b>+55 (21) 9849547-53</b>
            </span>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-5'>
              Email: <br />
              <b>joaovictors.mouraa@gmail.com</b>
            </span>
            <h1 className='font-primary font-bold text-lg leading-6 mb-[26px] uppercase'>
              ATENDIMENTO
            </h1>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              Seg. a Sexta: <br />
              8:00h às 17:00h
            </span>
          </div>
          <div className='flex flex-col items-center md:items-start justify-start h-full w-full md:w-auto'>
            <h1 className='font-primary font-bold text-xl leading-6 mb-[26px] uppercase'>
              INSTITUCIONAL
            </h1>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              <Link href='/talk'>Fale conosco</Link>
            </span>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              <Link href='/my-account'>Minha conta</Link>
            </span>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              <Link href='/terms'>Termos de uso</Link>
            </span>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline mb-[11px]'>
              <Link href='/my-requests'>Meus pedidos</Link>
            </span>
            <span className='font-secondary font-normal text-[17px] leading-5 hover:underline'>
              <Link href='/about'>Sobre nós</Link>
            </span>
          </div>
          <div className='flex flex-col items-center md:items-start justify-start h-full w-full md:w-auto'>
            <h1 className='font-primary font-bold text-base leading-5 md:text-xl md:leading-6 mb-[26px] w-[118px] md:w-full uppercase'>
              REDES SOCIAIS
            </h1>
            <div className='hidden md:flex flex-col'>
              <a
                target='blank'
                href='https://www.linkedin.com/in/jovimoura10/'
                className='cursor-pointer hover:underline flex items-center gap-[15px] mb-[10px]'
              >
                <LinkedinIcon />
                <span className='font-secondary font-normal text-[17px] leading-5'>
                  LinkedIn
                </span>
              </a>
              <a
                target='blank'
                href='https://www.instagram.com/justjoaorj/'
                className='cursor-pointer hover:underline flex items-center gap-[15px] mb-[10px]'
              >
                <InstagramIcon />
                <span className='font-secondary font-normal text-[17px] leading-5'>
                  Instagram
                </span>
              </a>
              <a
                target='blank'
                href='https://github.dev/jovimoura/'
                className='cursor-pointer hover:underline flex items-center gap-[15px]'
              >
                <GithubIcon />
                <span className='font-secondary font-normal text-[17px] leading-5'>
                  Github
                </span>
              </a>
            </div>
            <div className='flex md:hidden items-center justify-center gap-3'>
              <a
                target='blank'
                href='https://www.linkedin.com/in/jovimoura10/'
                className='cursor-pointer bg-[#FFFFFF] rounded-full flex items-center justify-center w-[32.51px] h-[32.51px]'
              >
                <LinkedinIcon />
              </a>
              <a
                target='blank'
                href='https://www.instagram.com/justjoaorj/'
                className='cursor-pointer bg-[#FFFFFF] rounded-full flex items-center justify-center w-[32.51px] h-[32.51px]'
              >
                <InstagramIcon />
              </a>
              <a
                target='blank'
                href='https://github.dev/jovimoura/'
                className='cursor-pointer bg-[#FFFFFF] rounded-full flex items-center justify-center w-[32.51px] h-[32.51px]'
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className='w-full h-[72px] bg-indigo-500 text-white font-sans justify-around border-t border-t-[#f2f2f28c] hidden md:flex items-center'>
        <span className='font-semibold text-xs leading-5'>
          ©2023 Todos os direitos Reservados. | CNPJ: 45.479.784/0001-10 | John
          Moura
        </span>
        <span className='text-xs font-bold leading-5'>
          Política de Privacidade
        </span>
        <a
          href='https://portfolio-jovimoura.vercel.app/'
          target='_blank'
          rel='noreferrer'
        >
          <div className='flex font-semibold items-center text-xs leading-5 justify-center gap-[11px]'>
            <span>Desenvolvido por John Moura</span>
          </div>
        </a>
      </footer>
      <footer className='flex md:hidden  flex-col items-center justify-center w-full h-[103px] border-t border-[#FFFFFF] bg-indigo-500 text-white'>
        <div className='w-full h-[62px] flex items-center justify-center'>
          <span className='font-semibold text-[7px] leading-[11px] uppercase'>
            ©2023 Todos os direitos Reservados. | CNPJ: 45.479.784/0001-10 |
            John Moura
          </span>
        </div>
        <div className=' w-full h-[41px] flex items-center justify-center'>
          <a
            href='https://portfolio-jovimoura.vercel.app/'
            rel='noreferrer'
            target='_blank'
          >
            <div className='flex font-sans font-semibold text-[7px] leading-3 items-center justify-center gap-1 w-full h-full uppercase cursor-pointer'>
              <span>DESENVOLVIDO POR John Moura</span>
            </div>
          </a>
        </div>
      </footer>
    </>
  );
};
