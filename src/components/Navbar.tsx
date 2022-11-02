import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ShoppingCartSimple } from 'phosphor-react'
import { Fragment, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Image from 'next/image'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Marketplace', route: '/marketplace' },
  { name: 'About', route: '/about' }
]

const profile = [{ name: 'Profile', route: '/profile' }]

export function Navbar() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  const cart = useSelector((state: any) => state.cart)

  const getItemsCount = () => {
    return cart.reduce(
      (accumulator: any, item: any) => accumulator + item.quantity,
      0
    )
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {user?.isAdmin
                      ? navigation.map((item, itemIdx) =>
                          router.asPath.startsWith(item.route) ? (
                            <Fragment key={itemIdx}>
                              <Link href={item.route}>
                                <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                  {item.name}
                                </a>
                              </Link>
                            </Fragment>
                          ) : (
                            <Link key={itemIdx} href={item.route}>
                              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                {item.name}
                              </a>
                            </Link>
                          )
                        )
                      : navigation
                          .filter(item => item.name !== 'Dashboard')
                          .map((item, itemIdx) =>
                            router.asPath.startsWith(item.route) ? (
                              <Fragment key={itemIdx}>
                                <Link href={item.route}>
                                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    {item.name}
                                  </a>
                                </Link>
                              </Fragment>
                            ) : (
                              <Link key={itemIdx} href={item.route}>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                  {item.name}
                                </a>
                              </Link>
                            )
                          )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    onClick={() => router.push('/cart')}
                    className={`flex bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                  >
                    <span className="sr-only">Cart</span>
                    <ShoppingCartSimple
                      weight="fill"
                      className={
                        router.asPath.startsWith('/cart') ? 'text-white' : ''
                      }
                      size={24}
                    />
                    <span
                      className={`relative bottom-3 ${
                        router.asPath.startsWith('/cart') ? 'text-white' : ''
                      }`}
                    >
                      {getItemsCount()}
                    </span>
                  </button>

                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                (user?.avatar_url as string) ||
                                'https://img.icons8.com/external-others-inmotus-design/67/000000/external-User-vkontakte-others-inmotus-design-5.png'
                              }
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {profile.map((item, i) => (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                  <Link href={item.route}>
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <button
                                onClick={() =>
                                  signOut({
                                    redirect: true,
                                    callbackUrl: '/'
                                  })
                                }
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Sign out
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user?.isAdmin
                ? navigation.map((item, itemIdx) =>
                    router.asPath.startsWith(item.route) ? (
                      <Fragment key={itemIdx}>
                        <Link href={item.route}>
                          <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                            {item.name}
                          </a>
                        </Link>
                      </Fragment>
                    ) : (
                      <Link key={itemIdx} href={item.route}>
                        <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                          {item.name}
                        </a>
                      </Link>
                    )
                  )
                : navigation
                    .filter(item => item.name !== 'Dashboard')
                    .map((item, itemIdx) =>
                      router.asPath === item.route ? (
                        <Fragment key={itemIdx}>
                          <Link href={item.route}>
                            <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                              {item.name}
                            </a>
                          </Link>
                        </Fragment>
                      ) : (
                        <Link key={itemIdx} href={item.route}>
                          <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            {item.name}
                          </a>
                        </Link>
                      )
                    )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={
                      (user?.avatar_url as string) ||
                      'https://img.icons8.com/external-others-inmotus-design/67/000000/external-User-vkontakte-others-inmotus-design-5.png'
                    }
                    alt="avatar photo"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Cart</span>
                  <ShoppingCartSimple
                    weight="fill"
                    className={
                      router.asPath.startsWith('/cart') ? 'text-white' : ''
                    }
                    size={24}
                  />
                  <span
                    className={`${
                      router.asPath.startsWith('/cart') ? 'text-white' : ''
                    }`}
                  >
                    {getItemsCount()}
                  </span>
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {profile.map((item, i) => (
                  <Link key={i} href={item.route}>
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      {item.name}
                    </a>
                  </Link>
                ))}
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: '/'
                    })
                  }
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
