import * as Dialog from '@radix-ui/react-dialog'
import { NotePencil, Trash } from 'phosphor-react'
import { ItemProps } from '../@types/item'
import { convertToReal } from '../use-cases/convertToReal'

export const Item = ({
  onDelete,
  onEdit,
  price,
  title,
  imageUrl
}: ItemProps) => {
  return (
    <div className={`shadow-md p-2 w-[190px] h-[262px] max-w-[189px] md:max-w-[250px] rounded-lg flex flex-col justify-center items-center gap-2 text-gray-900 ${!onDelete || !onEdit ? 'h-[238px]' : ''}`}>
      <div className="w-full flex justify-end gap-2">
        {onDelete && (
          <Trash
            onClick={onDelete}
            size={24}
            className="cursor-pointer text-gray-700 hover:text-indigo-600"
          />
        )}

        {onEdit && (
          <Dialog.Trigger>
            <NotePencil
              onClick={onEdit}
              size={24}
              className="cursor-pointer text-gray-700 hover:text-indigo-600"
            />
          </Dialog.Trigger>
        )}
      </div>
      <img
        src={imageUrl}
        alt=""
        placeholder="blur"
        className="w-[150px] h-full"
      />
      <h2 className="text-sm">{title}</h2>
      <h1 className="font-bold text-xl">{convertToReal(price)}</h1>
    </div>
  )
}
