import Image from "next/image";
import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../../services/api";
import { Loading } from "../../../Loading";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>();
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();

    setIsSendingFeedback(true);

    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot,
    });

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          onClick={onRestartFeedback}
          type='button'
          className='top-5 left-5 absolute text-zinc-500 hover:text-indigo-500'
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='text-xl font-primary leading-6 flex items-center gap-2'>
          <Image
            src={feedbackTypeInfo.image.src}
            alt={feedbackTypeInfo.image.alt}
            className='w-6 h-6'
            width={24}
            height={24}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className={`
            min-w-[304px] w-full min-h-[112px] text-sm placeholder:text-zinc-400
          font-sans border- border-zinc-600 bg-transparent rounded-md
            focus:border-brand-500 focus:ring-brand-500 focus:ring-1
            focus:outline-none resize-none scrollbar-thumb-zinc-700
            scrollbar-track-transparent scrollbar-thin
          `}
          placeholder='
          Nos conte o que está acontecendo...'
        />
        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            onScreenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type='submit'
            className={`
              p-2 bg-brand-500 rounded-md border-transparent flex-1 bg-indigo-500 text-white
              flex justify-center items-center text-sm hover:bg-brand-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-offset-zinc-900 focus:ring-brand-500
              transition-colors disabled:opacity-50 disabled:hover:bg-brand-500
            `}
          >
            {isSendingFeedback ? <Loading /> : "Envie o feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
