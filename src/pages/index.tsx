import type { GetServerSideProps, NextPage } from 'next'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { signIn as getSignIn, getSession } from 'next-auth/react'
import { AuthContext } from '../contexts/AuthContext'
import { FacebookLogo, GoogleLogo, GithubLogo, Camera, Eye } from 'phosphor-react'
import { Input } from '../components/Input'
import { InputFile } from '../components/InputFile'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Home: NextPage = () => {
  const [page, setPage] = useState<'signIn' | 'signUp'>('signIn')

  const { register, handleSubmit } = useForm()

  const { signIn } = useContext(AuthContext)

  const [file, setFile] = useState()

  async function handleSign(data: any) {
    try {
      await signIn(data)
    } catch (error) {
      console.log('handle signIn error: ', error)
    }
  }

  async function handleSignUp(data: any) {
    try {
      // create account
    } catch (error) {
      // 
    }
  }

  function handleSetFile(e: any) {
    setFile(e.target.files[0])
  }

  function handleSignIn(type: string) {
    getSignIn(type)
  }

  function handleChangePage() {
    if (page === 'signIn') {
      setPage('signUp')
    } else {
      setPage('signIn')
    }
  }

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-user-back-to-school-kmg-design-flat-kmg-design.png"
          type="image/x-icon"
        />
        <title>Login</title>
      </Head>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {page === 'signIn' ? 'Sign in to your account' : 'Sign Up'}
            </h2>
            <div className="w-full flex justify-end">
              <span className="text-xs mr-2">
                {page === 'signIn'
                  ? 'Need to create an account?'
                  : 'Already have an account?'}
              </span>
              <button
                onClick={handleChangePage}
                className="text-xs underline text-blue-600 cursor-pointer"
              >
                {page === 'signIn' ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>
          {page === 'signIn' ? (
            <form
              onSubmit={handleSubmit(handleSign)}
              className="mt-8 space-y-6"
            >
              <Input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Input
                    {...register('email')}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Input
                    {...register('password')}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="flex justify-between">
                <button>
                  <FacebookLogo size={32} color="#121212" />
                </button>
                <button>
                  <GoogleLogo size={32} color="#121212" />
                </button>
                <button onClick={() => handleSignIn('github')}>
                  <GithubLogo size={32} color="#121212" />
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleSign)} className="mt-8">
              <div className="flex justify-between">
                <div>
                  <div className="rounded-md shadow-sm">
                    <div className="mb-2">
                      <label htmlFor="fullName" className="">
                        Name
                      </label>
                      <Input
                        {...register('fullName')}
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="email-address" className="">
                        Email address
                      </label>
                      <Input
                        {...register('email')}
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="">
                        Password
                      </label>
                      <Input
                        {...register('password')}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-center items-center flex-col">
                    {file ? (
                      <img className='w-[165px] h-[165px] rounded-full' src={URL.createObjectURL(file)} alt="logo user" />
                    ) : (
                      <div className="w-[165px] h-[165px] rounded-full bg-zinc-100 flex items-center justify-center gap-1">
                        <Camera className='w-6 h-6'/>
                        <span className="font-bold text-base text-center">
                          Your Photo
                        </span>
                      </div>
                    )}
                    <InputFile title='Select Perfil Image' accept='image/*' onChange={handleSetFile}/>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
