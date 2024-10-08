import { Container } from "@/ui/base/container/Container";
import { Button } from "@/ui/component/button/Button";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { SECTION_ABOUT_US } from "lib/constants";
import { GAClick, GATimeSpent } from "lib/ga";
import { useEffect, useRef, useState } from "react";
import { convertNewlinesToHTML } from "utils/utils";

interface AboutUsData {
  about: string;
  statistic_1_title: string;
  statistic_1_value: string;
  statistic_2_title: string;
  statistic_2_value: string;
  statistic_3_title: string;
  statistic_3_value: string;
}

export const AboutUs = ({ data, custom }: SectionProps<AboutUsData>) => {
  // Props
  const { gtm_reference } = custom;

  // Reference
  const sectionRef = useRef(null);
  const readMoreRef = useRef(null);

  // State
  const [isReadMore, setReadMore] = useState(false);
  const [isClient, setIsClient] = useState(false)

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleReadMore = () => {
    GAClick(
      "other_clicked",
      gtm_reference,
      SECTION_ABOUT_US,
      "button-read-more"
    );
    setReadMore(!isReadMore);
  };

  if (!data) {
    return null;
  }

  return (
    <section ref={sectionRef} id="section-about-us" className="bg-white">
      <div className="px-large">
        <Container size="medium">
          <div className="py-medium max-w-[54.875rem] flex flex-col gap-[60px]">
            <div className="flex flex-col gap-[20px]">
              {isClient && (
                <p
                  ref={readMoreRef}
                  className={`text-huge ${isReadMore ? "" : "line-clamp-[8]"}`}
                  dangerouslySetInnerHTML={{
                    __html: convertNewlinesToHTML(data.about),
                  }}
                ></p>
              )}
              <div className="flex justify-left">
                <Button
                  label={!isReadMore ? "Read more" : "Read less"}
                  onClick={handleReadMore}
                />
              </div>
            </div>
            <div className="flex justify-between gap-[max(12px,_min(calc(100vw_*_(20_/_1440)),_20px))] flex-wrap">
              <div className="flex flex-col gap-[max(2px,_min(calc(100vw_*_(8_/_1440)),_8px))] pl-[max(12px,_min(calc(100vw_*_(20_/_1440)),_20px))] border-l border-[#0000000F]">
                <TitleMedium label={data.statistic_1_value} />
                <TextMedium label={data.statistic_1_title} />
              </div>
              <div className="flex flex-col gap-[max(2px,_min(calc(100vw_*_(8_/_1440)),_8px))] pl-[max(12px,_min(calc(100vw_*_(20_/_1440)),_20px))] border-l border-[#0000000F]">
                <TitleMedium label={data.statistic_2_value} />
                <TextMedium label={data.statistic_2_title} />
              </div>
              <div className="flex flex-col gap-[max(2px,_min(calc(100vw_*_(8_/_1440)),_8px))] pl-[max(12px,_min(calc(100vw_*_(20_/_1440)),_20px))] border-l border-[#0000000F]">
                <TitleMedium label={data.statistic_3_value} />
                <TextMedium label={data.statistic_3_title} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
