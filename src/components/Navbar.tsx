import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ShoppingCartSimple } from "phosphor-react";
import { Fragment, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Image from "next/image";
import { UserIcon } from "../assets/icons";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", route: "/" },
  { name: "Produtos", route: "/products" },
  { name: "Fale Conosco", route: "/talk" },
];

const profileLogged = [{ name: "Perfil", route: "/profile" }];
const loginOptions = [
  { name: "Criar Conta", route: "/login?type=createAcc" },
  { name: "Login", route: "/login?type=login" },
];

export function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const cart = useSelector((state: any) => state.cart);

  const getItemsCount = () => {
    return cart.reduce(
      (accumulator: any, item: any) => accumulator + item.quantity,
      0
    );
  };

  return (
    <Disclosure as='nav' className='bg-transparent'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <Link href='/'>
                  <div className='flex-shrink-0 flex items-center justify-center gap-2'>
                    <Image
                      height={32}
                      width={32}
                      className='h-8 w-8'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                      alt='Workflow'
                    />
                    <span className='text-xl font-medium text-indigo-500 font-primary'>
                      J.M. Shop
                    </span>
                  </div>
                </Link>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item, itemIdx) =>
                      router.asPath === item.route ? (
                        <Fragment key={itemIdx}>
                          <Link
                            href={item.route}
                            className='border-b-4 border-b-indigo-500 text-indigo-500 p-3 text-base font-medium'
                          >
                            {item.name}
                          </Link>
                        </Fragment>
                      ) : (
                        <Link
                          key={itemIdx}
                          href={item.route}
                          className='text-gray-900 hover:text-indigo-500 p-3 text-base font-medium transition-colors'
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center justify-center gap-2 md:ml-6'>
                  <Menu as='div' className='ml-3 relative'>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className='max-w-xs bg-transparent rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                            <span className='sr-only'>Open user menu</span>
                            {user?.avatarUrl ? (
                              <Image
                                width={32}
                                height={32}
                                className='h-8 w-8 rounded-full'
                                src={user?.avatarUrl as string}
                                alt=''
                              />
                            ) : (
                              <UserIcon size={32} />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items
                            static
                            className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
                          >
                            {user?.email
                              ? profileLogged.map((item, i) => (
                                  <Menu.Item key={i}>
                                    {({ active }) => (
                                      <Link
                                        href={item.route}
                                        className={classNames(
                                          active ? "text-indigo-500" : "",
                                          "block px-4 py-2 text-sm text-gray-900"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))
                              : loginOptions.map((item, i) => (
                                  <Menu.Item key={i}>
                                    {({ active }) => (
                                      <Link
                                        href={item.route}
                                        className={classNames(
                                          active ? "text-indigo-500" : "",
                                          "block px-4 py-2 text-sm text-gray-900"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                            {user?.name ? (
                              <Menu.Item>
                                <button
                                  onClick={signOut}
                                  className='block px-4 py-2 text-sm text-gray-700'
                                >
                                  Sign out
                                </button>
                              </Menu.Item>
                            ) : null}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                  <button
                    onClick={() => router.push("/cart")}
                    className={`flex bg-transparent p-1 rounded-full text-indigo-500 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white transition-colors ${
                      router.asPath === "/cart" ? "text-indigo-300" : ""
                    }`}
                  >
                    <span className='sr-only'>Cart</span>
                    <ShoppingCartSimple weight='fill' size={24} />
                    <span
                      className={`relative bottom-3 ${
                        router.asPath.startsWith("/cart")
                          ? "text-indigo-300"
                          : ""
                      }`}
                    >
                      {getItemsCount()}
                    </span>
                  </button>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                <Disclosure.Button className='bg-transparent inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map((item, itemIdx) =>
                router.asPath === item.route ? (
                  <Fragment key={itemIdx}>
                    <Link
                      href={item.route}
                      className='border-b-4 border-b-indigo-500 text-indigo-500 p-3 text-base font-medium'
                    >
                      {item.name}
                    </Link>
                  </Fragment>
                ) : (
                  <Link
                    key={itemIdx}
                    href={item.route}
                    className='text-gray-900 hover:text-indigo-500 p-3 text-base font-medium transition-colors'
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
            <Menu as='div'>
              <div className='pt-4 pb-3 border-b border-b-indigo-100'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    {user?.name ? (
                      <Image
                        width={32}
                        height={32}
                        className='h-8 w-8 rounded-full'
                        src={user?.avatarUrl as string}
                        alt=''
                      />
                    ) : (
                      <UserIcon size={32} />
                    )}
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium leading-none text-gray-900'>
                      {user?.name}
                    </div>
                    <div className='text-sm font-medium leading-none text-gray-900'>
                      {user?.email}
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/cart")}
                    className='ml-auto bg-transparent flex-shrink-0 p-1 rounded-full text-indigo-500 hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white'
                  >
                    <span className='sr-only'>Cart</span>
                    <ShoppingCartSimple weight='fill' size={24} />
                    <span>{getItemsCount()}</span>
                  </button>
                </div>
                <div className='mt-3 px-2 space-y-1'>
                  {user?.name
                    ? profileLogged.map((item, i) => (
                        <Link
                          key={i}
                          href={item.route}
                          className='block px-3 py-2 rounded-md text-base font-medium text-gray-900'
                        >
                          {item.name}
                        </Link>
                      ))
                    : loginOptions.map((item, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <Link
                              href={item.route}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-indigo-500"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                  {user?.name ? (
                    <button
                      onClick={signOut}
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      Sign out
                    </button>
                  ) : null}
                </div>
              </div>
            </Menu>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
