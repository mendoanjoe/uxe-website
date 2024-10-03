import Head from "next/head";
import { GetStaticProps } from "next";
import { Layout } from "@/ui/base/layout/Layout";
import { Hero2 } from "@/ui/section/hero2/Hero2";
import { getAllCareer, getAllDepartment, getAllRole, getSettings } from "lib/new-api";
import { CareerListSection } from "@/ui/section/career-list/career-list";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { GAClick } from "lib/ga";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { TitleXXSmall } from "@/ui/title/title-xxsmall/TitleXXSmall";
import { GetStarted } from "@/ui/section/get-started/GetStarted";
import { TextHuge } from "@/ui/text/text-huge/TextHuge";

export default function CsrSection({ careers, department, roles, options }) {
  const currentPage = "career";
  const {
    featureOptions,
    testimonialOptions,
    backgroundOptions,
    visionAndMissionOptions,
    footerOptions,
    generalSettings,
    teamOptions,
    career2Options,
  } = options;

  
  return (
    <Layout data={{ general: generalSettings, footer: footerOptions }}>
      <Head>
        <title>{`${generalSettings?.title} | About Us`}</title>
      </Head>
      <Hero2
        data={{
          title:"Protect Business with Expert Security Consultancy",
          subtitle:"Services",
          description:"UXE Corporate Social Responsibility Initiatives Driving Social and Environmnetal Change",
          image_url: backgroundOptions?.hero_career?.url,
        }}
        custom={{ gtm_reference: currentPage }}
      />
      <section>
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-20 max-md:gap-10">
            <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-[8%] max-md:gap-8">
              <div className="rounded-xl overflow-hidden">
                <video
                  src="https://api.uxe.ai/wp-content/uploads/2024/10/HR-career-fair.mp4"
                  className="w-full h-full object-cover"
                  controls
                ></video>
              </div>
              <div className="space-y-4">
                <div className="space-y-8">
                  {/* <TextSmall label="OUR VALUES" cls="font-medium opacity-50 uppercase"/> */}
                  <TitleMedium label="Objective of security Audit system" cls="" />
                  <TextLarge cls="max-w-full text-[#939599]" label="Objectives and scope of the security audit, outlining the goals and areas to be evaluated within the security system user environment. This may include :" />
                </div>
                <div className="grid grid-cols-[auto_auto] max-sm:grid-cols-1 gap-y-3 gap-x-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Assessing the functionality" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Performance" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Compliance of security systems" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Surveillance cameras" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Access control systems" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Alarm systems" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-[#ECECEC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M9.55447 2.83325L4.66558 7.72214L2.44336 5.49992" stroke="#3760FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <TextLarge label="Intrusion detection systems" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-24">
              <TitleMedium label="Services provided by UXE Audit Department" cls="max-w-96" />
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-6 bg-[#F7F7F7] p-6 rounded-xl border border-[#19191B0F]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-[#3760FF17] bg-[#3760FF0A]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.5 24H1.5C0.673 24 0 23.327 0 22.5V21.5C0 20.673 0.673 20 1.5 20H7.5C8.327 20 9 20.673 9 21.5V22.5C9 23.327 8.327 24 7.5 24ZM1.5 21C1.224 21 1 21.224 1 21.5V22.5C1 22.776 1.224 23 1.5 23H7.5C7.776 23 8 22.776 8 22.5V21.5C8 21.224 7.776 21 7.5 21H1.5Z" fill="#3760FF"/>
                        <path d="M6.5 20.75C6.224 20.75 6 20.526 6 20.25V8.5C6 7.673 5.327 7 4.5 7C3.673 7 3 7.673 3 8.5V20.25C3 20.526 2.776 20.75 2.5 20.75C2.224 20.75 2 20.526 2 20.25V8.5C2 7.122 3.122 6 4.5 6C5.878 6 7 7.122 7 8.5V20.25C7 20.526 6.776 20.75 6.5 20.75Z" fill="#3760FF"/>
                        <path d="M22.5 15H6.75C6.474 15 6.25 14.776 6.25 14.5C6.25 14.224 6.474 14 6.75 14H22.5C22.776 14 23 13.776 23 13.5V10.5C23 10.224 22.776 10 22.5 10H6.75C6.474 10 6.25 9.776 6.25 9.5C6.25 9.224 6.474 9 6.75 9H22.5C23.327 9 24 9.673 24 10.5V13.5C24 14.327 23.327 15 22.5 15Z" fill="#3760FF"/>
                        <path d="M18.4995 14.9999C18.4125 14.9999 18.3235 14.9769 18.2425 14.9289C18.0055 14.7869 17.9295 14.4799 18.0715 14.2429L21.0715 9.24292C21.2135 9.00592 21.5205 8.92892 21.7575 9.07192C21.9945 9.21392 22.0705 9.52092 21.9285 9.75792L18.9285 14.7579C18.8345 14.9139 18.6685 14.9999 18.4995 14.9999Z" fill="#3760FF"/>
                        <path d="M14.4995 14.9999C14.4125 14.9999 14.3235 14.9769 14.2425 14.9289C14.0055 14.7869 13.9295 14.4799 14.0715 14.2429L17.0715 9.24292C17.2135 9.00592 17.5195 8.92892 17.7575 9.07192C17.9945 9.21392 18.0705 9.52092 17.9285 9.75792L14.9285 14.7579C14.8345 14.9139 14.6685 14.9999 14.4995 14.9999Z" fill="#3760FF"/>
                        <path d="M10.4995 14.9999C10.4125 14.9999 10.3235 14.9769 10.2425 14.9289C10.0055 14.7869 9.92948 14.4799 10.0715 14.2429L13.0715 9.24292C13.2145 9.00592 13.5205 8.92892 13.7575 9.07192C13.9945 9.21392 14.0705 9.52092 13.9285 9.75792L10.9285 14.7579C10.8345 14.9139 10.6685 14.9999 10.4995 14.9999Z" fill="#3760FF"/>
                        <path d="M6.49948 15.0002C6.41248 15.0002 6.32348 14.9772 6.24248 14.9292C6.00548 14.7872 5.92948 14.4802 6.07148 14.2432L9.07148 9.24321C9.21248 9.00621 9.51948 8.92921 9.75648 9.07121C9.99348 9.21321 10.0695 9.52021 9.92748 9.75721L6.92748 14.7572C6.83448 14.9142 6.66848 15.0002 6.49948 15.0002Z" fill="#3760FF"/>
                      </svg>
                    </div>
                    <TextLarge label="ANPR" cls="font-medium" />
                  </div>
                  <TextLarge label="Verification of Automatic number plate recognition system (ANPR) based on activity as per SIRA Law requirements." />
                </div>
                <div className="space-y-6 bg-[#F7F7F7] p-6 rounded-xl border border-[#19191B0F]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-[#3760FF17] bg-[#3760FF0A]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <g clip-path="url(#clip0_923_3063)">
                          <mask id="path-1-outside-1_923_3063" maskUnits="userSpaceOnUse" x="-0.420898" y="-0.456543" width="26" height="26" fill="black">
                            <rect fill="white" x="-0.420898" y="-0.456543" width="26" height="26"/>
                            <path d="M24.2537 5.69606C24.4194 5.69606 24.5538 5.56169 24.5538 5.39595V0.843576C24.5538 0.677835 24.4194 0.543457 24.2537 0.543457H0.87922C0.71348 0.543457 0.579102 0.677835 0.579102 0.843576V5.39595C0.579102 5.56169 0.71348 5.69606 0.87922 5.69606H2.92534V7.48098H0.87922C0.71348 7.48098 0.579102 7.61536 0.579102 7.7811V12.3335C0.579102 12.4992 0.71348 12.6336 0.87922 12.6336H2.92809C2.92786 12.6382 2.92534 12.6421 2.92534 12.6466V24.248C2.92534 24.4135 3.05972 24.5479 3.22546 24.5479H6.03206C6.19757 24.5479 6.33195 24.4135 6.33195 24.248V12.6466C6.33195 12.6421 6.32966 12.6382 6.32943 12.6336H18.8035C18.8032 12.6382 18.8007 12.6421 18.8007 12.6466V24.248C18.8007 24.4135 18.9351 24.5479 19.1008 24.5479H21.9074C22.0732 24.5479 22.2076 24.4135 22.2076 24.248V12.6466C22.2076 12.6421 22.205 12.6382 22.2048 12.6336H24.2537C24.4194 12.6336 24.5538 12.4992 24.5538 12.3335V7.7811C24.5538 7.61536 24.4194 7.48098 24.2537 7.48098H22.2076V5.69606H24.2537ZM20.9393 5.09583L23.9536 1.70433V5.09583H20.9393ZM20.1596 8.08122L23.6722 12.0334H20.5792L17.0669 8.08122H20.1596ZM16.6836 12.0334L13.171 8.08122H16.264L19.7764 12.0334H16.6836ZM12.7876 12.0334L9.27522 8.08122H12.368L15.8806 12.0334H12.7876ZM8.892 12.0334L5.3794 8.08122H8.47238L11.985 12.0334H8.892ZM4.99618 12.0334L1.48381 8.08122H4.57656L8.08916 12.0334H4.99618ZM6.33195 7.48098V5.69606H18.8007V7.48098H6.33195ZM1.46069 5.09583L4.97329 1.14347H8.06604L4.55367 5.09583H1.46069ZM8.86888 1.14347H11.9619L8.44926 5.09583H5.35628L8.86888 1.14347ZM15.8577 1.14347L12.3449 5.09583H9.2521L12.7647 1.14347H15.8577ZM19.7535 1.14347L16.2409 5.09583H13.1479L16.6607 1.14347H19.7535ZM17.0437 5.09583L20.5563 1.14347H23.6491L20.1367 5.09583H17.0437ZM4.17045 1.14347L1.17934 4.5091V1.14347H4.17045ZM3.52558 5.69606H5.73194V7.48098H3.52558V5.69606ZM1.17934 8.64185L4.19334 12.0334H1.17934V8.64185ZM5.73194 12.6466V23.9479H3.52558V12.6466C3.52558 12.6421 3.52306 12.6382 3.52283 12.6336H5.73469C5.73446 12.6382 5.73194 12.6421 5.73194 12.6466ZM21.6073 12.6466V23.9479H19.4007V12.6466C19.4007 12.6421 19.3984 12.6382 19.3982 12.6336H21.6101C21.6098 12.6382 21.6073 12.6421 21.6073 12.6466ZM23.9536 11.4468L20.9624 8.08122H23.9536V11.4468ZM21.6073 7.48098H19.4007V5.69606H21.6073V7.48098Z"/>
                          </mask>
                          <path d="M24.2537 5.69606C24.4194 5.69606 24.5538 5.56169 24.5538 5.39595V0.843576C24.5538 0.677835 24.4194 0.543457 24.2537 0.543457H0.87922C0.71348 0.543457 0.579102 0.677835 0.579102 0.843576V5.39595C0.579102 5.56169 0.71348 5.69606 0.87922 5.69606H2.92534V7.48098H0.87922C0.71348 7.48098 0.579102 7.61536 0.579102 7.7811V12.3335C0.579102 12.4992 0.71348 12.6336 0.87922 12.6336H2.92809C2.92786 12.6382 2.92534 12.6421 2.92534 12.6466V24.248C2.92534 24.4135 3.05972 24.5479 3.22546 24.5479H6.03206C6.19757 24.5479 6.33195 24.4135 6.33195 24.248V12.6466C6.33195 12.6421 6.32966 12.6382 6.32943 12.6336H18.8035C18.8032 12.6382 18.8007 12.6421 18.8007 12.6466V24.248C18.8007 24.4135 18.9351 24.5479 19.1008 24.5479H21.9074C22.0732 24.5479 22.2076 24.4135 22.2076 24.248V12.6466C22.2076 12.6421 22.205 12.6382 22.2048 12.6336H24.2537C24.4194 12.6336 24.5538 12.4992 24.5538 12.3335V7.7811C24.5538 7.61536 24.4194 7.48098 24.2537 7.48098H22.2076V5.69606H24.2537ZM20.9393 5.09583L23.9536 1.70433V5.09583H20.9393ZM20.1596 8.08122L23.6722 12.0334H20.5792L17.0669 8.08122H20.1596ZM16.6836 12.0334L13.171 8.08122H16.264L19.7764 12.0334H16.6836ZM12.7876 12.0334L9.27522 8.08122H12.368L15.8806 12.0334H12.7876ZM8.892 12.0334L5.3794 8.08122H8.47238L11.985 12.0334H8.892ZM4.99618 12.0334L1.48381 8.08122H4.57656L8.08916 12.0334H4.99618ZM6.33195 7.48098V5.69606H18.8007V7.48098H6.33195ZM1.46069 5.09583L4.97329 1.14347H8.06604L4.55367 5.09583H1.46069ZM8.86888 1.14347H11.9619L8.44926 5.09583H5.35628L8.86888 1.14347ZM15.8577 1.14347L12.3449 5.09583H9.2521L12.7647 1.14347H15.8577ZM19.7535 1.14347L16.2409 5.09583H13.1479L16.6607 1.14347H19.7535ZM17.0437 5.09583L20.5563 1.14347H23.6491L20.1367 5.09583H17.0437ZM4.17045 1.14347L1.17934 4.5091V1.14347H4.17045ZM3.52558 5.69606H5.73194V7.48098H3.52558V5.69606ZM1.17934 8.64185L4.19334 12.0334H1.17934V8.64185ZM5.73194 12.6466V23.9479H3.52558V12.6466C3.52558 12.6421 3.52306 12.6382 3.52283 12.6336H5.73469C5.73446 12.6382 5.73194 12.6421 5.73194 12.6466ZM21.6073 12.6466V23.9479H19.4007V12.6466C19.4007 12.6421 19.3984 12.6382 19.3982 12.6336H21.6101C21.6098 12.6382 21.6073 12.6421 21.6073 12.6466ZM23.9536 11.4468L20.9624 8.08122H23.9536V11.4468ZM21.6073 7.48098H19.4007V5.69606H21.6073V7.48098Z" fill="#3760FF"/>
                          <path d="M24.2537 5.69606C24.4194 5.69606 24.5538 5.56169 24.5538 5.39595V0.843576C24.5538 0.677835 24.4194 0.543457 24.2537 0.543457H0.87922C0.71348 0.543457 0.579102 0.677835 0.579102 0.843576V5.39595C0.579102 5.56169 0.71348 5.69606 0.87922 5.69606H2.92534V7.48098H0.87922C0.71348 7.48098 0.579102 7.61536 0.579102 7.7811V12.3335C0.579102 12.4992 0.71348 12.6336 0.87922 12.6336H2.92809C2.92786 12.6382 2.92534 12.6421 2.92534 12.6466V24.248C2.92534 24.4135 3.05972 24.5479 3.22546 24.5479H6.03206C6.19757 24.5479 6.33195 24.4135 6.33195 24.248V12.6466C6.33195 12.6421 6.32966 12.6382 6.32943 12.6336H18.8035C18.8032 12.6382 18.8007 12.6421 18.8007 12.6466V24.248C18.8007 24.4135 18.9351 24.5479 19.1008 24.5479H21.9074C22.0732 24.5479 22.2076 24.4135 22.2076 24.248V12.6466C22.2076 12.6421 22.205 12.6382 22.2048 12.6336H24.2537C24.4194 12.6336 24.5538 12.4992 24.5538 12.3335V7.7811C24.5538 7.61536 24.4194 7.48098 24.2537 7.48098H22.2076V5.69606H24.2537ZM20.9393 5.09583L23.9536 1.70433V5.09583H20.9393ZM20.1596 8.08122L23.6722 12.0334H20.5792L17.0669 8.08122H20.1596ZM16.6836 12.0334L13.171 8.08122H16.264L19.7764 12.0334H16.6836ZM12.7876 12.0334L9.27522 8.08122H12.368L15.8806 12.0334H12.7876ZM8.892 12.0334L5.3794 8.08122H8.47238L11.985 12.0334H8.892ZM4.99618 12.0334L1.48381 8.08122H4.57656L8.08916 12.0334H4.99618ZM6.33195 7.48098V5.69606H18.8007V7.48098H6.33195ZM1.46069 5.09583L4.97329 1.14347H8.06604L4.55367 5.09583H1.46069ZM8.86888 1.14347H11.9619L8.44926 5.09583H5.35628L8.86888 1.14347ZM15.8577 1.14347L12.3449 5.09583H9.2521L12.7647 1.14347H15.8577ZM19.7535 1.14347L16.2409 5.09583H13.1479L16.6607 1.14347H19.7535ZM17.0437 5.09583L20.5563 1.14347H23.6491L20.1367 5.09583H17.0437ZM4.17045 1.14347L1.17934 4.5091V1.14347H4.17045ZM3.52558 5.69606H5.73194V7.48098H3.52558V5.69606ZM1.17934 8.64185L4.19334 12.0334H1.17934V8.64185ZM5.73194 12.6466V23.9479H3.52558V12.6466C3.52558 12.6421 3.52306 12.6382 3.52283 12.6336H5.73469C5.73446 12.6382 5.73194 12.6421 5.73194 12.6466ZM21.6073 12.6466V23.9479H19.4007V12.6466C19.4007 12.6421 19.3984 12.6382 19.3982 12.6336H21.6101C21.6098 12.6382 21.6073 12.6421 21.6073 12.6466ZM23.9536 11.4468L20.9624 8.08122H23.9536V11.4468ZM21.6073 7.48098H19.4007V5.69606H21.6073V7.48098Z" stroke="#3760FF" stroke-width="0.4" mask="url(#path-1-outside-1_923_3063)"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_923_3063">
                            <rect width="24.0045" height="24.0045" fill="white" transform="translate(0.543945 0.543457)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <TextLarge label="HVM" cls="font-medium" />
                  </div>
                  <TextLarge label="Verification of Access Control System (ACS) based on activity as per SIRA Law requirements." />
                </div>
                <div className="space-y-6 bg-[#F7F7F7] p-6 rounded-xl border border-[#19191B0F]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-[#3760FF17] bg-[#3760FF0A]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_923_3074)">
                          <path d="M21.3927 7.30371H2.61013C2.32213 7.30371 2.08838 7.53747 2.08838 7.82547V10.9559C2.08838 16.4216 6.5357 20.869 12.0014 20.869C17.4672 20.869 21.9145 16.4216 21.9145 10.9559V7.82547C21.9145 7.53747 21.6807 7.30371 21.3927 7.30371ZM20.871 10.9559C20.871 15.8467 16.8922 19.8254 12.0015 19.8254C7.11072 19.8254 3.13189 15.8467 3.13189 10.9559V8.34722H20.871V10.9559Z" fill="#3760FF"/>
                          <path d="M12.0013 9.39087C9.41245 9.39087 7.30566 11.4977 7.30566 14.0865C7.30566 16.6754 9.41245 18.7822 12.0013 18.7822C14.5902 18.7822 16.697 16.6754 16.697 14.0865C16.697 11.4977 14.5902 9.39087 12.0013 9.39087ZM12.0013 17.7387C9.98742 17.7387 8.34913 16.1005 8.34913 14.0865C8.34913 12.0726 9.98737 10.4343 12.0013 10.4343C14.0153 10.4343 15.6535 12.0726 15.6535 14.0865C15.6535 16.1004 14.0153 17.7387 12.0013 17.7387Z" fill="#3760FF"/>
                          <path d="M12.0003 11.4778C10.5614 11.4778 9.3916 12.6486 9.3916 14.0865C9.3916 15.5244 10.5614 16.6951 12.0003 16.6951C13.4392 16.6951 14.609 15.5244 14.609 14.0865C14.609 12.6486 13.4393 11.4778 12.0003 11.4778ZM12.0003 15.6517C11.1373 15.6517 10.4351 14.9494 10.4351 14.0865C10.4351 13.2235 11.1373 12.5212 12.0003 12.5212C12.8633 12.5212 13.5655 13.2235 13.5655 14.0865C13.5655 14.9494 12.8633 15.6517 12.0003 15.6517Z" fill="#3760FF"/>
                          <path d="M23.4787 3.13062H0.522243C0.234244 3.13062 0.000488281 3.36437 0.000488281 3.65237V6.7828C0.000488281 7.64578 0.702732 8.34802 1.5657 8.34802H22.4353C23.2982 8.34802 24.0005 7.64578 24.0005 6.7828V3.65237C24.0005 3.36437 23.7667 3.13062 23.4787 3.13062ZM22.957 6.7828C22.957 7.0708 22.7222 7.30456 22.4352 7.30456H1.5657C1.27873 7.30456 1.04395 7.0708 1.04395 6.7828V4.17408H22.957V6.7828Z" fill="#3760FF"/>
                          <path d="M18.2591 11.4778C18.5472 11.4778 18.7808 11.2442 18.7808 10.9561C18.7808 10.6679 18.5472 10.4343 18.2591 10.4343C17.9709 10.4343 17.7373 10.6679 17.7373 10.9561C17.7373 11.2442 17.9709 11.4778 18.2591 11.4778Z" fill="#3760FF"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_923_3074">
                            <rect width="24" height="24" fill="white" transform="translate(0.000488281 0.000244141)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <TextLarge label="Access Control System" cls="font-medium" />
                  </div>
                  <TextLarge label="Verification of Access Control System (ACS) based on activity as per SIRA Law requirements." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F4F5F6]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-16 max-lg:gap-10 max-md:gap-8 max-sm:gap-6">
            <div className="flex flex-col items-center gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-3 max-w-2xl text-center mx-auto max-md:text-left max-md:items-start">
              <TitleMedium label="Industry we cover" cls="" />
              <TextLarge cls="max-w-full text-[#939599]" label="It involves systematically reviewing and testing security controls, policies, and procedures to identify vulnerabilities, ensure regulatory compliance, and safeguard against potential threats." />
            </div>
            <div className="flex gap-3 items-center justify-center flex-wrap max-w-3xl mx-auto max-md:items-start max-md:mx-0 max-md:justify-start max-md:gap-2">
              <TextLarge label="Amusement park" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Cinemas" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Hotels" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Shopping centers" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Balloon Operation" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Gymnasium" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Jewelry shops" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Sports & recreational club" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Bank" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
              <TextLarge label="Residential & Commercial buildings" cls="text-[#072D99] py-2 p-4 border border-[#072D993D] rounded-[100px] font-medium w-fit"/>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-20 max-md:gap-10">
            <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-14 max-md:gap-10 max-sm:gap-8">
              <div className="space-y-12 max-lg:space-y-10 max-md:space-y-8 max-sm:space-y-6">
                <div className="space-y-6 max-lg:space-y-5 max-md:space-y-4 max-sm:space-y-3">
                  <TitleMedium label="Solutions for Governments and Business Environments" cls="" />
                  <TextLarge cls="max-w-full text-[#939599]" label="By choosing UXE Security Solutions you are selecting experienced security partner who is dedicated to delivering tailored solutions." />
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3 max-md:gap-2">
                  <a href="tel:+971-60053-9000" className="flex gap-3 items-end p-4 border border-[#19191B0F] rounded-xl">
                    <div className="bg-[#F4F5F6] border border-[#19191B0F] p-2 rounded-full my-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_834_3024)">
                          <path d="M19.4293 14.1325L15.0543 12.2575C14.8674 12.1778 14.6597 12.161 14.4624 12.2096C14.2652 12.2582 14.089 12.3696 13.9605 12.527L12.023 14.8942C8.98232 13.4605 6.53524 11.0134 5.10156 7.97269L7.46875 6.03519C7.62644 5.90694 7.73804 5.73081 7.78668 5.53345C7.83531 5.3361 7.81832 5.12828 7.73828 4.94144L5.86328 0.566443C5.77543 0.36504 5.62007 0.200601 5.42397 0.101481C5.22787 0.00236139 5.00332 -0.0252267 4.78906 0.0234739L0.726562 0.960974C0.519988 1.00868 0.335682 1.12499 0.203725 1.29093C0.0717677 1.45687 -4.75863e-05 1.66264 2.36571e-08 1.87465C2.36571e-08 11.8942 8.12109 19.9996 18.125 19.9996C18.3371 19.9998 18.5429 19.928 18.709 19.796C18.875 19.6641 18.9913 19.4797 19.0391 19.2731L19.9766 15.2106C20.025 14.9953 19.9968 14.7698 19.8969 14.5731C19.797 14.3763 19.6317 14.2205 19.4293 14.1325Z" fill="black"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_834_3024">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <TitleXXSmall label="Customer service" cls="text-[max(12px,_min(calc(100vw_*_(14_/_1440)),_14px))] leading-[132%] -tracking-[.14px]"/>
                      <TextLarge label="+971-60053-9000" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="ml-auto" fill="none">
                      <path d="M5.83398 14.1673L14.1673 5.83398M14.1673 5.83398H5.83398M14.1673 5.83398V14.1673" stroke="#19191B" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                  <a href="mailto:audit@uxe.ai" className="flex gap-3 items-end p-4 border border-[#19191B0F] rounded-xl">
                    <div className="bg-[#F4F5F6] border border-[#19191B0F] p-2 rounded-full my-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_440_13344)">
                          <path d="M16.291 5.87484V3.18115C16.291 3.04433 16.264 2.90885 16.2116 2.78245C16.1592 2.65605 16.0825 2.54122 15.9857 2.4445L14.5127 0.971517C14.3174 0.776257 14.0525 0.666546 13.7764 0.666504L5.87435 0.666504C5.59808 0.666504 5.33313 0.776251 5.13778 0.971601C4.94243 1.16695 4.83268 1.4319 4.83268 1.70817V16.2915C4.83268 16.5678 4.94243 16.8327 5.13778 17.0281C5.33313 17.2234 5.59808 17.3332 5.87435 17.3332H16.291C16.5673 17.3332 16.8322 17.2234 17.0276 17.0281C17.2229 16.8327 17.3327 16.5678 17.3327 16.2915V6.9165C17.3327 6.64024 17.2229 6.37528 17.0276 6.17993C16.8322 5.98458 16.5673 5.87484 16.291 5.87484ZM10.041 14.729C10.041 14.8671 9.98614 14.9996 9.88847 15.0973C9.79079 15.195 9.65832 15.2498 9.52018 15.2498H8.47852C8.34038 15.2498 8.20791 15.195 8.11023 15.0973C8.01256 14.9996 7.95768 14.8671 7.95768 14.729V13.6873C7.95768 13.5492 8.01256 13.4167 8.11023 13.3191C8.20791 13.2214 8.34038 13.1665 8.47852 13.1665H9.52018C9.65832 13.1665 9.79079 13.2214 9.88847 13.3191C9.98614 13.4167 10.041 13.5492 10.041 13.6873V14.729ZM10.041 10.5623C10.041 10.7005 9.98614 10.8329 9.88847 10.9306C9.79079 11.0283 9.65832 11.0832 9.52018 11.0832H8.47852C8.34038 11.0832 8.20791 11.0283 8.11023 10.9306C8.01256 10.8329 7.95768 10.7005 7.95768 10.5623V9.52067C7.95768 9.38254 8.01256 9.25006 8.11023 9.15238C8.20791 9.05471 8.34038 8.99984 8.47852 8.99984H9.52018C9.65832 8.99984 9.79079 9.05471 9.88847 9.15238C9.98614 9.25006 10.041 9.38254 10.041 9.52067V10.5623ZM14.2077 14.729C14.2077 14.8671 14.1528 14.9996 14.0551 15.0973C13.9575 15.195 13.825 15.2498 13.6868 15.2498H12.6452C12.507 15.2498 12.3746 15.195 12.2769 15.0973C12.1792 14.9996 12.1243 14.8671 12.1243 14.729V13.6873C12.1243 13.5492 12.1792 13.4167 12.2769 13.3191C12.3746 13.2214 12.507 13.1665 12.6452 13.1665H13.6868C13.825 13.1665 13.9575 13.2214 14.0551 13.3191C14.1528 13.4167 14.2077 13.5492 14.2077 13.6873V14.729ZM14.2077 10.5623C14.2077 10.7005 14.1528 10.8329 14.0551 10.9306C13.9575 11.0283 13.825 11.0832 13.6868 11.0832H12.6452C12.507 11.0832 12.3746 11.0283 12.2769 10.9306C12.1792 10.8329 12.1243 10.7005 12.1243 10.5623V9.52067C12.1243 9.38254 12.1792 9.25006 12.2769 9.15238C12.3746 9.05471 12.507 8.99984 12.6452 8.99984H13.6868C13.825 8.99984 13.9575 9.05471 14.0551 9.15238C14.1528 9.25006 14.2077 9.38254 14.2077 9.52067V10.5623ZM14.2077 6.9165H6.91602V2.74984H12.1243V4.31234C12.1243 4.45047 12.1792 4.58295 12.2769 4.68062C12.3746 4.7783 12.507 4.83317 12.6452 4.83317H14.2077V6.9165ZM2.74935 4.83317H1.70768C1.43142 4.83317 1.16646 4.94292 0.971113 5.13827C0.775762 5.33362 0.666016 5.59857 0.666016 5.87484L0.666016 16.2915C0.666016 16.5678 0.775762 16.8327 0.971113 17.0281C1.16646 17.2234 1.43142 17.3332 1.70768 17.3332H2.74935C3.02562 17.3332 3.29057 17.2234 3.48592 17.0281C3.68127 16.8327 3.79102 16.5678 3.79102 16.2915V5.87484C3.79102 5.59857 3.68127 5.33362 3.48592 5.13827C3.29057 4.94292 3.02562 4.83317 2.74935 4.83317Z" fill="black"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_440_13344">
                            <rect width="16.6667" height="16.6667" fill="white" transform="translate(0.666016 0.666504)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <TitleXXSmall label="Audit email" cls="text-[max(12px,_min(calc(100vw_*_(14_/_1440)),_14px))] leading-[132%] -tracking-[.14px]"/>
                      <TextLarge label="audit@uxe.ai" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="ml-auto" fill="none">
                      <path d="M5.83398 14.1673L14.1673 5.83398M14.1673 5.83398H5.83398M14.1673 5.83398V14.1673" stroke="#19191B" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.222351737497!2d55.4177951!3d25.2631046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f6ae92ab57d%3A0x59f6c410c1681472!2sMuhaisnah%202!5e0!3m2!1sid!2sid!4v1727780140571!5m2!1sid!2sid"
                width="1280"
                height="320"
                style={{ border: 0, width: "100%" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GetStarted
        data={{
          label:"Connect with Us",
          description: "Join over 4,000+ startups already growing with UXE."
        }}
        custom={{ gtm_reference: currentPage, template: 1, isPadding: true }}
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
