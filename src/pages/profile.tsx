import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Camera } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { Input } from "../components/Input";
import { InputFile } from "../components/InputFile";
import { Loading } from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";
import { prisma } from "../lib/prisma";
import { api } from "../services/api";
import { toBase64 } from "../use-cases/toBase64";

interface Props {
  item: {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    password: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { "auth_next-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const item = await prisma.users.findUnique({
    where: {
      id: token,
    },
  });
  const data = {
    id: item?.id,
    name: item?.name,
    avatarUrl: item?.avatarUrl,
    email: item?.email,
    password: item?.password,
  };

  return {
    props: {
      item: data,
    },
  };
};

export default function Profile({ item }: Props) {
  const router = useRouter();

  const [name, setName] = useState(item?.name || "");
  const [email, setEmail] = useState(item?.email || "");
  const [password, setPassword] = useState(item.password || "");
  const [confirmPassword, setConfirmPassword] = useState(item.password || "");
  const [avatarUrl, setAvatarUrl] = useState(item.avatarUrl || "");

  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);

  function handleSetImage(e: any) {
    setImage(e.target.files[0]);
  }

  async function handleSaveUser(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    let obj = {
      name,
      email,
      password,
      avatarUrl: image ? toBase64(image) : avatarUrl,
    };
    await api
      .patch(`/api/edit-user/${item.id}`, obj)
      .then((res) => {
        setIsLoading(false);
        router.reload();
        alert("Dados atualizados!");
      })
      .catch((_) => {
        setIsLoading(false);
        alert("User not edited!");
      });
  }

  return (
    <>
      <Head>
        <title>Perfil - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full py-10 flex items-center justify-center bg-indigo-500 text-white mt-4'>
        <h1 className='font-primary leading-5 text-4xl font-bold'>
          Meu Perfil
        </h1>
      </div>
      <div className='flex flex-col h-[calc(100vh-200px)] md:flex-row gap-10 justify-center items-center w-full'>
        <div className='flex item-center justify-center'>
          <div className='flex justify-center items-center flex-col'>
            {item.avatarUrl || image ? (
              <label
                htmlFor='inputfile'
                className='cursor-pointer w-[165px] h-[165px] rounded-full bg-zinc-100 flex items-center justify-center gap-1'
              >
                <Image
                  className='w-[165px] h-[165px] rounded-full'
                  width={165}
                  height={165}
                  src={
                    image !== null
                      ? URL.createObjectURL(image)
                      : (item.avatarUrl as string)
                  }
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
        <form onSubmit={handleSaveUser} className='w-2/5 flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <Input
              id='name'
              type='text'
              required
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              id='price'
              type='text'
              required
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              id='price'
              type='password'
              required
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Input
              id='price'
              type='password'
              required
              placeholder='Confirme sua nova senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='w-full flex justify-end mt-2'>
            <button
              disabled={isLoading}
              className='flex items-center gap-3 bg-indigo-500 px-5 h-12 rounded-md font-semibold text-white hover:bg-indigo-600 transition-colors'
              type='submit'
            >
              {isLoading ? <Loading /> : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
