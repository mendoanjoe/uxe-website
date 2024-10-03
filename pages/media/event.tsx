import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getSettings } from "lib/new-api";

import MediaList from "@/ui/section/media/events";
import { ConnectWithUs } from "@/ui/section/get-started/ConnectWithUs";

export default function EventSection({ options }) {
  const currentPage = "Event";
  const {
   
    backgroundOptions,
    footerOptions,
    generalSettings,
    teamOptions
  } = options;

  let coreTeam = teamOptions.slice(0, 5) || [];

  
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | Events`}</title>
      </Head>
      <Hero2
        data={{
          title:"Multiple services to ensure the safety",
          subtitle:"COMPANY",
          description: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_about_us?.url
          
        }}
        custom={{ gtm_reference: currentPage }}
      />
     <MediaList/>

      <div className="mb-12 ">
      <ConnectWithUs 
        data={{ label:"Connect with us" }}
        custom={{ gtm_reference: currentPage, template: 1 }}
      />
      </div>
     
     
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
