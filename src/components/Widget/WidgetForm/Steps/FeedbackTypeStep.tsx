import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className='text-xl leading-6 font-primary font-normal'>
          Deixe seu feedback
        </span>
        <CloseButton />
      </header>
      <div className='flex py-8 gap-2 w-full'>
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`
                bg-transparent shadow border border-gray-100 rounded-lg py-5 w-24 flex-1 flex flex-col
                items-center gap-2 hover:border-brand-500
                focus:border-brand-500 transition-colors focus:outline-none hover:border-indigo-500 font-primary font-medium
              `}
              type='button'
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={value.image.src} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
