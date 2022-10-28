import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  items: any[]
  className?: string
}

export const Select = ({ items, className, ...rest }: SelectProps) => {
  return (
    <select
      id="select"
      className={`bg-transparent w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
      {...rest}
    >
      {items.map((item, i) => (
        <option key={i}>{item.name}</option>
      ))}
    </select>
  )
}
