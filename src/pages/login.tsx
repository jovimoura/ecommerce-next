import type { GetServerSideProps, NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Camera } from "phosphor-react";
import { InputFile } from "../components/InputFile";
import { api } from "../services/api";
import { toBase64 } from "../use-cases/toBase64";
import { parseCookies } from "nookies";
import Image from "next/image";

interface FormValues {
  signUpName: string;
  signUpEmail: string;
  signUpPassword: string;
  email: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { "auth_next-token": token } = parseCookies(ctx);
  console.log(`token: ${token}`);

  if (token) {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login: NextPage = () => {
  const [page, setPage] = useState<"signIn" | "signUp">("signIn");

  const { register, handleSubmit, unregister } = useForm<FormValues>();

  const { signIn } = useContext(AuthContext);

  const [file, setFile] = useState();

  const handleClearInputs = () => {
    unregister("signUpEmail");
    unregister("signUpName");
    unregister("signUpPassword");
  };

  const handleSign: SubmitHandler<FormValues> = async (data) => {
    const { message } = await signIn(data);
    if (message.startsWith("Error")) alert("Email or password is wrong!");
    else return;
  };

  const handleSignUp: SubmitHandler<FormValues> = async (data) => {
    try {
      api
        .post("/api/login/signUp", {
          name: data.signUpName,
          email: data.signUpEmail,
          password: data.signUpPassword,
          avatarUrl: await toBase64(file),
        })
        .then((res) => alert(`${res.data.message}`));
      setPage("signIn");
      handleClearInputs();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  function handleSetFile(e: any) {
    setFile(e.target.files[0]);
  }

  function handleChangePage() {
    if (page === "signIn") {
      setPage("signUp");
    } else {
      setPage("signIn");
    }
  }

  return (
    <>
      <Head>
        <title>Login - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <Image
              height={48}
              width={48}
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              {page === "signIn" ? "Entre na sua Conta" : "Crie uma conta!"}
            </h2>
            <div className='w-full flex justify-end'>
              <span className='text-xs mr-2'>
                {page === "signIn"
                  ? "Precisa criar uma conta?"
                  : "Já possui uma conta?"}
              </span>
              <button
                onClick={handleChangePage}
                className='text-xs underline text-blue-600 cursor-pointer'
              >
                {page === "signIn" ? "Criar Conta" : "Login"}
              </button>
            </div>
          </div>
          {page === "signIn" ? (
            <form
              onSubmit={handleSubmit(handleSign)}
              className='mt-8 space-y-6'
            >
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='rounded-md shadow-sm'>
                <div>
                  <label htmlFor='email-address' className='sr-only'>
                    E-mail
                  </label>
                  <input
                    className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    id='email'
                    type='email'
                    required
                    autoComplete='email'
                    placeholder='E-mail'
                    {...register("email")}
                  />
                </div>
                <div className='mt-2'>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    {...register("password")}
                    className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Senha'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    Lembre-se de mim
                  </label>
                </div>

                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon
                      className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  Entrar
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleSignUp)} className='mt-8'>
              <div className='flex justify-between'>
                <div>
                  <div className='rounded-md shadow-sm'>
                    <div className='mb-2'>
                      <label htmlFor='signUpName' className=''>
                        Name
                      </label>
                      <input
                        {...register("signUpName")}
                        className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        id='signUpName'
                        name='signUpName'
                        type='text'
                        required
                        placeholder='Nome Completo'
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor='email-address' className=''>
                        E-mail
                      </label>
                      <input
                        {...register("signUpEmail")}
                        className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        id='signUpEmail-address'
                        name='signUpEmail'
                        type='email'
                        autoComplete='email'
                        required
                        placeholder='E-mail'
                      />
                    </div>
                    <div>
                      <label htmlFor='password' className=''>
                        Senha
                      </label>
                      <input
                        {...register("signUpPassword")}
                        className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        id='signUpPassword'
                        name='signUpPassword'
                        type='password'
                        autoComplete='current-password'
                        required
                        placeholder='Senha'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex justify-center items-center flex-col'>
                    {file ? (
                      <Image
                        width={165}
                        height={165}
                        className='w-[165px] h-[165px] rounded-full'
                        src={URL.createObjectURL(file)}
                        alt='logo user'
                      />
                    ) : (
                      <div className='w-[165px] h-[165px] rounded-full bg-zinc-100 flex items-center justify-center gap-1'>
                        <Camera className='w-6 h-6' />
                        <span className='font-bold text-base text-center'>
                          Foto de Perfil
                        </span>
                      </div>
                    )}
                    <InputFile
                      title='Selecione uma foto de Perfil'
                      accept='image/*'
                      onChange={handleSetFile}
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Criar Conta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
