import cn from 'classnames'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '../menu-item/MenuItem';

interface NavigationProps {
  menu?: any
}

export const Navigation = ({ menu }: NavigationProps) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleNavigationScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 0 || scrollY < 0;
      setIsScrolled(scrolled || isMobile)
      setIsFixed(scrolled || isMobile);
    }

    const dropdownContent = document.querySelector("#navigation-container");
    const buttonMobile = document.querySelector('button[title="Mobile Menu"]')

    const handleMenuMouseEnter = () => {
      setIsFixed(true)
    }

    const handleMenuMouseLeave = () => {
      setIsFixed(false || isMobile || isScrolled)
    }

    const handleMobileMenu = () => {
      setIsMobile(!isMobile)
    }

    buttonMobile.addEventListener('click', handleMobileMenu)

    dropdownContent.addEventListener('mouseenter', handleMenuMouseEnter)
    dropdownContent.addEventListener('mouseleave', handleMenuMouseLeave)

    window.addEventListener('scroll', handleNavigationScroll);

    return () => {
      window.removeEventListener('scroll', handleNavigationScroll);
      dropdownContent.removeEventListener('mouseenter', handleMenuMouseEnter)
      dropdownContent.removeEventListener('mouseleave', handleMenuMouseLeave)
    }
  })

  const containerClass = cn("relative", {
    "bg-transparent text-white": !isFixed,
    "bg-white": isFixed,
  })

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="p-[20px_38px_0_38px] max-xl:p-0">
          <div id='navigation-container' className={containerClass}>
            <div className={cn(
              "px-[max(20px,_min(calc(100vw_*_(32_/_1440)),_32px))] max-md:py-[max(12px,_min(calc(100vw_*_(18_/_1440)),_18px))] max-md:flex-col flex items-center justify-between max-md:justify-start",
              { "max-md:h-screen": isMobile }
              )}>
              <div className='max-md:w-full flex items-center justify-between'>
                <Link href="/">
                  {isFixed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="40" viewBox="0 0 98 40" fill="none">
                      <path d="M43.0501 21.4711L33.8059 31.3231C33.669 31.4685 33.5954 31.6624 33.6012 31.862C33.6071 32.0617 33.692 32.2509 33.8372 32.3881L38.2548 36.5515C38.4001 36.6886 38.5938 36.7625 38.7935 36.7569C38.9931 36.7513 39.1824 36.6667 39.3198 36.5217L48.919 26.3545C49.0509 26.2147 49.1245 26.0298 49.1249 25.8376V13.9664C49.1249 13.7737 49.0512 13.5883 48.919 13.4481L38.394 3.4783C38.2568 3.33336 38.0678 3.24881 37.8683 3.24322C37.6689 3.23762 37.4754 3.31146 37.3304 3.44848L33.4509 7.56648C33.379 7.6344 33.3211 7.71584 33.2806 7.80615C33.2402 7.89647 33.2179 7.99387 33.2151 8.0928C33.2124 8.19172 33.2291 8.29022 33.2645 8.38265C33.2998 8.47509 33.3531 8.55964 33.4211 8.63148L43.0501 17.728C43.1825 17.8675 43.2562 18.0526 43.256 18.2449V20.9557C43.2553 21.1474 43.1817 21.3317 43.0501 21.4711Z" fill="#FF8B00"/>
                      <path d="M57.4718 21.4711L66.716 31.3231C66.8531 31.4683 66.927 31.6621 66.9214 31.8618C66.9158 32.0614 66.8312 32.2507 66.6862 32.3881L62.2685 36.5515C62.1233 36.6886 61.9295 36.7625 61.7299 36.7569C61.5302 36.7513 61.3409 36.6667 61.2035 36.5217L51.6029 26.3545C51.4714 26.2145 51.3983 26.0297 51.3984 25.8376V13.9664C51.3985 13.7737 51.4721 13.5883 51.6043 13.4481L62.1294 3.4783C62.2665 3.33336 62.4555 3.24881 62.655 3.24322C62.8544 3.23762 63.0479 3.31146 63.193 3.44848L67.0724 7.56648C67.2174 7.70384 67.302 7.89314 67.3076 8.09281C67.3132 8.29249 67.2393 8.48622 67.1022 8.63148L57.4718 17.728C57.3394 17.8675 57.2657 18.0526 57.2659 18.2449V20.9557C57.2666 21.1474 57.3402 21.3317 57.4718 21.4711Z" fill="#071952"/>
                      <path d="M75.7794 14.1864V28.0215C75.7794 28.2143 75.856 28.3992 75.9924 28.5356C76.1287 28.6719 76.3137 28.7485 76.5065 28.7485H94.7648C94.9577 28.7485 95.1426 28.8251 95.2789 28.9615C95.4153 29.0978 95.4919 29.2828 95.4919 29.4756V33.9429C95.4919 34.0383 95.4731 34.1328 95.4365 34.2209C95.4 34.309 95.3464 34.3891 95.2788 34.4565C95.2113 34.5239 95.1312 34.5773 95.043 34.6137C94.9548 34.6501 94.8602 34.6687 94.7648 34.6685H72.1868C71.4885 34.6685 70.8187 34.3912 70.3247 33.8975C69.8308 33.4038 69.5531 32.7342 69.5527 32.0358V10.1678C69.5531 9.46948 69.8308 8.79985 70.3247 8.30616C70.8187 7.81248 71.4885 7.53516 72.1868 7.53516H94.7648C94.9577 7.53516 95.1426 7.61175 95.2789 7.7481C95.4153 7.88445 95.4919 8.06937 95.4919 8.2622V12.7281C95.4919 12.9209 95.4153 13.1058 95.2789 13.2422C95.1426 13.3785 94.9577 13.4551 94.7648 13.4551H76.5065C76.4106 13.4551 76.3158 13.4741 76.2273 13.5109C76.1388 13.5477 76.0584 13.6016 75.9909 13.6696C75.9233 13.7375 75.8698 13.8182 75.8335 13.9069C75.7973 13.9956 75.7789 14.0906 75.7794 14.1864Z" fill="#071952"/>
                      <path d="M91.9424 23.4963V18.7123C91.9424 18.3986 91.6881 18.1443 91.3744 18.1443H78.7818C78.4681 18.1443 78.2138 18.3986 78.2138 18.7123V23.4963C78.2138 23.81 78.4681 24.0643 78.7818 24.0643H91.3744C91.6881 24.0643 91.9424 23.81 91.9424 23.4963Z" fill="#071952"/>
                      <path d="M30.9389 8.15244V31.9275C30.9389 32.6257 30.6615 33.2954 30.1678 33.7891C29.6741 34.2828 29.0044 34.5602 28.3062 34.5602H15.708C12.2055 34.5602 8.84651 33.1688 6.3699 30.6922C3.89329 28.2156 2.50195 24.8566 2.50195 21.3542V8.14818C2.50195 7.95536 2.57855 7.77043 2.7149 7.63409C2.85124 7.49774 3.03617 7.42114 3.22899 7.42114H7.99735C8.19018 7.42114 8.3751 7.49774 8.51145 7.63409C8.6478 7.77043 8.72439 7.95536 8.72439 8.14818V21.4309C8.72439 23.2386 9.44251 24.9722 10.7208 26.2505C11.999 27.5287 13.7327 28.2469 15.5404 28.2469H23.9624C24.0612 28.2469 24.159 28.2274 24.2502 28.1895C24.3414 28.1517 24.4243 28.0962 24.4941 28.0263C24.5639 27.9564 24.6192 27.8735 24.6568 27.7822C24.6945 27.6909 24.7138 27.593 24.7136 27.4943V8.15244C24.7136 7.95962 24.7902 7.77469 24.9265 7.63835C25.0629 7.502 25.2478 7.4254 25.4406 7.4254H30.2104C30.306 7.42522 30.4007 7.44388 30.4891 7.48033C30.5774 7.51679 30.6578 7.57031 30.7254 7.63784C30.7931 7.70537 30.8468 7.78558 30.8834 7.87388C30.92 7.96219 30.9389 8.05685 30.9389 8.15244Z" fill="#071952"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="40" viewBox="0 0 98 40" fill="none">
                      <path d="M43.0496 21.4714L33.8054 31.3233C33.6685 31.4688 33.5949 31.6626 33.6008 31.8623C33.6066 32.062 33.6915 32.2512 33.8367 32.3883L38.2543 36.5518C38.3996 36.6889 38.5933 36.7627 38.793 36.7572C38.9926 36.7516 39.1819 36.667 39.3193 36.5219L48.9185 26.3547C49.0504 26.2149 49.124 26.0301 49.1244 25.8379V13.9667C49.1244 13.774 49.0507 13.5885 48.9185 13.4484L38.3935 3.47854C38.2563 3.33361 38.0673 3.24905 37.8678 3.24346C37.6684 3.23787 37.4749 3.3117 37.3299 3.44872L33.4504 7.56672C33.3785 7.63464 33.3206 7.71609 33.2801 7.8064C33.2397 7.89671 33.2174 7.99412 33.2147 8.09304C33.2119 8.19196 33.2286 8.29046 33.264 8.3829C33.2993 8.47533 33.3526 8.55989 33.4206 8.63172L43.0496 17.7282C43.182 17.8678 43.2557 18.0528 43.2555 18.2451V20.9559C43.2548 21.1476 43.1812 21.3319 43.0496 21.4714Z" fill="#FF8B00"/>
                      <path d="M57.4718 21.4714L66.716 31.3233C66.8531 31.4686 66.927 31.6623 66.9214 31.862C66.9158 32.0617 66.8312 32.251 66.6862 32.3883L62.2685 36.5518C62.1233 36.6889 61.9295 36.7627 61.7299 36.7572C61.5302 36.7516 61.3409 36.667 61.2035 36.5219L51.6029 26.3547C51.4714 26.2148 51.3983 26.0299 51.3984 25.8379V13.9667C51.3985 13.774 51.4721 13.5885 51.6043 13.4484L62.1294 3.47854C62.2665 3.33361 62.4555 3.24905 62.655 3.24346C62.8544 3.23787 63.0479 3.3117 63.193 3.44872L67.0724 7.56672C67.2174 7.70409 67.302 7.89338 67.3076 8.09306C67.3132 8.29273 67.2393 8.48646 67.1022 8.63172L57.4718 17.7282C57.3394 17.8678 57.2657 18.0528 57.2659 18.2451V20.9559C57.2666 21.1476 57.3402 21.3319 57.4718 21.4714Z" fill="white"/>
                      <path d="M75.7799 14.1864V28.0215C75.7799 28.2143 75.8565 28.3992 75.9929 28.5356C76.1292 28.6719 76.3141 28.7485 76.507 28.7485H94.7653C94.9581 28.7485 95.1431 28.8251 95.2794 28.9615C95.4158 29.0978 95.4924 29.2828 95.4924 29.4756V33.9429C95.4924 34.0383 95.4735 34.1328 95.437 34.2209C95.4004 34.309 95.3469 34.3891 95.2793 34.4565C95.2118 34.5239 95.1316 34.5773 95.0434 34.6137C94.9552 34.6501 94.8607 34.6687 94.7653 34.6685H72.1873C71.489 34.6685 70.8192 34.3912 70.3252 33.8975C69.8313 33.4038 69.5536 32.7342 69.5532 32.0358V10.1678C69.5536 9.46948 69.8313 8.79985 70.3252 8.30616C70.8192 7.81248 71.489 7.53516 72.1873 7.53516H94.7653C94.9581 7.53516 95.1431 7.61175 95.2794 7.7481C95.4158 7.88445 95.4924 8.06937 95.4924 8.2622V12.7281C95.4924 12.9209 95.4158 13.1058 95.2794 13.2422C95.1431 13.3785 94.9581 13.4551 94.7653 13.4551H76.507C76.4111 13.4551 76.3162 13.4741 76.2278 13.5109C76.1393 13.5477 76.0589 13.6016 75.9914 13.6696C75.9238 13.7375 75.8703 13.8182 75.834 13.9069C75.7977 13.9956 75.7794 14.0906 75.7799 14.1864Z" fill="white"/>
                      <path d="M91.9419 23.4965V18.7125C91.9419 18.3988 91.6876 18.1445 91.3739 18.1445H78.7813C78.4676 18.1445 78.2133 18.3988 78.2133 18.7125V23.4965C78.2133 23.8102 78.4676 24.0645 78.7813 24.0645H91.3739C91.6876 24.0645 91.9419 23.8102 91.9419 23.4965Z" fill="white"/>
                      <path d="M30.9389 8.15317V31.9282C30.9389 32.6265 30.6615 33.2961 30.1678 33.7898C29.6741 34.2835 29.0044 34.5609 28.3062 34.5609H15.708C12.2055 34.5609 8.84651 33.1696 6.3699 30.693C3.89329 28.2164 2.50195 24.8574 2.50195 21.3549V8.14891C2.50195 7.95609 2.57855 7.77117 2.7149 7.63482C2.85124 7.49847 3.03617 7.42188 3.22899 7.42188H7.99735C8.19018 7.42188 8.3751 7.49847 8.51145 7.63482C8.6478 7.77117 8.72439 7.95609 8.72439 8.14891V21.4316C8.72439 23.2393 9.44251 24.973 10.7208 26.2512C11.999 27.5295 13.7327 28.2476 15.5404 28.2476H23.9624C24.0612 28.2476 24.159 28.2281 24.2502 28.1903C24.3414 28.1524 24.4243 28.097 24.4941 28.0271C24.5639 27.9572 24.6192 27.8742 24.6568 27.7829C24.6945 27.6916 24.7138 27.5938 24.7136 27.495V8.15317C24.7136 7.96035 24.7902 7.77542 24.9265 7.63908C25.0629 7.50273 25.2478 7.42613 25.4406 7.42613H30.2104C30.306 7.42595 30.4007 7.44461 30.4891 7.48107C30.5774 7.51752 30.6578 7.57105 30.7254 7.63858C30.7931 7.70611 30.8468 7.78632 30.8834 7.87462C30.92 7.96292 30.9389 8.05758 30.9389 8.15317Z" fill="white"/>
                    </svg>
                  )}
                </Link>
                <button title='Mobile Menu' className='md:hidden'>
                  {isMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3.99805 6H19.998V8H3.99805V6ZM3.99805 11H19.998V13H3.99805V11ZM3.99805 16H19.998V18H3.99805V16Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className={cn("items-center max-md:items-start max-md:w-full max-md:mt-[20px] flex", { "max-md:hidden": !isMobile })}>
                <ul className="flex gap-[8px] max-md:*:p-[14px_8px] max-md:flex-col max-md:w-full *:p-[28px_8px] *:flex *:items-center">
                  {menu.length > 0 ? (
                    <MenuItem menu={menu} />
                  ) : (<></>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
