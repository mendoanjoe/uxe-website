import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { CMS_NAME } from "../lib/constants";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getAllCareer, getAllDepartment, getAllRole, getSettings } from "lib/new-api";
import { Feature } from "@/ui/section/feature/Feature";
import { Testimonial } from "@/ui/section/testimonial/Testimonial";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import { VisionMission2 } from "@/ui/section/vision-mission-2/VisionMission2";
import { Leadership } from "@/ui/section/leadership/Leadership";
import { CEOMsgSection } from "@/ui/section/ceo/ceo";
import { AboutUsCompany } from "@/ui/section/about-us/AboutUsCompany";
import { CareerListSection } from "@/ui/section/career-list/career-list";

export default function CareerSection({ careers, department, roles, options }) {
  const currentPage = "career";
  const {
    backgroundOptions,
    footerOptions,
    generalSettings,
    allformOptions
  } = options;

  
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions, subscribe: allformOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title:"Shape Your Future with Us Explore a World of Opportunities",
          subtitle:"Careers",
          description: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_career?.url
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <CareerListSection
        data={careers}
        department={department}
        roles={roles}
        options={backgroundOptions}
        custom={{ gtm_reference: currentPage, show_title: true }}
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
