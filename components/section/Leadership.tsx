import React, { useEffect, useRef } from "react";

import { GATimeSpent } from "lib/ga";
import { SECTION_LEADERSHIP } from "lib/constants";

type LeadershipData = {
  name: string;
  photo_url: string;
  role: string;
};

export const Leadership = ({
  data,
  custom,
}: SectionProps<LeadershipData[]>) => {
  // Props
  const { gtm_reference } = custom;

  // Reference
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_LEADERSHIP);
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
    <section ref={sectionRef} className="bg-white mb-5">
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden pb-0">
        <div className="flex flex-col gap-[max(48px,_min(calc(100vw_*_(64_/_1440)),_64px))]">
          <div className="flex flex-col items-center gap-[max(8px,_min(calc(100vw_*_(12_/_1440)),_12px))] text-center">
            <h2 className="text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] text-[#19191B] font-medium leading-[112%] -tracking-[.64px]">
              Our masterminds
            </h2>
            <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] leading-[132%] -tracking-[.16px]">
              With over 100 years of combined experience, we&apos;ve got a
              well-seasoned team at the helm.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-[20px] max-lg:grid-cols-3 max-sm:grid-cols-1">
            {data.map(({ name, photo_url, role }, index) => (
              <div
                key={index}
                className="relative rounded-[12px] overflow-hidden pt-[120%] h-0 w-full text-white"
              >
                <img
                  className="absolute top-0 w-full"
                  src={photo_url}
                  alt={name}
                />
                <div className="member-name absolute bottom-0 left-0 right-0  p-[16px] bg-[#0D0D0D66] rounded-[8px]">
                  <p className="person-name text-[16px] font-bold leading-[132%] -tracking-[.16px]">
                    {name}
                  </p>
                  <p className="person-position text-[14px] leading-[132%] -tracking-[.14px]">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
