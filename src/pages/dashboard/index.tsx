import { Fragment, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { prisma } from '../../lib/prisma'

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

export default function Dashboard({ tasks }: Props) {
  const { user } = useContext(AuthContext)

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
        <link rel="shortcut icon" href="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" type="image/x-icon" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <input
              type="text"
              placeholder="Create your task"
              value={taskState}
              onChange={e => setTaskState(e.target.value)}
            />
            <button onClick={handleCreateTask}>Create</button>
          </div>
        </div>
      </main>
    </div>
  )
}

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
