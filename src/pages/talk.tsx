import Head from "next/head";
import { Clock, Envelope, WhatsappLogo } from "phosphor-react";
import { Input } from "../components/Input";

export default function TalkWithUs() {
  return (
    <>
      <Head>
        <title>Fale Conosco - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full flex flex-col min-h-screen'>
        <div className='w-full py-10 flex items-center justify-center bg-indigo-500 text-white mt-4'>
          <h1 className='font-primary leading-5 text-4xl font-bold'>
            Fale Conosco
          </h1>
        </div>
        <div className='flex items-start justify-center md:w-full'>
          <div className='mt-7 py-5 flex flex-col gap-7 md:gap-0 md:flex-row items-start justify-center md:justify-around md:w-full'>
            <div className='flex items-center gap-3'>
              <div className='p-2 border-2 border-indigo-500 rounded-full'>
                <WhatsappLogo className='text-indigo-500' size={48} />
              </div>
              <div className='font-secondary flex flex-col justify-center items-start'>
                <h1 className='font-semibold text-xl'>Whatsapp</h1>
                <span className='text-base font-normal'>
                  +55 (21) 9849547-53
                </span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 border-2 border-indigo-500 rounded-full'>
                <Envelope className='text-indigo-500' size={48} />
              </div>
              <div className='font-secondary flex flex-col justify-center items-start'>
                <h1 className='font-semibold text-xl'>E-mail</h1>
                <span className='text-base font-normal'>
                  joaovictors.mouraa@gmail.com
                </span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 border-2 border-indigo-500 rounded-full'>
                <Clock className='text-indigo-500' size={48} />
              </div>
              <div className='font-secondary flex flex-col justify-center items-start'>
                <h1 className='font-semibold text-xl'>Atendimento</h1>
                <span className='text-base font-normal'>
                  Seg. a Sexta: 8:00h às 17:00h.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='py-[60px] w-full flex flex-col px-10 gap-10'>
          <h1 className='text-5xl font-bold font-primary'>
            Envie sua mensagem
          </h1>
          <div className='flex items-center justify-center flex-col gap-5 md:flex-row'>
            <Input placeholder='Seu nome' />
            <Input placeholder='Seu e-mail' />
          </div>
          <div className='flex items-center justify-center flex-col gap-5 md:flex-row'>
            <Input placeholder='Seu celular' />
            <Input placeholder='Assunto' />
          </div>
          <textarea
            name=''
            id=''
            placeholder='Mensagem'
            className='resize-none w-full appearance-none border-b border-b-indigo-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          />
          <div className='w-full flex justify-start'>
            <button className='flex items-center justify-center py-2 px-9 rounded-[50px] font-normal leading-6 text-white bg-indigo-500 hover:bg-indigo-400 transition-colors'>
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
