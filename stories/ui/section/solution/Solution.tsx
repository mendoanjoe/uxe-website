import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { GATimeSpent } from "lib/ga";
import { SECTION_SOLUTION } from "lib/constants";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";

type SolutionData = {
  title: string;
  description: string;
  image_url: string;
};

export const Solution = ({ data, custom, ...props }: SectionProps<SolutionData[]>) => {
  // Props
  const { gtm_reference } = custom;
  
  // Reference
  const sectionRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);

  // State
  const [isMobile, setIsMobile] = useState(false);
  const [isActiveSolution, setIsActiveSolution] = useState(true);

  const SCROLL_TO_TOP = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling behavior
    });
  };

  const handleActiveSolution = (value) => {
    setIsActiveSolution(value);
  };

  const handleIsMobile = (value) => {
    setIsMobile(value);
  };

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_SOLUTION);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleSlide1Click = () => handleActiveSolution(true);
    const handleSlide2Click = () => handleActiveSolution(false);

    if (window.innerWidth >= 1024) {
      if (slide1Ref.current) {
        slide1Ref.current.addEventListener('mouseenter', handleSlide1Click);
      }
      if (slide2Ref.current) {
        slide2Ref.current.addEventListener('mouseenter', handleSlide2Click);
      }
    } else {
      handleIsMobile(true)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      if (window.innerWidth > 1024) {
        if (slide1Ref.current) {
          slide1Ref.current.removeEventListener('mouseenter', handleSlide1Click);
        }
        if (slide2Ref.current) {
          slide2Ref.current.removeEventListener('mouseenter', handleSlide2Click);
        }
      }
    };
  }, [slide1Ref, slide2Ref, handleActiveSolution, handleIsMobile, sectionRef]);

  return (
    <section id="section-solution" className="bg-[#F4F5F6]" {...props}>
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(64_/_1440)),_64px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden bg-[url('/image/solution-background.png')] max-lg:bg-none bg-cover">
        <div className="flex flex-col gap-[45px]">
          <div className="flex flex-col items-center text-center">
            <TextSmall label="Solution" cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]" />
            <TitleMedium el="h2" label="Smart Solutions for Smart Cities" cls="text-[#19191B] font-medium mt-[10px]" />
          </div>
          <div className="transition-all flex max-lg:grid max-lg:grid-cols-1 gap-[20px]">
            <div
              ref={slide1Ref}
              className={cn("group/solution1 transition-all ease-[cubic-bezier(0.47,1.07,0.37,1.03)] duration-500 max-lg:w-full rounded-[12px] bg-[#19191B] h-[475px] flex flex-col justify-between overflow-hidden", {
              "w-full is-active": isActiveSolution || isMobile,
              "w-1/2 is-not-active": !isActiveSolution
              })}
              style={{
                ['--solution_1' as any]: `url(${data[0]?.image_url})`
              }}
            >
              <div className="flex flex-col items-start gap-[12px] p-[24px]">
                <a href="/contact-us" title="Get in touch" className="bg-[#BEBEBE40] text-white hover:text-[#19191B] hover:bg-white rounded-full p-[8px] backdrop-blur-[1.5833333730697632px]">
                  <svg className="rotate-45" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                    <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" fill="currentColor"></path>
                  </svg>
                </a>
                <TitleSmall el="h4" label={data[0]?.title} cls="text-white !max-w-full" />
              </div>
              <div className="flex flex-col items-start gap-[20px] bg-black group-[.is-not-active]/solution1:bg-[#19191B] p-[24px] group-[.is-active]/solution1:bg-[url('/image/solution-goverment.png')] max-lg:!bg-none bg-contain bg-right bg-no-repeat">
                <TextLarge label={data[0]?.description} cls="text-white opacity-75 !max-w-md" />
                <TextMedium label="Get in touch" el="a" href="/contact-us" cls="block font-medium p-[10px_16px] rounded-full bg-[#BEBEBE40] text-white hover:bg-white hover:text-[#19191B] backdrop-blur-[2px] border border-[#cfcfcf40]" />
              </div>
            </div>
            <div ref={slide2Ref} className={cn("group/solution2 transition-all ease-[cubic-bezier(0.47,1.07,0.37,1.03)] duration-500 max-lg:w-full rounded-[12px] bg-[#365EFF] h-[475px] flex flex-col justify-between overflow-hidden", {
              "w-full is-active": !isActiveSolution || isMobile,
              "w-1/2 is-not-active": isActiveSolution
            })}
            style={{
              ['--solution_2' as any]: `url(${data[1]?.image_url})`
            }}
            >
              <div className="flex flex-col items-start gap-[12px] p-[24px]">
                <a href="/contact-us" title="Get in touch" className="bg-[#BEBEBE40] text-white hover:text-[#19191B] hover:bg-white rounded-full p-[8px] backdrop-blur-[1.5833333730697632px]">
                  <svg className="rotate-45" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                    <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" fill="currentColor"></path>
                  </svg>
                </a>
                <TitleSmall el="h4" label={data[1]?.title} cls="text-white !max-w-full" />
              </div>
              <div className="flex flex-col items-start gap-[20px] bg-[#365EFF] group-[.is-not-active]/solution2:bg-[#365EFF] p-[24px] group-[.is-active]/solution2:bg-[url('/image/solution-goverment.png')] max-lg:!bg-none bg-contain bg-right bg-no-repeat">
                <TextLarge label={data[1]?.description} cls="text-white opacity-75 !max-w-md" />
                <TextMedium label="Get in touch" el="a" href="/contact-us" cls="block font-medium p-[10px_16px] rounded-full bg-[#BEBEBE40] text-white hover:bg-white hover:text-[#19191B] backdrop-blur-[2px] border border-[#cfcfcf40]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};
