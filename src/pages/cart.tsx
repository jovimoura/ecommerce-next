import Head from "next/head";
import { Minus, Plus } from "phosphor-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../@types/item";
import { Input } from "../components/Input";
import { Item } from "../components/Item";
import { Pagination } from "../components/Pagination";
import { Select } from "../components/Select";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
import { convertToReal } from "../use-cases/convertToReal";

const types = [
  {
    name: "Tipo",
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
];

export default function CartPage() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentCards = cart.slice(indexOfFirstCards, indexOfLastCards);

  const filteredItems =
    search.length > 0
      ? currentCards.filter((item: Product) => item.name.includes(search))
      : [];

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: any, item: any) => accumulator + item.quantity * item.price,
      0
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFinishBuy = () => {
    alert(
      "Este website é apenas um mostruário, logo não há como comprar nada, mas fico feliz com sua visita! 😃"
    );
  };

  return (
    <>
      <Head>
        <title>Cart - J.M. Shop</title>
        <link
          rel='shortcut icon'
          href='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
          type='image/x-icon'
        />
      </Head>
      <div className='font-sans'>
        {cart.length === 0 ? (
          <div className='h-[calc(100vh-65px)] flex flex-1 justify-center items-center flex-col'>
            <h1 className='text-2xl font-semibold'>Your Cart is Empty!</h1>
          </div>
        ) : (
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='flex px-2 pt-6 sm:px-0 gap-4'>
              <Input
                type='text'
                placeholder='Procure pelo nome do item...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select className='w-auto' items={types} />
            </div>
            <div className='h-[calc(100vh-80px)] w-full flex items-center justify-center md:justify-start'>
              <div className='mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap gap-3'>
                {search.length > 0
                  ? filteredItems?.map((item: any, i: number) => (
                      <div key={i}>
                        <Item
                          id={item.id}
                          price={item.price}
                          key={i}
                          imageUrl={item.image.url}
                          type={item.categorie}
                          title={item.name}
                        />
                        <div className='flex justify-between items-center mt-4'>
                          <button
                            className='bg-indigo-500 rounded-full h-6 w-6 flex items-center justify-center text-white hover:bg-indigo-300 transition-colors'
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <Plus size={20} />
                          </button>
                          <span className='semi-bold'>
                            Quantidade:{" "}
                            <span className='font-bold text-xl'>
                              {item.quantity}
                            </span>
                          </span>
                          <button
                            className='bg-indigo-500 rounded-full h-6 w-6 flex items-center justify-center text-white hover:bg-indigo-300 transition-colors'
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            <Minus size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  : currentCards?.map((item: any, i: number) => (
                      <div key={i}>
                        <Item
                          id={item.id}
                          price={item.price}
                          key={i}
                          imageUrl={item.image.url}
                          type={item.categorie}
                          title={item.name}
                          onDelete={async () =>
                            dispatch(removeFromCart(item.id))
                          }
                        />
                        <div className='flex justify-between items-center mt-4'>
                          <button
                            className='bg-indigo-500 rounded-full h-6 w-6 flex items-center justify-center text-white hover:bg-indigo-300 transition-colors'
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <Plus size={20} />
                          </button>
                          <span className='semi-bold'>
                            Quantidade:{" "}
                            <span className='font-bold text-xl'>
                              {item.quantity}
                            </span>
                          </span>
                          <button
                            className='bg-indigo-500 rounded-full h-6 w-6 flex items-center justify-center text-white hover:bg-indigo-300 transition-colors'
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            <Minus size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className='w-full flex justify-between items-center'>
              <span className='font-bold text-lg'>
                Total:{" "}
                <span className='font-bold text-2xl text-indigo-500'>
                  {convertToReal(getTotalPrice())}
                </span>
              </span>
              <button
                onClick={handleFinishBuy}
                className='flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-lg leading-5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              focus:ring-offset-zinc-900'
              >
                Finalizar compra
              </button>
            </div>
            <Pagination
              totalCards={cart?.length}
              paginate={paginate}
              cardsPerPage={cardsPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
