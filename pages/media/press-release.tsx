import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getSettings } from "lib/new-api";
import { ConnectWithUs } from "@/ui/section/get-started/ConnectWithUs";
import { PressReleaseCard } from "@/ui/section/media/press-release";
import MediaPressRelease from "@/ui/section/media/press-release-2";

export default function NewsSection({ options, pressReleaseOptions }) {
  const currentPage = "press-release";
  const { backgroundOptions, footerOptions, generalSettings } = options;


  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | Press Release`}</title>
      </Head>
      <Hero2
        data={{
          title: "Multiple services to ensure the safety",
          subtitle: "COMPANY",
          description: "",
          image_url: backgroundOptions?.hero_about_us?.url,
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <div className="max-w-7xl mx-auto p-6">
          {/* {validPressReleases.map((event, index) => (
            <PressReleaseCard key={index} event={event} />
          ))} */}
          <MediaPressRelease/>
      </div>

      <div className="mb-12 ">
        <ConnectWithUs
          data={{ label: "Connect with us" }}
          custom={{ gtm_reference: currentPage, template: 1 }}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const options = await getSettings();
  let pressReleaseOptions = [];


  return {
    props: { options, pressReleaseOptions }, 
    revalidate: 10,
  };
};
