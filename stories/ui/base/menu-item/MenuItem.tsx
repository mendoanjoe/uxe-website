import { TextMedium } from '@/ui/text/text-medium/TextMedium';
import { TextSmall } from '@/ui/text/text-small/TextSmall';
import { TextXSmall } from '@/ui/text/text-xsmall/TextXSmall';
import cn from 'classnames';

interface MenuItemProps {
  menu?: any;
  isFixed: boolean;
}

export const MenuItem = ({ menu, isFixed }: MenuItemProps) => {
  const containerClass = cn("w-full text-[14px] font-medium leading-[132%] -tracking-[.14px] p-[6px_16px] rounded-[100px]", {
    "hover:text-[#FFFFFF] hover:bg-[#BEBEBE1F] max-md:hover:bg-transparent": !isFixed,
    "hover:text-[#19191B] hover:bg-[#BEBEBE1F] max-md:hover:bg-transparent": isFixed,
  });

  const containerClass2 = cn("text-[14px] font-medium leading-[132%] -tracking-[.14px] p-[6px_16px] rounded-[100px]", {
    "hover:text-[#FFFFFF] hover:bg-[#BEBEBE1F] max-md:hover:bg-transparent": !isFixed,
    "hover:text-[#19191B] hover:bg-[#BEBEBE1F] max-md:hover:bg-transparent": isFixed,
  });

  return (
    menu.map(({ name, url, submenu, level }, index) => (
      <li key={index} className='group cursor-pointer max-md:border-b-[.5px] max-md:border-b-[#19191b1a] relative' id={`menu-item-${index}`}>
        {submenu.length > 0 ? (
          <div className={containerClass}>
            <div className="flex max-md:flex-col max-lg:w-full">
              <div className="flex items-center gap-[6px] max-lg:justify-between max-lg:w-full">
                {name}
                <svg className='group-hover:rotate-180' xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path d="M12.5 6.25L8 10.75L3.5 6.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
                </svg>
              </div>
              <div className='max-md:mt-[14px]' id={`submenu-item-${index}`}>
                <div className={`hidden absolute overflow-hidden left-[50%] translate-x-[-50%] top-[100%] bg-white text-black z-50 rounded-[16px] group-hover:p-3 group-hover:h-auto shadow-md gap-5 ${level == 4 ? "group-hover:flex w-max" : "group-hover:grid"} max-md:group-hover:flex max-md:flex-col max-md:relative max-md:w-full max-md:shadow-none max-md:p-0`}>
                  {submenu.map((item, idn) => (
                    <div key={idn}>
                      {item.name == undefined ? (
                        <div className="w-full">
                          <TextXSmall key={idn} label={item.group} cls='font-bold uppercase mb-5' />
                          <div className={idn == 0 ? `flex gap-6 flex-col` : `grid grid-cols-2 gap-5 max-md:flex max-md:flex-wrap`}>
                            {item.submenu.map((item, idd) => (
                              <div className="w-full" key={idd}>
                                {item.name == undefined ? (
                                  <div className='min-w-48'>
                                    <TextMedium key={idd} label={item.group} cls='font-bold' />
                                    <div className='my-2 border-b border-[#19191B17]'></div>
                                    <div className='flex flex-col gap-[6px]'>
                                    {item.submenu.map((item, lol) => (
                                      <a key={lol} href={item.url} className='group/submenu flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] py-[6px] px-2 rounded-[8px] max-md:hover:bg-transparent'>
                                        <div className='flex flex-col gap-[6px]'>
                                          <h3 className='text-[#19191B] text-[16px] font-normal leading-[132%] -tracking-[.16px]'>{item.name}</h3>
                                          {/* <p className='text-[#19191B80] text-[12px] font-[400] leading-[132%] -tracking-[.12px]'>{description}</p> */}
                                        </div>
                                        <div className='size-[20px] hidden group-hover/submenu:block'>
                                          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_b_440_8236)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#19191B"/>
                                            <path d="M12.458 8.38L12.468 12.79L11.708 13.55L11.688 9.74L7.72797 13.69L7.15797 13.12L11.138 9.14H7.30797L8.06797 8.38H12.458Z" fill="white"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_b_440_8236" x="-1.66667" y="-1.16667" width="23.3333" height="23.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.833333"/>
                                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_440_8236"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_440_8236" result="shape"/>
                                            </filter>
                                            </defs>
                                          </svg>
                                        </div>
                                      </a>
                                    ))}
                                    </div>
                                  </div>
                                ) : (
                                  <a key={idd} href={item.url} className='group/submenu flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] p-[12px] rounded-[8px] min-w-44 max-md:hover:bg-transparent'>
                                    <div className='flex flex-col gap-[6px]'>
                                      <h3 className='text-[#19191B] text-[16px] font-normal leading-[132%] -tracking-[.16px]'>{item.name}</h3>
                                      {/* <p className='text-[#19191B80] text-[12px] font-[400] leading-[132%] -tracking-[.12px]'>{description}</p> */}
                                    </div>
                                    <div className='size-[20px] hidden group-hover/submenu:block'>
                                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_b_440_8236)">
                                        <rect y="0.5" width="20" height="20" rx="10" fill="#19191B"/>
                                        <path d="M12.458 8.38L12.468 12.79L11.708 13.55L11.688 9.74L7.72797 13.69L7.15797 13.12L11.138 9.14H7.30797L8.06797 8.38H12.458Z" fill="white"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_b_440_8236" x="-1.66667" y="-1.16667" width="23.3333" height="23.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.833333"/>
                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_440_8236"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_440_8236" result="shape"/>
                                        </filter>
                                        </defs>
                                      </svg>
                                    </div>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a key={idn} href={item.url} className='group/submenu flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] p-[12px] rounded-[8px] min-w-44'>
                          <div className='flex flex-col gap-[6px]'>
                            <h3 className='text-[#19191B] text-[16px] font-normal leading-[132%] -tracking-[.16px]'>{item.name}</h3>
                            {/* <p className='text-[#19191B80] text-[12px] font-[400] leading-[132%] -tracking-[.12px]'>{description}</p> */}
                          </div>
                          <div className='size-[20px] hidden group-hover/submenu:block'>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g filter="url(#filter0_b_440_8236)">
                              <rect y="0.5" width="20" height="20" rx="10" fill="#19191B"/>
                              <path d="M12.458 8.38L12.468 12.79L11.708 13.55L11.688 9.74L7.72797 13.69L7.15797 13.12L11.138 9.14H7.30797L8.06797 8.38H12.458Z" fill="white"/>
                              </g>
                              <defs>
                              <filter id="filter0_b_440_8236" x="-1.66667" y="-1.16667" width="23.3333" height="23.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.833333"/>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_440_8236"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_440_8236" result="shape"/>
                              </filter>
                              </defs>
                            </svg>
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <a key={index} href={url} className={containerClass2}>
            {name}
          </a>
        )}
      </li>
    ))
  );
};

// {submenu.map(({ name, description, url, sub_menu_three }, ind) => (
//   sub_menu_three?.length > 0 ? (
//     <div key={ind} className='w-full inline-block relative group'>
//       {/* Main menu item */}
//       <a className='flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] p-[12px] rounded-[8px] max-w-[200px] cursor-pointer'>
//         <div className='flex flex-col gap-[6px]'>
//           <h3 className='text-[#19191B] text-[16px] font-[700] leading-[132%] -tracking-[.16px]'>{name}</h3>
//           <p className='text-[#19191B80] text-[12px] font-[400] leading-[132%] -tracking-[.12px]'>{description}</p>
//         </div>
//         <div className='h-[16px] w-[16px]'>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
//             <path d="M5.75 4L10.25 8.5L5.75 13" stroke="#19191B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
//           </svg>
//         </div>
//       </a>

//       {/* Submenu for sub_menu_three */}
//       <div className='absolute left-[100%] top-0 bg-white text-black z-50 rounded-[8px] w-[200px] flex flex-col gap-[8px] hidden group-hover:flex p-[8px] shadow-lg'>
//         {sub_menu_three.map(({ name: subName, url: subUrl }, subIndex) => (
//           <a key={subIndex} href={subUrl} className='flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] p-[12px] rounded-[8px] max-w-[200px]'>
//             <div className='text-[#19191B] text-[14px] font-[500]'>{subName}</div>
//           </a>
//         ))}
//       </div>
//     </div>

//   ) : (
//     <a key={ind} href={url} className='flex gap-[4px] items-center justify-between hover:bg-[#BEBEBE1F] p-[12px] rounded-[8px] max-w-[200px]'>
//       <div className='flex flex-col gap-[6px]'>
//         <h3 className='text-[#19191B] text-[16px] font-[700] leading-[132%] -tracking-[.16px]'>{name}</h3>
//         <p className='text-[#19191B80] text-[12px] font-[400] leading-[132%] -tracking-[.12px]'>{description}</p>
//       </div>
//       <div className='h-[16px] w-[16px]'>
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
//           <path d="M5.75 4L10.25 8.5L5.75 13" stroke="#19191B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
//         </svg>
//       </div>
//     </a>
//   )
// ))}