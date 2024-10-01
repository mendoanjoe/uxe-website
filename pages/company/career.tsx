// import Head from "next/head";
// import { GetStaticProps } from "next";
// import { CMS_NAME } from "../../lib/constants";
// import { Hero2 } from "@/ui/section/hero2/Hero2";
// import { getSettings } from "lib/new-api";
// import { Feature } from "@/ui/section/feature/Feature";
// import Link from "next/link";
// import { Layout } from "@/ui/base/layout/Layout";
// import { Testimonial } from "@/ui/section/testimonial/Testimonial";
// import { GetStarted } from "@/ui/section/get-started/GetStarted";
// import Image from "next/image";
// import { Leadership } from "@/ui/section/leadership/Leadership";

// export default function CareerSection({ options }) {
//   const currentPage = "career";
//   const {
//     backgroundOptions,
//     featureOptions,
//     teamOptions,
//     careerOptions,
//     testimonialOptions,
//     footerOptions,
//     generalSettings
//   } = options;

//   let coreTeam = teamOptions.slice(0, 5) || [];
//   return (
//     <Layout data={{ general: generalSettings, footer: footerOptions }}>
//       <Head>
//         <title>{`${generalSettings?.title} | Career`}</title>
//       </Head>
//       <Hero2
//         data={{
//           title:"Became part of our community",
//           subtitle:"CAREERS",
//           description:"",
//           image_url: backgroundOptions?.hero_career?.url,
//         }}
//         custom={{ gtm_reference: currentPage }}
//       />
//       <Feature
//         data={featureOptions}
//         custom={{ gtm_reference: currentPage }}
//       />
//       {coreTeam.length > 0 && (
//         <Leadership
//           data={coreTeam}
//           custom={{ gtm_reference: currentPage }}
//         />
//       )}
//       {careerOptions.length > 0 && (
//         <section className="bg-white">
//           <div className="max-w-[1440px] mx-auto p-[max(48px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] overflow-hidden">
//             <div className="flex flex-col gap-[max(48px,_min(calc(100vw_*_(64_/_1440)),_64px))] max-w-[768px] mx-auto">
//               <div className="flex flex-col items-center gap-[max(8px,_min(calc(100vw_*_(12_/_1440)),_12px))] text-center">
//                 <h2 className="text-[max(24px,_min(calc(100vw_*_(32_/_1440)),_32px))] text-[#19191B] font-medium leading-[112%] -tracking-[.64px]">
//                   Let’s find you an open position.
//                 </h2>
//                 <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] leading-[132%] -tracking-[.16px]">
//                   Find the right job for you no matter what it is that you do.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-[20px]">
//                 {careerOptions &&
//                   careerOptions.map(
//                     ({ title, description, job_type, external_link }, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between gap-[16px] w-full rounded-[12px] border border-[#0000001F] p-[max(16px,_min(calc(100vw_*_(24_/_1440)),_24px))] min-h-[168px]"
//                       >
//                         <div className="flex flex-col justify-between">
//                           <div className="flex flex-col gap-[12px] items-start">
//                             <a
//                               href={external_link}
//                               className="text-[20px] text-[#3963FF] font-medium leading-[132%] -tracking-[.2px] hover:opacity-75"
//                             >
//                               {title}
//                             </a>
//                             <p className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] text-[#19191B] leading-[132%] -tracking-[.16px]">
//                               {description}
//                             </p>
//                           </div>
//                           <div className="flex items-center gap-[8px] opacity-50">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="20"
//                               height="20"
//                               viewBox="0 0 20 20"
//                               fill="none"
//                             >
//                               <g clipPath="url(#clip0_1034_24223)">
//                                 <path
//                                   d="M10.0003 5.00033V10.0003L13.3337 11.667M18.3337 10.0003C18.3337 14.6027 14.6027 18.3337 10.0003 18.3337C5.39795 18.3337 1.66699 14.6027 1.66699 10.0003C1.66699 5.39795 5.39795 1.66699 10.0003 1.66699C14.6027 1.66699 18.3337 5.39795 18.3337 10.0003Z"
//                                   stroke="#19191B"
//                                   strokeOpacity="0.5"
//                                   strokeWidth="1.66667"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </g>
//                               <defs>
//                                 <clipPath id="clip0_1034_24223">
//                                   <rect width="20" height="20" fill="white" />
//                                 </clipPath>
//                               </defs>
//                             </svg>
//                             <p className="text-[14px] leading-[132%] -tracking-[.14px]">
//                               {job_type}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-start">
//                           <Link
//                             href={external_link}
//                             className="bg-[#19191B] text-white hover:opacity-90 rounded-full p-[max(4px,_min(calc(100vw_*_(8_/_1440)),_8px))]"
//                             style={{ backdropFilter: "blur(1.58333px)" }}
//                           >
//                             <svg
//                               className="rotate-45 w-[max(16px,_min(calc(100vw_*_(22_/_1440)),_22px))] h-[max(16px,_min(calc(100vw_*_(22_/_1440)),_22px))]"
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="22"
//                               height="22"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"
//                                 fill="currentColor"
//                               />
//                             </svg>
//                           </Link>
//                         </div>
//                       </div>
//                     )
//                   )}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//       <GetStarted
//         data={{ label:"Get started with UXE" }}
//         custom={{ gtm_reference: currentPage, template: 1, isPadding:!(careerOptions.length > 0) }}
//       />
//       <Testimonial
//         data={testimonialOptions}
//         custom={{ gtm_reference: currentPage, show: 3 }}
//       />
//     </Layout>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const options = await getSettings();
//   return {
//     props: { options },
//     revalidate: 10,
//   };
// };

export default function CareerSection({ options }) {
  return (<></>)
}
