import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { Camera } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
import { InputFile } from '../components/InputFile'
import { AuthContext } from '../contexts/AuthContext'
import { prisma } from '../lib/prisma'
import { api } from '../services/api'
import { toBase64 } from '../use-cases/toBase64'

interface Props {
  item: {
    id: string
    name: string
    avatarUrl: string
    email: string
    password: string
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx?: any) => {
  const { 'auth_next-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const item = await prisma.users.findUnique({
    where: {
      id: token
    }
  })
  const data = {
    id: item?.id,
    name: item?.name,
    avatarUrl: item?.avatarUrl,
    email: item?.email,
    password: item?.password
  }

  return {
    props: {
      item: data
    }
  }
}

export default function Profile({ item }: Props) {
  const router = useRouter()

  const [name, setName] = useState(item?.name || '')
  const [email, setEmail] = useState(item?.email || '')
  const [password, setPassword] = useState(item.password || '')
  const [confirmPassword, setConfirmPassword] = useState(item.password || '')
  const [avatarUrl, setAvatarUrl] = useState(item.avatarUrl || '')

  const [file, setFile] = useState(null)

  function handleSetFile(e: any) {
    setFile(e.target.files[0])
  }

  async function handleSaveUser(e: FormEvent) {
    e.preventDefault()

    let obj = {
      name,
      email,
      password,
      avatarUrl: file ? await toBase64(file) : avatarUrl
    }
    await api
      .patch(`/api/edit-user/${item.id}`, obj)
      .then(res => {
        router.reload()
        alert('User edited!')
      })
      .catch(_ => alert('User not edited!'))
  }

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-user-back-to-school-kmg-design-flat-kmg-design.png"
          type="image/x-icon"
        />
        <title>Profile</title>
      </Head>
      <div className="flex flex-wrap h-[calc(100vh-100px)] gap-2 md:gap-10 justify-center items-center w-full">
      <div>
        <div className="flex items-center flex-col gap-2">
          {item.avatarUrl ? (
            <img
              className="w-[265px] h-[265px] rounded-full"
              src={
                file !== null
                  ? URL.createObjectURL(file)
                  : (item.avatarUrl as string)
              }
              alt="logo user"
            />
          ) : (
            <div className="w-[165px] h-[165px] rounded-full bg-zinc-100 flex items-center justify-center gap-1">
              <Camera className="w-6 h-6" />
              <span className="font-bold text-base text-center">
                Item image
              </span>
            </div>
          )}
          <InputFile onChange={handleSetFile} title="Load image" />
        </div>
      </div>
      <form onSubmit={handleSaveUser}>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="game">
            Name
          </label>
          <input
            className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="title"
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Email</label>
          <input
            className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="price"
            type="text"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Password</label>
          <input
            className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="price"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Confirm password</label>
          <input
            className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="price"
            type="password"
            required
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end mt-2">
          <button
            className="flex items-center gap-3 bg-indigo-500 px-5 h-12 rounded-md font-semibold text-white hover:bg-indigo-600 transition-colors"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </>

    
  )
}
