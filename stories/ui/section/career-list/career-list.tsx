import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TextSmall } from "@/ui/text/text-small/TextSmall";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleXSmall } from "@/ui/title/title-xsmall/TitleXSmall";
import { SECTION_CAREER, SECTION_PRODUCT } from "lib/constants";
import { GAClick, GATimeSpent } from "lib/ga";
import { getAllCareer } from "lib/new-api";
import React, { useEffect, useRef, useState } from "react";

export const CareerListSection = ({ data, department, roles, options, custom, ...props }) => {
  // Props
  const { gtm_reference, show_title } = custom;

  // Reference
  const sectionRef = useRef(null);

  // State
  const [careers, setCareers] = useState([...data.edges]);
  const [endCursor, setEndCursor] = useState(data?.pageInfo?.endCursor || null);
  const [hasMoreCareers, setHasMoreCareers] = useState(
    data?.pageInfo?.hasNextPage || null
  );
  const [isLoading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(undefined)
  const [selectedRole, setSelectedRole] = useState(undefined)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const observer = GATimeSpent(gtm_reference, SECTION_CAREER);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  useEffect(() => {
    const dataCareer = data.edges
    if (selectedDepartment != undefined) {
      setCareers(dataCareer.filter(item => item.node.department == selectedDepartment))
    }
    if (selectedRole != undefined) {
      setCareers(dataCareer.filter(item => item.node.role == selectedRole))
    }
  }, [selectedDepartment, selectedRole])
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // const fetchCareers = async (afterCursor) => {
  //   try {
  //     const newCareers = await getAllCareer(afterCursor);
  //     setCareers([...careers, ...newCareers.edges]);
  //     setEndCursor(
  //       newCareers?.pageInfo?.endCursor ? newCareers?.pageInfo?.endCursor : ""
  //     );
  //     setHasMoreCareers(newCareers?.pageInfo?.hasNextPage);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // };

  // const handleLoadMore = (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   fetchCareers(endCursor);
  //   GAClick("other_clicked", gtm_reference, SECTION_PRODUCT, "button-load-career")
  // };

  return (
    <section className="py-20">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col gap-10 min-h-screen">
        <div className="px-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))] flex flex-col gap-12">
          {show_title && (
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-3">
              <TitleMedium
                el="h2"
                label="Join us and grow with UXE"
              />
              <TextLarge
                label="Our key employee focus areas"
                cls="opacity-50"
              />
            </div>
            <div className="flex gap-3">
              <div className="w-full min-w-40">      
                <div className="relative">
                  <select title="Department"
                   className="w-full bg-transparent pl-4 pr-8 py-3 transition duration-300 border border-[#D9D9D9] rounded-[100px] ease focus:outline-none appearance-none cursor-pointer"
                   onChange={(event) => setSelectedDepartment(event.target.value)}
                  >
                    {department.edges.map((item, index) => (
                      <option key={index} value={item.node.department}>{item.node.department}</option>
                    ))}
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="h-5 w-5 ml-1 absolute top-4 right-4 text-slate-700">
                    <path d="M12.5 5.75L8 10.25L3.5 5.75" stroke="#19191B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square"/>
                  </svg>
                </div>
              </div>
              <div className="w-full min-w-40">      
                <div className="relative">
                  <select title="Role"
                    className="w-full bg-transparent pl-4 pr-8 py-3 transition duration-300 border border-[#D9D9D9] rounded-[100px] ease focus:outline-none appearance-none cursor-pointer"
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    {roles.edges.map((item, index) => (
                      <option key={index} value={item.node.role}>{item.node.role}</option>
                    ))}
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="h-5 w-5 ml-1 absolute top-4 right-4 text-slate-700">
                    <path d="M12.5 5.75L8 10.25L3.5 5.75" stroke="#19191B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          )}
          <div className="grid grid-cols-[.7fr_1fr] gap-[10%]">
            <div className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden relative">
                {isClient && (
                  <video
                    src={`${options.video.url}`}
                    className="w-full h-full object-cover"
                    controls
                  ></video>
                )}
                {/* <div className="absolute inset-0 w-full h-full object-cover z-10">
                  <div className="w-full h-full relative">
                    <img
                      src="https://uxewpconte-93dcf4a41e0e3f83-endpoint.azureedge.net/blobuxewpcontefe8b049772/wp-content/uploads/2024/09/dekstop_about.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="p-3 rounded-full absolute top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.376 12.4153L8.777 19.4813C8.70171 19.5314 8.61423 19.5602 8.52389 19.5645C8.43355 19.5688 8.34373 19.5486 8.264 19.5059C8.18427 19.4632 8.1176 19.3997 8.07111 19.3221C8.02462 19.2445 8.00005 19.1558 8 19.0653V4.93334C8.00005 4.84289 8.02462 4.75416 8.07111 4.67658C8.1176 4.599 8.18427 4.53548 8.264 4.49279C8.34373 4.45011 8.43355 4.42984 8.52389 4.43416C8.61423 4.43849 8.70171 4.46723 8.777 4.51734L19.376 11.5833C19.4445 11.629 19.5006 11.6909 19.5395 11.7634C19.5783 11.836 19.5986 11.917 19.5986 11.9993C19.5986 12.0816 19.5783 12.1627 19.5395 12.2352C19.5006 12.3078 19.4445 12.3697 19.376 12.4153Z" fill="black"/>
                      </svg>
                    </div>
                  </div>
                </div> */}
              </div>
              <div>
                <ol className="list-decimal">
                  <li className="text-large opacity-75">Safety & wellbeing</li>
                  <li className="text-large opacity-75">Work Culture</li>
                  <li className="text-large opacity-75">Development &amp; Career</li>
                  <li className="text-large opacity-75">Diversity</li>
                  <li className="text-large opacity-75">Reward and Recognition</li>
                </ol>
              </div>
{/*               <TextLarge
                label="Prepare your interview job with us."
                cls="opacity-75"
              /> */}
            </div>
            <div className="flex flex-col gap-5">
              {careers.map(({ node }, index) => (
                <a
                  key={index}
                  onClick={() =>
                    GAClick(
                      "career_clicked",
                      gtm_reference,
                      SECTION_PRODUCT,
                      "career-image"
                    )
                  }
                  href={"/career/" + node?.slug}
                  title="Product Designer"
                  className="group/item-career grow shrink-0 border border-[#19191B1F] rounded-xl p-6 max-h-[168px] h-full flex items-start justify-between gap-4"
                >
                  <div className="flex flex-col justify-between h-full w-full group-hover/item-career:opacity-75">
                    <div className="space-y-2.5">
                      <TitleXSmall
                        label={node.title}
                        cls="text-[#3963FF]"
                      />
                      <TextLarge
                        label={node.description}
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_440_9144)">
                          <path d="M10.0003 5.0013V10.0013L13.3337 11.668M18.3337 10.0013C18.3337 14.6037 14.6027 18.3346 10.0003 18.3346C5.39795 18.3346 1.66699 14.6037 1.66699 10.0013C1.66699 5.39893 5.39795 1.66797 10.0003 1.66797C14.6027 1.66797 18.3337 5.39893 18.3337 10.0013Z" stroke="#19191B" stroke-opacity="0.5" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_440_9144">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <TextMedium label={node.type} cls="opacity-50" />
                    </div>
                  </div>
                  <div className="p-2 border border-[#CFCFCF40] bg-[#19191B] rounded-full group-hover/item-career:opacity-75 group-hover/item-career:translate-x-1 group-hover/item-career:-translate-y-1">
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.93002 0.608L8.94602 7.664L7.73002 8.88L7.69802 2.784L1.36202 9.104L0.450016 8.192L6.81802 1.824H0.690016L1.90602 0.608H8.93002Z" fill="white"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
