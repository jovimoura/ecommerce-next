import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      type='text'
      className={`w-full appearance-none border-b border-b-indigo-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
        className ?? ""
      }`}
      {...rest}
    />
  );
};
