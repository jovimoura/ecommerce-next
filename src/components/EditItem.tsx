import * as Dialog from '@radix-ui/react-dialog'
import { Camera, CheckSquare } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { ItemProps } from '../@types/item'
import { api } from '../services/api'
import { toBase64 } from '../use-cases/toBase64'
import { InputFile } from './InputFile'
import { Select } from './Select'

const types = [
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

interface EditItemProps {
  id: string
  items: ItemProps[]
}

export const EditItem = ({ id, items }: EditItemProps) => {
  const [title, setTitle] = useState(items[0].title || '')
  const [price, setPrice] = useState(items[0].price ||'')
  const [type, setType] = useState(items[0].type ||'')
  const [imageUrl, setImageUrl] = useState(items[0].imageUrl || '')

  const [file, setFile] = useState(null)
  const [viewSuccessMessage, setViewSuccessMessage] = useState(false)

  function handleOpen() {
    setTitle(items[0].title)
    setPrice(items[0].price)
    setType(items[0].type)
    setImageUrl(items[0].imageUrl)
    setFile(null)
  }

  function handleSetFile(e: any) {
    setFile(e.target.files[0])
  }

  function handleClearInputs() {
    setTitle('')
    setPrice('')
    setType('')
    setImageUrl('')
    setFile(null)
  }

  function handleSuccessItem() {
    setViewSuccessMessage(!viewSuccessMessage)
  }

  async function handleEditItem(e: FormEvent) {
    e.preventDefault()
    let obj = {
      title,
      price: price as string,
      type,
      imageUrl: file ? await toBase64(file) : imageUrl
    }
    console.log(obj)
    await api
      .patch(`/api/items/${id}`, obj)
      .then(res => {
        handleSuccessItem()
        handleClearInputs()
        handleSuccessItem()
        alert('Item edited!')
      })
      .catch(_ => alert('Item not edited!'))
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content onCloseAutoFocus={handleClearInputs} onOpenAutoFocus={handleOpen} className="fixed bg-white dark:bg-gray-800 py-8 px-10 text-gray-900 dark:text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg h-4/5 md:h-[600px] overflow-scroll md:overflow-y-auto md:overflow-x-hidden md:w-[480px] w-[330px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-center text-3xl font-black">
          Edit Item
        </Dialog.Title>
        <form
          onSubmit={e => handleEditItem(e)}
          className="mt-2 flex flex-col gap-4"
        >
          <div className="flex items-center flex-col gap-2">
            {imageUrl ? (
              <img
                className="w-[165px] h-[165px] rounded-full"
                src={file ? URL.createObjectURL(file) : imageUrl}
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Title
            </label>
            <input
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="title"
              type="text"
              required
              placeholder="Title of Item"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Price</label>
            <input
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="price"
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Type</label>
            <Select
              items={types}
              value={type}
              onChange={e => setType(e.target.value)}
            />
          </div>

          <footer className="mt-4 flex justify-center md:justify-end gap-4">
            <button
              className="flex items-center gap-3 bg-indigo-500 px-5 h-12 rounded-md font-semibold text-white hover:bg-indigo-600 transition-colors"
              type="submit"
            >
              Edit
            </button>
          </footer>
          {viewSuccessMessage && (
            <div className="mt-4 flex w-full justify-end items-center md:justify-between text-green-800">
              <span className='text-lg font-bold'>Item created! Back to the Dashboard!</span>
              <CheckSquare weight="fill" size={32} />
            </div>
          )}
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
