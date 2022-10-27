import { useContext, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as Dialog from '@radix-ui/react-dialog'
import { Lock } from 'phosphor-react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { prisma } from '../../lib/prisma'
import { Item } from '../../components/Item'
import { ItemProps } from '../../@types/item'
import { CreateItem } from '../../components/CreateItem'
import { EditItem } from '../../components/EditItem'
import Router from 'next/router'

interface Props {
  items: ItemProps[]
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { 'auth_next-token': token } = parseCookies(ctx)
  console.log(`token: ${token}`)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

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

export default function Dashboard({ items }: Props) {
  const { user } = useContext(AuthContext)

  const [search, setSeatch] = useState('')
  const [editId, setEditId] = useState('')

  const filteredItems =
    search.length > 0 ? items.filter(item => item.title.includes(search)) : []

  async function handleDelete(id: string) {
    await api
      .delete(`/api/items/${id}`)
      .then(_ => {
        Router.reload()
        alert('Item deleted!')
      })
      .catch(_ => alert('Item not deleted!'))
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <link
          rel="shortcut icon"
          href="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          type="image/x-icon"
        />
      </Head>

      {user?.isAdmin ? (
        <>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>

          <Dialog.Root>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="flex px-2 sm:px-0 gap-4">
                <input
                  type="text"
                  className="w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search item..."
                  value={search}
                  onChange={e => setSeatch(e.target.value)}
                />
                <Dialog.Trigger
                  className="flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              focus:ring-offset-zinc-900"
                >
                  Create
                </Dialog.Trigger>
              </div>
            </div>
            <CreateItem />
          </Dialog.Root>
          <Dialog.Root>
            <div className="mt-6 flex flex-wrap gap-3">
              {search.length > 0
                ? filteredItems?.map((item, i) => (
                    <>
                      <Item
                        key={i}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        type={item.type}
                        price={item.price}
                        title={item.title}
                        onEdit={async () => setEditId(item.id)}
                      />
                    </>
                  ))
                : items?.map((item, i) => (
                    <>
                      <Item
                        key={i}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        type={item.type}
                        price={item.price}
                        title={item.title}
                        onEdit={async () => setEditId(item.id)}
                        onDelete={() => handleDelete(item.id)}
                      />
                    </>
                  ))}
              {editId.length > 0 && (
                <EditItem
                  id={editId}
                  items={items.filter(item => item.id === editId)}
                />
              )}
            </div>
          </Dialog.Root>
        </>
      ) : (
        <>
          <div className="w-full h-screen flex-1 flex justify-center items-center gap-2">
            <Lock weight="bold" size={32} className="text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">Access denied</h1>
          </div>
        </>
      )}
    </div>
  )
}
