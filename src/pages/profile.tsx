import { Boughts } from "@prisma/client";
import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Input } from "../components/Input";
import { InputFile } from "../components/InputFile";
import { Loading } from "../components/Loading";
import { graphcms } from "../graphql/graphcms";
import { prisma } from "../lib/prisma";
import { api } from "../services/api";
import { convertToReal } from "../use-cases/convertToReal";
import { toBase64 } from "../use-cases/toBase64";

interface Props {
  item: {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    password: string;
  };
  myRequests: Boughts[];
  allItemsRequested: {
    createdAt: string;
    id: string;
    idItem: string;
    idUser: string;
    image: { url: string };
    name: string;
    price: number;
    qtd: number;
    status: string;
    updatedAt: string;
  }[];
}

const GET_PRODUCT_BY_ID = gql`
  query ($id: ID!) {
    product(where: { id: $id }) {
      name
      id
      price
      image {
        url
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { "auth_jmShop-token": token } = parseCookies(ctx);

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

  const myRequestsData = await prisma.boughts.findMany({
    where: {
      idUser: token,
    },
  });
  const myRequests = myRequestsData.map((item) => {
    return {
      id: item.id,
      idItem: item.idItem,
      idUser: item.idUser,
      status: item.status,
      qtd: item.qtd,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  });

  const allItemsRequested = [];

  for (let index = 0; index < myRequests.length; index++) {
    const { product } = await graphcms.request(GET_PRODUCT_BY_ID, {
      id: myRequests[index].idItem,
    });
    let obj = {
      ...product,
      ...myRequests[index],
    };
    allItemsRequested.push(obj);
  }

  return {
    props: {
      item: data,
      myRequests,
      allItemsRequested,
    },
  };
};

export default function Profile({
  item,
  myRequests,
  allItemsRequested,
}: Props) {
  console.log("allItemsRequested", allItemsRequested);

  const router = useRouter();
  const { type } = router.query;

  const [name, setName] = useState(item?.name || "");
  const [email, setEmail] = useState(item?.email || "");
  const [password, setPassword] = useState(item.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      avatarUrl: image ? await toBase64(image) : avatarUrl,
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
      <div className='w-full flex items-center justify-center gap-10 py-6 text-xl font-semibold text-gray-500 font-primary'>
        <Link
          href='/profile?type=my-requests'
          className={`${type === "my-requests" ? "text-indigo-500 " : ""}`}
        >
          Meus Pedidos
        </Link>
        <Link
          href='/profile?type=config'
          className={`${type === "config" ? "text-indigo-500 " : ""}`}
        >
          Configurações
        </Link>
      </div>
      <div className='flex flex-col h-[calc(100vh-200px)] md:flex-row gap-10 justify-center items-center w-full'>
        <>
          {type === "config" ? (
            <>
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
              <form
                onSubmit={handleSaveUser}
                className='w-full px-5 md:p-0 md:w-2/5 flex flex-col gap-5'
              >
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
                    placeholder='Nova senha'
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
            </>
          ) : (
            allItemsRequested.map((item) => (
              <div
                key={item.id}
                className={`shadow cursor-pointer px-4 py-3 rounded-lg flex flex-col justify-center items-center gap-2 text-gray-900 w-full max-w-[260px] min-h-[170px]`}
              >
                <Image src={item.image.url} alt='' width={150} height={162} />
                <div className='font-secondary text-indigo-500 font-medium text-sm gap-1 flex flex-col w-full justify-start'>
                  <span className='font-light text-lg capitalize'>
                    <span className='text-gray-900 font-medium'>
                      Código de compra:
                    </span>{" "}
                    {item.id.substring(0, 6).toUpperCase()}
                  </span>
                </div>
                <h1 className='text-lg font-medium font-secondary break-words'>
                  Nome:{" "}
                  <span className='text-indigo-500 font-light'>
                    {item.name}
                  </span>
                </h1>
                <div className='font-secondary text-indigo-500 font-medium text-sm gap-1 flex flex-col w-full justify-start'>
                  <span className='font-light text-lg'>
                    <span className='text-gray-900 font-medium'>Valor:</span>{" "}
                    {convertToReal(item.price)}
                  </span>
                </div>
                <div className='font-secondary text-indigo-500 font-medium text-sm gap-1 flex flex-col w-full justify-start'>
                  <span className='font-light text-lg capitalize'>
                    <span className='text-gray-900 font-medium'>Status:</span>{" "}
                    {item.status}
                  </span>
                </div>
                <div className='w-full flex justify-start'>
                  <Link
                    href={`/products/${item.idItem}`}
                    className='flex items-center justify-center py-2 px-9 rounded-[50px] font-normal leading-6 text-white bg-indigo-500 hover:bg-indigo-400 transition-colors'
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            ))
          )}
        </>
      </div>
    </>
  );
}
