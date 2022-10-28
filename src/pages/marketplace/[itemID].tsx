import { Items } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { prisma } from '../../lib/prisma'

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
  return (
    <>
      <h1>item: {item.id}</h1>
    </>
  )
}
