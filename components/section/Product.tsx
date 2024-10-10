import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GAClick, GATimeSpent } from "lib/ga";
import { getAllProduct } from "lib/new-api";
import { SECTION_PRODUCT } from "lib/constants";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";

type SchemaNode = {
  node: SchemaData;
};

type SchemaSourceUrl = {
  fullPathUrl: string;
};

type SchemaFeature = {
  node: SchemaSourceUrl;
};

type SchemaData = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: SchemaFeature;
};

type ProductData = {
  edges: SchemaNode[];
  pageInfo?: any;
};

type ProductCustom = {
  show_title: boolean;
  show_button: boolean;
};

export const Product = ({ data, custom, ...props }: SectionProps<ProductData, ProductCustom>) => {
  // Props
  const { gtm_reference, show_title, show_button } = custom;

  // Reference
  const sectionRef = useRef(null);

  // State
  const [products, setProducts] = useState([...data.edges]);
  const [endCursor, setEndCursor] = useState(data?.pageInfo?.endCursor || null);
  const [hasMoreProducts, setHasMoreProducts] = useState(
    data?.pageInfo?.hasNextPage || null
  );
  const [isLoading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_PRODUCT);
    const obsSection = sectionRef.current;

    if (obsSection) {
      observer.observe(obsSection);
    }

    return () => {
      if (obsSection) {
        observer.unobserve(obsSection);
      }
    };
  }, [sectionRef, gtm_reference]);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchProducts = async (afterCursor) => {
    try {
      const newProducts = await getAllProduct(afterCursor);
      setProducts([...products, ...newProducts.edges]);
      setEndCursor(
        newProducts?.pageInfo?.endCursor ? newProducts?.pageInfo?.endCursor : ""
      );
      setHasMoreProducts(newProducts?.pageInfo?.hasNextPage);
      setLoading(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleLoadMore = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchProducts(endCursor);
    GAClick("other_clicked", gtm_reference, SECTION_PRODUCT, "button-load-product")
  };

  if (!data) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="section-product"
      className="bg-white"
      {...props}
    >
      <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))_48px_max(20px,_min(calc(100vw_*_(190_/_1440)),_190px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
        <div className="flex flex-col gap-[48px]">
          {show_title && (
            <div className="flex flex-col items-center text-center">
              <TextSmall
                label="Products"
                cls="text-[#19191B80] uppercase font-medium !tracking-[.96px]"
              />
              <TitleMedium
                el="h2"
                label="Transforming Security with Smart Technology"
                cls="text-[#19191B] font-medium mt-[10px]"
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-[20px] max-xl:grid-cols-2 max-md:grid-cols-1">
            {products.map(({ node }, index) => (
              <div key={index} className="flex flex-col gap-[20px]">
                <div className="relative w-full pt-[112%] rounded-[12px] bg-[#F2F2F2]">
                  <a
                    onClick={() =>
                      GAClick(
                        "product_clicked",
                        gtm_reference,
                        SECTION_PRODUCT,
                        "product-image"
                      )
                    }
                    href={"/product/" + node?.slug}
                    className="absolute inset-0 w-full h-full overflow-hidden rounded-[12px]"
                  >
                    <img
                      src={node?.featuredImage?.node?.fullPathUrl}
                      alt={node?.title}
                      className="w-full h-full hover:scale-110"
                    />
                  </a>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Link
                    onClick={() =>
                      GAClick(
                        "product_clicked",
                        gtm_reference,
                        SECTION_PRODUCT,
                        "product-title"
                      )
                    }
                    href={"/product/" + node?.slug}
                    className="text-[max(16px,_min(calc(100vw_*_(20_/_1440)),_20px))] text-[#19191B] font-medium leading-[132%] -tracking-[.2px] hover:opacity-70"
                  >
                    {node?.title}
                  </Link>
                  {isClient && (
                    <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] opacity-60 leading-[132%] -tracking-[.14px] line-clamp-2" dangerouslySetInnerHTML={{
                      __html: node?.excerpt
                      .replace("<p>", "")
                      .replace("</p>", ""),
                    }}></p>
                  )}
                  {/* <TextLarge
                    label={node?.excerpt.replace("<p>", "").replace("</p>", "")}
                    cls="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] opacity-60 leading-[132%] -tracking-[.14px] line-clamp-2"
                  /> */}
                </div>
              </div>
            ))}
          </div>
          {show_button && (
            <div className="flex justify-center">
              <Link
                href={"/products"}
                className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-white font-medium leading-[132%] -tracking-[.16px] p-[10px_16px] rounded-full bg-[#19191B] backdrop-blur-[2px] border border-[#F4F5F6] hover:opacity-70"
                onClick={() => GAClick("other_clicked", gtm_reference, SECTION_PRODUCT, "button-see-all-product")}
              >
                See All Product
              </Link>
            </div>
          )}
          {hasMoreProducts ? (
            <div
              className="flex justify-center cursor-pointer"
              onClick={handleLoadMore}
            >
              <div className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-white font-medium leading-[132%] -tracking-[.16px] p-[10px_16px] rounded-full bg-[#19191B] backdrop-blur-[2px] border border-[#F4F5F6] hover:opacity-70">
                {isLoading ? "Loading..." : "Load more"}
              </div>
            </div>
          ) : (
            products.length > 6 && (
              <div className="flex justify-center cursor-pointer">
                <div className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-white font-medium leading-[132%] -tracking-[.16px] p-[10px_16px] rounded-full bg-[#19191B] backdrop-blur-[2px] border border-[#F4F5F6] hover:opacity-70">
                  All posts loaded
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
