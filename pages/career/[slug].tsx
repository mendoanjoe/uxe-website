import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { TextSmall } from "../../stories/ui/text/text-small/TextSmall";
import { TitleMedium } from "../../stories/ui/title/title-medium/TitleMedium";
import { SECTION_PRODUCT_DETAIL } from "../../lib/constants";
import {
  getAllCareersWithSlug,
  getCareerAndMoreCareers,
} from "../../lib/api";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/ui/base/layout/Layout";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import { getSettings } from "lib/new-api";
import { GATimeSpent } from "lib/ga";
import { TextXSmall } from "@/ui/text/text-xsmall/TextXSmall";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";
import Link from "next/link";

export default function Career({ career, options }) {
  const currentPage = "career-detail";
  // Reference
  const sectionRef = useRef(null);
  const careerContent = useRef(null);
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    const observer = GATimeSpent(currentPage, SECTION_PRODUCT_DETAIL);
    const obsSection = sectionRef.current;

    if (obsSection) {
      observer.observe(obsSection);
    }

    return () => {
      if (sectionRef && obsSection) {
        observer.unobserve(obsSection);
      }
    };
  }, [sectionRef, currentPage]);

  useEffect(() => {
    window.scroll(0, 1);

    const handleScrollNav = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 0) {
        window.scrollY = 2;
      }
    };

    window.addEventListener("scroll", handleScrollNav);

    return () => {
      window.removeEventListener("scroll", handleScrollNav);
    };
  }, []);

  const formBlock = useRef(null);
  const formMessage = useRef(null);

  useEffect(() => {
    const form = formBlock.current.querySelector("form");
    formBlock.current.querySelectorAll("br").forEach((item) => item.remove());
    const formID = formBlock.current.querySelector(
      'input[name="_wpcf7"]'
    ).value;
    form.action = `https://api.uxe.ai/wp-json/contact-form-7/v1/contact-forms/${formID}/feedback`;
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission

      const jobTitle = formBlock.current.querySelector("form input[name='jobTitle']")
      jobTitle.style.display = 'none'
      jobTitle.value = career?.title
      const jobURL = formBlock.current.querySelector("form input[name='jobURL']")
      jobURL.style.display = 'none'
      jobURL.value = window.location.origin + window.location.pathname

      try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            // No need to set Content-Type for FormData as it is automatically set
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        const fromms = formMessage.current
        fromms.classList.remove("hidden");
        fromms.innerText = responseData.message;

        // Reset the form after successful submission
        form.reset();
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [formBlock, formMessage, career]);

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setSiteUrl(window.location.href);
    }
  }, [])


  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
  };

  const router = useRouter();

  if (!router.isFallback && !career?.slug && !options?.footerOptions) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout data={{ general: options?.generalSettings, footer: options?.footerOptions, subscribe: options?.allformOptions }}>
      <Head>
        <title>{`${options?.generalSettings?.title} | ${career?.title}`}</title>
      </Head>
      <section ref={sectionRef} className="bg-white">
        <div className="max-w-[1440px] mx-auto p-[max(44px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] lg:pb-0 max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
          <div className="grid grid-cols-2 max-lg:grid-cols-1">
            <div className="w-full p-[max(44px,_min(calc(100vw_*_(80_/_1440)),_80px))] pl-0">
              <div className="space-y-[max(24px,_min(calc(100vw_*_(48_/_1440)),_48px))]">
                <div className="space-y-3">
                  <TitleMedium el="h1" label={career?.title} />
                  <div>
                    <TextLarge label={career?.location} />
                    <TextLarge label="Full-time" />
                  </div>
                </div>
                {/* {isClient && ( */}
                  <div className="post-content space-y-3 mt-[max(24px,_min(calc(100vw_*_(48_/_1440)),_48px))]" dangerouslySetInnerHTML={{ __html: career?.content }}></div>
                {/* )} */}
                
                <div className="space-y-3">
                  <TitleXSmall el="h2" label="Share this job" />
                  <div className="flex gap-[8px]">
                    <button
                      aria-label="Copy Link"
                      className="block p-[4px] rounded-[6px] bg-[#BEBEBE40] hover:opacity-75"
                      onClick={copyLink}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.9999 7.66008V8.00008C21.0007 9.06616 20.576 10.0885 19.8199 10.84L16.9999 13.67C16.4738 14.1911 15.6261 14.1911 15.1 13.67L15 13.56C14.8094 13.3656 14.8094 13.0544 15 12.86L18.4399 9.42006C18.807 9.03938 19.0083 8.52883 18.9999 8.00008V7.66008C19.0003 7.12705 18.788 6.61589 18.4099 6.2401L17.7599 5.59011C17.3841 5.21207 16.873 4.99969 16.3399 5.00011H15.9999C15.4669 4.99969 14.9558 5.21207 14.58 5.59011L11.14 9.00007C10.9456 9.19064 10.6344 9.19064 10.44 9.00007L10.33 8.89007C9.8089 8.36394 9.8089 7.51623 10.33 6.99009L13.16 4.15012C13.9165 3.40505 14.9382 2.99133 15.9999 3.00014H16.3399C17.4011 2.9993 18.4191 3.42018 19.1699 4.17012L19.8299 4.83012C20.5798 5.5809 21.0007 6.59891 20.9999 7.66008ZM8.64993 13.94L13.9399 8.65008C14.0338 8.55543 14.1616 8.50218 14.2949 8.50218C14.4282 8.50218 14.556 8.55543 14.6499 8.65008L15.3499 9.35007C15.4445 9.44395 15.4978 9.57175 15.4978 9.70507C15.4978 9.83839 15.4445 9.96618 15.3499 10.0601L10.0599 15.35C9.96604 15.4447 9.83824 15.4979 9.70492 15.4979C9.57161 15.4979 9.44381 15.4447 9.34993 15.35L8.64993 14.65C8.55528 14.5561 8.50204 14.4283 8.50204 14.295C8.50204 14.1617 8.55528 14.0339 8.64993 13.94ZM13.5599 15C13.3655 14.8094 13.0543 14.8094 12.8599 15L9.42993 18.41C9.0517 18.7905 8.53645 19.003 7.99995 18.9999H7.65995C7.12691 19.0004 6.61576 18.788 6.23997 18.41L5.58997 17.76C5.21194 17.3842 4.99956 16.873 4.99998 16.34V16C4.99956 15.4669 5.21194 14.9558 5.58997 14.58L9.00993 11.14C9.2005 10.9456 9.2005 10.6345 9.00993 10.44L8.89993 10.33C8.3738 9.80894 7.52609 9.80894 6.99996 10.33L4.17999 13.16C3.42392 13.9116 2.99916 14.9339 3 16V16.35C3.00182 17.4077 3.42249 18.4216 4.16999 19.1699L4.82998 19.8299C5.58076 20.5799 6.59878 21.0008 7.65995 20.9999H7.99995C9.05338 21.0061 10.0667 20.5964 10.8199 19.8599L13.6699 17.01C14.191 16.4838 14.191 15.6361 13.6699 15.11L13.5599 15Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    <Link
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}`}
                      className="block p-[4px] rounded-[6px] bg-[#BEBEBE40] hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.5 3.24219C3.67157 3.24219 3 3.91376 3 4.74219V19.7422C3 20.5706 3.67157 21.2422 4.5 21.2422H19.5C20.3284 21.2422 21 20.5706 21 19.7422V4.74219C21 3.91376 20.3284 3.24219 19.5 3.24219H4.5ZM8.52076 7.24491C8.52639 8.20116 7.81061 8.79038 6.96123 8.78616C6.16107 8.78194 5.46357 8.14491 5.46779 7.24632C5.47201 6.40116 6.13998 5.72194 7.00764 5.74163C7.88795 5.76132 8.52639 6.40679 8.52076 7.24491ZM12.2797 10.0039H9.75971H9.7583V18.5638H12.4217V18.3641C12.4217 17.9842 12.4214 17.6042 12.4211 17.2241C12.4203 16.2103 12.4194 15.1954 12.4246 14.1819C12.426 13.9358 12.4372 13.6799 12.5005 13.445C12.7381 12.5675 13.5271 12.0008 14.4074 12.1401C14.9727 12.2286 15.3467 12.5563 15.5042 13.0893C15.6013 13.4225 15.6449 13.7811 15.6491 14.1285C15.6605 15.1761 15.6589 16.2237 15.6573 17.2714C15.6567 17.6412 15.6561 18.0112 15.6561 18.381V18.5624H18.328V18.3571C18.328 17.9051 18.3278 17.4532 18.3275 17.0013C18.327 15.8718 18.3264 14.7423 18.3294 13.6124C18.3308 13.1019 18.276 12.5985 18.1508 12.1049C17.9638 11.3708 17.5771 10.7633 16.9485 10.3246C16.5027 10.0124 16.0133 9.81129 15.4663 9.78879C15.404 9.7862 15.3412 9.78281 15.2781 9.7794C14.9984 9.76428 14.7141 9.74892 14.4467 9.80285C13.6817 9.95613 13.0096 10.3063 12.5019 10.9236C12.4429 10.9944 12.3852 11.0663 12.2991 11.1736L12.2797 11.1979V10.0039ZM5.68164 18.5666H8.33242V10.0095H5.68164V18.5666Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${siteUrl}&text=${career?.title}`}
                      className="block p-[4px] rounded-[6px] bg-[#BEBEBE40] hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.1761 4.24219H19.9362L13.9061 11.0196L21 20.2422H15.4456L11.0951 14.6488L6.11723 20.2422H3.35544L9.80517 12.993L3 4.24219H8.69545L12.6279 9.35481L17.1761 4.24219ZM16.2073 18.6176H17.7368L7.86441 5.78147H6.2232L16.2073 18.6176Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                    <Link
                      href={`https://www.facebook.com/sharer.php?u=${siteUrl}`}
                      className="block p-[4px] rounded-[6px] bg-[#BEBEBE40] hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 12.3033C22 6.7467 17.5229 2.24219 12 2.24219C6.47715 2.24219 2 6.7467 2 12.3033C2 17.325 5.65684 21.4874 10.4375 22.2422V15.2116H7.89844V12.3033H10.4375V10.0867C10.4375 7.56515 11.9305 6.17231 14.2146 6.17231C15.3088 6.17231 16.4531 6.36882 16.4531 6.36882V8.8448H15.1922C13.95 8.8448 13.5625 9.62041 13.5625 10.4161V12.3033H16.3359L15.8926 15.2116H13.5625V22.2422C18.3432 21.4874 22 17.3252 22 12.3033Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                    {/* <a href="#" className="block h-[32px] w-[32px] p-[4px] bg-[#BEBEBE40] rounded-[8px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.0043 6.60977C9.02305 6.60977 6.61836 9.01445 6.61836 11.9957C6.61836 14.977 9.02305 17.3816 12.0043 17.3816C14.9855 17.3816 17.3902 14.977 17.3902 11.9957C17.3902 9.01445 14.9855 6.60977 12.0043 6.60977ZM12.0043 15.4973C10.0777 15.4973 8.50273 13.927 8.50273 11.9957C8.50273 10.0645 10.073 8.49414 12.0043 8.49414C13.9355 8.49414 15.5059 10.0645 15.5059 11.9957C15.5059 13.927 13.9309 15.4973 12.0043 15.4973ZM18.8668 6.38945C18.8668 7.08789 18.3043 7.6457 17.6105 7.6457C16.9121 7.6457 16.3543 7.0832 16.3543 6.38945C16.3543 5.6957 16.9168 5.1332 17.6105 5.1332C18.3043 5.1332 18.8668 5.6957 18.8668 6.38945ZM22.434 7.66445C22.3543 5.98164 21.9699 4.49102 20.7371 3.26289C19.509 2.03477 18.0184 1.65039 16.3355 1.56602C14.6012 1.46758 9.40273 1.46758 7.66836 1.56602C5.99023 1.6457 4.49961 2.03008 3.2668 3.2582C2.03398 4.48633 1.6543 5.97695 1.56992 7.65977C1.47148 9.39414 1.47148 14.5926 1.56992 16.327C1.64961 18.0098 2.03398 19.5004 3.2668 20.7285C4.49961 21.9566 5.98555 22.341 7.66836 22.4254C9.40273 22.5238 14.6012 22.5238 16.3355 22.4254C18.0184 22.3457 19.509 21.9613 20.7371 20.7285C21.9652 19.5004 22.3496 18.0098 22.434 16.327C22.5324 14.5926 22.5324 9.39883 22.434 7.66445ZM20.1934 18.1879C19.8277 19.1066 19.1199 19.8145 18.1965 20.1848C16.8137 20.7332 13.5324 20.6066 12.0043 20.6066C10.4762 20.6066 7.19023 20.7285 5.81211 20.1848C4.89336 19.8191 4.18555 19.1113 3.81523 18.1879C3.2668 16.8051 3.39336 13.5238 3.39336 11.9957C3.39336 10.4676 3.27148 7.18164 3.81523 5.80352C4.18086 4.88477 4.88867 4.17695 5.81211 3.80664C7.19492 3.2582 10.4762 3.38477 12.0043 3.38477C13.5324 3.38477 16.8184 3.26289 18.1965 3.80664C19.1152 4.17227 19.823 4.88008 20.1934 5.80352C20.7418 7.18633 20.6152 10.4676 20.6152 11.9957C20.6152 13.5238 20.7418 16.8098 20.1934 18.1879Z" fill="#000000"/>
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#F4F5F6] p-[max(20px,_min(calc(100vw_*_(80_/_1440)),_80px))]">
              <div className="space-y-[max(24px,_min(calc(100vw_*_(48_/_1440)),_48px))]">
                <div className="space-y-3">
                  <TitleMedium el="h1" label="Apply Now" />
                  <div>
                    <TextLarge label="Join UXE  Innovate Smart City Security with Us" />
                  </div>
                </div>
                <div className="space-y-3">
                  {/* {isClient && ( */}
                    <div
                      className="form-career"
                      ref={formBlock}
                      dangerouslySetInnerHTML={{ __html: options?.allformOptions.form_career?.html }}
                    ></div>
                  {/* )} */}
                  <p
                    ref={formMessage}
                    className="hidden p-[10px] border-[2px] border-black w-full"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getCareerAndMoreCareers(params?.slug);
  const options = await getSettings();
  return {
    props: {
      career: data.career,
      options,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCareers = await getAllCareersWithSlug();

  return {
    paths: allCareers.edges.map(({ node }) => `/career/${node.slug}`) || [],
    fallback: true,
  };
};
