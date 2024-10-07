import React, { useEffect, useRef, useState } from "react";
import { GATimeSpent } from "lib/ga";
import { SECTION_HERO } from "lib/constants";
import Slider from "react-slick";
import { getHeroSection } from "lib/api"; // Assuming this function exists
import { Container } from "@/ui/base/container/Container";
import { TitleLarge } from "@/ui/title/title-large/TitleLarge";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TextHuge } from "@/ui/text/text-huge/TextHuge";
import { Button } from "@/ui/component/button/Button";

type HeroData = {
  button_url: string,
  description: string,
  media_type: string,
  media_url: string,
  title: string
};

export const HeroImage = ({ custom }: { custom: { gtm_reference: string } }) => {
  // Set default hero data as an empty array, and load the default image if loading
  const [heroData, setHeroData] = useState<HeroData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef(null);

  const { gtm_reference } = custom;

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_HERO);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHeroSection(); 
        const listHero: HeroData[] = data.map((element: any) => ({
          button_url: element.button_url,
          description: element.description,
          media_type: element.media_type,
          media_url: element.media_url,
          title: element.title
        }));

        console.log("Hero List", listHero);
        setHeroData(listHero);
        setLoading(false);
      } catch (err) {
        setError("Error fetching hero section data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i: number) => (
      <div className="custom-dot max-md:h-2 max-sm:h-1">
        <div className="indicator-bar" />
      </div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "20px", width: "100%", display: "flex", justifyContent: "center" }}>
        <ul style={{ display: "flex", margin: "0", padding: "0" }}> {dots} </ul>
      </div>
    ),
  };

  // Error handling
  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!heroData) {
    return null; // Guard if data is not fetched yet
  }

  return (
    <section ref={sectionRef} id="section-hero" className="nhero">
      <div className="h-[662px] max-md:h-[400px] max-sm:h-[300px]">
        {/* <Container size="xlarge" cls="nhero-container"> */}
        <div>
          <div className="slider-container h-[662px] max-md:h-[400px] max-sm:h-[300px]">
            <Slider {...settings}>
              {/* {heroData.map && (
                <img className="nhero-image" src={heroData.hero_url} alt="Hero Image" style={{ height: "100%" }} />
              )} */}
              {heroData.map((item, index) => (
                <div key={index} className="relative h-full">
                  {item.media_type == "image" && (
                    <img
                      className="nhero-image object-cover object-top h-full w-full"
                      src={item.media_url}
                      alt="Hero Image"
                      style={{ height: "100%" }}
                    />
                  )}

                  {item.media_type == "video" && (
                    <video src={item.media_url} style={{ height: "100%" }} className="h-full w-full" autoPlay muted loop></video>
                  )}
                  {item.media_type == "image" && (
                    <div className="absolute bottom-0 left-0 right-0 max-w-[1440px] w-full mx-auto p-[max(32px,_min(calc(100vw_*_(100_/_1440)),_100px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] max-md:pb-20 max-sm:pb-14 flex flex-col items-start gap-4 max-md:gap-3.5 max-sm:gap-3">
                      <TitleLarge label={item.title} cls="font-normal" />
                      <TextHuge label={item.description} cls="max-w-sm max-md:max-64 max-sm:max-w-64" />
                      <TextMedium
                        label="Read More"
                        el="a"
                        href={item.button_url}
                        cls="block font-medium p-[10px_16px] rounded-full bg-[#BEBEBE40] text-white hover:bg-white hover:text-[#19191B] backdrop-blur-[2px] border border-[#cfcfcf40]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        {/* </Container> */}
        </div>
      </div>
    </section>
  );
};

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-next w-12 h-12 max-md:w-10 max-md:h-8 max-sm:w-8 max-sm:h-6" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <g clipPath="url(#clip0_151_15816)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.4137 25.4147C31.7886 25.0396 31.9993 24.531 31.9993 24.0007C31.9993 23.4704 31.7886 22.9617 31.4137 22.5867L20.0997 11.2727C19.9152 11.0817 19.6945 10.9293 19.4505 10.8245C19.2065 10.7197 18.9441 10.6645 18.6785 10.6622C18.4129 10.6599 18.1496 10.7105 17.9038 10.811C17.658 10.9116 17.4347 11.0601 17.2469 11.2479C17.0591 11.4357 16.9106 11.659 16.8101 11.9048C16.7095 12.1506 16.6589 12.4139 16.6612 12.6795C16.6635 12.945 16.7187 13.2075 16.8235 13.4515C16.9283 13.6955 17.0807 13.9162 17.2717 14.1007L27.1717 24.0007L17.2717 33.9007C16.9074 34.2779 16.7058 34.7831 16.7103 35.3075C16.7149 35.8319 16.9252 36.3335 17.2961 36.7043C17.6669 37.0751 18.1685 37.2855 18.6929 37.29C19.2173 37.2946 19.7225 37.093 20.0997 36.7287L31.4137 25.4147Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_151_15816">
            <rect width="48" height="48" fill="white" transform="matrix(-1 0 0 1 48 0)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

// Custom Previous Arrow
const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-prev w-12 h-12 max-md:w-10 max-md:h-8 max-sm:w-8 max-sm:h-6" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <g clipPath="url(#clip0_151_15812)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.5865 25.4147C16.2116 25.0396 16.001 24.531 16.001 24.0007C16.001 23.4704 16.2116 22.9617 16.5865 22.5867L27.9005 11.2727C28.085 11.0817 28.3057 10.9293 28.5497 10.8245C28.7937 10.7197 29.0562 10.6645 29.3217 10.6622C29.5873 10.6599 29.8507 10.7105 30.0965 10.811C30.3422 10.9116 30.5656 11.0601 30.7533 11.2479C30.9411 11.4357 31.0896 11.659 31.1902 11.9048C31.2908 12.1506 31.3414 12.4139 31.339 12.6795C31.3367 12.945 31.2816 13.2075 31.1768 13.4515C31.0719 13.6955 30.9196 13.9162 30.7285 14.1007L20.8285 24.0007L30.7285 33.9007C31.0929 34.2779 31.2945 34.7831 31.2899 35.3075C31.2853 35.8319 31.075 36.3335 30.7042 36.7043C30.3334 37.0751 29.8317 37.2855 29.3074 37.29C28.783 37.2946 28.2778 37.093 27.9005 36.7287L16.5865 25.4147Z"
            fill="#727070"
          />
        </g>
        <defs>
          <clipPath id="clip0_151_15812">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
