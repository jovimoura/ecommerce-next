import { useContext, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as Dialog from '@radix-ui/react-dialog'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { prisma } from '../../lib/prisma'
import { Item } from '../../components/Item'
import { ItemProps } from '../../@types/item'
import { CreateItem } from '../../components/CreateItem'
import { useRouter } from 'next/router'
import { Lock } from 'phosphor-react'

interface Task {
  id: string
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
}

interface Props {
  tasks: Task[]
}

const items: ItemProps[] = [
  {
    id: 'akdmaskdmad',
    imageUrl:
      'https://www.iplace.com.br/ccstore/v1/images/?source=/file/v5758673239502908668/products/215989.00-iphone-11-apple-preto-mhda3br-a.jpg&height=470&width=470&height=470&width=470&quality=0.8',
    price: 3149,
    title: 'Apple Iphone 11 (64GB) - Preto'
  }
]

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { 'auth_next-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const tasks = await prisma.task.findMany()
  const data = tasks.map(task => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString()
    }
  })

  return {
    props: {
      tasks: data
    }
  }
}

export default function Dashboard({ tasks }: Props) {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  if (!user?.isAdmin) {
    router.push('/marketplace')
  }

  const [taskState, setTaskState] = useState('')

  async function handleCreateTask() {
    await api.post('/api/tasks/create', {
      title: taskState,
      isDone: false
    })
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
                  value={taskState}
                  onChange={e => setTaskState(e.target.value)}
                />
                <Dialog.Trigger
                  className="flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              focus:ring-offset-zinc-900"
                  onClick={handleCreateTask}
                >
                  Create
                </Dialog.Trigger>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {items.map((item, i) => (
                  <Item
                    key={i}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    title={item.title}
                    onEdit={async () => console.log('edit')}
                  />
                ))}
              </div>
            </div>
            <CreateItem />
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
