import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getAllCareer, getAllDepartment, getAllRole, getSettings } from "lib/new-api";
import { CareerListSection } from "@/ui/section/career-list/career-list";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { GAClick } from "lib/ga";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import { TextHuge } from "@/ui/text/text-huge/TextHuge";
import { useEffect, useState } from "react";
import { Button } from "@/ui/component/button/Button";
import { Partners } from "@/section/Partners";
import { convertNewlinesToHTML } from "utils/utils";

export default function CsrSection({ careers, department, roles, options }) {
  const currentPage = "career";
  const {
    backgroundOptions,
    footerOptions,
    generalSettings,
    auditpageOptions,
    callourPartners,
    allformOptions
  } = options;

  const [isClient, setIsClient] = useState(false);

  function svgToBase64(svg) {
    const encoded = new TextEncoder().encode(svg);
    const base64Encoded = btoa(Array.from(encoded, byte => String.fromCharCode(byte)).join(''));
    return `data:image/svg+xml;base64,${base64Encoded}`;
  }

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <Layout data={{ general: options?.generalSettings, footer: options?.footerOptions, subscribe: options?.allformOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title:"Protect Business with Expert Security Consultancy",
          subtitle:"Services",
          description:"UXE Corporate Social Responsibility Initiatives Driving Social and Environmnetal Change",
          image_url: backgroundOptions?.hero_audit?.url,
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <section>
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-20 max-md:gap-10">
            <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-[8%] max-md:gap-8">
              {isClient && backgroundOptions && (
                <div className="rounded-xl overflow-hidden">
                  <video
                    src={auditpageOptions?.heading_video?.url}
                    className="w-full h-full object-cover"
                    controls
                  ></video>
                </div>
              )}
              <div className="space-y-4">
                {isClient && auditpageOptions && (
                  <div className="space-y-8 max-md:space-y-8 max-sm:space-y-6">
                    <TitleMedium label={auditpageOptions?.heading_title} cls="" />
                    <div className="space-y-5 max-md:space-y-4 max-sm:space-y-3">
                      <p className="text-large max-w-full" dangerouslySetInnerHTML={{
                        __html: convertNewlinesToHTML(auditpageOptions?.heading_description),
                      }}></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F4F5F6]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-12 max-lg:gap-10 max-md:gap-8 max-sm:gap-6">
            <div className="flex justify-between items-start gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-3 max-md:flex-col">
              <TitleMedium label={auditpageOptions?.expertise_title} />
              <TextLarge cls="max-w-full max-w-lg" label={auditpageOptions?.expertise_description} />
            </div>
            <div className="flex flex-col items-center gap-10 max-md:gap-6 max-sm:gap-4 max-md:w-full">
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 max-md:w-full">
                {auditpageOptions?.expertise_list.map((item, index) => (
                  <div key={index} className="relative">
                    <img src={item?.image?.url} alt={item?.description} className="w-full h-full" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-[#0D0D0D8A] backdrop-blur-sm min-h-24 flex flex-col justify-end">
                      <TitleXXSmall el="h3" label={item?.title} />
                      <TextMedium label={item?.description} />
                    </div>
                  </div>
                ))}
              </div>
              <Button el="a" label={auditpageOptions?.expertise_button_text} href={auditpageOptions?.expertise_button_url} />
            </div>
          </div>
        </div>
      </section>
      <section id="section-feature" className="bg-white">
        <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(100_/_1440)),_100px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
          <div className="grid grid-cols-3 gap-[48px_32px] max-xl:grid-cols-2 max-md:grid-cols-1">
            <div className="flex flex-col col-span-3 max-xl:col-span-2 max-md:col-span-1 justify-center p-[0px_14px_max(14px,_min(calc(100vw_*_(40_/_1440)),_40px))_14px] bg-[url('/image/featured-background.png')] bg-no-repeat">
              <TitleMedium el="h2" label={auditpageOptions?.audit_service_title} cls="text-[#19191B] font-medium mt-[10px] max-w-[36rem]" />
            </div>

            {auditpageOptions.audit_service_list.map((item, index) => (
              <div key={index} className="px-[20px] border-l border-[#0000000F] flex flex-col items-start gap-[40px]">
                <div className="bg-[#E6EDFF] p-[12px] rounded-[12px]">
                  <img src={svgToBase64(item.icon)} alt={item.title} />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <TitleXSmall el="h3" label={item.title} cls="text-[#19191B]" />
                  <TextLarge label={item.description} cls="text-[#19191B]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Partners
        data={auditpageOptions?.organization_list}
        custom={{
          gtm_reference: currentPage,
          title: auditpageOptions?.organization_title,
          description: auditpageOptions?.organization_description
        }}
      />
      <section className="bg-[#F4F5F6]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-16 max-lg:gap-10 max-md:gap-8 max-sm:gap-6">
            <div className="flex flex-col items-center gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-3 max-w-2xl text-center mx-auto max-md:text-left max-md:items-start">
              <TitleMedium label={auditpageOptions?.industries_title} cls="" />
              <TextLarge cls="max-w-full text-[#939599]" label={auditpageOptions?.industries_description} />
            </div>
            <div className="flex gap-3 items-center justify-center flex-wrap max-w-3xl mx-auto max-md:items-start max-md:mx-0 max-md:justify-start max-md:gap-2">
              {auditpageOptions?.industries_list.map((item, index) => (
                <TextLarge key={index} label={item.text} cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              ))}
            </div>
            <div className="flex items-center mx-auto">
              <Button el="a" label={auditpageOptions?.industries_button_text} href={auditpageOptions?.industries_button_url} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-20 max-md:gap-10">
            <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-14 max-md:gap-10 max-sm:gap-8">
              <div className="space-y-12 max-lg:space-y-10 max-md:space-y-8 max-sm:space-y-6">
                <div className="space-y-6 max-lg:space-y-5 max-md:space-y-4 max-sm:space-y-3">
                  <TitleMedium label="Get in Touch" cls="" />
                  <TextLarge cls="max-w-full text-[#939599]" label="For more information or to schedule an audit, contact our customer support team available 24/7." />
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3 max-md:gap-2">
                  <a href="tel:600-539000" className="flex gap-3 items-end p-4 border border-[#19191B0F] rounded-xl">
                    <div className="bg-[#F4F5F6] border border-[#19191B0F] p-2 rounded-full my-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
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
                      <TitleXXSmall label="Customer service" cls="text-[max(12px,_min(calc(100vw_*_(14_/_1440)),_14px))] leading-[132%] -tracking-[.14px]"/>
                      <TextLarge label="600-539000" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="ml-auto" fill="none">
                      <path d="M5.83398 14.1673L14.1673 5.83398M14.1673 5.83398H5.83398M14.1673 5.83398V14.1673" stroke="#19191B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="mailto:audit@uxe.ai" className="flex gap-3 items-end p-4 border border-[#19191B0F] rounded-xl">
                    <div className="bg-[#F4F5F6] border border-[#19191B0F] p-2 rounded-full my-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clipPath="url(#clip0_440_13344)">
                          <path d="M16.291 5.87484V3.18115C16.291 3.04433 16.264 2.90885 16.2116 2.78245C16.1592 2.65605 16.0825 2.54122 15.9857 2.4445L14.5127 0.971517C14.3174 0.776257 14.0525 0.666546 13.7764 0.666504L5.87435 0.666504C5.59808 0.666504 5.33313 0.776251 5.13778 0.971601C4.94243 1.16695 4.83268 1.4319 4.83268 1.70817V16.2915C4.83268 16.5678 4.94243 16.8327 5.13778 17.0281C5.33313 17.2234 5.59808 17.3332 5.87435 17.3332H16.291C16.5673 17.3332 16.8322 17.2234 17.0276 17.0281C17.2229 16.8327 17.3327 16.5678 17.3327 16.2915V6.9165C17.3327 6.64024 17.2229 6.37528 17.0276 6.17993C16.8322 5.98458 16.5673 5.87484 16.291 5.87484ZM10.041 14.729C10.041 14.8671 9.98614 14.9996 9.88847 15.0973C9.79079 15.195 9.65832 15.2498 9.52018 15.2498H8.47852C8.34038 15.2498 8.20791 15.195 8.11023 15.0973C8.01256 14.9996 7.95768 14.8671 7.95768 14.729V13.6873C7.95768 13.5492 8.01256 13.4167 8.11023 13.3191C8.20791 13.2214 8.34038 13.1665 8.47852 13.1665H9.52018C9.65832 13.1665 9.79079 13.2214 9.88847 13.3191C9.98614 13.4167 10.041 13.5492 10.041 13.6873V14.729ZM10.041 10.5623C10.041 10.7005 9.98614 10.8329 9.88847 10.9306C9.79079 11.0283 9.65832 11.0832 9.52018 11.0832H8.47852C8.34038 11.0832 8.20791 11.0283 8.11023 10.9306C8.01256 10.8329 7.95768 10.7005 7.95768 10.5623V9.52067C7.95768 9.38254 8.01256 9.25006 8.11023 9.15238C8.20791 9.05471 8.34038 8.99984 8.47852 8.99984H9.52018C9.65832 8.99984 9.79079 9.05471 9.88847 9.15238C9.98614 9.25006 10.041 9.38254 10.041 9.52067V10.5623ZM14.2077 14.729C14.2077 14.8671 14.1528 14.9996 14.0551 15.0973C13.9575 15.195 13.825 15.2498 13.6868 15.2498H12.6452C12.507 15.2498 12.3746 15.195 12.2769 15.0973C12.1792 14.9996 12.1243 14.8671 12.1243 14.729V13.6873C12.1243 13.5492 12.1792 13.4167 12.2769 13.3191C12.3746 13.2214 12.507 13.1665 12.6452 13.1665H13.6868C13.825 13.1665 13.9575 13.2214 14.0551 13.3191C14.1528 13.4167 14.2077 13.5492 14.2077 13.6873V14.729ZM14.2077 10.5623C14.2077 10.7005 14.1528 10.8329 14.0551 10.9306C13.9575 11.0283 13.825 11.0832 13.6868 11.0832H12.6452C12.507 11.0832 12.3746 11.0283 12.2769 10.9306C12.1792 10.8329 12.1243 10.7005 12.1243 10.5623V9.52067C12.1243 9.38254 12.1792 9.25006 12.2769 9.15238C12.3746 9.05471 12.507 8.99984 12.6452 8.99984H13.6868C13.825 8.99984 13.9575 9.05471 14.0551 9.15238C14.1528 9.25006 14.2077 9.38254 14.2077 9.52067V10.5623ZM14.2077 6.9165H6.91602V2.74984H12.1243V4.31234C12.1243 4.45047 12.1792 4.58295 12.2769 4.68062C12.3746 4.7783 12.507 4.83317 12.6452 4.83317H14.2077V6.9165ZM2.74935 4.83317H1.70768C1.43142 4.83317 1.16646 4.94292 0.971113 5.13827C0.775762 5.33362 0.666016 5.59857 0.666016 5.87484L0.666016 16.2915C0.666016 16.5678 0.775762 16.8327 0.971113 17.0281C1.16646 17.2234 1.43142 17.3332 1.70768 17.3332H2.74935C3.02562 17.3332 3.29057 17.2234 3.48592 17.0281C3.68127 16.8327 3.79102 16.5678 3.79102 16.2915V5.87484C3.79102 5.59857 3.68127 5.33362 3.48592 5.13827C3.29057 4.94292 3.02562 4.83317 2.74935 4.83317Z" fill="black"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_440_13344">
                            <rect width="16.6667" height="16.6667" fill="white" transform="translate(0.666016 0.666504)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <TitleXXSmall label="Audit email" cls="text-[max(12px,_min(calc(100vw_*_(14_/_1440)),_14px))] leading-[132%] -tracking-[.14px]"/>
                      <TextLarge label="audit@uxe.ai" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="ml-auto" fill="none">
                      <path d="M5.83398 14.1673L14.1673 5.83398M14.1673 5.83398H5.83398M14.1673 5.83398V14.1673" stroke="#19191B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <TextLarge cls="max-w-full text-[#939599]" label="We are here to help you ensure the highest level of security and compliance for your organizations" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.335947140009!2d55.41065167743774!3d25.259281977671243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dcd86d33251%3A0xb70fc9fde47e9f21!2sSecurity%20Industry%20Regulatory%20Agency%20(SIRA)!5e0!3m2!1sen!2sid!4v1729596203651!5m2!1sen!2sid"
                  width="1280"
                  height="320"
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GetStarted
        data={{
          label:"Connect with Us",
          description: "Join over 4,000+ startups already growing with UXE."
        }}
        custom={{ gtm_reference: currentPage, template: 1, isPadding: true }}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const careers = await getAllCareer();
  const department = await getAllDepartment()
  const roles = await getAllRole()
  const options = await getSettings();
  return {
    props: { careers, department, roles, options },
    revalidate: 10,
  };
};
