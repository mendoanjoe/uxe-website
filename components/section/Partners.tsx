import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { SECTION_ABOUT_US } from "lib/constants";
import { GATimeSpent } from "lib/ga";
import { useEffect, useRef } from "react";

interface PartnersData {
  description: string;
  image_url: string;
  title: string;
}

export const Partners = ({ data, custom }: SectionProps<PartnersData[], {
    gtm_reference: string;
    title: string;
    description?: string;
}>) => {
  // Props
  const { gtm_reference, title, description } = custom;

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
          <div className="flex flex-col items-center gap-3 text-center">
            <TitleSmall
              el="h2"
              label={title}
              cls="text-black font-medium text-center max-w-none max-lg:text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))]"
            />
            <TextLarge label={description} cls="max-w-lg" />
          </div>
          <div className="grid grid-cols-5">
            {data.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                alt={item.title}
                className="w-full h-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
