import { useState } from "react";
import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { Loading } from "../../Loading";

interface ScreenshotButtonProps {
  onScreenshot: string | null | undefined;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  onScreenshot,
  onScreenshotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (onScreenshot) {
    return (
      <button
        onClick={() => onScreenshotTook(null)}
        type='button'
        className={`
          p-1 w-10 h-10 rounded-md border-transparent flex justify-end
          items-end text-zinc-400 hover:text-indigo-500 transition-colors
        `}
        style={{
          backgroundImage: `url(${onScreenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight='fill' />
      </button>
    );
  }
  return (
    <button
      onClick={handleTakeScreenshot}
      type='button'
      className={`
        p-2 bg-transparent shadow border rounded border-zinc-600
      hover:border-indigo-500 transition-colors focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 
      focus:ring-brand-500
      `}
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className='w-6 h-6 text-zinc-600 hover:text-indigo-500' />
      )}
    </button>
  );
}
