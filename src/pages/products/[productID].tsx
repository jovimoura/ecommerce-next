import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  CaretLeft,
  Heart,
  Minus,
  Plus,
  ShareNetwork,
  ShoppingCartSimple,
  Star,
} from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../@types/item";
import { graphcms } from "../../graphql/graphcms";
import { addToCart } from "../../redux/cart.slice";
import { convertToReal } from "../../use-cases/convertToReal";

interface Props {
  item: Product;
}

const GET_PRODUCT_BY_ID = gql`
  query ($id: ID!) {
    product(where: { id: $id }) {
      categorie
      color
      name
      id
      price
      description {
        html
      }
      image {
        url
        id
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { productID } = ctx.params;

  const { product } = await graphcms.request(GET_PRODUCT_BY_ID, {
    id: productID,
  });
  console.log(product);
  return {
    props: {
      item: product,
    },
  };
};

export default function ProductItem({ item }: Props) {
  const [viewDescription, setViewDescription] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleBack = () => router.back();

  const handleViewDescription = () => {
    setViewDescription(!viewDescription);
  };

  const handleBuyItem = () => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <Head>
        <title>{item.name} - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://img.icons8.com/fluency/48/000000/shopping-cart.png'
          type='image/x-icon'
        />
      </Head>
      <div className='h-full md:min-h-[calc(100vh-110px)]'>
        <div className='pl-0 md:pl-5 pt-3 font-sans'>
          <button
            className='flex gap-2 items-center text-2xl text-gray-900 font-bold hover:text-indigo-500 transition-colors'
            onClick={handleBack}
          >
            <CaretLeft weight='bold' size={28} />
          </button>
        </div>
        <div className='flex flex-col md:flex-row gap-5 mx-auto justify-center items-center font-sans'>
          <div className='w-full md:w-1/2 px-auto flex justify-center items-center'>
            <Image
              alt='perfil-photo'
              width={350}
              height={350}
              src={item.image.url}
            />
          </div>
          <div className='w-full md:w-2/5 px-auto flex flex-col justify-center items-left text-gray-900'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
              <div>
                <h1 className='text-2xl md:text-4xl font-primary leading-2 font-bold'>
                  {item.name}
                </h1>
                <div className='mt-3 flex gap-2 items-center justify-left'>
                  <span className='text-sm font-extralight'>
                    Ref: {item.id.substring(0, 6).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5 pl-5 md:pl-0'>
              <h3 className='text-3xl md:text-5xl font-bold'>
                {convertToReal(item.price)}{" "}
                <span className='text-lg font-medium'>No boleto ou PIX</span>
              </h3>
              <span>
                ou <span className='font-bold'>10x</span> de{" "}
                <span className='font-bold'>
                  {convertToReal(item.price / 10)}
                </span>
              </span>
            </div>
            <div className='flex w-full justify-center mt-5'>
              <button
                onClick={handleBuyItem}
                className='group relative flex w-full justify-center rounded-md border border-transparent leading-5 bg-indigo-600 py-3 px-4 text-lg font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <ShoppingCartSimple
                    weight='fill'
                    size={32}
                    className='text-indigo-400'
                  />
                </div>
                Adicionar ao carrinho
              </button>
            </div>
            <button
              className={`mt-5 w-full flex py-3 px-4 items-center justify-start gap-4 border-b border-b-indigo-500 font-bold font-primary ${
                viewDescription ? "text-indigo-500" : ""
              }`}
              onClick={handleViewDescription}
            >
              {!viewDescription ? (
                <Plus size={16} weight='bold' />
              ) : (
                <Minus size={16} weight='bold' className='text-indigo-500' />
              )}
              Descrição
            </button>
          </div>
        </div>
        {viewDescription ? (
          <div className='mt-5 w-full px-5 flex flex-col items-end justify-end '>
            <div className='w-full md:w-2/5 px-auto'>
              <h1 className='font-primary font-bold leading-5 text-xl mb-4'>
                Descrição do produto
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: item?.description?.html }}
                className='w-full font-sans text-sm text-gray-600'
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
