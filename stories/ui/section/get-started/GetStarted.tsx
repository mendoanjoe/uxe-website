import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GAClick, GATimeSpent } from "lib/ga";
import { SECTION_GET_STARTED } from "lib/constants";
import { TitleHuge } from "../../title/title-huge/TitleHuge";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextLarge } from "@/ui/text/text-large/TextLarge";

type GetStartedData = {
  label: string;
  description: string;
};

type GetStartedCustom = {
  profile?: {
    url: string;
    description: string;
  }[];
  template?: number;
  isPadding?: boolean;
};

export const GetStarted = ({
  data,
  custom,
  ...props
}: SectionProps<GetStartedData, GetStartedCustom>) => {
  // Props
  const { label, description } = data;
  const { gtm_reference, template = 0, isPadding = false } = custom;

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_GET_STARTED);
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
    <section
      ref={sectionRef}
      id="section-get-started"
      className="bg-white"
      {...props}
    >
      {template == 1 && (
        <div
          className={`get-started2-wrapper ${
            isPadding ? "get-started2-wrapper--padding" : ""
          }`}
        >
          <div className="get-started2">
            <div className="flex gap-[20px] items-center justify-between w-full max-md:flex-col max-md:text-center">
              <div className="flex flex-col gap-[16px]">
                <TitleMedium el="h2" label={label} decoration />
                <TextLarge label={description} cls="text-white max-w-full" />
              </div>
              <Link
                onClick={() =>
                  GAClick(
                    "contact_us_clicked",
                    gtm_reference,
                    SECTION_GET_STARTED,
                    "button-get-in-touch"
                  )
                }
                href="/contact-us"
                className="get-started-button"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
      {template == 0 && (
        <div className="get-started-wrapper py-[max(20px,_min(calc(100vw_*_(60_/_1440)),_60px))]">
          <div className="get-started">
            <div className="get-started-profile">
              <img
                alt="profile"
                src="/image/person-1.png"
                title="Person"
              />
              <img
                alt="profile"
                src="/image/person-2.png"
                title="Person"
              />
              <img
                alt="profile"
                src="/image/person-3.png"
                title="Person"
              />
              <img
                alt="profile"
                src="/image/person-4.png"
                title="Person"
              />
            </div>
            <div className="flex flex-col gap-[20px] items-center">
              <TitleHuge el="h2" label={label} decoration />
              <Link
                onClick={() =>
                  GAClick(
                    "contact_us_clicked",
                    gtm_reference,
                    SECTION_GET_STARTED,
                    "button-get-in-touch"
                  )
                }
                href="/contact-us"
                className="get-started-button"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
