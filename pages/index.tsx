import Head from "next/head";
import { GetStaticProps } from "next";
import { getSettings } from "../lib/new-api";

import { Layout } from "@/ui/base/layout/Layout";
import { HeroImage } from "@/section/HeroImage";
import { AboutUs } from "@/section/AboutUs";
import { VisionMission } from "@/section/VisionMission";
import { Feature } from "@/section/Feature";
import { Solution } from "@/section/Solution";
import { Product } from "@/section/Product";
import { Partners } from "@/section/Partners";
import { Testimonial } from "@/section/Testimonial";
import { GetStarted } from "@/section/GetStarted";
import { Post } from "@/section/Post";

export default function Index({ options }) {
  const currentPage = "HOMEPAGE";
  const {
    visionAndMissionOptions,
    featureOptions,
    testimonialOptions,
    products,
    solutionOptions,
    footerOptions,
    generalSettings,
    posts,
    heroSections,
    callourAbout,
    callourPartners,
    allformOptions,
    auditpageOptions
  } = options;

  return (
    <Layout data={{ general: generalSettings, footer: footerOptions, subscribe: allformOptions }}>
      <Head>
        <title>{`${generalSettings?.title}`}</title>
      </Head>
      <HeroImage data={heroSections} custom={{ gtm_reference: currentPage }} />
      <AboutUs data={callourAbout} custom={{ gtm_reference: currentPage }} />
      <VisionMission
        data={visionAndMissionOptions}
        custom={{ gtm_reference: currentPage }}
      />
      <Feature data={featureOptions} custom={{ gtm_reference: currentPage }} />
      <Solution
        data={solutionOptions}
        custom={{ gtm_reference: currentPage }}
      />
      <Product
        data={products}
        custom={{
          gtm_reference: currentPage,
          show_title: true,
          show_button: true,
        }}
      />
      <div className="w-[70%] mx-auto h-[1px] bg-[#19191B17]"></div>
      <Partners
        data={auditpageOptions?.organization_list}
        custom={{
          gtm_reference: currentPage,
          title: "Our Partners",
          description: "Fueling Innovation, Growth, and Success Together",
        }}
      />

      <Testimonial
        data={testimonialOptions}
        custom={{ gtm_reference: currentPage, show: 3 }}
      />
      <GetStarted
        data={{
          label: "Get started with UXE",
          description: "Join over 4,000+ startups already growing with UXE.",
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <Post data={posts} custom={{ gtm_reference: currentPage }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const options = await getSettings();
  return {
    props: { options },
    revalidate: 10,
  };
};
