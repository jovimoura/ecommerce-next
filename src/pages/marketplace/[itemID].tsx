import { Items } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  CaretLeft,
  Heart,
  ShareNetwork,
  ShoppingCartSimple,
  Star
} from 'phosphor-react'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'
import { convertToReal } from '../../use-cases/convertToReal'

interface Props {
  item: Items
}

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { itemID } = ctx.params

  const item = await prisma.items.findUnique({
    where: {
      id: itemID
    }
  })

  const data = {
    id: item?.id,
    title: item?.title,
    price: parseInt(item?.price as string),
    imageUrl: item?.imageUrl,
    type: item?.type,
    createdAt: item?.createdAt.toISOString(),
    updatedAt: item?.updatedAt.toISOString()
  }

  return {
    props: {
      item: data
    }
  }
}

export default function Item({ item }: Props) {
  const [isFavorited, setIsFavorited] = useState(false)
  const router = useRouter()

  const handleBack = () => router.back()

  const handleFavorite = () => setIsFavorited(!isFavorited)

  return (
    <>
      <Head>
        <title>{item.title}</title>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/fluency/48/000000/shopping-cart.png"
          type="image/x-icon"
        />
      </Head>
      <div className="pl-5 pt-3">
        <button
          className="flex gap-2 items-center text-2xl text-gray-900 font-bold hover:text-gray-700"
          onClick={handleBack}
        >
          <CaretLeft weight="bold" size={28} />
          Back
        </button>
      </div>
      <div className="flex gap-5 mx-auto justify-center items-center">
        <div className="w-1/2 px-auto flex justify-center items-center">
          <Image width={350} height={350} src={item.imageUrl} />
        </div>
        <div className="w-2/5 px-auto flex flex-col justify-center items-left text-gray-900">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <div className="mt-3 flex gap-2 items-center justify-left">
                <span className="text-sm font-extralight">
                  Ref: {item.id.substring(0, 6).toUpperCase()}
                </span>
                <div className="flex gap-1">
                  <Star weight="fill" size={18} className="text-yellow-300" />
                  <Star weight="fill" size={18} className="text-yellow-300" />
                  <Star weight="fill" size={18} className="text-yellow-300" />
                  <Star weight="fill" size={18} className="text-yellow-300" />
                  <Star weight="fill" size={18} className="text-yellow-300" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <button onClick={handleFavorite}>
                <Heart
                  weight={isFavorited ? 'fill' : 'bold'}
                  size={32}
                  className="text-red-600 hover:text-red-500"
                />
              </button>
              <button>
                <ShareNetwork
                  weight="fill"
                  size={32}
                  className="text-gray-500 hover:text-gray-400"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <h3 className="text-5xl font-bold">
              {convertToReal(item.price)}{' '}
              <span className="text-lg font-normal">in cash</span>
            </h3>
            <span>
              or <span className="font-bold">10x</span> of{' '}
              <span className="font-bold">
                {convertToReal(parseInt(item.price) / 10)}
              </span>
            </span>
          </div>
          <div className="flex w-full justify-center mt-5">
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <ShoppingCartSimple
                  weight="fill"
                  size={32}
                  className="text-indigo-400"
                />
              </div>
              Add on cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
