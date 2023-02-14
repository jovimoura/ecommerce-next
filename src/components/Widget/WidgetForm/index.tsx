import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucsessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Bug",
    image: {
      src: "/icons/bug.svg",
      alt: "image of a bug",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      src: "/icons/idea.svg",
      alt: "image of a lamp",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      src: "/icons/thought.svg",
      alt: "image of a cloud",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className='bg-[#FAFAFA] border border-gray-200 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-2xl w-[calc(100vw-2rem)] md:w-auto'>
      {feedbackSent ? (
        <FeedbackSucsessStep onRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onRestartFeedback={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className='text-xs text-neutral-400 italic font-sans hover:text-indigo-500 transition-colors'>
        Desenvolvido por{" "}
        <a
          className='underline underline-offset-2'
          target='blank'
          href='https://portfolio-jovimoura.vercel.app/'
        >
          João Victor Moura
        </a>
      </footer>
    </div>
  );
}
