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
        <div className="flex flex-col justify-end min-h-[400px] max-md:min-h-[300px] max-sm:min-h-[250px]">
          <div className="relative z-10 flex flex-col gap-[max(75px,_min(calc(100vw_*_(100_/_1440)),_100px))] p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))]">
            <div className="flex items-end justify-between gap-[max(24px,_min(calc(100vw_*_(80_/_1440)),_80px))] max-md:flex-col max-md:items-start">
              <div className="flex flex-col items-start gap-[10px] max-w-lg">
                {/* <span className="text-[12px] text-white font-medium leading-[112%] -tracking-[.96px] uppercase">
                  {subtitle}
                </span> */}
                {/* <h2 className="text-[max(24px,_min(calc(100vw_*_(48_/_1440)),_48px))] max-lg:text-[max(24px,_min(calc(100vw_*_(80_/_1440)),_80px))] font-medium leading-[120%] -tracking-[1.28px] !bg-clip-text bg-linear-11 text-transparent">
                  {title}
                </h2> */}
              </div>
              {/* <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px] max-w-sm bg-linear-10 !bg-clip-text text-transparent text-end max-md:text-start">
                {description}
              </p> */}
            </div>
          </div>
          <div
            className="absolute inset-0 w-full max-h-[400px] max-md:max-h-[300px] max-sm:max-h-[250px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${image_url})`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};