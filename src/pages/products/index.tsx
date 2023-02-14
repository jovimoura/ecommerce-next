import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { Product } from "../../@types/item";
import { Input } from "../../components/Input";
import { Item } from "../../components/Item";
import { Pagination } from "../../components/Pagination";
import { Select } from "../../components/Select";
import { graphcms } from "../../graphql/graphcms";

interface Props {
  items: Product[];
}

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

export default function Products({ items }: Props) {
  const [search, setSeatch] = useState("");
  const [type, setType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState("10");

  const indexOfLastCards = currentPage * parseInt(cardsPerPage);
  const indexOfFirstCards = indexOfLastCards - parseInt(cardsPerPage);
  const currentCards = items.slice(indexOfFirstCards, indexOfLastCards);

  const filteredItems =
    search.length > 0
      ? currentCards.filter((item) => item.name.includes(search))
      : [];

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Loja - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='w-full flex flex-col min-h-screen'>
        <div className='w-full py-10 flex items-center justify-center bg-indigo-500 text-white mt-4'>
          <h1 className='font-primary leading-5 text-4xl font-bold'>Loja</h1>
        </div>
        <div className='px-10 py-5 w-full flex flex-col justify-center items-center'>
          <div className='w-full flex items-center justify-center gap-5 mb-5 flex-wrap'>
            <Input
              placeholder='Pesquise o nome do item...'
              value={search}
              onChange={(e) => setSeatch(e.target.value)}
            />
            <Select
              value={cardsPerPage}
              onChange={(e) => setCardsPerPage(e.target.value)}
              items={[
                { name: "10", value: "10" },
                { name: "50", value: "50" },
                { name: "100", value: "100" },
              ]}
              className='w-[200px]'
              label='Itens por página'
            />
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              items={[
                { name: "Iphone", value: "iphone" },
                { name: "Macbook", value: "macbook" },
                { name: "Ipad", value: "ipad" },
              ]}
              className='w-[200px]'
              label='Tipo'
            />
          </div>
          <div className='mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap gap-10 justify-start items-center'>
            {search.length > 0
              ? filteredItems?.map((item, i) => (
                  <Item
                    key={i}
                    id={item.id}
                    imageUrl={item.image.url}
                    type={item.categorie}
                    price={item.price}
                    title={item.name}
                  />
                ))
              : currentCards?.map((item, i) => (
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
          <Pagination
            totalCards={items.length}
            paginate={paginate}
            cardsPerPage={cardsPerPage}
          />
        </div>
      </div>
    </>
  );
}
