import Head from "next/head";
import { GetStaticProps } from "next";
import { getSettings, getAllProduct } from "../lib/new-api";
import { Testimonial } from "@/ui/section/testimonial/Testimonial";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { Product } from "@/ui/section/product/Product";
import { GetStarted } from "@/ui/section/get-started/GetStarted";

export default function ProductSection({ products, options }) {
  const currentPage = "product";
  const { testimonialOptions, backgroundOptions, footerOptions, generalSettings } = options;

  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | Products`}</title>
      </Head>
      <Hero2
        data={{
          title:"Transforming Security with Smart Technology",
          subtitle:"OUR PRODUCT",
          description: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_product?.url
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <Product
        data={products}
        custom={{ gtm_reference: currentPage, show_title: true, show_button: false }}
      />
      <GetStarted
        data={{
          label:"Get started with UXE",
          description: "Join over 4,000+ startups already growing with UXE."
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
  const products = await getAllProduct();
  const options = await getSettings();
  return {
    props: { products, options },
    revalidate: 10,
  };
};
