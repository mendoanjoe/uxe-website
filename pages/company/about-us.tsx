import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { CMS_NAME } from "../../lib/constants";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getSettings } from "lib/new-api";
import { Feature } from "@/ui/section/feature/Feature";
import { Testimonial } from "@/ui/section/testimonial/Testimonial";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import { VisionMission2 } from "@/ui/section/vision-mission-2/VisionMission2";
import { Leadership } from "@/ui/section/leadership/Leadership";
import { CEOMsgSection } from "@/ui/section/ceo/ceo";
import { AboutUsCompany } from "@/ui/section/about-us/AboutUsCompany";
import { AboutUs } from "@/ui/section/about-us/AboutUs";

export default function ProductSection({ options }) {
  const currentPage = "about-us";
  const {
    featureOptions,
    testimonialOptions,
    backgroundOptions,
    visionAndMissionOptions,
    footerOptions,
    generalSettings,
    teamOptions
  } = options;

  let coreTeam = teamOptions.slice(0, 5) || [];

  
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title:"Multiple services to ensure the safety",
          subtitle:"COMPANY",
          description:"",
          image_url: backgroundOptions?.hero_about_us?.url,
          subDescription: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments"
          
        }}
        custom={{ gtm_reference: currentPage }}
      />
      {/* <AboutUsCompany
        data={{
          text: `
            Investment is an private equity fund with a mandate to <br/>
            invest sustainability in security and safety infrastructure.
            <br />
            <br />
            We aspire to ensure that all of our investments are focus 
            <br />
            driven to enhance the security industry globally focus
            <br/>
            driven to enhance the security industry globally.
          `,
        }}
        custom={{ gtm_reference: currentPage }}
      /> */}
      <AboutUs
        data={{
          text: `
            Established in 2018, UXE Security Solutions proudly holds the
            position of being the premier smart business support and a
            reliable security provider in MENA region.
            <br />
            <br />
            Committed to delivering services of the highest professional
            quality, we distinguish ourselves by adopting a unique strategy
            grounded in Smart Cutting-edge, Innovative Technology.
            <br />
            <br />
            With a considerable client base exceeding 750 clients, we navigate
            a dynamic and culturally rich environment, embodying the core
            values of reliability and professionalism.
            <br />
            <br />
            At UXE, we specialize in offering comprehensive and tailored smart
            security solutions, designed to meet the diverse needs of various
            sectors and industries.
            <br />
            <br />
            Our ecosystem of products and services allows clients to address
            multiple security requirements within a singular, integrated
            framework.
            <br />
            <br />
            Having undergone significant diversification, we have emerged as a
            pioneer in smart city technologies, AI Solutions, Security
            services and audits.
            <br />
            <br />
            As a key player in these sectors, UXE has evolved into the
            foremost business support and tech company provider in the UAE.
            <br />
            <br />
            We proudly carry forward the legacy set by the leaders of the UAE,
            delivering top-notch security solutions finely tuned to the
            diverse needs of our clients.
            <br />
            <br />
            Across a wide spectrum of industries, we extend our security
            expertise to educational institutions, hospitality sector,
            financial institutions, warehouse and logistics centres, retail,
            shopping malls, transportation, residential communities, cultural
            heritage sites, and amusement parks.
            <br />
            <br />
            Our wide range of solutions underlines our commitment to meeting
            distinct security demands across various industries.
          `,
        }}
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

      <CEOMsgSection/>


      <Leadership
        data={coreTeam}
        custom={{ gtm_reference: currentPage }}
      />
      <br></br>
      
      <GetStarted
        data={{ label:"Get started with UXE" }}
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
