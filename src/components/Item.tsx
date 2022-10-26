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
    <div className='shadow-md p-2 max-w-[250px] rounded-lg flex flex-col justify-center items-center gap-2 text-gray-900'>
      <div className='w-full flex justify-end gap-2'>
      <Trash onClick={onDelete} size={24} className='cursor-pointer text-gray-700 hover:text-indigo-600' />
      <NotePencil onClick={onEdit} size={24} className='cursor-pointer text-gray-700 hover:text-indigo-600' />
      </div>
      <img src={imageUrl} alt="" placeholder='blur' className="w-[150px] h-full" />
      <h2 className='text-sm'>{title}</h2>
      <h1 className='font-bold text-xl'>{convertToReal(price)}</h1>
    </div>
  )
}
