import { GetServerSideProps } from "next";
import Head from "next/head";
import { Product } from "../@types/item";
import { Item } from "../components/Item";
import { graphcms } from "../graphql/graphcms";
import { gql } from "graphql-request";
import { Slider } from "../components/Slider";
import { Article, CreditCard, Lock, Truck } from "phosphor-react";

interface Props {
  items: Product[];
}

const slides = [
  {
    image: "/banners/banner1.avif",
  },
  {
    image: "/banners/banner2.avif",
  },
  {
    image: "/banners/banner3.avif",
  },
  {
    image: "/banners/banner4.avif",
  },
  {
    image: "/banners/banner5.avif",
  },
  {
    image: "/banners/banner6.avif",
  },
  {
    image: "/banners/banner7.jpg",
  },
];

const QUERY_GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      categorie
      id
      name
      price
      image {
        url
        id
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await graphcms.request(QUERY_GET_ALL_PRODUCTS);

  return {
    props: {
      items: products.slice(0, 3).reverse(),
    },
  };
};

export default function Marketplace({ items }: Props) {
  return (
    <>
      <Head>
        <title>Home - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full flex flex-col py-10'>
        <Slider items={slides} />
        <div className='mt-7 flex flex-col gap-7 md:gap-0 md:flex-row items-center justify-center md:justify-around'>
          <div className='flex items-center gap-3'>
            <div className='p-2 border-2 border-indigo-500 rounded-full'>
              <CreditCard className='text-indigo-500' size={48} />
            </div>
            <div className='font-secondary flex flex-col justify-center items-start'>
              <h1 className='font-semibold text-xl'>Parcelamento</h1>
              <span className='text-base font-normal'>
                Em até 12x nos Cartões
              </span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='p-2 border-2 border-indigo-500 rounded-full'>
              <Article className='text-indigo-500' weight='fill' size={48} />
            </div>
            <div className='font-secondary flex flex-col justify-center items-start'>
              <h1 className='font-semibold text-xl'>Boleto e Pix</h1>
              <span className='text-base font-normal'>com 10% de Desconto</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='p-2 border-2 border-indigo-500 rounded-full'>
              <Truck className='text-indigo-500' size={48} />
            </div>
            <div className='font-secondary flex flex-col justify-center items-start'>
              <h1 className='font-semibold text-xl'>Entrega garantida</h1>
              <span className='text-base font-normal'>em todo o Brasil.</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='p-2 border-2 border-indigo-500 rounded-full'>
              <Lock className='text-indigo-500' weight='fill' size={48} />
            </div>
            <div className='font-secondary flex flex-col justify-center items-start'>
              <h1 className='font-semibold text-xl'>Compra Segura</h1>
              <span className='text-base font-normal'>
                Seus dados protegidos
              </span>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center text-3xl font-bold font-primary leading-5 my-[56px]'>
          <h1>
            Nossos <span className='text-indigo-500'>Destaques</span>
          </h1>
        </div>
        <div className='h-full px-10 py-4 md:h-[calc(100vh-200px)] overflow-hidden'>
          <div className='mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap justify-around items-center gap-10 md:gap-0'>
            {items?.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                imageUrl={item.image.url}
                type={item.categorie}
                price={item.price}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
