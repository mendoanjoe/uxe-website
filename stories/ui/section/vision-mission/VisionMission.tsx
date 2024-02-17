import React, { useEffect, useRef, useState } from "react";
import { TextMedium } from "../../text/text-medium/TextMedium";
import Image from "next/image";
import { GATimeSpent } from "lib/ga";
import { SECTION_VISION_MISSION } from "lib/constants";

type SchemaData = {
  vision: VisionData;
  mission: VisionData;
};

type VisionData = {
  title: string;
  description: string;
  image_url: string;
};

interface VisionMissionProps {
  data: SchemaData;
  style?: any;
}

export const VisionMission = ({ data, ...props }: VisionMissionProps) => {
  const { vision, mission } = data;
  const [isActive, setIsActive] = useState(0);
  const cScroll = useRef(null);
  const cPadding = useRef(null);
  const cContent = useRef(null);
  const cFooter = useRef(null);
  const cImage = useRef(null);

  // Google Tag Manager
  const [startTime, setStartTime] = useState(-1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const visionHandle = () => {
      const section = cScroll.current;
      if (!section) {
        // Handle the case where cScroll.current is null
        return;
      }
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = sectionRect.top;
  
      const containerPaddingValue = parseInt(
        getComputedStyle(cPadding.current).paddingTop.replace("px", "")
      );
  
      const container = cImage.current.querySelectorAll("img");
      const containerContent = cContent.current.childNodes;
      const containerFooter = cFooter.current.childNodes[1].childNodes;
      const containerDescription = cFooter.current.childNodes[0]
  
      if (sectionTop < 0) {
        const navigationElm = window.document.querySelector(
          "#navigation-container"
        );
        if (navigationElm) {
          cPadding.current.style.paddingTop = `calc(max(44px, min(calc(100vw * (80 / 1440)), 80px)) + ${navigationElm.clientHeight}px)`;
        }
  
        container.forEach((e, i) => {
          if (
            sectionTop >
            (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
              navigationElm.clientHeight
          ) {
            e.style.transform = `translateY(${sectionTop}px)`;
          }
  
          if (
            sectionTop <
            (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
              navigationElm.clientHeight
          ) {
            e.style.transform = `translateY(${
              (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
              navigationElm.clientHeight
            }px)`;
            setIsActive(i);
          }
        });
      } else {
        const navigationElm = window.document.querySelector(
          "#navigation-container"
        );
        if (navigationElm) {
          cPadding.current.style.paddingTop = `max(44px, min(calc(100vw * (80 / 1440)), 80px))`;
        }
      }
  
      containerContent.forEach((element, ei) => {
        if (ei == isActive) {
          element.style.opacity = 1;
          // element.style.display = "block"
          containerDescription.innerText = mission?.description
          containerFooter[ei].style.background = "#3760ff";
          containerFooter[ei].style.width =
            "max(32px, min(calc(100vw * (64 / 1440)), 64px))";
        } else {
          element.style.opacity = 0;
          // element.style.display = "none"
          containerDescription.innerText = vision?.description
          containerFooter[ei].style.background = "#0000003D";
          containerFooter[ei].style.width =
            "max(12px, min(calc(100vw * (24 / 1440)), 24px))";
        }
      });
    };

    const observer = GATimeSpent({
      sectionName: SECTION_VISION_MISSION,
      startTime,
      setStartTime
    })

    if (cScroll.current) {
      observer.observe(cScroll.current);
    }

    window.addEventListener("scroll", visionHandle);
    return () => {
      if (cScroll.current) {
        observer.unobserve(cScroll.current);
      }
      window.removeEventListener("scroll", visionHandle);
    };
  }, [cScroll, cPadding, cImage, cContent, cFooter, isActive, startTime, setStartTime]);

  return (
    <section ref={cScroll} className="bg-[#E6EDFF] h-[200svh]" {...props}>
      <div
        ref={cPadding}
        className="transition-all h-[100svh] sticky top-0 max-w-[1440px] mx-auto p-[max(44px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden bg-[url('/image/vision-background.png')] bg-contain bg-no-repeat bg-right-top"
      >
        <div className="h-full grid grid-cols-2 gap-[max(32px,_min(calc(100vw_*_(60_/_1440)),_60px))] max-lg:flex max-lg:flex-col">
          <div
            ref={cImage}
            className="max-lg:hidden overflow-hidden rounded-[12px]"
          >
            <Image
              src={vision?.image_url}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              alt={vision?.title}
              className="h-full w-full object-cover"
              width={620}
              height={710}
              priority
            />
            <Image
              src={mission?.image_url}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              alt={mission?.title}
              className="h-full w-full object-cover"
              width={620}
              height={710}
              priority
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div ref={cContent} className="relative">
              <div className="transition-all duration-700 absolute top-0 opacity-0">
                <p className="text-[12px] text-[#19191B80] uppercase font-medium leading-[132%] tracking-[.96px]">
                  Vision
                </p>
                <h2 className="text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] text-[#19191B] font-medium leading-[112%] -tracking-[.64px] mt-[10px] max-w-[34rem]">
                  {vision?.title}
                </h2>
              </div>
              <div className="transition-all duration-700 absolute top-0 opacity-0">
                <p className="text-[12px] text-[#19191B80] uppercase font-medium leading-[132%] tracking-[.96px]">
                  Mission
                </p>
                <h2 className="text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] text-[#19191B] font-medium leading-[112%] -tracking-[.64px] mt-[10px] max-w-[34rem]">
                  {mission?.title}
                </h2>
              </div>
            </div>

            <div ref={cFooter} className="max-lg:flex flex-col gap-[32px]">
              <p className="text-[max(14px,_min(calc(100vw_*_(20_/_1440)),_20px))] text-[#19191B] leading-[132%] -tracking-[.2px]">
                {vision?.description}
              </p>
              <div className="gap-[6px] mt-[34px] max-lg:mt-0 flex">
                <div className="transition-all duration-700 h-[max(4px,_min(calc(100vw_*_(6_/_1440)),_6px))] w-[max(32px,_min(calc(100vw_*_(64_/_1440)),_64px))] bg-[#3760FF] rounded-full"></div>
                <div className="transition-all duration-700 h-[max(4px,_min(calc(100vw_*_(6_/_1440)),_6px))] w-[max(12px,_min(calc(100vw_*_(24_/_1440)),_24px))] bg-[#0000003D] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
