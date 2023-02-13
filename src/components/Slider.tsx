import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Props {
  items: {
    image: string;
  }[];
}

export const Slider = ({ items }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
  });

  return (
    <>
      <div className='flex items-center justify-around w-full overflow-hidden'>
        <div ref={sliderRef} className='keen-slider'>
          {items.map((item, i) => (
            <div
              key={i}
              className='keen-slider__slide flex flex-col md:flex-row items-center justify-center gap[26px] md:gap-10'
            >
              <picture className='w-full'>
                <img
                  src={item.image}
                  alt='image person'
                  className='rounded w-full h-[172px] md:h-[472px]'
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className='flex py-2 px-0 justify-center mt-4'>
          {[
            ...Array(instanceRef.current.track.details?.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  "dot border-none w-2 h-2 md:w-[10px] md:h-[10px] bg-[#D9D9D9] cursor-pointer p-1 mx-1 rounded-full" +
                  (currentSlide === idx ? " active bg-[#202020]" : "")
                }
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};
