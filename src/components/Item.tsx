import Image from "next/legacy/image";
import Link from "next/link";
import { Trash } from "phosphor-react";
import { ItemProps } from "../@types/item";
import { convertToReal } from "../use-cases/convertToReal";

export const Item = ({ price, title, imageUrl, id, onDelete }: ItemProps) => {
  return (
    <div
      className={`shadow cursor-pointer px-4 py-3 rounded-lg flex flex-col justify-center items-center gap-2 text-gray-900 w-full h-full max-w-[360px] min-h-[370px]`}
    >
      <div className='w-full flex justify-end gap-2'>
        {onDelete && (
          <Trash
            onClick={onDelete}
            size={24}
            weight='fill'
            className='cursor-pointer text-indigo-500 hover:text-indigo-300 transition-colors'
          />
        )}
      </div>
      <Image src={imageUrl} alt='' width={150} height={162} />
      <h1 className='text-xl font-medium font-primary break-words'>{title}</h1>
      <div className='font-secondary text-indigo-500 font-medium text-sm gap-1 flex flex-col w-full justify-start'>
        <span className='font-light text-lg'>{convertToReal(price)}</span>
        <span>Em até 10x de {convertToReal((price as number) / 10)}</span>
        <span className=''>
          {convertToReal((price as number) - 50)} No boleto ou pix
        </span>
      </div>
      <div className='w-full flex justify-start'>
        <Link
          href={`/products/${id}`}
          className='flex items-center justify-center py-2 px-9 rounded-[50px] font-normal leading-6 text-white bg-indigo-500 hover:bg-indigo-400 transition-colors'
        >
          Saiba Mais
        </Link>
      </div>
    </div>
  );
};
