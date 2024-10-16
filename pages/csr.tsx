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
import { useEffect, useState } from "react";

export default function CsrSection({ careers, department, roles, options }) {
  const currentPage = "career";
  const {
    backgroundOptions,
    footerOptions,
    generalSettings,
    allformOptions,
    cseOptions
  } = options;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function svgToBase64(svg) {
    const encoded = new TextEncoder().encode(svg);
    const base64Encoded = btoa(Array.from(encoded, byte => String.fromCharCode(byte)).join(''));
    return `data:image/svg+xml;base64,${base64Encoded}`;
  }

  
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions, subscribe: allformOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title:"Access with Purpose",
          subtitle:"Corporate Social Responsibility",
          description: "UXE Corporate Social Responsibility Initiatives Driving Social and Environmnetal Change",
          image_url: backgroundOptions?.hero_csr?.url
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <section>
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-20 max-md:gap-10">
            <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-[10%] max-md:gap-8">
              {isClient && (
                <div className="rounded-xl overflow-hidden">
                  <video
                    src={backgroundOptions?.hero_csr_video?.url}
                    className="w-full h-full object-cover"
                    controls
                  ></video>
                </div>
              )}
              {cseOptions && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <TextSmall label={cseOptions?.heading_tagline} cls="font-medium opacity-50 uppercase"/>
                    <TitleMedium label={cseOptions?.heading_title} cls="" />
                  </div>
                  <TextLarge cls="max-w-full" label={cseOptions?.heading_description} />
                </div>
              )}
            </div>
            {cseOptions && (
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] max-md:grid-cols-[1fr_auto_1fr_auto] max-sm:grid-cols-[1fr_auto] items-center justify-center border border-[#19191B0F] rounded-xl overflow-hidden">
                {cseOptions?.featured_list?.map(({ icon, title }, index) => (
                  <>
                  <div key={index} className="flex flex-col items-center gap-5 py-8 max-md:border-b max-md:border-[#19191B0F]">
                    <div className="p-3 rounded-xl bg-[#E6EDFF]">
                      <img src={svgToBase64(icon)} alt={title} />
                    </div>
                    <TitleXSmall label={title} el="h4" cls="font-medium" />
                  </div>
                  {index != cseOptions?.featured_list.length - 1 && (
                    <div className="w-[1px] h-[118px] bg-[#19191B0F] mx-auto max-sm:invisible"></div>
                  )}
                  </>
                ))}
              </div>
            )}
            {cseOptions && (
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[8%] max-md:gap-8">
                {cseOptions?.benefit_list?.map(({ tagline, title, description }, index) => (
                  <div key={index} className="space-y-4">
                    <div className="space-y-2">
                      <TextSmall label={tagline} cls="font-medium opacity-50 uppercase"/>
                      <TitleSmall label={title} cls="" />
                    </div>
                    <TextLarge cls="max-w-full" label={description} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
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
