import { Container } from "@/ui/base/container/Container";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { COMPONENT_CIRCLE_READ_MORE, SECTION_ABOUT_US } from "lib/constants";
import { GAClick, GATimeSpent } from "lib/ga";
import { useEffect, useRef, useState } from "react";

interface AboutUsCompanyData {
  text: string;
}

export const AboutUsCompany = ({ data, custom }: SectionProps<AboutUsCompanyData>) => {
  // Props
  const { text } = data;
  const { gtm_reference } = custom;

  const statistic = [
    {
      name: "Countries",
      value: "150+",
    },
    {
      name: "Business Users",
      value: "500K+",
    },
    {
      name: "Personal Users",
      value: "3 Million",
    },
    {
      name: "Personal Users",
      value: "3 Million",
    },
  ];

  // Reference
  const sectionRef = useRef(null);
  const readMoreRef = useRef(null);

  // State
  const [isReadMore, setReadMore] = useState(false);

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

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section ref={sectionRef} id="section-about-us" className="bg-white">
      <div className="px-large">
        <Container size="medium">
          <div className="py-medium max-w-[54.875rem] flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[20px] max-w-[800px]">
            {isClient && (
              <p
                ref={readMoreRef}
                className="text-[30px] leading-[40.32px] font-medium tracking-[-0.02em] text-left text-black"
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></p>
            )}
          </div>
            <div className="flex justify-between gap-[30px] flex-wrap">
              {statistic.map(({ name, value }, id) => (
                <div
                  key={id}
                  className="flex flex-col gap-[2px] items-center text-center"
                >
                  <TitleMedium label={value} cls="text-[28px] font-bold text-black" />
                  <TextMedium label={name} cls="text-[14px] font-light text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
