import React, { useEffect, useRef, useState } from "react";

import { TextMedium } from "../../text/text-medium/TextMedium";
import { TitleHuge } from "../../title/title-huge/TitleHuge";
import { TextLarge } from "../../text/text-large/TextLarge";
import { LabelLarge } from "../../component/label-large/LabelLarge";
import { sendGTMEvent } from "@next/third-parties/google";
import { GAClick, GATimeSpent } from "lib/ga";
import { SECTION_HERO } from "lib/constants";
import { ButtonReadMore } from "@/ui/component/button/ButtonReadMore";
import { Container } from "@/ui/base/container/Container";

type HeroData = {
  title: string;
  clients: {
    alt: string;
    logo_url: string;
  }[];
  hero_url: string;
};

export const HeroVideo = ({ data, custom }: SectionProps<HeroData>) => {
  // Props
  const { hero_url, title, clients } = data;
  const { gtm_reference } = custom;
  const [isClient, setIsClient] = useState(false)

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_HERO);
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

  return (
    <section ref={sectionRef} id="section-hero" className="nhero">
      <div>
        <Container size="xlarge" cls="nhero-container">
          {/* <div className="nhero-content">
            <div className="nhero-content--wrapper">
              <div className="nhero-title-wrapper">
                <LabelLarge label="Fairness & Equality" />
                <TitleHuge
                  label="Multiple services to ensure the safety"
                  decoration
                />
              </div>
              <TextLarge
                cls="hero-description"
                label=""
                decoration
              />
            </div>
            <div>
              <div className="nhero-line"></div>
              <div className="nclient">
                <TextMedium label={title} />
                <div className="nclient-item">
                  {clients.map(({ logo_url, alt }, index) => (
                    <img key={index} src={logo_url} alt={alt} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="nhero-video-overlay"></div> */}
          {isClient && (
            <video
              className="nhero-video"
              src={hero_url}
              autoPlay
              loop
              playsInline
              muted
            ></video>
          )}
          <ButtonReadMore
            label="Read More"
            onClick={() => GAClick("other_clicked", gtm_reference, "hero", "read-more")}
          />
        </Container>
      </div>
    </section>
  );
};
