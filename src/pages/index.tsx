import useSWR from "swr";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Product } from "../@types/item";
import { Item } from "../components/Item";
import { Pagination } from "../components/Pagination";
import { Select } from "../components/Select";
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

const types = [
  {
    name: "Select type",
    value: "",
  },
  {
    name: "Iphone",
    value: "iphone",
  },
  {
    name: "Ipad",
    value: "ipad",
  },
  {
    name: "Mac",
    value: "mac",
  },
  {
    name: "Apple Watch",
    value: "apple_watch",
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
      items: products,
    },
  };
};

export default function Marketplace({ items }: Props) {
  const [search, setSearch] = useState("");
  const [typeState, setTypeState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentCards = items.slice(indexOfFirstCards, indexOfLastCards);

  const filteredItems =
    search.length > 0
      ? currentCards.filter((item) => item.name.includes(search))
      : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Marketplace</title>
        <link
          rel='shortcut icon'
          href='https://img.icons8.com/fluency/48/000000/shopping-cart.png'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full flex flex-col'>
        <Slider items={slides} />
        <div className='mt-7 flex items-center justify-around'>
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
        <div className='flex px-2 pt-6 sm:px-0 gap-4'>
          <input
            type='text'
            className='w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            placeholder='Search item...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className='w-auto'
            items={types}
            value={typeState}
            onChange={(e) => setTypeState(e.target.value)}
          />
        </div>
        <div className='h-full md:h-[calc(100vh-229px)]'>
          <div className='mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap gap-3'>
            {search.length > 0
              ? filteredItems?.map((item, i) => (
                  <Link key={i} href={`/marketplace/${item.id}`}>
                    <Item
                      id={item.id}
                      imageUrl={item.image.url}
                      type={item.categorie}
                      price={item.price}
                      title={item.name}
                    />
                  </Link>
                ))
              : currentCards?.map((item, i) => (
                  <Link key={i} href={`/marketplace/${item.id}`}>
                    <Item
                      id={item.id}
                      imageUrl={item.image.url}
                      type={item.categorie}
                      price={item.price}
                      title={item.name}
                    />
                  </Link>
                ))}
          </div>
        </div>
        <Pagination
          totalCards={items?.length}
          paginate={paginate}
          cardsPerPage={cardsPerPage}
        />
      </div>
    </>
  );
}
