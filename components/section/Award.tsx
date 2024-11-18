import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { SECTION_ABOUT_US } from "lib/constants";
import { GATimeSpent } from "lib/ga";
import { useEffect, useRef } from "react";

interface AwardData {
  description: string;
  image_url: string;
}

export const Award = ({ data, custom }: SectionProps<AwardData[], {
  gtm_reference: string;
  title: string;
  description?: string;
  variant?: string;
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
    <section ref={sectionRef} className="bg-[#F4F5F6]">
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))_48px_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col items-center text-center">
            <TextSmall
              label={description}
              cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
            />
            <TitleMedium
              el="h2"
              label={title}
              cls="text-[#19191B] font-medium mt-[10px]"
            />
          </div>
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[12px]">
            {data.map((item, index) => (
              <div key={index} className="w-full h-full aspect-square bg-white rounded-full flex items-center justify-center p-[34px] max-sm:w-[250px] max-sm:h-[250px] max-sm:mx-auto">
                <div className="flex flex-col gap-[12px] items-center justify-center">
                  <p className="text-[#19191B] text-[12px] font-[400] leading-[132%] -tracking-[.12px] text-center">
                    Certificated FANR and recognized by the regulation of UAE
                  </p>
                  <div>
                  <img
                    src={item.image_url}
                    alt="Image"
                    // alt={item.title}
                    className="w-full h-full max-w-[200px]"
                  />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
