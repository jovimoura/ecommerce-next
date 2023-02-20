import { InputHTMLAttributes } from "react";

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const InputFile = ({ title, ...rest }: InputFileProps) => {
  return (
    <label className='cursor-pointer mt-3 group relative w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hidden'>
      {title}
      <input className='hidden' type='file' {...rest} />
    </label>
  );
};
