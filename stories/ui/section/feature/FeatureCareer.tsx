import { useEffect, useRef, useState } from "react";
import { GATimeSpent } from "lib/ga";
import { SECTION_OUR_VALUE } from "lib/constants";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TextSmall } from "@/ui/text/text-small/TextSmall";

export const FeatureCareer = ({ data, custom, ...props }: SectionProps<{ featured_list: Array<any>, heading_description: string, heading_title: string, heading_tagline: string }>) => {
  // Props
  const { gtm_reference } = custom;
  const [features, setFeature] = useState(data.featured_list || [])

  // Reference
  const sectionRef = useRef(null);

  function svgToBase64(svg) {
    // Ensure proper UTF-8 encoding using TextEncoder
    const encoded = new TextEncoder().encode(svg);
  
    // Convert the encoded array into a string for btoa
    const base64Encoded = btoa(Array.from(encoded, byte => String.fromCharCode(byte)).join(''));
  
    // Return the Base64 string with the data URI prefix
    return `data:image/svg+xml;base64,${base64Encoded}`;
  }

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_OUR_VALUE);
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

  return (
    <section ref={sectionRef} id="section-feature" className="bg-white" {...props}>
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(100_/_1440)),_100px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="grid grid-cols-3 gap-[48px_32px] max-xl:grid-cols-2 max-md:grid-cols-1">
          <div className="flex flex-col col-span-3 max-xl:col-span-2 max-md:col-span-1 justify-center p-[0px_14px_max(14px,_min(calc(100vw_*_(40_/_1440)),_40px))_14px] bg-[url('/image/featured-background.png')] bg-no-repeat">
            <TextSmall
              label={data.heading_tagline}
              cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
            />
            <TitleMedium el="h2" label={data.heading_title} cls="text-[#19191B] font-medium mt-[10px] max-w-[36rem]" />
          </div>

          {features.map((item, index) => (
            <div key={index} className="px-[20px] border-l border-[#0000000F] flex flex-col items-start gap-[40px]">
              <div className="bg-[#E6EDFF] p-[12px] rounded-[12px]">
                <img src={svgToBase64(item.icon)} alt={item.title} />
              </div>
              <div className="flex flex-col gap-[8px]">
                <TitleXSmall el="h3" label={item.title} cls="text-[#19191B]" />
                <TextLarge label={item.description} cls="text-[#19191B]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
