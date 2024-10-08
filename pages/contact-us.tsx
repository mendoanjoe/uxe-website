import Head from "next/head";
import { GetStaticProps } from "next";
import { CMS_NAME } from "../lib/constants";
import { getSettings } from "../lib/new-api";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Meta } from "@/ui/base/Meta";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import Image from "next/image";
import { TitleLarge } from "@/ui/title/title-large/TitleLarge";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";
import { useRouter } from 'next/router';

export default function ContactUsSection({ options }) {
  const { backgroundOptions, contactOptions, footerOptions, generalSettings } = options;

  const formBlock = useRef(null);
  const formMessage = useRef(null);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const form = formBlock.current.querySelector("form");
    formBlock.current.querySelectorAll("br").forEach((item) => item.remove());
    const formID = formBlock.current.querySelector(
      'input[name="_wpcf7"]'
    ).value;
    form.action = `https://api.uxe.ai/wp-json/contact-form-7/v1/contact-forms/${formID}/feedback`;
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission

      try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            // No need to set Content-Type for FormData as it is automatically set
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        formMessage.current.classList.remove("hidden");
        formMessage.current.innerText = responseData.message;

        // Reset the form after successful submission
        form.reset();
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [formBlock, formMessage]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Meta seo={generalSettings} />
      <Head>
        <title>{`${generalSettings?.title} | Contact Us`}</title>
      </Head>
      <div className="min-h-screen">
        {/* Navigation */}
        <div className="bg-white sticky top-0 z-20">
          <div className="max-w-[1440px] mx-auto overflow-hidden">
            <div className="flex items-center justify-between gap-[48px] p-[20px_max(20px,_min(calc(100vw_*_(40_/_1440)),_40px))]">
              <button onClick={handleBack} className="flex items-center gap-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15.834 9.16511H5.95065L8.97565 5.53177C9.1171 5.36159 9.18515 5.14219 9.16484 4.92184C9.14452 4.70148 9.0375 4.49822 8.86732 4.35677C8.69714 4.21532 8.47774 4.14727 8.25738 4.16759C8.03703 4.18791 7.83377 4.29493 7.69232 4.46511L3.52565 9.46511C3.49762 9.50488 3.47255 9.54666 3.45065 9.59011C3.45065 9.63177 3.45065 9.65677 3.39232 9.69844C3.35455 9.79399 3.33477 9.8957 3.33398 9.99844C3.33477 10.1012 3.35455 10.2029 3.39232 10.2984C3.39232 10.3401 3.39232 10.3651 3.45065 10.4068C3.47255 10.4502 3.49762 10.492 3.52565 10.5318L7.69232 15.5318C7.77067 15.6258 7.86879 15.7015 7.97969 15.7533C8.09059 15.8052 8.21156 15.832 8.33398 15.8318C8.52869 15.8322 8.71739 15.7643 8.86732 15.6401C8.9517 15.5701 9.02145 15.4842 9.07258 15.3873C9.1237 15.2903 9.1552 15.1842 9.16527 15.0751C9.17533 14.9659 9.16376 14.8559 9.13122 14.7512C9.09869 14.6465 9.04582 14.5493 8.97565 14.4651L5.95065 10.8318H15.834C16.055 10.8318 16.267 10.744 16.4232 10.5877C16.5795 10.4314 16.6673 10.2195 16.6673 9.99844C16.6673 9.77743 16.5795 9.56546 16.4232 9.40918C16.267 9.2529 16.055 9.16511 15.834 9.16511Z"
                    fill="black"
                  />
                </svg>
                Back
              </button>

              <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="98" height="40" viewBox="0 0 98 40" fill="none">
                  <path d="M43.0501 21.4711L33.8059 31.3231C33.669 31.4685 33.5954 31.6624 33.6012 31.862C33.6071 32.0617 33.692 32.2509 33.8372 32.3881L38.2548 36.5515C38.4001 36.6886 38.5938 36.7625 38.7935 36.7569C38.9931 36.7513 39.1824 36.6667 39.3198 36.5217L48.919 26.3545C49.0509 26.2147 49.1245 26.0298 49.1249 25.8376V13.9664C49.1249 13.7737 49.0512 13.5883 48.919 13.4481L38.394 3.4783C38.2568 3.33336 38.0678 3.24881 37.8683 3.24322C37.6689 3.23762 37.4754 3.31146 37.3304 3.44848L33.4509 7.56648C33.379 7.6344 33.3211 7.71584 33.2806 7.80615C33.2402 7.89647 33.2179 7.99387 33.2151 8.0928C33.2124 8.19172 33.2291 8.29022 33.2645 8.38265C33.2998 8.47509 33.3531 8.55964 33.4211 8.63148L43.0501 17.728C43.1825 17.8675 43.2562 18.0526 43.256 18.2449V20.9557C43.2553 21.1474 43.1817 21.3317 43.0501 21.4711Z" fill="#FF8B00"/>
                  <path d="M57.4718 21.4711L66.716 31.3231C66.8531 31.4683 66.927 31.6621 66.9214 31.8618C66.9158 32.0614 66.8312 32.2507 66.6862 32.3881L62.2685 36.5515C62.1233 36.6886 61.9295 36.7625 61.7299 36.7569C61.5302 36.7513 61.3409 36.6667 61.2035 36.5217L51.6029 26.3545C51.4714 26.2145 51.3983 26.0297 51.3984 25.8376V13.9664C51.3985 13.7737 51.4721 13.5883 51.6043 13.4481L62.1294 3.4783C62.2665 3.33336 62.4555 3.24881 62.655 3.24322C62.8544 3.23762 63.0479 3.31146 63.193 3.44848L67.0724 7.56648C67.2174 7.70384 67.302 7.89314 67.3076 8.09281C67.3132 8.29249 67.2393 8.48622 67.1022 8.63148L57.4718 17.728C57.3394 17.8675 57.2657 18.0526 57.2659 18.2449V20.9557C57.2666 21.1474 57.3402 21.3317 57.4718 21.4711Z" fill="#071952"/>
                  <path d="M75.7794 14.1864V28.0215C75.7794 28.2143 75.856 28.3992 75.9924 28.5356C76.1287 28.6719 76.3137 28.7485 76.5065 28.7485H94.7648C94.9577 28.7485 95.1426 28.8251 95.2789 28.9615C95.4153 29.0978 95.4919 29.2828 95.4919 29.4756V33.9429C95.4919 34.0383 95.4731 34.1328 95.4365 34.2209C95.4 34.309 95.3464 34.3891 95.2788 34.4565C95.2113 34.5239 95.1312 34.5773 95.043 34.6137C94.9548 34.6501 94.8602 34.6687 94.7648 34.6685H72.1868C71.4885 34.6685 70.8187 34.3912 70.3247 33.8975C69.8308 33.4038 69.5531 32.7342 69.5527 32.0358V10.1678C69.5531 9.46948 69.8308 8.79985 70.3247 8.30616C70.8187 7.81248 71.4885 7.53516 72.1868 7.53516H94.7648C94.9577 7.53516 95.1426 7.61175 95.2789 7.7481C95.4153 7.88445 95.4919 8.06937 95.4919 8.2622V12.7281C95.4919 12.9209 95.4153 13.1058 95.2789 13.2422C95.1426 13.3785 94.9577 13.4551 94.7648 13.4551H76.5065C76.4106 13.4551 76.3158 13.4741 76.2273 13.5109C76.1388 13.5477 76.0584 13.6016 75.9909 13.6696C75.9233 13.7375 75.8698 13.8182 75.8335 13.9069C75.7973 13.9956 75.7789 14.0906 75.7794 14.1864Z" fill="#071952"/>
                  <path d="M91.9424 23.4963V18.7123C91.9424 18.3986 91.6881 18.1443 91.3744 18.1443H78.7818C78.4681 18.1443 78.2138 18.3986 78.2138 18.7123V23.4963C78.2138 23.81 78.4681 24.0643 78.7818 24.0643H91.3744C91.6881 24.0643 91.9424 23.81 91.9424 23.4963Z" fill="#071952"/>
                  <path d="M30.9389 8.15244V31.9275C30.9389 32.6257 30.6615 33.2954 30.1678 33.7891C29.6741 34.2828 29.0044 34.5602 28.3062 34.5602H15.708C12.2055 34.5602 8.84651 33.1688 6.3699 30.6922C3.89329 28.2156 2.50195 24.8566 2.50195 21.3542V8.14818C2.50195 7.95536 2.57855 7.77043 2.7149 7.63409C2.85124 7.49774 3.03617 7.42114 3.22899 7.42114H7.99735C8.19018 7.42114 8.3751 7.49774 8.51145 7.63409C8.6478 7.77043 8.72439 7.95536 8.72439 8.14818V21.4309C8.72439 23.2386 9.44251 24.9722 10.7208 26.2505C11.999 27.5287 13.7327 28.2469 15.5404 28.2469H23.9624C24.0612 28.2469 24.159 28.2274 24.2502 28.1895C24.3414 28.1517 24.4243 28.0962 24.4941 28.0263C24.5639 27.9564 24.6192 27.8735 24.6568 27.7822C24.6945 27.6909 24.7138 27.593 24.7136 27.4943V8.15244C24.7136 7.95962 24.7902 7.77469 24.9265 7.63835C25.0629 7.502 25.2478 7.4254 25.4406 7.4254H30.2104C30.306 7.42522 30.4007 7.44388 30.4891 7.48033C30.5774 7.51679 30.6578 7.57031 30.7254 7.63784C30.7931 7.70537 30.8468 7.78558 30.8834 7.87388C30.92 7.96219 30.9389 8.05685 30.9389 8.15244Z" fill="#071952"/>
                </svg>
              </Link>
              <div></div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="bg-white">
          <div className="max-w-[1440px] mx-auto overflow-hidden">
            <div className="grid grid-cols-2 max-md:grid-cols-1 min-h-screen">
              <div className="bg-black text-white">
                <div className="relative overflow-hidden w-full h-full object-cover">
                  {backgroundOptions?.hero_contact && (
                    <img
                      alt="Contact Us Background"
                      src={backgroundOptions?.hero_contact?.url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* <div className="flex flex-col items-start gap-[12px] absolute left-[20px] bottom-[14px]">
                    <div className="p-[10px] rounded-full backdrop-blur-[2px] bg-[#01010140] text-white flex items-center gap-[6px]">
                      <div className="p-[4px] bg-[#FFFFFF] rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1034_26334)">
                            <path
                              d="M5.00065 0.183594L9.16732 1.64193V5.00026C9.16732 6.71984 8.1119 7.92193 7.12732 8.66818C6.53327 9.11443 5.88151 9.47816 5.18982 9.74943C5.17776 9.75409 5.16568 9.75867 5.15357 9.76318L5.14315 9.76693L5.14023 9.76776L5.13898 9.76818C5.13857 9.76818 5.13815 9.76818 5.00065 9.37526L4.86273 9.76859L4.86107 9.76776L4.85815 9.76693L4.84773 9.76276C4.79208 9.74221 4.7368 9.72067 4.6819 9.69818C4.03794 9.43263 3.4303 9.08639 2.87357 8.66776C1.89023 7.92234 0.833984 6.72026 0.833984 5.00068V1.64193L5.00065 0.183594ZM5.00065 9.37526L4.86273 9.76859L5.00065 9.81693L5.13857 9.76859L5.00065 9.37526ZM5.00065 8.92859L5.0044 8.92693C5.58102 8.68881 6.1252 8.37871 6.62398 8.00401C7.51482 7.32943 8.33398 6.34318 8.33398 5.00026V2.23359L5.00065 1.06693L1.66732 2.23359V5.00026C1.66732 6.34318 2.48648 7.32859 3.37732 8.00443C3.87719 8.37985 4.42266 8.69038 5.00065 8.92859ZM7.53065 3.47651L4.5844 6.42276L2.81648 4.65526L3.40607 4.06568L4.58398 5.24443L6.94107 2.88734L7.53065 3.47651Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1034_26334">
                              <rect width="10" height="10" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <TextMedium label="Integrity" />
                    </div>
                    <div className="p-[10px] rounded-full backdrop-blur-[2px] bg-[#01010140] text-white flex items-center gap-[6px]">
                      <div className="p-[4px] bg-[#FFFFFF] rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1034_26334)">
                            <path
                              d="M5.00065 0.183594L9.16732 1.64193V5.00026C9.16732 6.71984 8.1119 7.92193 7.12732 8.66818C6.53327 9.11443 5.88151 9.47816 5.18982 9.74943C5.17776 9.75409 5.16568 9.75867 5.15357 9.76318L5.14315 9.76693L5.14023 9.76776L5.13898 9.76818C5.13857 9.76818 5.13815 9.76818 5.00065 9.37526L4.86273 9.76859L4.86107 9.76776L4.85815 9.76693L4.84773 9.76276C4.79208 9.74221 4.7368 9.72067 4.6819 9.69818C4.03794 9.43263 3.4303 9.08639 2.87357 8.66776C1.89023 7.92234 0.833984 6.72026 0.833984 5.00068V1.64193L5.00065 0.183594ZM5.00065 9.37526L4.86273 9.76859L5.00065 9.81693L5.13857 9.76859L5.00065 9.37526ZM5.00065 8.92859L5.0044 8.92693C5.58102 8.68881 6.1252 8.37871 6.62398 8.00401C7.51482 7.32943 8.33398 6.34318 8.33398 5.00026V2.23359L5.00065 1.06693L1.66732 2.23359V5.00026C1.66732 6.34318 2.48648 7.32859 3.37732 8.00443C3.87719 8.37985 4.42266 8.69038 5.00065 8.92859ZM7.53065 3.47651L4.5844 6.42276L2.81648 4.65526L3.40607 4.06568L4.58398 5.24443L6.94107 2.88734L7.53065 3.47651Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1034_26334">
                              <rect width="10" height="10" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <TextMedium label="Reliability" />
                    </div>
                    <div className="p-[10px] rounded-full backdrop-blur-[2px] bg-[#01010140] text-white flex items-center gap-[6px]">
                      <div className="p-[4px] bg-[#FFFFFF] rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1034_26334)">
                            <path
                              d="M5.00065 0.183594L9.16732 1.64193V5.00026C9.16732 6.71984 8.1119 7.92193 7.12732 8.66818C6.53327 9.11443 5.88151 9.47816 5.18982 9.74943C5.17776 9.75409 5.16568 9.75867 5.15357 9.76318L5.14315 9.76693L5.14023 9.76776L5.13898 9.76818C5.13857 9.76818 5.13815 9.76818 5.00065 9.37526L4.86273 9.76859L4.86107 9.76776L4.85815 9.76693L4.84773 9.76276C4.79208 9.74221 4.7368 9.72067 4.6819 9.69818C4.03794 9.43263 3.4303 9.08639 2.87357 8.66776C1.89023 7.92234 0.833984 6.72026 0.833984 5.00068V1.64193L5.00065 0.183594ZM5.00065 9.37526L4.86273 9.76859L5.00065 9.81693L5.13857 9.76859L5.00065 9.37526ZM5.00065 8.92859L5.0044 8.92693C5.58102 8.68881 6.1252 8.37871 6.62398 8.00401C7.51482 7.32943 8.33398 6.34318 8.33398 5.00026V2.23359L5.00065 1.06693L1.66732 2.23359V5.00026C1.66732 6.34318 2.48648 7.32859 3.37732 8.00443C3.87719 8.37985 4.42266 8.69038 5.00065 8.92859ZM7.53065 3.47651L4.5844 6.42276L2.81648 4.65526L3.40607 4.06568L4.58398 5.24443L6.94107 2.88734L7.53065 3.47651Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1034_26334">
                              <rect width="10" height="10" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <TextMedium label="Agile & Excellence" />
                    </div>
                  </div> */}
                </div>
                {/* <div className="flex flex-col gap-[12px]">
                  <TitleMedium
                    el="h2"
                    label="Solutions for Government and Business Environments"
                  />
                  <TextMedium label="By choosing UXE Security Solutions you are selecting a reliable and experienced security partner who is dedicated to delivering tailored solutions, providing you with the highest level of security expertise and service." />

                  <div>
                    <TitleXSmall label="Contact Us" cls="mt-[24px]" />
                    <div className="flex flex-col gap-[4px] mt-[12px]">
                      {footerOptions.contact_menu.map(({ name, url }, index) => (
                        <TextMedium
                          el="a"
                          href={url}
                          key={index}
                          label={name}
                          hover
                        />
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="p-[max(20px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(96_/_1440)),_96px))] flex flex-col gap-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] items-start bg-[#F4F5F6]">
                <div className="flex flex-col gap-[12px]">
                  <TextSmall label="Contact us" cls="font-medium uppercase"/>
                  <TitleLarge el="h2" label="Get Started with UXE" />
                </div>
                {/* {isClient && ( */}
                  <div
                    className="form-contact"
                    ref={formBlock}
                    dangerouslySetInnerHTML={{ __html: contactOptions?.html }}
                  ></div>
                {/* )} */}
                <p
                  ref={formMessage}
                  className="hidden p-[10px] border-[2px] border-black w-full"
                ></p>
              </div>
            </div>
            <div className="space-y-12 p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))] flex flex-col">
              <div className="flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-5">
                <div className="space-y-3 max-w-xl">
                  <TitleMedium label="Solutions for Governments and Business Environments" el="h2" />
                  <TextMedium label="By choosing UXE Security Solutions you are selecting a reliable and experienced security partner who is dedicated to delivering tailored solutions, providing you with the highest level of security expertise and service." />
                </div>
                <a href="tel:+971-60053-9000" className="flex gap-3 items-end p-5 border border-[#19191B0F] w-fit max-md:w-full rounded-xl">
                  <div className="bg-[#F4F5F6] border border-[#19191B0F] p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_834_3024)">
                        <path d="M19.4293 14.1325L15.0543 12.2575C14.8674 12.1778 14.6597 12.161 14.4624 12.2096C14.2652 12.2582 14.089 12.3696 13.9605 12.527L12.023 14.8942C8.98232 13.4605 6.53524 11.0134 5.10156 7.97269L7.46875 6.03519C7.62644 5.90694 7.73804 5.73081 7.78668 5.53345C7.83531 5.3361 7.81832 5.12828 7.73828 4.94144L5.86328 0.566443C5.77543 0.36504 5.62007 0.200601 5.42397 0.101481C5.22787 0.00236139 5.00332 -0.0252267 4.78906 0.0234739L0.726562 0.960974C0.519988 1.00868 0.335682 1.12499 0.203725 1.29093C0.0717677 1.45687 -4.75863e-05 1.66264 2.36571e-08 1.87465C2.36571e-08 11.8942 8.12109 19.9996 18.125 19.9996C18.3371 19.9998 18.5429 19.928 18.709 19.796C18.875 19.6641 18.9913 19.4797 19.0391 19.2731L19.9766 15.2106C20.025 14.9953 19.9968 14.7698 19.8969 14.5731C19.797 14.3763 19.6317 14.2205 19.4293 14.1325Z" fill="black"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_834_3024">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <TitleXXSmall label="Contact" cls="text-[max(16px,_min(calc(100vw_*_(18_/_1440)),_18px))] leading-[132%] -tracking-[.18px]"/>
                    <TextLarge label="+971-60053-9000" />
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.83398 14.1673L14.1673 5.83398M14.1673 5.83398H5.83398M14.1673 5.83398V14.1673" stroke="#19191B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d507681.4895654901!2d106.807296!3d-6.2291968!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dcd86d33251%3A0xb70fc9fde47e9f21!2sSecurity%20Industry%20Regulatory%20Agency%20(SIRA)!5e0!3m2!1sid!2sid!4v1728255317135!5m2!1sid!2sid"
                width="1280"
                height="400"
                style={{ border: 0, width: "100%" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const options = await getSettings();
  return {
    props: { options },
    revalidate: 10,
  };
};
