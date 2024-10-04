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
                </div>

                {/* Read more button */}
                <div className="flex items-center  gap-2.5">
                  <Button
                    label={!isReadMore ? "Read more" : "Read less"}
                    onClick={handleReadMore}
                  />
                  <Link
                    href="#"
                    className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px] hover:opacity-75"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9999 7.66008V8.00008C21.0007 9.06616 20.576 10.0885 19.8199 10.84L16.9999 13.67C16.4738 14.1911 15.6261 14.1911 15.1 13.67L15 13.56C14.8094 13.3656 14.8094 13.0544 15 12.86L18.4399 9.42006C18.807 9.03938 19.0083 8.52883 18.9999 8.00008V7.66008C19.0003 7.12705 18.788 6.61589 18.4099 6.2401L17.7599 5.59011C17.3841 5.21207 16.873 4.99969 16.3399 5.00011H15.9999C15.4669 4.99969 14.9558 5.21207 14.58 5.59011L11.14 9.00007C10.9456 9.19064 10.6344 9.19064 10.44 9.00007L10.33 8.89007C9.8089 8.36394 9.8089 7.51623 10.33 6.99009L13.16 4.15012C13.9165 3.40505 14.9382 2.99133 15.9999 3.00014H16.3399C17.4011 2.9993 18.4191 3.42018 19.1699 4.17012L19.8299 4.83012C20.5798 5.5809 21.0007 6.59891 20.9999 7.66008ZM8.64993 13.94L13.9399 8.65008C14.0338 8.55543 14.1616 8.50218 14.2949 8.50218C14.4282 8.50218 14.556 8.55543 14.6499 8.65008L15.3499 9.35007C15.4445 9.44395 15.4978 9.57175 15.4978 9.70507C15.4978 9.83839 15.4445 9.96618 15.3499 10.0601L10.0599 15.35C9.96604 15.4447 9.83824 15.4979 9.70492 15.4979C9.57161 15.4979 9.44381 15.4447 9.34993 15.35L8.64993 14.65C8.55528 14.5561 8.50204 14.4283 8.50204 14.295C8.50204 14.1617 8.55528 14.0339 8.64993 13.94ZM13.5599 15C13.3655 14.8094 13.0543 14.8094 12.8599 15L9.42993 18.41C9.0517 18.7905 8.53645 19.003 7.99995 18.9999H7.65995C7.12691 19.0004 6.61576 18.788 6.23997 18.41L5.58997 17.76C5.21194 17.3842 4.99956 16.873 4.99998 16.34V16C4.99956 15.4669 5.21194 14.9558 5.58997 14.58L9.00993 11.14C9.2005 10.9456 9.2005 10.6345 9.00993 10.44L8.89993 10.33C8.3738 9.80894 7.52609 9.80894 6.99996 10.33L4.17999 13.16C3.42392 13.9116 2.99916 14.9339 3 16V16.35C3.00182 17.4077 3.42249 18.4216 4.16999 19.1699L4.82998 19.8299C5.58076 20.5799 6.59878 21.0008 7.65995 20.9999H7.99995C9.05338 21.0061 10.0667 20.5964 10.8199 19.8599L13.6699 17.01C14.191 16.4838 14.191 15.6361 13.6699 15.11L13.5599 15Z" fill="black"/>
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px] hover:opacity-75"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 3.24219C3.67157 3.24219 3 3.91376 3 4.74219V19.7422C3 20.5706 3.67157 21.2422 4.5 21.2422H19.5C20.3284 21.2422 21 20.5706 21 19.7422V4.74219C21 3.91376 20.3284 3.24219 19.5 3.24219H4.5ZM8.52076 7.24491C8.52639 8.20116 7.81061 8.79038 6.96123 8.78616C6.16107 8.78194 5.46357 8.14491 5.46779 7.24632C5.47201 6.40116 6.13998 5.72194 7.00764 5.74163C7.88795 5.76132 8.52639 6.40679 8.52076 7.24491ZM12.2797 10.0039H9.75971H9.7583V18.5638H12.4217V18.3641C12.4217 17.9842 12.4214 17.6042 12.4211 17.2241C12.4203 16.2103 12.4194 15.1954 12.4246 14.1819C12.426 13.9358 12.4372 13.6799 12.5005 13.445C12.7381 12.5675 13.5271 12.0008 14.4074 12.1401C14.9727 12.2286 15.3467 12.5563 15.5042 13.0893C15.6013 13.4225 15.6449 13.7811 15.6491 14.1285C15.6605 15.1761 15.6589 16.2237 15.6573 17.2714C15.6567 17.6412 15.6561 18.0112 15.6561 18.381V18.5624H18.328V18.3571C18.328 17.9051 18.3278 17.4532 18.3275 17.0013C18.327 15.8718 18.3264 14.7423 18.3294 13.6124C18.3308 13.1019 18.276 12.5985 18.1508 12.1049C17.9638 11.3708 17.5771 10.7633 16.9485 10.3246C16.5027 10.0124 16.0133 9.81129 15.4663 9.78879C15.404 9.7862 15.3412 9.78281 15.2781 9.7794C14.9984 9.76428 14.7141 9.74892 14.4467 9.80285C13.6817 9.95613 13.0096 10.3063 12.5019 10.9236C12.4429 10.9944 12.3852 11.0663 12.2991 11.1736L12.2797 11.1979V10.0039ZM5.68164 18.5666H8.33242V10.0095H5.68164V18.5666Z" fill="black"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
