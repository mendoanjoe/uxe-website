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
          description: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_about_us?.url
          
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

      <CEOMsgSection custom={{ gtm_reference: currentPage }} text={
        `
        At UXE Security Solutions, we proudly align with Dubai’s vision of becoming the safest city in the world. As leaders in the tech industry, we provide ‘Smart Solutions for a Smart City’ offering innovative, reliable, and trustworthy technology that empowers our clients in an ever-changing landscape.
        <br />
        <br />
        By investing in cutting-edge technologies and fostering a dedicated team, we are committed to addressing the challenges of today while anticipating the needs of tomorrow. Our comprehensive solutions ensure peace of mind for businesses, communities, governments, and individuals alike.
        <br />
        <br />
        Headquartered in Dubai, we are passionate about contributing to the safety and growth of our city. We uphold the highest standards of quality and professionalism, offering tailored technological solutions that meet the unique needs of each client. Whether you are a business, a government entity, or an individual, our mission is to enable you to operate confidently and efficiently.
        `
      }/>


      <Leadership
        data={coreTeam}
        custom={{ gtm_reference: currentPage }}
      />
      <br></br>
      
      <GetStarted
        data={{
          label:"Connect with Us",
          description: "To explore potential partnership opportunities, please contact us at your earliest convenience"
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
