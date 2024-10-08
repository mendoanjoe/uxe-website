import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { CMS_NAME } from "../../lib/constants";
import { TitleMedium } from "../../stories/ui/title/title-medium/TitleMedium";
import { TextSmall } from "../../stories/ui/text/text-small/TextSmall";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";
import Link from "next/link";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/ui/base/layout/Layout";
import { getSettings } from "lib/new-api";

export default function Post({ post, posts, preview, options }) {
  // const { footerOptions } = options;
  const [siteUrl, setSiteUrl] = useState("");
  const postContent = useRef(null);
  const router = useRouter();
  const morePosts = posts?.edges;

  useEffect(() => {
    postContent.current.querySelectorAll("img").forEach((el) => {
      // Modify the src attribute
      const currentSrc = el.src;
      let newSrc;
      newSrc = currentSrc.replace(
        /^(?:https?:)?\/\/[^/]+/,
        "https://api.uxe.ai"
      );
      if (currentSrc.startsWith("/")) {
        newSrc = "https://api.uxe.ai" + currentSrc;
      }
      el.src = newSrc;

      // Modify the srcset attribute
      const currentSrcset = el.getAttribute("srcset");
      if (currentSrcset) {
        let newSrcset;
        newSrcset = currentSrcset.replace(
          /(?:https?:)?\/\/[^/]+/g,
          "https://api.uxe.ai"
        );
        newSrcset = currentSrcset
          .split(",")
          .map((src) => {
            const trimmedSrc = src.trim();
            return trimmedSrc.startsWith("/")
              ? "https://api.uxe.ai" + trimmedSrc
              : trimmedSrc;
          })
          .join(",");
        el.setAttribute("srcset", newSrcset);
      }
    });

    // Check if window is defined (only runs on the client-side)
    if (typeof window !== "undefined") {
      setSiteUrl(window.location.href);
    }

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

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
  };

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!router.isFallback && !post?.slug && !options?.footerOptions) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout data={{ general: options?.generalSettings, footer: options?.footerOptions }}>
      <Head>
        <title>{`${options?.generalSettings?.title} | ${post?.title}`}</title>
      </Head>
      <div className="bg-white p-[max(48px,_min(calc(100vw_*_(170_/_1440)),_170px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))_max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))]">
        <div className="max-w-[770px] mx-auto overflow-hidden">
          <div className="flex flex-col items-start gap-[10px]">
            <TextSmall
              label={post?.categories?.edges[0]?.node?.name}
              cls="uppercase text-[#676767]"
            />
            <TitleMedium label={post?.title} cls="max-w-full" />
          </div>
          <div className="flex justify-between items-center mt-[28px]">
            <div className="flex items-center gap-[16px]">
              <img
                alt={post?.author?.node?.name}
                className="w-[48px] h-[48px] rounded-full"
                src={post?.author?.node?.avatar?.url}
              />

              <div className="flex flex-col gap-[4px]">
                <TextMedium
                  label={post?.author?.node?.name}
                  cls="font-medium"
                />
                <TextMedium
                  label={new Date(post?.date)
                    .toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    .replace(/,/g, "")}
                />
              </div>
            </div>
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
                href={`https://twitter.com/intent/tweet?url=${siteUrl}&text=${post?.title}`}
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
            </div>
          </div>
          <div>
            {post?.featuredImage && (
              <img
                src={post?.featuredImage?.node?.fullPathUrl}
                alt={post?.title}
                className="mx-auto rounded-[12px] my-[64px] w-full"
              />
            )}
            {/* {isClient && ( */}
              <div
                ref={postContent}
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post?.content }}
              ></div>
             {/* )} */}
          </div>
          <div className="flex flex-col gap-[16px] mt-[64px]">
            <TitleXXSmall label="Share this article" />
            <div className="flex justify-between items-center">
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
                  href={`https://twitter.com/intent/tweet?url=${siteUrl}&text=${post?.title}`}
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
              </div>
              <div className="flex gap-[4px]">
                {post?.tags &&
                  post?.tags.edges.map(({ node }, index) => (
                    <TextSmall
                      key={index}
                      label={node?.name}
                      cls="text-[#19191B80] font-medium uppercase p-[4px_6px] bg-[#0000000F] rounded-[4px]"
                    />
                  ))}
              </div>
            </div>
          </div>
          {morePosts && (
            <>
              <div
                className="w-full h-[1px] my-[32px]"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(25, 25, 27, 0.10) 0%, rgba(25, 25, 27, 0.29) 50.7%, rgba(25, 25, 27, 0.10) 103.78%)",
                }}
              ></div>
              <div className="flex flex-col gap-[32px]">
                <div className="flex justify-between items-center">
                  <TitleXXSmall label="Related Article" />
                  <TextMedium
                    label={
                      <>
                        <p>View more</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M14.4002 8.00124L14.7778 7.62364L15.1543 8.00124L14.7778 8.37884L14.4002 8.00124ZM14.0226 8.37884L9.7559 4.11217L10.5111 3.35697L14.7778 7.62364L14.0226 8.37884ZM14.7778 8.37884L10.5111 12.6455L9.7559 11.8903L14.0226 7.62364L14.7778 8.37884ZM14.4002 8.53457H1.06683V7.46791L14.4002 7.46791V8.53457Z"
                            fill="#19191B"
                          />
                        </svg>
                      </>
                    }
                    el="a"
                    href="/blog"
                    cls="flex items-center gap-[6px]"
                    hover
                  />
                </div>
                <div className="grid grid-cols-2 gap-[32px] max-md:grid-cols-1">
                  {morePosts.map(({ node }, index) => (
                    <div
                      key={index}
                      className="rounded-[12px] border border-[#0000000F] overflow-hidden"
                    >
                      <img
                        src={
                          node.featuredImage?.node?.fullPathUrl
                            ? node?.featuredImage?.node?.fullPathUrl
                            : "https://fakeimg.pl/770x450"
                        }
                        alt={node.title}
                        className="max-h-[max(140px,_min(calc(100vw_*_(240_/_1440)),_240px))] w-full object-cover"
                      />
                      <div className="p-[24px] flex flex-col gap-[32px]">
                        <div className="flex flex-col items-start justify-start gap-[12px]">
                          <span className="text-[14px] text-[#19191B80] font-medium leading-[132%] p-[4px_12px] border border-[#D9D9D9] rounded-full">
                            {node?.categories?.edges[0]?.node?.name}
                          </span>
                          <Link
                            href={"/post/" + node?.slug}
                            className="text-[20px] text-[#19191B] font-medium leading-[132%] -tracking-[.2px] hover:opacity-70 line-clamp-2"
                          >
                            {node?.title}
                          </Link>
                          <TextLarge
                            label={node?.excerpt
                              .replace("<p>", "")
                              .replace("</p>", "")}
                            cls="text-[16px] text-[#19191B] leading-[132%] -tracking-[.16px] opacity-50 line-clamp-2"
                          />
                        </div>
                        <Link
                          href={"/post/" + node?.slug}
                          className="flex items-center gap-[8px] hover:opacity-70"
                        >
                          <span className="text-[16px] text-[#19191B] font-medium leading-[132%] -tracknig-[.16px]">
                            Read post
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5.83325 14.1666L14.1666 5.83325M14.1666 5.83325H5.83325M14.1666 5.83325V14.1666"
                              stroke="#19191B"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);
  const options = await getSettings();
  return {
    props: {
      preview,
      post: data?.post,
      posts: data?.posts,
      options,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/post/${node?.slug}`) || [],
    fallback: true,
  };
};
