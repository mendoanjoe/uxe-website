import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { getSettings } from "lib/new-api";
import { Hero2 } from "@/section/Hero2";
import { AboutUs } from "@/section/AboutUs";
import { VisionMission2 } from "@/section/VisionMission2";
import { Feature } from "@/section/Feature";
import { CEOMessage } from "@/section/CeoMessage";
import { Leadership } from "@/section/Leadership";
import { GetStarted } from "@/section/GetStarted";
import { Testimonial } from "@/section/Testimonial";

export default function ProductSection({ options }) {
  const currentPage = "about-us";
  const {
    featureOptions,
    testimonialOptions,
    backgroundOptions,
    visionAndMissionOptions,
    footerOptions,
    generalSettings,
    teamOptions,
    callourAbout,
    ceoMessage,
  } = options;

  let coreTeam = teamOptions.slice(0, 5) || [];

  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title: "Multiple services to ensure the safety",
          subtitle: "COMPANY",
          description:
            "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_about_us?.url,
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <AboutUs
        data={callourAbout}
        custom={{ gtm_reference: currentPage }}
        />
      <VisionMission2
        data={visionAndMissionOptions}
        custom={{ gtm_reference: currentPage }}
      />
      <Feature
        data={featureOptions}
        custom={{ gtm_reference: currentPage }}
      />
      <CEOMessage
        data={ceoMessage}
        custom={{ gtm_reference: currentPage }}
      />
      <Leadership
        data={coreTeam}
        custom={{ gtm_reference: currentPage }}
      />
      <br/><br/>
      <GetStarted
        data={{
          label: "Connect with Us",
          description:
            "To explore potential partnership opportunities, please contact us at your earliest convenience",
        }}
        custom={{ gtm_reference: currentPage, template: 1 }}
      />
      <Testimonial
        data={testimonialOptions}
        custom={{ gtm_reference: currentPage, show: 3 }}
      />
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
