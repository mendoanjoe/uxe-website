import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import Image from "next/image";
import React from "react";

export const CEOMsgSection = () => {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10">
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
            <TitleMedium el="blockquote" label="As Dubai strives to be at the forefront of sustainability, this project complements Dubai’s ambitions for providing a sustainable lifestyle." cls="text-[#19191B] italic font-normal" />

            {/* CEO Name & Title */}
            <p className="text-[24px] font-medium leading-[32px] text-[#19191B]">
              Abdulla AlSuwaidi{" "}
              <span className="text-[20px] leading-[24px] text-[#767676] font-light">
                Co-founder & CEO of UXE
              </span>
            </p>

            {/* Read more button */}
            <div className="flex">
              <a
                href="#"
                className="inline-block px-4 py-2 text-[14px] font-medium text-white bg-[#000000] rounded-full shadow-md hover:bg-[#333333] transition-all duration-300"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
