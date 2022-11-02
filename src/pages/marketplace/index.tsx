import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ItemProps } from '../../@types/item'
import { Item } from '../../components/Item'
import { Pagination } from '../../components/Pagination'
import { Select } from '../../components/Select'
import { prisma } from '../../lib/prisma'

interface Props {
  items: ItemProps[]
}

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

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.items.findMany()
  const data = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      price: parseInt(item.price),
      imageUrl: item.imageUrl,
      type: item.type,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    }
  })

  return {
    props: {
      items: data
    }
  }
}

export default function Marketplace({ items }: Props) {
  const [search, setSearch] = useState('')
  const [typeState, setTypeState] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(4)

  const indexOfLastCards = currentPage * cardsPerPage
  const indexOfFirstCards = indexOfLastCards - cardsPerPage
  const currentCards = items.slice(indexOfFirstCards, indexOfLastCards)

  const filteredItems =
    search.length > 0
      ? currentCards.filter(item => item.title.includes(search))
      : []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <Head>
        <title>Marketplace</title>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/fluency/48/000000/shopping-cart.png"
          type="image/x-icon"
        />
      </Head>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex px-2 pt-6 sm:px-0 gap-4">
          <input
            type="text"
            className="w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Search item..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Select
            className="w-auto"
            items={types}
            value={typeState}
            onChange={e => setTypeState(e.target.value)}
          />
        </div>
        <div className="h-[calc(100vh-229px)]">
          <div className="mt-6 px-0 sm:px-6 lg:px-8 flex flex-wrap gap-3">
            {search.length > 0
              ? filteredItems?.map((item, i) => (
                  <Link key={i} href={`/marketplace/${item.id}`}>
                    <Item
                      id={item.id}
                      imageUrl={item.imageUrl}
                      type={item.type}
                      price={item.price}
                      title={item.title}
                    />
                  </Link>
                ))
              : currentCards?.map((item, i) => (
                  <Link key={i} href={`/marketplace/${item.id}`}>
                    <Item
                      id={item.id}
                      imageUrl={item.imageUrl}
                      type={item.type}
                      price={item.price}
                      title={item.title}
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
  )
}
