import type { GetServerSideProps, NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Camera } from "phosphor-react";
import { InputFile } from "../components/InputFile";
import { api } from "../services/api";
import { toBase64 } from "../use-cases/toBase64";
import { parseCookies } from "nookies";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { "auth_jmShop-token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/profile?type=my-requests",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleClearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage(undefined);
  };

  const handleSign = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const { message } = await signIn({ email, password });
    if (message.startsWith("Error")) {
      setIsLoading(false);
      alert("E-mail ou senha estão errados, tente novamente");
    } else {
      setIsLoading(false);
      return;
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert("Confirme sua senha correctamente!");
    } else {
      try {
        setIsLoading(true);
        api
          .post("/api/login/signUp", {
            name,
            email,
            password,
            avatarUrl: toBase64(image),
          })
          .then((res) => alert(`${res.data.message}`));
        setIsLoading(false);
        router.push("/login?type=login");
        handleClearInputs();
      } catch (error) {
        setIsLoading(false);
        console.log(`Error: ${error}`);
      }
    }
  };

  function handleSetImage(e: any) {
    setImage(e.target.files[0]);
  }

  function handleChangePage() {
    if (type === "login") {
      router.push("/login?type=createAcc");
    } else {
      router.push("/login?type=login");
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
      <div className='flex min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans'>
        <div className='w-full md:max-w-3xl space-y-8'>
          <div>
            <Image
              height={48}
              width={48}
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-4xl font-bold tracking-tight font-primary text-gray-900'>
              {type === "login" ? "Entre na sua Conta" : "Crie uma conta!"}
            </h2>
            <div className='w-full flex justify-end'>
              <span className='text-base mr-2'>
                {type === "login"
                  ? "Precisa criar uma conta?"
                  : "Já possui uma conta? Faça o"}
              </span>
              <button
                onClick={handleChangePage}
                className='text-base underline text-blue-600 cursor-pointer'
              >
                {type === "login" ? "Criar Conta" : "Login"}
              </button>
            </div>
          </div>
          {type === "login" ? (
            <form onSubmit={handleSign} className='mt-8 space-y-6'>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='rounded-md shadow-sm'>
                <div>
                  <Input
                    id='email'
                    type='email'
                    required
                    autoComplete='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: 0 }}
                  />
                </div>
                <div className='mt-2'>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: 0 }}
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
                  disabled={isLoading}
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-3 px-4 text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon
                      className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  {isLoading ? <Loading /> : "Entrar"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className='mt-8'>
              <div className='flex flex-col-reverse md:flex-row justify-between gap-5 md:gap-0 items-center'>
                <div className='w-full md:w-1/2'>
                  <div className='rounded-md shadow-sm'>
                    <div className='mb-2'>
                      <Input
                        id='signUpName'
                        name='signUpName'
                        type='text'
                        required
                        placeholder='Nome Completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ paddingLeft: 0 }}
                      />
                    </div>
                    <div className='mb-2'>
                      <Input
                        id='signUpEmail-address'
                        name='signUpEmail'
                        type='email'
                        autoComplete='email'
                        required
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ paddingLeft: 0 }}
                      />
                    </div>
                    <div>
                      <Input
                        id='signUpPassword'
                        name='signUpPassword'
                        type='password'
                        autoComplete='current-password'
                        required
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingLeft: 0 }}
                      />
                    </div>
                    <div>
                      <Input
                        id='signUpConfirmPassword'
                        name='signUpConfirmPassword'
                        type='password'
                        autoComplete='current-password'
                        required
                        placeholder='Confirme sua senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ paddingLeft: 0 }}
                      />
                    </div>
                  </div>
                </div>
                <div className='h-full flex item-center justify-center'>
                  <div className='flex justify-center items-center flex-col'>
                    {image ? (
                      <label
                        htmlFor='inputfile'
                        className='cursor-pointer w-[165px] h-[165px] rounded-full bg-zinc-100 flex items-center justify-center gap-1'
                      >
                        <Image
                          className='w-[165px] h-[165px] rounded-full'
                          width={165}
                          height={165}
                          src={URL.createObjectURL(image)}
                          alt='logo user'
                        />
                        <InputFile
                          id='inputfile'
                          title='Select Perfil Image'
                          accept='image/*'
                          className='hidden'
                          onChange={handleSetImage}
                        />
                      </label>
                    ) : (
                      <label
                        htmlFor='inputfile'
                        className='cursor-pointer w-[165px] h-[165px] flex-col rounded-full shadow-md border-gray-100 flex items-center justify-center gap-1 hover:text-indigo-500 hover:border-indigo-500 transition-colors'
                      >
                        <Camera className='w-6 h-6' />
                        <span className='font-bold text-base text-center'>
                          Foto de perfil
                        </span>
                        <InputFile
                          id='inputfile'
                          title='Select Perfil Image'
                          accept='image/*'
                          className='hidden'
                          onChange={handleSetImage}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-3 px-4 text-xl font-semibold font-primary text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors'
                >
                  {isLoading ? <Loading /> : "Criar Conta"}
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
