import Head from 'next/head'
import { Minus, Plus } from 'phosphor-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from '../components/Item'
import { Pagination } from '../components/Pagination'
import { Select } from '../components/Select'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from '../redux/cart.slice'
import { convertToReal } from '../use-cases/convertToReal'

const types = [
  {
    name: 'Select type',
    value: ''
  },
  {
    name: 'Iphone',
    value: 'iphone'
  },
  {
    name: 'Ipad',
    value: 'ipad'
  },
  {
    name: 'Mac',
    value: 'mac'
  },
  {
    name: 'Apple Watch',
    value: 'apple_watch'
  }
]

export default function CartPage() {
  const cart = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(4)

  const indexOfLastCards = currentPage * cardsPerPage
  const indexOfFirstCards = indexOfLastCards - cardsPerPage
  const currentCards = cart.slice(indexOfFirstCards, indexOfLastCards)

  const filteredItems =
    search.length > 0
      ? currentCards.filter((item: any) => item.title.includes(search))
      : []

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: any, item: any) => accumulator + item.quantity * item.price,
      0
    )
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <Head>
        <title>Cart</title>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/fluency/48/000000/shopping-cart.png"
          type="image/x-icon"
        />
      </Head>
      <div>
        {cart.length === 0 ? (
          <div className="h-[calc(100vh-65px)] flex flex-1 justify-center items-center flex-col">
            <h1 className="text-2xl font-semibold">Your Cart is Empty!</h1>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex px-2 pt-6 sm:px-0 gap-4">
              <input
                type="text"
                className="w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Search item..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Select className="w-auto" items={types} />
            </div>
            <div className="h-[calc(100vh-267px)]">
              <div className="mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap gap-3">
                {search.length > 0
                  ? filteredItems?.map((item: any, i: number) => (
                      <div key={i}>
                        <Item
                          id={item.id}
                          imageUrl={item.imageUrl}
                          type={item.type}
                          price={item.price}
                          title={item.title}
                        />
                        <div className="flex">
                          <button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            +
                          </button>
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            -
                          </button>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))
                  : currentCards?.map((item: any, i: number) => (
                      <div key={i}>
                        <Item
                          id={item.id}
                          imageUrl={item.imageUrl}
                          type={item.type}
                          price={item.price}
                          title={item.title}
                          onDelete={async () =>
                            dispatch(removeFromCart(item.id))
                          }
                        />
                        <div className="flex justify-between items-center mt-1">
                          <button
                            className="bg-gray-900 h-6 w-6 flex items-center justify-center text-white hover:bg-gray-700"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <Plus size={20} />
                          </button>
                          <span className="semi-bold">
                            Qtd:{' '}
                            <span className="font-bold text-xl">
                              {item.quantity}
                            </span>
                          </span>
                          <button
                            className="bg-gray-900 h-6 w-6 flex items-center justify-center text-white hover:bg-gray-700"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            <Minus size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <span>
                Total:{' '}
                <span className="font-bold text-xl">
                  {convertToReal(getTotalPrice())}
                </span>
              </span>
              <button
                className="flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              focus:ring-offset-zinc-900"
              >
                Checkout
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
  )
}
