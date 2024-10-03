import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { CMS_NAME } from "../../lib/constants";
import { getSettings } from "lib/new-api";
import { Testimonial } from "@/ui/section/testimonial/Testimonial";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import Link from "next/link";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import Image from "next/image";
import { Leadership } from "@/ui/section/leadership/Leadership";

export default function TeamSection({ options }) {
  const currentPage = "team";
  const { testimonialOptions, backgroundOptions, teamOptions, footerOptions, generalSettings } = options;
  let coreTeam = teamOptions.slice(0, 5) || [];
  let memberTeam = teamOptions.slice(5) || [];
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | Teams`}</title>
      </Head>
      <Hero2
        data={{
          title:"Happy people who work hard to empower your teams.",
          subtitle:"Our Team",
          description: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments",
          image_url: backgroundOptions?.hero_team?.url
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <Leadership
        data={coreTeam}
        custom={{ gtm_reference: currentPage }}
      />
      {/* <section className="bg-white">
        <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
          <div className="flex flex-col gap-[max(48px,_min(calc(100vw_*_(64_/_1440)),_64px))]">
            <div className="flex flex-col items-center gap-[max(8px,_min(calc(100vw_*_(12_/_1440)),_12px))] text-center">
              <h2 className="text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] text-[#19191B] font-medium leading-[112%] -tracking-[.64px]">
                Board of Directors
              </h2>
              <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] leading-[132%] -tracking-[.16px]">
                The best and brightest innovators in UXE advise our leaders.
              </p>
            </div>
            <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[374px]:grid-cols-1 gap-[max(24px,_min(calc(100vw_*_(16_/_1440)),_16px))_max(12px,_min(calc(100vw_*_(16_/_1440)),_16px))]">
              {memberTeam.map(
                ({ name, photo_url, role, social_media }, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-[20px] max-[374px]:items-center"
                  >
                    <img
                      className="rounded-[12px] w-1/3 aspect-square object-cover object-top"
                      src={photo_url}
                      alt=""
                    />
                    <div className="flex flex-col gap-[12px]">
                      <div>
                        <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px]">
                          {name}
                        </p>
                        <p className="text-[max(12px,_min(calc(100vw_*_(14_/_1440)),_14px))] leading-[132%] -tracking-[.14px]">
                          {role}
                        </p>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <p className="text-[max(12px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#ADADAD] leading-[132%] -tracking-[.16px]">
                          Social Media
                        </p>
                        <div className="h-[14px] w-[1px] bg-[#D9D9D9]"></div>
                        {social_media?.twitter &&
                          social_media?.twitter != "" && (
                            <Link
                              href={social_media?.twitter}
                              className="hover:opacity-75"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_1034_23581)">
                                  <path
                                    d="M10 0.5C15.5286 0.5 20 4.97143 20 10.5C20 16.0286 15.5286 20.5 10 20.5C4.47143 20.5 0 16.0286 0 10.5C0 4.97143 4.47143 0.5 10 0.5ZM8.17143 15.7714C12.6 15.7714 15.0286 12.1 15.0286 8.91429V8.6C15.5 8.25714 15.9143 7.82857 16.2286 7.34286C15.8 7.52857 15.3286 7.65714 14.8429 7.72857C15.3429 7.42857 15.7286 6.95714 15.9 6.4C15.4286 6.67143 14.9143 6.87143 14.3714 6.98571C13.9286 6.51429 13.3 6.22857 12.6143 6.22857C11.2857 6.22857 10.2 7.31429 10.2 8.64286C10.2 8.82857 10.2143 9.01429 10.2714 9.18571C8.27143 9.08571 6.48571 8.12857 5.3 6.67143C5.1 7.02857 4.97143 7.44286 4.97143 7.88571C4.97143 8.71429 5.4 9.45714 6.04286 9.88571C5.64286 9.88571 5.27143 9.77143 4.95714 9.58571V9.61429C4.95714 10.7857 5.78571 11.7571 6.88571 11.9857C6.68571 12.0429 6.47143 12.0714 6.25714 12.0714C6.1 12.0714 5.95714 12.0571 5.8 12.0286C6.1 12.9857 7 13.6857 8.04286 13.7C7.21429 14.3429 6.17143 14.7286 5.04286 14.7286C4.84286 14.7286 4.65714 14.7286 4.47143 14.7C5.52857 15.3857 6.8 15.7857 8.15714 15.7857"
                                    fill="#ADADAD"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1034_23581">
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="white"
                                      transform="translate(0 0.5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Link>
                          )}
                        {social_media?.linkedin &&
                          social_media?.linkedin != "" && (
                            <Link
                              href={social_media?.linkedin}
                              className="hover:opacity-75"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                                  fill="#ADADAD"
                                />
                              </svg>
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section> */}
      <GetStarted
        data={{
          label:"Get started with UXE",
          description: "Join over 4,000+ startups already growing with UXE."
        }}
        custom={{ gtm_reference: currentPage, template: 1, isPadding: true }}
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