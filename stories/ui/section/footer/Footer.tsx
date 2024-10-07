import React, { ReactNode, useEffect, useRef } from "react";

import { Container } from "../../base/container/Container";
import { TextXSmall } from "../../text/text-xsmall/TextXSmall";
import { TextHuge } from "../../text/text-huge/TextHuge";
import { TextMedium } from "../../text/text-medium/TextMedium";
import { TextSmall } from "../../text/text-small/TextSmall";
import { GAClick, GATimeSpent } from "lib/ga";
import { SECTION_FOOTER } from "lib/constants";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";

type MenuData = {
  url: string;
  name: string;
};

type FooterData = {
  address: string;
  explore_menu: MenuData[];
  contact_menu: MenuData[];
  follow_us_menu: MenuData[];
};

export const Footer = ({ data, custom }: SectionProps<FooterData>) => {
  // Props
  const { gtm_reference } = custom;

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_FOOTER);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  const SCROLL_TO_TOP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling behavior
    });
  };

  return (
    <>
      <section className="bg-[#071952] text-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))]">
            <div className="flex flex-col gap-[48px]">
              <div className="flex justify-between max-md:flex-col max-md:gap-10">
                <div className="flex flex-col gap-[48px]">
                  <div className="flex flex-col gap-[20px] max-w-[360px]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="98"
                        height="40"
                        viewBox="0 0 98 40"
                        fill="none"
                      >
                        <path
                          d="M43.0501 21.4714L33.8059 31.3233C33.669 31.4688 33.5954 31.6626 33.6012 31.8623C33.6071 32.062 33.692 32.2512 33.8372 32.3883L38.2548 36.5518C38.4001 36.6889 38.5938 36.7627 38.7935 36.7572C38.9931 36.7516 39.1824 36.667 39.3198 36.5219L48.919 26.3547C49.0509 26.2149 49.1245 26.0301 49.1249 25.8379V13.9667C49.1249 13.774 49.0512 13.5885 48.919 13.4484L38.394 3.47854C38.2568 3.33361 38.0678 3.24905 37.8683 3.24346C37.6689 3.23787 37.4754 3.3117 37.3304 3.44872L33.4509 7.56672C33.379 7.63464 33.3211 7.71609 33.2806 7.8064C33.2402 7.89671 33.2179 7.99412 33.2151 8.09304C33.2124 8.19196 33.2291 8.29046 33.2645 8.3829C33.2998 8.47533 33.3531 8.55989 33.4211 8.63172L43.0501 17.7282C43.1825 17.8678 43.2562 18.0528 43.256 18.2451V20.9559C43.2553 21.1476 43.1817 21.3319 43.0501 21.4714Z"
                          fill="#FF8B00"
                        />
                        <path
                          d="M57.4718 21.4714L66.716 31.3233C66.8531 31.4686 66.927 31.6623 66.9214 31.862C66.9158 32.0617 66.8312 32.251 66.6862 32.3883L62.2685 36.5518C62.1233 36.6889 61.9295 36.7627 61.7299 36.7572C61.5302 36.7516 61.3409 36.667 61.2035 36.5219L51.6029 26.3547C51.4714 26.2148 51.3983 26.0299 51.3984 25.8379V13.9667C51.3985 13.774 51.4721 13.5885 51.6043 13.4484L62.1294 3.47854C62.2665 3.33361 62.4555 3.24905 62.655 3.24346C62.8544 3.23787 63.0479 3.3117 63.193 3.44872L67.0724 7.56672C67.2174 7.70409 67.302 7.89338 67.3076 8.09306C67.3132 8.29273 67.2393 8.48646 67.1022 8.63172L57.4718 17.7282C57.3394 17.8678 57.2657 18.0528 57.2659 18.2451V20.9559C57.2666 21.1476 57.3402 21.3319 57.4718 21.4714Z"
                          fill="white"
                        />
                        <path
                          d="M75.7794 14.1864V28.0215C75.7794 28.2143 75.856 28.3992 75.9924 28.5356C76.1287 28.6719 76.3137 28.7485 76.5065 28.7485H94.7648C94.9577 28.7485 95.1426 28.8251 95.2789 28.9615C95.4153 29.0978 95.4919 29.2828 95.4919 29.4756V33.9429C95.4919 34.0383 95.4731 34.1328 95.4365 34.2209C95.4 34.309 95.3464 34.3891 95.2788 34.4565C95.2113 34.5239 95.1312 34.5773 95.043 34.6137C94.9548 34.6501 94.8602 34.6687 94.7648 34.6685H72.1868C71.4885 34.6685 70.8187 34.3912 70.3247 33.8975C69.8308 33.4038 69.5531 32.7342 69.5527 32.0358V10.1678C69.5531 9.46948 69.8308 8.79985 70.3247 8.30616C70.8187 7.81248 71.4885 7.53516 72.1868 7.53516H94.7648C94.9577 7.53516 95.1426 7.61175 95.2789 7.7481C95.4153 7.88445 95.4919 8.06937 95.4919 8.2622V12.7281C95.4919 12.9209 95.4153 13.1058 95.2789 13.2422C95.1426 13.3785 94.9577 13.4551 94.7648 13.4551H76.5065C76.4106 13.4551 76.3158 13.4741 76.2273 13.5109C76.1388 13.5477 76.0584 13.6016 75.9909 13.6696C75.9233 13.7375 75.8698 13.8182 75.8335 13.9069C75.7973 13.9956 75.7789 14.0906 75.7794 14.1864Z"
                          fill="white"
                        />
                        <path
                          d="M91.9414 23.4965V18.7125C91.9414 18.3988 91.6871 18.1445 91.3734 18.1445H78.7808C78.4671 18.1445 78.2128 18.3988 78.2128 18.7125V23.4965C78.2128 23.8102 78.4671 24.0645 78.7808 24.0645H91.3734C91.6871 24.0645 91.9414 23.8102 91.9414 23.4965Z"
                          fill="white"
                        />
                        <path
                          d="M30.9389 8.15317V31.9282C30.9389 32.6265 30.6615 33.2961 30.1678 33.7898C29.6741 34.2835 29.0044 34.5609 28.3062 34.5609H15.708C12.2055 34.5609 8.84651 33.1696 6.3699 30.693C3.89329 28.2164 2.50195 24.8574 2.50195 21.3549V8.14891C2.50195 7.95609 2.57855 7.77117 2.7149 7.63482C2.85124 7.49847 3.03617 7.42188 3.22899 7.42188H7.99735C8.19018 7.42188 8.3751 7.49847 8.51145 7.63482C8.6478 7.77117 8.72439 7.95609 8.72439 8.14891V21.4316C8.72439 23.2393 9.44251 24.973 10.7208 26.2512C11.999 27.5295 13.7327 28.2476 15.5404 28.2476H23.9624C24.0612 28.2476 24.159 28.2281 24.2502 28.1903C24.3414 28.1524 24.4243 28.097 24.4941 28.0271C24.5639 27.9572 24.6192 27.8742 24.6568 27.7829C24.6945 27.6916 24.7138 27.5938 24.7136 27.495V8.15317C24.7136 7.96035 24.7902 7.77542 24.9265 7.63908C25.0629 7.50273 25.2478 7.42613 25.4406 7.42613H30.2104C30.306 7.42595 30.4007 7.44461 30.4891 7.48107C30.5774 7.51752 30.6578 7.57105 30.7254 7.63858C30.7931 7.70611 30.8468 7.78632 30.8834 7.87462C30.92 7.96292 30.9389 8.05758 30.9389 8.15317Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <TextMedium cls="max-w-[310px]" label="UXE Security Solutions proudly holds the position of being the premier smart business support and a reliable security provider in MENA region." />
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <TextSmall label="Follow Us" cls="uppercase font-medium" />
                    <div className="flex gap-[8px]">
                      <a
                        href="https://x.com/uxe_ai"
                        className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M17.1761 4.24219H19.9362L13.9061 11.0196L21 20.2422H15.4456L11.0951 14.6488L6.11723 20.2422H3.35544L9.80517 12.993L3 4.24219H8.69545L12.6279 9.35481L17.1761 4.24219ZM16.2073 18.6176H17.7368L7.86441 5.78147H6.2232L16.2073 18.6176Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61556168915473"
                        className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22 12.3033C22 6.7467 17.5229 2.24219 12 2.24219C6.47715 2.24219 2 6.7467 2 12.3033C2 17.325 5.65684 21.4874 10.4375 22.2422V15.2116H7.89844V12.3033H10.4375V10.0867C10.4375 7.56515 11.9305 6.17231 14.2146 6.17231C15.3088 6.17231 16.4531 6.36882 16.4531 6.36882V8.8448H15.1922C13.95 8.8448 13.5625 9.62041 13.5625 10.4161V12.3033H16.3359L15.8926 15.2116H13.5625V22.2422C18.3432 21.4874 22 17.3252 22 12.3033Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/uxe.ai/"
                        className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12.0043 6.60977C9.02305 6.60977 6.61836 9.01445 6.61836 11.9957C6.61836 14.977 9.02305 17.3816 12.0043 17.3816C14.9855 17.3816 17.3902 14.977 17.3902 11.9957C17.3902 9.01445 14.9855 6.60977 12.0043 6.60977ZM12.0043 15.4973C10.0777 15.4973 8.50273 13.927 8.50273 11.9957C8.50273 10.0645 10.073 8.49414 12.0043 8.49414C13.9355 8.49414 15.5059 10.0645 15.5059 11.9957C15.5059 13.927 13.9309 15.4973 12.0043 15.4973ZM18.8668 6.38945C18.8668 7.08789 18.3043 7.6457 17.6105 7.6457C16.9121 7.6457 16.3543 7.0832 16.3543 6.38945C16.3543 5.6957 16.9168 5.1332 17.6105 5.1332C18.3043 5.1332 18.8668 5.6957 18.8668 6.38945ZM22.434 7.66445C22.3543 5.98164 21.9699 4.49102 20.7371 3.26289C19.509 2.03477 18.0184 1.65039 16.3355 1.56602C14.6012 1.46758 9.40273 1.46758 7.66836 1.56602C5.99023 1.6457 4.49961 2.03008 3.2668 3.2582C2.03398 4.48633 1.6543 5.97695 1.56992 7.65977C1.47148 9.39414 1.47148 14.5926 1.56992 16.327C1.64961 18.0098 2.03398 19.5004 3.2668 20.7285C4.49961 21.9566 5.98555 22.341 7.66836 22.4254C9.40273 22.5238 14.6012 22.5238 16.3355 22.4254C18.0184 22.3457 19.509 21.9613 20.7371 20.7285C21.9652 19.5004 22.3496 18.0098 22.434 16.327C22.5324 14.5926 22.5324 9.39883 22.434 7.66445ZM20.1934 18.1879C19.8277 19.1066 19.1199 19.8145 18.1965 20.1848C16.8137 20.7332 13.5324 20.6066 12.0043 20.6066C10.4762 20.6066 7.19023 20.7285 5.81211 20.1848C4.89336 19.8191 4.18555 19.1113 3.81523 18.1879C3.2668 16.8051 3.39336 13.5238 3.39336 11.9957C3.39336 10.4676 3.27148 7.18164 3.81523 5.80352C4.18086 4.88477 4.88867 4.17695 5.81211 3.80664C7.19492 3.2582 10.4762 3.38477 12.0043 3.38477C13.5324 3.38477 16.8184 3.26289 18.1965 3.80664C19.1152 4.17227 19.823 4.88008 20.1934 5.80352C20.7418 7.18633 20.6152 10.4676 20.6152 11.9957C20.6152 13.5238 20.7418 16.8098 20.1934 18.1879Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/@UXESecuritySolutions"
                        className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22.9012 6.50346C22.6395 5.51804 21.8684 4.74196 20.8893 4.47858C19.1148 4 11.9989 4 11.9989 4C11.9989 4 4.88305 4 3.10843 4.47858C2.12939 4.742 1.3583 5.51804 1.09659 6.50346C0.621094 8.28958 0.621094 12.0162 0.621094 12.0162C0.621094 12.0162 0.621094 15.7427 1.09659 17.5289C1.3583 18.5143 2.12939 19.258 3.10843 19.5214C4.88305 20 11.9989 20 11.9989 20C11.9989 20 19.1147 20 20.8893 19.5214C21.8684 19.258 22.6395 18.5143 22.9012 17.5289C23.3767 15.7427 23.3767 12.0162 23.3767 12.0162C23.3767 12.0162 23.3767 8.28958 22.9012 6.50346ZM9.67159 15.3996V8.63271L15.6191 12.0162L9.67159 15.3996Z"
                            fill="#D9D9D9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start max-lg:flex-col max-lg:gap-10">
                  <div className="grid grid-cols-2 gap-[48px_38px] max-lg:w-full">
                    <div className="flex flex-col gap-[16px]">
                      <TextSmall label="Company" cls="uppercase font-medium" />
                      <div className="flex flex-col gap-[4px]">
                        <TextLarge el="a" label="About UXE" cls="text-[#D9D9D9]" href="/company/about-us" />
                        <TextLarge el="a" label="CSR" cls="text-[#D9D9D9]" href="/csr" />
                        <TextLarge el="a" label="Careers" cls="text-[#D9D9D9]" href="/careers" />
                        <TextLarge el="a" label="Contact Us" cls="text-[#D9D9D9]" href="/contact-us" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px]">
                      <TextSmall label="Solution" cls="uppercase font-medium" />
                      <div className="flex flex-col gap-[4px]">
                        <TextLarge el="a" label="For Governments" cls="text-[#D9D9D9]" href="/#for-government" />
                        <TextLarge el="a" label="For Business" cls="text-[#D9D9D9]" href="/#for-business" />
                        <TextLarge el="a" label="Product" cls="text-[#D9D9D9]" href="/products" />
                        <TextLarge el="a" label="Security Consultancy" cls="text-[#D9D9D9]" href="#" />
                        <TextLarge el="a" label="Training Center" cls="text-[#D9D9D9]" href="#" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px]">
                      <TextSmall label="Media center" cls="uppercase font-medium" />
                      <div className="flex flex-col gap-[4px]">
                        <TextLarge el="a" label="Event" cls="text-[#D9D9D9]" href="/media/event" />
                        <TextLarge el="a" label="News" cls="text-[#D9D9D9]" href="/media/event" />
                        <TextLarge el="a" label="Media & Press Release Center" cls="text-[#D9D9D9]" href="/media/press-release" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px]">
                      <TextSmall label="Contact" cls="uppercase font-medium" />
                      <div className="flex flex-col gap-[4px]">
                        <TextLarge el="a" label="+971-60053-9000" cls="text-[#D9D9D9]" href="tel:+971600539000" />
                        <TextLarge el="a" label="info@uxe.ai" cls="text-[#D9D9D9]" href="mailto:info@uxe.ai" />
                        <TextLarge el="a" label="support@keyless.ae" cls="text-[#D9D9D9]" href="mailto:support@keyless.ae" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#142764] p-5 rounded-xl max-w-[350px] max-lg:max-w-none max-lg:w-full flex flex-col gap-4">
                    <TitleXXSmall el="h3" label="Subscribe to Our Newsletter" cls="font-medium" />
                    <TextSmall label="Stay updated with the latest news, articles, and partnership opportunities by subscribing to our newsletter." cls="text-[#D9D9D9]" />
                    <form action="" method="post" className="w-full">
                      <div className="bg-white rounded-[100px] p-[6px_6px_6px_14px] max-md:p-[4px_4px_4px_10px] flex items-center justify-start gap-[14px]">
                        <input
                          type="text"
                          placeholder="Enter your email"
                          className="w-full ring-0 focus-0 outline-0 placeholder:text-[#939599] text-[14px] text-[#19191B] font-[400] leading-[132%] -tracking-[.14px]"
                        />
                        <button
                          type="submit"
                          className="bg-[#19191B] p-[10px_16px] max-md:p-[8px_14px] rounded-[100px] min-w-[80px] text-[14px] font-medium leading-[132%] -tracking-[.14px]"
                        >
                          Join
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="nfooter-bottom">
                <div className="flex items-center justify-between">
                  <TextMedium label={data.address} />
                  <button
                    className="animate-bounce"
                    title="Back to Top"
                    onClick={SCROLL_TO_TOP}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 19L12 5M12 5L18 11M12 5L6 11"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="nfooter-line"></div>
                  <div className="nfooter-credit">
                    <TextSmall label={`© ${new Date().getFullYear()} — UXE`} />
                    {/* <TextSmall
                      el="a"
                      label={data.privacy.name}
                      href={data.privacy.url}
                      hover
                    /> */}
                    <TextSmall label="All rights reserved" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section ref={sectionRef} className="nfooter">
      <div className="nfooter-padding">
        <Container>
          <div className="nfooter-wrapper">
            <div className="nfooter-widget">
              <div className="flex flex-col gap-[32px]">
                <TextXSmall label="Explore" cls="nfooter--title" />
                <div className="flex flex-wrap gap-[12px]">
                  {data.explore_menu.map(({ name, url}, index) => (
                    <div key={index} className="flex flex-wrap gap-[12px]">
                      <TextHuge
                        el="a"
                        href={url}
                        label={name}
                        hover
                        onClick={() => GAClick("link_clicked", gtm_reference, SECTION_FOOTER, "menu-explore")}
                      />
                      {(index < data.explore_menu.length - 1) && (
                        <TextHuge
                          label="/"
                          style={{color: "#D9D9D9"}}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[32px]">
                <TextXSmall label="Contact us" cls="nfooter--title" />
                <div className="flex flex-col gap-[4px]">
                  {data.contact_menu.map(({ name, url }, index) => (
                    <TextMedium
                      el="a"
                      href={url}
                      key={index}
                      label={name}
                      hover
                      onClick={() => GAClick("link_clicked", gtm_reference, SECTION_FOOTER, "menu-contact-us")}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[32px]">
                <TextXSmall label="Follow us" cls="nfooter--title" />
                <div className="flex flex-col gap-[4px]">
                  {data.follow_us_menu.map(({ name, url }, index) => (
                    <TextMedium
                      el="a"
                      href={url}
                      key={index}
                      label={name}
                      hover
                      onClick={() => GAClick("link_clicked", gtm_reference, SECTION_FOOTER, "menu-follow-us")}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="nfooter-bottom">
              <div className="flex items-center justify-between">
                <TextMedium label={data.address} />
                <button
                  className="animate-bounce"
                  title="Back to Top"
                  onClick={SCROLL_TO_TOP}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 19L12 5M12 5L18 11M12 5L6 11"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div className="nfooter-line"></div>
                <div className="nfooter-credit">
                  <TextSmall label={`© ${new Date().getFullYear()} — UXE`} /> */}
      {/* <TextSmall
                    el="a"
                    label={data.privacy.name}
                    href={data.privacy.url}
                    hover
                  /> */}
      {/* <TextSmall label="All rights reserved" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section> */}
    </>
  );
};
