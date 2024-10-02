import { SECTION_HERO2 } from "lib/constants";
import { GATimeSpent } from "lib/ga";
import React, { useEffect, useRef } from "react";

type Hero2Data = {
  title: string;
  subtitle: string;
  description: string;
  image_url: any;
}

export const Hero2 = ({ data, custom }: SectionProps<Hero2Data>) => {
  // Props
  const { title, subtitle, description, image_url } = data;
  const { gtm_reference } = custom;

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_HERO2);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  return (
    <section ref={sectionRef} className="bg-black">
      <div className="max-w-[1440px] mx-auto overflow-hidden">
        <div className="relative flex flex-col justify-end min-h-[400px]">
          <div className="relative z-10 flex flex-col gap-[max(75px,_min(calc(100vw_*_(100_/_1440)),_100px))] p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))]">
            <div className="flex items-end justify-between gap-[80px] max-xl:flex-col max-xl:items-start">
              <div className="flex flex-col items-start gap-[10px] max-w-lg">
                <span className="text-[12px] text-white font-medium leading-[112%] -tracking-[.96px] uppercase">
                  {subtitle}
                </span>
                <h2 className="text-[max(24px,_min(calc(100vw_*_(48_/_1440)),_48px))] max-lg:text-[max(24px,_min(calc(100vw_*_(80_/_1440)),_80px))] font-medium leading-[120%] -tracking-[1.28px] bg-linear-4 !bg-clip-text text-transparent">
                  {title}
                </h2>
              </div>
              <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px] max-w-sm bg-linear-5 !bg-clip-text text-transparent">
                {description}
              </p>
            </div>
          </div>
          <div
            className="absolute top-0 w-full min-h-[400px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${image_url})`,
            }}
          ></div>
{/*           <div className="absolute top-0 z-10 w-full min-h-[400px] bg-linear-9"></div> */}
          <div className="absolute bottom-0 right-0 p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))] text-right text-white">
          
            <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px]">
              Intelligent Security Beyond Cameras: Seamless 
            </p>
            <p>
            Solutions for Governments and Business Environments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
