import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { SECTION_ABOUT_US } from "lib/constants";
import { GATimeSpent } from "lib/ga";
import { useEffect, useRef } from "react";

interface AwardData {
  title: string;
  description: string;
  year: string;
}

export const Award = ({ data, custom }: SectionProps<AwardData[], {
  gtm_reference: string;
  title: string;
  description?: string;
  variant?: string;
}>) => {
  // Props
  const { gtm_reference, title, description } = custom;

  // Reference
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_ABOUT_US);
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
    <section ref={sectionRef} className="bg-[#F4F5F6]">
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))_48px_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col items-center text-center">
            <TextSmall
              label={description}
              cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
            />
            <TitleMedium
              el="h2"
              label={title}
              cls="text-[#19191B] font-medium mt-[10px]"
            />
          </div>
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[12px]">
            {data.map((item, index) => (
              <div key={index} className="w-full h-full aspect-square bg-white rounded-full flex items-center justify-center p-[34px] max-sm:w-[250px] max-sm:h-[250px] max-sm:mx-auto">
                <div className="flex flex-col gap-[12px] items-center justify-center">
                  <p className="text-[#19191B] text-[12px] font-[400] leading-[132%] -tracking-[.12px] text-center">
                    Certificated FANR and recognized by the regulation of UAE
                  </p>
                  <div className="relative flex flex-col items-center w-full">
                      <p className="text-[16px] leading-[132%] -tracking-[.16px] bg-gradient-to-b from-[#FFAD00] to-[#A47208] bg-clip-text text-transparent">{item.title}</p>
                      <p className="text-[26px] leading-[132%] -tracking-[.26px] text-[#AC7707] font-medium">{item.year}</p>

                      <div className="absolute bottom-0 right-0">
                        <svg width="54" height="68" viewBox="0 0 54 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M43.7894 8.34902C43.7518 8.45749 43.7164 8.56709 43.6731 8.6728C49.5698 19.5624 47.5839 35.1887 37.706 47.4797C27.8772 59.7087 12.4884 65.4148 0.226852 61.3956C0.228003 61.4857 0.226166 61.5748 0.221436 61.6638C6.13166 63.5785 13.0313 63.3206 19.6834 60.9235C26.6374 58.417 32.9386 53.8253 37.9081 47.6429C47.914 35.1923 49.8669 19.3367 43.7894 8.34902Z" fill="url(#paint0_linear_440_5437)"/>
                          <path d="M43.4656 4.51631C44.5866 6.61712 43.9489 8.92876 43.9489 8.92876C43.9489 8.92876 41.7802 8.3714 40.5524 6.07084C39.323 3.76765 39.5131 0.617188 39.5131 0.617188C39.5131 0.617188 42.3283 2.38456 43.4656 4.51631Z" fill="url(#paint1_linear_440_5437)"/>
                          <path d="M48.1098 8.27786C47.8562 10.645 46.0285 12.1983 46.0285 12.1983C46.0285 12.1983 44.5488 10.5188 44.8271 7.92541C45.1057 5.33001 47.0339 2.83118 47.0339 2.83118C47.0339 2.83118 48.3677 5.87543 48.1098 8.27786Z" fill="url(#paint2_linear_440_5437)"/>
                          <path d="M42.336 9.04727C44.3913 10.2491 45.0587 12.5529 45.0587 12.5529C45.0587 12.5529 42.9198 13.2141 40.6688 11.8972C38.4154 10.579 36.9268 7.79557 36.9268 7.79557C36.9268 7.79557 40.2505 7.82703 42.336 9.04727Z" fill="url(#paint3_linear_440_5437)"/>
                          <path d="M49.9775 13.4935C49.1648 15.7316 47.0189 16.8029 47.0189 16.8029C47.0189 16.8029 45.9839 14.8181 46.8742 12.3664C47.7652 9.91287 50.2353 7.94757 50.2353 7.94757C50.2353 7.94757 50.8019 11.2227 49.9775 13.4935Z" fill="url(#paint4_linear_440_5437)"/>
                          <path d="M43.7449 13.5568C45.8001 14.759 46.4676 17.0628 46.4676 17.0628C46.4676 17.0628 44.3292 17.7234 42.0778 16.4068C39.8243 15.0886 38.3361 12.3052 38.3361 12.3052C38.3361 12.3052 41.6594 12.3369 43.7449 13.5568Z" fill="url(#paint5_linear_440_5437)"/>
                          <path d="M50.9603 18.5778C49.7484 20.6273 47.4412 21.2836 47.4412 21.2836C47.4412 21.2836 46.7909 19.1416 48.1179 16.8969C49.4473 14.6498 52.2379 13.1748 52.2379 13.1748C52.2379 13.1748 52.1903 16.4981 50.9603 18.5778Z" fill="url(#paint6_linear_440_5437)"/>
                          <path d="M44.1349 17.9414C46.1902 19.1432 46.858 21.4472 46.858 21.4472C46.858 21.4472 44.7191 22.108 42.4678 20.791C40.2139 19.473 38.7257 16.6897 38.7257 16.6897C38.7257 16.6897 42.049 16.721 44.1349 17.9414Z" fill="url(#paint7_linear_440_5437)"/>
                          <path d="M51.1982 23.522C49.6686 25.347 47.2863 25.6193 47.2863 25.6193C47.2863 25.6193 46.9931 23.4006 48.6673 21.4015C50.3442 19.4008 53.3371 18.3988 53.3371 18.3988C53.3371 18.3988 52.7501 21.6702 51.1982 23.522Z" fill="url(#paint8_linear_440_5437)"/>
                          <path d="M44.0917 22.123C46.1473 23.3253 46.8143 25.629 46.8143 25.629C46.8143 25.629 44.6756 26.2895 42.4244 24.9733C40.1712 23.6544 38.6829 20.8714 38.6829 20.8714C38.6829 20.8714 42.0065 20.9033 44.0917 22.123Z" fill="url(#paint9_linear_440_5437)"/>
                          <path d="M50.8113 28.6383C48.9842 30.1647 46.5911 30.0126 46.5911 30.0126C46.5911 30.0126 46.6933 27.776 48.6946 26.1042C50.6982 24.4306 53.8213 23.9726 53.8213 23.9726C53.8213 23.9726 52.6657 27.0897 50.8113 28.6383Z" fill="url(#paint10_linear_440_5437)"/>
                          <path d="M43.3668 26.4303C45.4223 27.6326 46.0899 29.936 46.0899 29.936C46.0899 29.936 43.951 30.5969 41.7001 29.28C39.4467 27.9618 37.9579 25.1787 37.9579 25.1787C37.9579 25.1787 41.2812 25.2104 43.3668 26.4303Z" fill="url(#paint11_linear_440_5437)"/>
                          <path d="M49.735 33.8649C47.6732 35.0553 45.3412 34.4958 45.3412 34.4958C45.3412 34.4958 45.8257 32.3103 48.0835 31.0056C50.3444 29.7007 53.4995 29.7847 53.4995 29.7847C53.4995 29.7847 51.8279 32.6565 49.735 33.8649Z" fill="url(#paint12_linear_440_5437)"/>
                          <path d="M42.7796 30.4131C44.5985 31.9499 44.8619 34.3338 44.8619 34.3338C44.8619 34.3338 42.6406 34.6186 40.6493 32.9349C38.6549 31.2501 37.6653 28.2526 37.6653 28.2526C37.6653 28.2526 40.934 28.8541 42.7796 30.4131Z" fill="url(#paint13_linear_440_5437)"/>
                          <path d="M48.2299 38.4403C46.0297 39.3507 43.791 38.4911 43.791 38.4911C43.791 38.4911 44.5572 36.3881 46.9668 35.3896C49.3795 34.3917 52.4961 34.8877 52.4961 34.8877C52.4961 34.8877 50.4622 37.5164 48.2299 38.4403Z" fill="url(#paint14_linear_440_5437)"/>
                          <path d="M41.7865 34.1088C43.3887 35.8702 43.3375 38.2675 43.3375 38.2675C43.3375 38.2675 41.0985 38.2596 39.3437 36.3307C37.587 34.3995 36.9982 31.2981 36.9982 31.2981C36.9982 31.2981 40.1609 32.3212 41.7865 34.1088Z" fill="url(#paint15_linear_440_5437)"/>
                          <path d="M46.1666 42.9605C43.8425 43.4776 41.786 42.2432 41.786 42.2432C41.786 42.2432 42.9042 40.3043 45.4497 39.7378C47.9978 39.1713 50.9823 40.1977 50.9823 40.1977C50.9823 40.1977 48.5252 42.4362 46.1666 42.9605Z" fill="url(#paint16_linear_440_5437)"/>
                          <path d="M40.1004 37.751C41.5547 39.6365 41.3091 42.0222 41.3091 42.0222C41.3091 42.0222 39.0784 41.8326 37.4861 39.7682C35.8907 37.7007 35.5551 34.5622 35.5551 34.5622C35.5551 34.5622 38.6239 35.8384 40.1004 37.751Z" fill="url(#paint17_linear_440_5437)"/>
                          <path d="M43.9344 46.7997C41.5608 46.9797 39.7009 45.4656 39.7009 45.4656C39.7009 45.4656 41.0847 43.7048 43.6851 43.5068C46.2879 43.3105 49.0952 44.7522 49.0952 44.7522C49.0952 44.7522 46.3436 46.617 43.9344 46.7997Z" fill="url(#paint18_linear_440_5437)"/>
                          <path d="M38.0406 40.8397C39.4942 42.7259 39.2494 45.1105 39.2494 45.1105C39.2494 45.1105 37.0183 44.9208 35.4262 42.8557C33.8312 40.7895 33.4953 37.6509 33.4953 37.6509C33.4953 37.6509 36.5643 38.9264 38.0406 40.8397Z" fill="url(#paint19_linear_440_5437)"/>
                          <path d="M40.8838 50.7315C38.5096 50.913 36.6501 49.3981 36.6501 49.3981C36.6501 49.3981 38.0338 47.6374 40.6336 47.44C43.237 47.243 46.0443 48.6847 46.0443 48.6847C46.0443 48.6847 43.2922 50.5511 40.8838 50.7315Z" fill="url(#paint20_linear_440_5437)"/>
                          <path d="M35.952 44.6947C36.9603 46.8505 36.2009 49.1252 36.2009 49.1252C36.2009 49.1252 34.0645 48.4551 32.9605 46.0928C31.8552 43.7268 32.2115 40.5911 32.2115 40.5911C32.2115 40.5911 34.929 42.5044 35.952 44.6947Z" fill="url(#paint21_linear_440_5437)"/>
                          <path d="M37.3282 54.5496C34.9481 54.5121 33.2348 52.8329 33.2348 52.8329C33.2348 52.8329 34.773 51.2069 37.3803 51.2478C39.9903 51.2905 42.6544 52.9831 42.6544 52.9831C42.6544 52.9831 39.7441 54.5887 37.3282 54.5496Z" fill="url(#paint22_linear_440_5437)"/>
                          <path d="M33.2373 48.0126C33.9219 50.2926 32.8398 52.433 32.8398 52.433C32.8398 52.433 30.824 51.4585 30.0744 48.9611C29.3243 46.4602 30.1331 43.409 30.1331 43.409C30.1331 43.409 32.5435 45.6975 33.2373 48.0126Z" fill="url(#paint23_linear_440_5437)"/>
                          <path d="M33.8853 57.8434C31.5522 57.3709 30.1756 55.4066 30.1756 55.4066C30.1756 55.4066 31.9857 54.0903 34.5413 54.6076C37.0994 55.1275 39.4086 57.2794 39.4086 57.2794C39.4086 57.2794 36.2531 58.3243 33.8853 57.8434Z" fill="url(#paint24_linear_440_5437)"/>
                          <path d="M30.3514 50.3734C31.0351 52.6547 29.9533 54.7953 29.9533 54.7953C29.9533 54.7953 27.9376 53.8208 27.1885 51.3231C26.4383 48.8213 27.2475 45.7703 27.2475 45.7703C27.2475 45.7703 29.6565 48.0604 30.3514 50.3734Z" fill="url(#paint25_linear_440_5437)"/>
                          <path d="M29.7099 60.6974C27.3771 60.224 26.0001 58.2596 26.0001 58.2596C26.0001 58.2596 27.8103 56.9433 30.366 57.4615C32.9243 57.9806 35.2331 60.1325 35.2331 60.1325C35.2331 60.1325 32.0774 61.1781 29.7099 60.6974Z" fill="url(#paint26_linear_440_5437)"/>
                          <path d="M27.1381 54.0732C26.9027 56.4423 25.0879 58.0108 25.0879 58.0108C25.0879 58.0108 23.5941 56.342 23.8526 53.7466C24.1105 51.1484 26.0193 48.6351 26.0193 48.6351C26.0193 48.6351 27.3772 51.6696 27.1381 54.0732Z" fill="url(#paint27_linear_440_5437)"/>
                          <path d="M24.4434 63.1637C22.1097 62.6918 20.7331 60.7275 20.7331 60.7275C20.7331 60.7275 22.5432 59.4111 25.099 59.9278C27.6571 60.4476 29.966 62.5994 29.966 62.5994C29.966 62.5994 26.8109 63.6444 24.4434 63.1637Z" fill="url(#paint28_linear_440_5437)"/>
                          <path d="M23.0528 56.5236C22.4345 58.8233 20.3884 60.0741 20.3884 60.0741C20.3884 60.0741 19.1862 58.1848 19.8642 55.6654C20.5417 53.1451 22.8348 50.9753 22.8348 50.9753C22.8348 50.9753 23.6806 54.1906 23.0528 56.5236Z" fill="url(#paint29_linear_440_5437)"/>
                          <path d="M19.1888 64.8632C17.1122 64.1805 16.068 62.2419 16.068 62.2419C16.068 62.2419 17.8598 61.2362 20.1344 61.9834C22.4118 62.7308 24.2857 64.9415 24.2857 64.9415C24.2857 64.9415 21.2958 65.5552 19.1888 64.8632Z" fill="url(#paint30_linear_440_5437)"/>
                          <path d="M18.7193 58.7447C17.8471 60.7492 15.8197 61.6085 15.8197 61.6085C15.8197 61.6085 14.9835 59.7303 15.9398 57.5356C16.8962 55.3369 19.2722 53.6765 19.2722 53.6765C19.2722 53.6765 19.6048 56.7105 18.7193 58.7447Z" fill="url(#paint31_linear_440_5437)"/>
                          <path d="M14.8096 65.7103C13.0796 64.8185 12.4349 62.9668 12.4349 62.9668C12.4349 62.9668 14.1516 62.3354 16.0463 63.3111C17.9428 64.2903 19.2792 66.4958 19.2792 66.4958C19.2792 66.4958 16.5648 66.6152 14.8096 65.7103Z" fill="url(#paint32_linear_440_5437)"/>
                          <path d="M15.0049 59.7454C14.2281 61.5297 12.4231 62.2956 12.4231 62.2956C12.4231 62.2956 11.6791 60.6235 12.53 58.669C13.3812 56.7122 15.4962 55.2345 15.4962 55.2345C15.4962 55.2345 15.7931 57.9348 15.0049 59.7454Z" fill="url(#paint33_linear_440_5437)"/>
                          <path d="M9.73985 66.0448C8.13262 64.947 7.72058 63.0312 7.72058 63.0312C7.72058 63.0312 9.50258 62.6149 11.2624 63.8168C13.0239 65.0209 14.0781 67.3765 14.0781 67.3765C14.0781 67.3765 11.37 67.1591 9.73985 66.0448Z" fill="url(#paint34_linear_440_5437)"/>
                          <path d="M10.8509 60.7086C9.67906 62.2614 7.74458 62.5833 7.74458 62.5833C7.74458 62.5833 7.41277 60.7832 8.69655 59.083C9.98258 57.3785 12.3842 56.4374 12.3842 56.4374C12.3842 56.4374 12.0407 59.1321 10.8509 60.7086Z" fill="url(#paint35_linear_440_5437)"/>
                          <path d="M5.11382 65.7069C3.65468 64.5869 3.36559 62.7565 3.36559 62.7565C3.36559 62.7565 5.0691 62.4575 6.66705 63.684C8.267 64.9121 9.1386 67.1895 9.1386 67.1895C9.1386 67.1895 6.59384 66.8444 5.11382 65.7069Z" fill="url(#paint36_linear_440_5437)"/>
                          <path d="M6.58568 60.8868C5.26963 62.1184 3.45168 62.1071 3.45168 62.1071C3.45168 62.1071 3.43402 60.4096 4.87573 59.0606C6.31933 57.7084 8.66174 57.2288 8.66174 57.2288C8.66174 57.2288 7.92153 59.6347 6.58568 60.8868Z" fill="url(#paint37_linear_440_5437)"/>
                          <defs>
                          <linearGradient id="paint0_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint3_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint4_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint5_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint6_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint7_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint8_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint9_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint10_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint11_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint12_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint13_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint14_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint15_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint16_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint17_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint18_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint19_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint20_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint21_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint22_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint23_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint24_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint25_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint26_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint27_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint28_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint29_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint30_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint31_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint32_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint33_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint34_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint35_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint36_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint37_linear_440_5437" x1="-46.1787" y1="0.617188" x2="-46.1787" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <svg width="55" height="68" viewBox="0 0 55 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8529 8.34902C10.8905 8.45749 10.9259 8.56709 10.9692 8.6728C5.0725 19.5624 7.05842 35.1887 16.9363 47.4797C26.765 59.7087 42.1539 65.4148 54.4154 61.3956C54.4143 61.4857 54.4161 61.5748 54.4209 61.6638C48.5106 63.5785 41.611 63.3206 34.9589 60.9235C28.0048 58.417 21.7037 53.8253 16.7342 47.6429C6.72825 35.1923 4.77537 19.3367 10.8529 8.34902Z" fill="url(#paint0_linear_1229_1148)"/>
                          <path d="M11.1771 4.51631C10.0561 6.61712 10.6938 8.92876 10.6938 8.92876C10.6938 8.92876 12.8625 8.3714 14.0903 6.07084C15.3197 3.76765 15.1296 0.617188 15.1296 0.617188C15.1296 0.617188 12.3144 2.38456 11.1771 4.51631Z" fill="url(#paint1_linear_1229_1148)"/>
                          <path d="M6.53279 8.27786C6.78635 10.645 8.61404 12.1983 8.61404 12.1983C8.61404 12.1983 10.0938 10.5188 9.81549 7.92541C9.53689 5.33001 7.60866 2.83118 7.60866 2.83118C7.60866 2.83118 6.27493 5.87543 6.53279 8.27786Z" fill="url(#paint2_linear_1229_1148)"/>
                          <path d="M12.3065 9.04727C10.2512 10.2491 9.58379 12.5529 9.58379 12.5529C9.58379 12.5529 11.7228 13.2141 13.9737 11.8972C16.2271 10.579 17.7157 7.79557 17.7157 7.79557C17.7157 7.79557 14.392 7.82703 12.3065 9.04727Z" fill="url(#paint3_linear_1229_1148)"/>
                          <path d="M4.66505 13.4935C5.47769 15.7316 7.62363 16.8029 7.62363 16.8029C7.62363 16.8029 8.65864 14.8181 7.76829 12.3664C6.87732 9.91287 4.40722 7.94757 4.40722 7.94757C4.40722 7.94757 3.84061 11.2227 4.66505 13.4935Z" fill="url(#paint4_linear_1229_1148)"/>
                          <path d="M10.8975 13.5568C8.84235 14.759 8.17491 17.0628 8.17491 17.0628C8.17491 17.0628 10.3133 17.7234 12.5647 16.4068C14.8181 15.0886 16.3064 12.3052 16.3064 12.3052C16.3064 12.3052 12.9831 12.3369 10.8975 13.5568Z" fill="url(#paint5_linear_1229_1148)"/>
                          <path d="M3.6824 18.5778C4.89434 20.6273 7.20153 21.2836 7.20153 21.2836C7.20153 21.2836 7.85175 19.1416 6.52482 16.8969C5.19538 14.6498 2.4048 13.1748 2.4048 13.1748C2.4048 13.1748 2.4524 16.4981 3.6824 18.5778Z" fill="url(#paint6_linear_1229_1148)"/>
                          <path d="M10.5079 17.9414C8.45256 19.1432 7.78474 21.4472 7.78474 21.4472C7.78474 21.4472 9.92359 22.108 12.1749 20.791C14.4288 19.473 15.9171 16.6897 15.9171 16.6897C15.9171 16.6897 12.5937 16.721 10.5079 17.9414Z" fill="url(#paint7_linear_1229_1148)"/>
                          <path d="M3.44442 23.522C4.97403 25.347 7.35639 25.6193 7.35639 25.6193C7.35639 25.6193 7.64956 23.4006 5.97533 21.4015C4.29847 19.4008 1.30552 18.3988 1.30552 18.3988C1.30552 18.3988 1.89251 21.6702 3.44442 23.522Z" fill="url(#paint8_linear_1229_1148)"/>
                          <path d="M10.551 22.123C8.49539 23.3253 7.82832 25.629 7.82832 25.629C7.82832 25.629 9.96705 26.2895 12.2182 24.9733C14.4714 23.6544 15.9598 20.8714 15.9598 20.8714C15.9598 20.8714 12.6362 20.9033 10.551 22.123Z" fill="url(#paint9_linear_1229_1148)"/>
                          <path d="M3.8313 28.6383C5.65834 30.1647 8.05149 30.0126 8.05149 30.0126C8.05149 30.0126 7.94927 27.776 5.94798 26.1042C3.94443 24.4306 0.821289 23.9726 0.821289 23.9726C0.821289 23.9726 1.97684 27.0897 3.8313 28.6383Z" fill="url(#paint10_linear_1229_1148)"/>
                          <path d="M11.2759 26.4303C9.22031 27.6326 8.55275 29.936 8.55275 29.936C8.55275 29.936 10.6916 30.5969 12.9425 29.28C15.196 27.9618 16.6847 25.1787 16.6847 25.1787C16.6847 25.1787 13.3615 25.2104 11.2759 26.4303Z" fill="url(#paint11_linear_1229_1148)"/>
                          <path d="M4.90758 33.8649C6.96942 35.0553 9.30142 34.4958 9.30142 34.4958C9.30142 34.4958 8.81689 32.3103 6.55905 31.0056C4.2982 29.7007 1.14312 29.7847 1.14312 29.7847C1.14312 29.7847 2.81468 32.6565 4.90758 33.8649Z" fill="url(#paint12_linear_1229_1148)"/>
                          <path d="M11.8629 30.4131C10.044 31.9499 9.78066 34.3338 9.78066 34.3338C9.78066 34.3338 12.0019 34.6186 13.9933 32.9349C15.9876 31.2501 16.9772 28.2526 16.9772 28.2526C16.9772 28.2526 13.7085 28.8541 11.8629 30.4131Z" fill="url(#paint13_linear_1229_1148)"/>
                          <path d="M6.41266 38.4403C8.61286 39.3507 10.8515 38.4911 10.8515 38.4911C10.8515 38.4911 10.0854 36.3881 7.67579 35.3896C5.26309 34.3917 2.1465 34.8877 2.1465 34.8877C2.1465 34.8877 4.18039 37.5164 6.41266 38.4403Z" fill="url(#paint14_linear_1229_1148)"/>
                          <path d="M12.8561 34.1088C11.2539 35.8702 11.3051 38.2675 11.3051 38.2675C11.3051 38.2675 13.5441 38.2596 15.299 36.3307C17.0556 34.3995 17.6444 31.2981 17.6444 31.2981C17.6444 31.2981 14.4817 32.3212 12.8561 34.1088Z" fill="url(#paint15_linear_1229_1148)"/>
                          <path d="M8.47604 42.9605C10.8001 43.4776 12.8566 42.2432 12.8566 42.2432C12.8566 42.2432 11.7384 40.3043 9.1929 39.7378C6.64488 39.1713 3.6603 40.1977 3.6603 40.1977C3.6603 40.1977 6.11743 42.4362 8.47604 42.9605Z" fill="url(#paint16_linear_1229_1148)"/>
                          <path d="M14.5422 37.751C13.0879 39.6365 13.3335 42.0222 13.3335 42.0222C13.3335 42.0222 15.5643 41.8326 17.1566 39.7682C18.7519 37.7007 19.0875 34.5622 19.0875 34.5622C19.0875 34.5622 16.0188 35.8384 14.5422 37.751Z" fill="url(#paint17_linear_1229_1148)"/>
                          <path d="M10.7082 46.7997C13.0819 46.9797 14.9417 45.4656 14.9417 45.4656C14.9417 45.4656 13.558 43.7048 10.9575 43.5068C8.35473 43.3105 5.54747 44.7522 5.54747 44.7522C5.54747 44.7522 8.29906 46.617 10.7082 46.7997Z" fill="url(#paint18_linear_1229_1148)"/>
                          <path d="M16.602 40.8397C15.1483 42.7259 15.3931 45.1105 15.3931 45.1105C15.3931 45.1105 17.6243 44.9208 19.2163 42.8557C20.8113 40.7895 21.1473 37.6509 21.1473 37.6509C21.1473 37.6509 18.0782 38.9264 16.602 40.8397Z" fill="url(#paint19_linear_1229_1148)"/>
                          <path d="M13.7589 50.7315C16.133 50.913 17.9926 49.3981 17.9926 49.3981C17.9926 49.3981 16.6089 47.6374 14.009 47.44C11.4056 47.243 8.59835 48.6847 8.59835 48.6847C8.59835 48.6847 11.3504 50.5511 13.7589 50.7315Z" fill="url(#paint20_linear_1229_1148)"/>
                          <path d="M18.6907 44.6947C17.6824 46.8505 18.4418 49.1252 18.4418 49.1252C18.4418 49.1252 20.5782 48.4551 21.6822 46.0928C22.7875 43.7268 22.4312 40.5911 22.4312 40.5911C22.4312 40.5911 19.7137 42.5044 18.6907 44.6947Z" fill="url(#paint21_linear_1229_1148)"/>
                          <path d="M17.3145 54.5496C19.6946 54.5121 21.4079 52.8329 21.4079 52.8329C21.4079 52.8329 19.8697 51.2069 17.2624 51.2478C14.6523 51.2905 11.9883 52.9831 11.9883 52.9831C11.9883 52.9831 14.8986 54.5887 17.3145 54.5496Z" fill="url(#paint22_linear_1229_1148)"/>
                          <path d="M21.4054 48.0126C20.7208 50.2926 21.8029 52.433 21.8029 52.433C21.8029 52.433 23.8186 51.4585 24.5682 48.9611C25.3183 46.4602 24.5095 43.409 24.5095 43.409C24.5095 43.409 22.0991 45.6975 21.4054 48.0126Z" fill="url(#paint23_linear_1229_1148)"/>
                          <path d="M20.7574 57.8434C23.0905 57.3709 24.4671 55.4066 24.4671 55.4066C24.4671 55.4066 22.6569 54.0903 20.1013 54.6076C17.5433 55.1275 15.234 57.2794 15.234 57.2794C15.234 57.2794 18.3895 58.3243 20.7574 57.8434Z" fill="url(#paint24_linear_1229_1148)"/>
                          <path d="M24.2911 50.3734C23.6074 52.6547 24.6891 54.7953 24.6891 54.7953C24.6891 54.7953 26.7049 53.8208 27.454 51.3231C28.2042 48.8213 27.395 45.7703 27.395 45.7703C27.395 45.7703 24.986 48.0604 24.2911 50.3734Z" fill="url(#paint25_linear_1229_1148)"/>
                          <path d="M24.9325 60.6971C27.2654 60.2238 28.6423 58.2594 28.6423 58.2594C28.6423 58.2594 26.8322 56.9431 24.2765 57.4613C21.7181 57.9804 19.4093 60.1323 19.4093 60.1323C19.4093 60.1323 22.565 61.1779 24.9325 60.6971Z" fill="url(#paint26_linear_1229_1148)"/>
                          <path d="M27.5044 54.073C27.7398 56.4421 29.5546 58.0106 29.5546 58.0106C29.5546 58.0106 31.0484 56.3418 30.7899 53.7464C30.532 51.1482 28.6232 48.6349 28.6232 48.6349C28.6232 48.6349 27.2653 51.6693 27.5044 54.073Z" fill="url(#paint27_linear_1229_1148)"/>
                          <path d="M30.1992 63.1637C32.5329 62.6918 33.9095 60.7275 33.9095 60.7275C33.9095 60.7275 32.0994 59.4111 29.5435 59.9278C26.9854 60.4476 24.6766 62.5994 24.6766 62.5994C24.6766 62.5994 27.8317 63.6444 30.1992 63.1637Z" fill="url(#paint28_linear_1229_1148)"/>
                          <path d="M31.5896 56.5236C32.208 58.8233 34.2541 60.0741 34.2541 60.0741C34.2541 60.0741 35.4563 58.1848 34.7783 55.6654C34.1008 53.1451 31.8077 50.9753 31.8077 50.9753C31.8077 50.9753 30.9619 54.1906 31.5896 56.5236Z" fill="url(#paint29_linear_1229_1148)"/>
                          <path d="M35.4537 64.8632C37.5303 64.1805 38.5745 62.2419 38.5745 62.2419C38.5745 62.2419 36.7827 61.2362 34.5081 61.9834C32.2307 62.7308 30.3568 64.9415 30.3568 64.9415C30.3568 64.9415 33.3467 65.5552 35.4537 64.8632Z" fill="url(#paint30_linear_1229_1148)"/>
                          <path d="M35.9233 58.7447C36.7955 60.7492 38.8229 61.6085 38.8229 61.6085C38.8229 61.6085 39.6591 59.7303 38.7028 57.5356C37.7464 55.3369 35.3704 53.6765 35.3704 53.6765C35.3704 53.6765 35.0378 56.7105 35.9233 58.7447Z" fill="url(#paint31_linear_1229_1148)"/>
                          <path d="M39.8331 65.7103C41.5631 64.8185 42.2078 62.9668 42.2078 62.9668C42.2078 62.9668 40.4911 62.3354 38.5964 63.3111C36.6999 64.2903 35.3635 66.4958 35.3635 66.4958C35.3635 66.4958 38.0779 66.6152 39.8331 65.7103Z" fill="url(#paint32_linear_1229_1148)"/>
                          <path d="M39.6376 59.7454C40.4145 61.5297 42.2195 62.2956 42.2195 62.2956C42.2195 62.2956 42.9635 60.6235 42.1126 58.669C41.2614 56.7122 39.1464 55.2345 39.1464 55.2345C39.1464 55.2345 38.8495 57.9348 39.6376 59.7454Z" fill="url(#paint33_linear_1229_1148)"/>
                          <path d="M44.9028 66.0448C46.5101 64.947 46.9221 63.0312 46.9221 63.0312C46.9221 63.0312 45.1401 62.6149 43.3803 63.8168C41.6187 65.0209 40.5646 67.3765 40.5646 67.3765C40.5646 67.3765 43.2727 67.1591 44.9028 66.0448Z" fill="url(#paint34_linear_1229_1148)"/>
                          <path d="M43.7918 60.7086C44.9636 62.2614 46.8981 62.5833 46.8981 62.5833C46.8981 62.5833 47.2299 60.7832 45.9461 59.083C44.6601 57.3785 42.2585 56.4374 42.2585 56.4374C42.2585 56.4374 42.602 59.1321 43.7918 60.7086Z" fill="url(#paint35_linear_1229_1148)"/>
                          <path d="M49.5287 65.7069C50.9878 64.5869 51.2769 62.7565 51.2769 62.7565C51.2769 62.7565 49.5734 62.4575 47.9754 63.684C46.3755 64.9121 45.5039 67.1895 45.5039 67.1895C45.5039 67.1895 48.0487 66.8444 49.5287 65.7069Z" fill="url(#paint36_linear_1229_1148)"/>
                          <path d="M48.0569 60.8868C49.373 62.1184 51.1909 62.1071 51.1909 62.1071C51.1909 62.1071 51.2086 60.4096 49.7668 59.0606C48.3232 57.7084 45.9808 57.2288 45.9808 57.2288C45.9808 57.2288 46.7211 59.6347 48.0569 60.8868Z" fill="url(#paint37_linear_1229_1148)"/>
                          <defs>
                          <linearGradient id="paint0_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint3_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint4_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint5_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint6_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint7_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint8_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint9_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint10_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint11_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint12_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint13_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint14_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint15_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint16_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint17_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint18_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint19_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint20_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint21_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint22_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint23_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint24_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint25_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint26_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint27_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint28_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint29_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint30_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint31_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint32_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint33_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint34_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint35_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint36_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          <linearGradient id="paint37_linear_1229_1148" x1="100.821" y1="0.617188" x2="100.821" y2="67.3765" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFAD00"/>
                          <stop offset="1" stopColor="#A47208"/>
                          </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
