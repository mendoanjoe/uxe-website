import { TextHuge } from "@/ui/text/text-huge/TextHuge";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { SECTION_ABOUT_US, SECTION_CEO } from "lib/constants";
import { GAClick } from "lib/ga";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "@/ui/component/button/Button";

export const CEOMsgSection = ({ text, custom }) => {
  const readMoreRef = useRef(null);
  const [isReadMore, setReadMore] = useState(false);
  const { gtm_reference } = custom;

  const handleReadMore = () => {
    GAClick("other_clicked", gtm_reference, SECTION_CEO, "button-read-more");
    setReadMore(!isReadMore);
  };

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-start justify-center gap-10">
        {/* Left side - CEO message title + Image */}
        <div className="flex flex-col">
          {/* CEO message title */}
          <TitleMedium el="h2" label="CEO message" cls="text-[#19191B] font-medium mb-4 md:mb-6 max-w-[36rem]" />
          {/* Image */}
          <div className="relative">
            <img
              src="/image/ceo.png" // Placeholder for CEO image
              alt="CEO Image"
              className="rounded-[12px] shadow-lg w-full md:w-[350px] object-cover"
            />
          </div>
        </div>

        {/* Right side - CEO message */}
        <div className="flex flex-col justify-between max-w-[600px] md:max-w-[700px]">
          <div className="flex flex-col gap-6">
            <Image
              src={"/image/quote-left.png"}
              alt="iamge"
              width={20}
              height={10}
            />
            <p
                ref={readMoreRef}
                className={`text-huge ${isReadMore ? "" : "line-clamp-[8]"}`}
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></p>
            {/* <TextHuge el="blockquote" label={`At UXE Security Solutions, we proudly align with Dubai’s vision of becoming the safest city in the world. As leaders in the tech industry, we provide ‘Smart Solutions for a Smart City’ offering innovative, reliable, and trustworthy technology that empowers our clients in an ever-changing landscape.
            By investing in cutting-edge technologies and fostering a dedicated team, we are committed to addressing the challenges of today while anticipating the needs of tomorrow. Our comprehensive solutions ensure peace of mind for businesses, communities, governments, and individuals alike.
            Headquartered in Dubai, we are passionate about contributing to the safety and growth of our city. We uphold the highest standards of quality and professionalism, offering tailored technological solutions that meet the unique needs of each client. Whether you are a business, a government entity, or an individual, our mission is to enable you to operate confidently and efficiently.`} cls="text-[#19191B] italic font-normal" /> */}

            {/* CEO Name & Title */}
            <p className="text-[24px] font-medium leading-[32px] text-[#19191B]">
              Abdulla AlSuwaidi{" "}
              <span className="text-[20px] leading-[24px] text-[#767676] font-light">
                Co-founder & CEO of UXE
              </span>
            </p>

            {/* Read more button */}
            <div className="flex">
              <Button
                label={!isReadMore ? "Read more" : "Read less"}
                onClick={handleReadMore}
              />
              {/* <a
                href="#"
                className="inline-block px-4 py-2 text-[14px] font-medium text-white bg-[#000000] rounded-full shadow-md hover:bg-[#333333] transition-all duration-300"
              >
                Read more
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
