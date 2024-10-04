import { TextHuge } from "@/ui/text/text-huge/TextHuge";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { SECTION_ABOUT_US, SECTION_CEO } from "lib/constants";
import { GAClick } from "lib/ga";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "@/ui/component/button/Button";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import Link from "next/link";

export const CEOMsgSection = ({ text, custom }) => {
  const readMoreRef = useRef(null);
  const [isReadMore, setReadMore] = useState(false);
  const { gtm_reference } = custom;

  const handleReadMore = () => {
    GAClick("other_clicked", gtm_reference, SECTION_CEO, "button-read-more");
    setReadMore(!isReadMore);
  };

  return (
    <section className="bg-[#f5f5f5]">
      {/* <div className="max-w-[1440px] mx-auto px-4 flex flex-col items-start justify-center "> */}
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(100_/_1440)),_100px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="mx-auto">
          {/* CEO message title */}
          <TitleMedium el="h2" label="Leadership" cls="text-[#19191B] font-medium mb-10 max-lg:mb-8 max-w-[36rem]" />
          <div className="flex gap-10 max-md:flex-col">
            {/* Left side - CEO message title + Image */}
            <div className="flex flex-col">
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
            <div className="flex flex-col justify-between max-w-[600px] max-lg:max-w-[450px]">
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
                <div className="flex flex-col gap-3">
                  <div className="space-y-1.5">
                    <TitleSmall label="Abdulla AlSuwaidi" el="h4" />
                    <TextHuge label="Group Chief Executive Officer" el="p" cls="text-[#767676] font-light" />
                  </div>

                  <div className="flex gap-1">
                    {/* <a href="#" className="block h-[32px] w-[32px] p-[4px] bg-[#ffffff] rounded-[8px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17.1761 4.24219H19.9362L13.9061 11.0196L21 20.2422H15.4456L11.0951 14.6488L6.11723 20.2422H3.35544L9.80517 12.993L3 4.24219H8.69545L12.6279 9.35481L17.1761 4.24219ZM16.2073 18.6176H17.7368L7.86441 5.78147H6.2232L16.2073 18.6176Z" fill="#19191B"/>
                      </svg>
                    </a> */}
                    <Link
                      href="#"
                      className="block h-[32px] w-[32px] p-[4px] bg-[#ffffff] rounded-[8px] hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                          fill="#19191bbe"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="block h-[32px] w-[32px] p-[4px] bg-[#ffffff] rounded-[8px] hover:opacity-75"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#19191bbe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </Link>
                  </div>
                </div>

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
        </div>
      </div>
    </section>
  );
};
