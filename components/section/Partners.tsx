import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { SECTION_ABOUT_US } from "lib/constants";
import { GATimeSpent } from "lib/ga";
import { useEffect, useRef } from "react";

interface PartnersData {
  description: string;
  image: string;
  title: string;
}

export const Partners = ({ data, custom }: SectionProps<PartnersData[], {
    gtm_reference: string;
    title: string;
    description?: string;
    variant?: string;
}>) => {
  // Props
  const { gtm_reference, title, description, variant = "2" } = custom;

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_ABOUT_US);
    const obsSection = sectionRef.current;
    if (obsSection) {
      observer.observe(obsSection);
    }

    return () => {
      if (obsSection) {
        observer.unobserve(obsSection);
      }
    };
  }, [sectionRef, gtm_reference]);

  if (!data) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))_48px_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="flex flex-col gap-[48px]">
          {variant == "1" && (
            <div className="flex flex-col items-center gap-3 text-center col-span-3 max-xl:col-span-2 max-md:col-span-1 justify-center p-[0px_14px_max(14px,_min(calc(100vw_*_(40_/_1440)),_40px))_14px]">
              <TitleMedium el="h2" label={title} cls="text-[#19191B] font-medium mt-[10px] max-w-[36rem]" />
              <TextLarge label={description} cls="max-w-lg" />
            </div>
          )}
          {variant == "2" && (
            <div className="flex flex-col items-center gap-3 text-center col-span-3 max-xl:col-span-2 max-md:col-span-1 justify-center p-[0px_14px_max(14px,_min(calc(100vw_*_(40_/_1440)),_40px))_14px]">
              <TitleMedium el="h2" label={title} cls="text-[#19191B] font-medium mt-[10px] max-w-[36rem]" />
              <TextLarge label={description} cls="max-w-lg" />
            </div>
          )}
          <div className="grid grid-cols-5 max-md:grid-cols-2 gap-[48px_32px]">
            {data.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt="Image"
                // alt={item.title}
                className="w-full h-full border-l border-[#0000000F]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
