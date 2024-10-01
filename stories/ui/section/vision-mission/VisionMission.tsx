import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { GATimeSpent } from "lib/ga";
import { SECTION_VISION_MISSION } from "lib/constants";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextHuge } from "@/ui/text/text-huge/TextHuge";

interface VisionMissionData {
  vision: {
    title: string;
    description: string;
    image_url: string;
  };
  mission: {
    title: string;
    description: string;
    image_url: string;
  };
}

export const VisionMission = ({
  data,
  custom,
  ...props
}: SectionProps<VisionMissionData>) => {
  // Props
  const { vision, mission } = data;
  const { gtm_reference } = custom;

  // Reference
  const sectionRef = useRef(null);
  const paddingRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const imageRef = useRef(null);

  // State
  const [isActiveSection, setIsActiveSection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   const observer = GATimeSpent(gtm_reference, SECTION_VISION_MISSION);

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   const visionHandle = () => {
  //     const section = sectionRef.current;
  //     if (!section) { return; }

  //     const sectionRect = section.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;
  //     const windowWidth = window.innerWidth;
  //     const sectionTop = sectionRect.top;

  //     const containerPaddingValue = parseInt(
  //       getComputedStyle(paddingRef.current).paddingTop.replace("px", "")
  //     );

  //     const container = imageRef.current.querySelectorAll("img");
  //     const containerContent = contentRef.current.childNodes;
  //     const containerFooter = footerRef.current.childNodes[1].childNodes;
  //     const containerDescription = footerRef.current.childNodes[0];
  //     const containerImageHeight = imageRef.current.getBoundingClientRect().height;

  //     if (sectionTop < 0) {
  //       const navigationElm = window.document.querySelector(
  //         "#navigation-container"
  //       );
  //       if (navigationElm) {
  //         paddingRef.current.style.paddingTop = `calc(max(44px, min(calc(100vw * (80 / 1440)), 80px)) + ${navigationElm.clientHeight}px)`;
  //       }

  //       container.forEach((e, i) => {
  //         if (
  //           sectionTop >
  //           (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
  //             navigationElm.clientHeight
  //         ) {
  //           if (windowWidth > 1023) {
  //             e.style.transform = `translateY(${sectionTop}px)`;
  //           }
  //         }

  //         if (
  //           sectionTop <
  //           (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
  //             navigationElm.clientHeight
  //         ) {
  //           if (windowWidth > 1023) {
  //             e.style.transform = `translateY(${
  //               (windowHeight * i - containerPaddingValue * 2 * i) * -1 -
  //               navigationElm.clientHeight
  //             }px)`;
  //           }
  //           setIsActiveSection(i);
  //         }

  //         if (
  //           sectionTop <
  //           (containerImageHeight * i - containerPaddingValue * 2 * i) * -1 -
  //             navigationElm.clientHeight && sectionTop > ((containerImageHeight * 1 - containerPaddingValue * 2 * 1) * -1 -
  //             navigationElm.clientHeight) * 2 && windowWidth < 1023
  //         ) {
  //           const a = ((containerImageHeight * 1 - containerPaddingValue * 2 * 1) * -1 -
  //           navigationElm.clientHeight) * 2;
  //           container[1].style.transform = `translateY(-${(sectionTop/a)*100}%)`;
  //         }
  //       });
  //     } else {
  //       const navigationElm = window.document.querySelector(
  //         "#navigation-container"
  //       );
  //       if (navigationElm) {
  //         paddingRef.current.style.paddingTop = `max(44px, min(calc(100vw * (80 / 1440)), 80px))`;
  //       }
  //     }

  //     containerContent.forEach((element, ei) => {
  //       if (ei == isActiveSection) {
  //         if (windowWidth < 1023) {
  //           containerContent[0].style.display = 'none'
  //           containerContent[1].style.display = 'block'
  //         }
  //         element.style.opacity = 1;
  //         // element.style.display = "block"
  //         containerDescription.innerText = mission?.description;
  //         containerFooter[ei].style.background = "#3760ff";
  //         containerFooter[ei].style.width =
  //           "max(32px, min(calc(100vw * (64 / 1440)), 64px))";
  //       } else {
  //         if (windowWidth < 1023) {
  //           containerContent[0].style.display = 'block'
  //           containerContent[1].style.display = 'none'
  //         }
  //         element.style.opacity = 0;
  //         // element.style.display = "none"
  //         containerDescription.innerText = vision?.description;
  //         containerFooter[ei].style.background = "#0000003D";
  //         containerFooter[ei].style.width =
  //           "max(12px, min(calc(100vw * (24 / 1440)), 24px))";
  //       }
  //     });
  //   };

  //   window.addEventListener("scroll", visionHandle);
  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);
  //     }
  //     window.removeEventListener("scroll", visionHandle);
  //   };
  // }, [
  //   sectionRef,
  //   paddingRef,
  //   imageRef,
  //   contentRef,
  //   footerRef,
  //   isActiveSection,
  // ]);

  useEffect(() => {
    const images = contentRef.current?.childNodes;
    const contents = imageRef.current?.childNodes;
    const descriptions = footerRef.current?.childNodes;

    if (!images || !contents || !descriptions) return;

    let currentIndex = 0;

    const changeSlide = () => {
      images.forEach((_, index) => {
        if (index === currentIndex) {
          images[index].classList.remove('opacity-0');
          contents[index].classList.remove('opacity-0');
          descriptions[index].classList.remove('opacity-0', 'hidden');
          descriptions[2].childNodes[index].style.width = "max(32px, min(calc(100vw * (64 / 1440)), 64px))"
          descriptions[2].childNodes[index].style.backgroundColor = "#3760FF"
        } else {
          images[index].classList.add('opacity-0');
          contents[index].classList.add('opacity-0');
          descriptions[index].classList.add('opacity-0', 'hidden');
          descriptions[2].childNodes[index].style.width = "max(12px, min(calc(100vw * (24 / 1440)), 24px))"
          descriptions[2].childNodes[index].style.backgroundColor = "#0000003D"
        }
      });

      currentIndex = (currentIndex + 1) % images.length;
    };

    intervalRef.current = setInterval(changeSlide, 3000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      id="section-vision-mission"
      className="bg-[#E9EBF2] h-[446px]"
      {...props}
    >
      <div
        ref={paddingRef}
        className="transition-all h-full sticky top-0 max-w-[1440px] mx-auto p-[max(44px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTA0IiBoZWlnaHQ9IjQ0MSIgdmlld0JveD0iMCAwIDUwNCA0NDEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF84MzNfMzE3MikiPgo8ZyBvcGFjaXR5PSIwLjEyIj4KPGxpbmUgeDE9IjAuNSIgeTE9Ii0yODUiIHgyPSIwLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMjcuNSIgeTE9Ii0yODUiIHgyPSIyNy41IiB5Mj0iMTIwMi4xIiBzdHJva2U9IiMzNjVFRkYiLz4KPGxpbmUgeDE9IjU0LjUiIHkxPSItMjg1IiB4Mj0iNTQuNSIgeTI9IjEyMDIuMSIgc3Ryb2tlPSIjMzY1RUZGIi8+CjxsaW5lIHgxPSI4MS41IiB5MT0iLTI4NSIgeDI9IjgxLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMTA4LjUiIHkxPSItMjg1IiB4Mj0iMTA4LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMTM1LjUiIHkxPSItMjg1IiB4Mj0iMTM1LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMTYyLjUiIHkxPSItMjg1IiB4Mj0iMTYyLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMTg5LjUiIHkxPSItMjg1IiB4Mj0iMTg5LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMjE2LjUiIHkxPSItMjg1IiB4Mj0iMjE2LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMjQzLjUiIHkxPSItMjg1IiB4Mj0iMjQzLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMjcwLjUiIHkxPSItMjg1IiB4Mj0iMjcwLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMjk3LjUiIHkxPSItMjg1IiB4Mj0iMjk3LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMzI0LjUiIHkxPSItMjg1IiB4Mj0iMzI0LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMzUxLjUiIHkxPSItMjg1IiB4Mj0iMzUxLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iMzc4LjUiIHkxPSItMjg1IiB4Mj0iMzc4LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iNDA1LjUiIHkxPSItMjg1IiB4Mj0iNDA1LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iNDMyLjUiIHkxPSItMjg1IiB4Mj0iNDMyLjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iNDU5LjUiIHkxPSItMjg1IiB4Mj0iNDU5LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iNDg2LjUiIHkxPSItMjg1IiB4Mj0iNDg2LjUiIHkyPSIxMjAyLjEiIHN0cm9rZT0iIzM2NUVGRiIvPgo8L2c+CjxnIG9wYWNpdHk9IjAuMTIiPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjQzMS41IiB4Mj0iMTAwOC4xIiB5Mj0iNDMxLjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjQwNC41IiB4Mj0iMTAwOC4xIiB5Mj0iNDA0LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjM3Ny41IiB4Mj0iMTAwOC4xIiB5Mj0iMzc3LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjM1MC41IiB4Mj0iMTAwOC4xIiB5Mj0iMzUwLjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjMyMy41IiB4Mj0iMTAwOC4xIiB5Mj0iMzIzLjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjI5Ni41IiB4Mj0iMTAwOC4xIiB5Mj0iMjk2LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjI2OS41IiB4Mj0iMTAwOC4xIiB5Mj0iMjY5LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjI0Mi41IiB4Mj0iMTAwOC4xIiB5Mj0iMjQyLjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjIxNS41IiB4Mj0iMTAwOC4xIiB5Mj0iMjE1LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjE4OC41IiB4Mj0iMTAwOC4xIiB5Mj0iMTg4LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjE2MS41IiB4Mj0iMTAwOC4xIiB5Mj0iMTYxLjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjEzNC41IiB4Mj0iMTAwOC4xIiB5Mj0iMTM0LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjEwNy41IiB4Mj0iMTAwOC4xIiB5Mj0iMTA3LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8bGluZSB4MT0iLTQ3OSIgeTE9IjgwLjUiIHgyPSIxMDA4LjEiIHkyPSI4MC41IiBzdHJva2U9IiMzNjVFRkYiLz4KPGxpbmUgeDE9Ii00NzkiIHkxPSI1My41IiB4Mj0iMTAwOC4xIiB5Mj0iNTMuNSIgc3Ryb2tlPSIjMzY1RUZGIi8+CjxsaW5lIHgxPSItNDc5IiB5MT0iMjYuNSIgeDI9IjEwMDguMSIgeTI9IjI2LjUiIHN0cm9rZT0iIzM2NUVGRiIvPgo8L2c+CjxyZWN0IHdpZHRoPSIxMDYzLjMyIiBoZWlnaHQ9Ijg3Ni41NTgiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IDAuNzA3MTA3IDAuNzA3MTA3IC0wLjcwNzEwNyAtNjEyIDM3Ny44MikiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl84MzNfMzE3MikiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzgzM18zMTcyIiB4MT0iNTA1Ljc4OSIgeTE9IjUxNC4xNjYiIHgyPSI3NTguNTQiIHkyPSIxMTQ0LjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0U5RUJGMiIvPgo8c3RvcCBvZmZzZXQ9IjAuMTkxMjE2IiBzdG9wLWNvbG9yPSIjRTlFQkYyIiBzdG9wLW9wYWNpdHk9IjAuNzIyMDI5Ii8+CjxzdG9wIG9mZnNldD0iMC42MTAxNTEiIHN0b3AtY29sb3I9IiNFOUVCRjIiIHN0b3Atb3BhY2l0eT0iMC40OTIwMzMiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTlFQkYyIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF84MzNfMzE3MiI+CjxyZWN0IHdpZHRoPSI1MDQiIGhlaWdodD0iNDQxIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=)] bg-contain bg-no-repeat bg-right-top"
      >
        <div className="h-full grid grid-cols-2 gap-[max(32px,_min(calc(100vw_*_(60_/_1440)),_60px))] max-lg:flex max-lg:flex-col">
          <div
            ref={imageRef}
            className="overflow-hidden rounded-[12px] relative transition-all duration-700"
          >
            <img
              src={vision?.image_url}
              alt={vision?.title}
              className="transition-all duration-700 h-full w-full object-cover"
            />
            <img
              src={mission?.image_url}
              alt={mission?.title}
              className="absolute inset-0 transition-all duration-700 h-full w-full object-cover opacity-0"
            />
          </div>
          <div className="flex flex-col justify-between h-full max-lg:justify-end max-lg:gap-[32px] max-lg:h-auto">
            <div ref={contentRef} className="relative">
              <div className="transition-all duration-700 absolute max-lg:relative top-0">
                <TextSmall
                  label="Vision"
                  cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
                />
                <TitleMedium
                  el="h2"
                  label={vision?.title}
                  cls="text-[#19191B] mt-[10px]"
                />
              </div>
              <div className="transition-all duration-700 absolute top-0 opacity-0">
                <TextSmall
                  label="Mission"
                  cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
                />
                <TitleMedium
                  el="h2"
                  label={mission?.title}
                  cls="text-[#19191B] mt-[10px]"
                />
              </div>
            </div>

            <div ref={footerRef} className="max-lg:flex flex-col gap-[32px]">
              <TextHuge label={vision?.description} cls="text-[#19191B]" />
              <TextHuge label={mission?.description} cls="text-[#19191B] opacity-0 hidden" />
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
