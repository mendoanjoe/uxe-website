import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getSettings } from "lib/new-api";

import NewsList from "@/ui/section/media/news";
import { ConnectWithUs } from "@/ui/section/get-started/ConnectWithUs";

export default function NewsSection({ options }) {
  const currentPage = "News";
  const { backgroundOptions, footerOptions, generalSettings, allformOptions } =
    options;

  return (
    <Layout data={{ general: generalSettings, footer: footerOptions, subscribe: allformOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | News`}</title>
      </Head>
      <Hero2
        data={{
          title: "Multiple services to ensure the safety",
          subtitle: "COMPANY",
          description:
            "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_news?.url,
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <NewsList />

      <ConnectWithUs
        data={{ label: "Connect with us" }}
        custom={{ gtm_reference: currentPage, template: 1, isPadding: true }}
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
