import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { WidgetForm } from "./WidgetForm";

export function Widget() {
  return (
    <Popover className='fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end border border-white rounded-full'>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group bg-indigo-500'>
        <ChatTeardropDots className='h-6 w-6' />
        <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
          <span className='pl-2'></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
