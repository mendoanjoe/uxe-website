import Container from './container'
import MenuItem from '../ui/menu-item'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cn from 'classnames'

export default function Navigation({ menu }) {
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
      setIsFixed(true || isMobile || isScrolled)
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
                    // <Image
                    //   src="/image/logo-black.png"
                    //   alt="REPLACE THIS"
                    //   // className="max-h-[44px]"
                    //   height={44}
                    //   width={98}
                    // />
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="41" viewBox="0 0 98 41" fill="none">
                      <path d="M43.0501 21.9711L33.8059 31.8231C33.669 31.9685 33.5954 32.1624 33.6012 32.362C33.6071 32.5617 33.692 32.7509 33.8372 32.8881L38.2548 37.0515C38.4001 37.1886 38.5938 37.2625 38.7935 37.2569C38.9931 37.2513 39.1824 37.1667 39.3198 37.0217L48.919 26.8545C49.0509 26.7147 49.1245 26.5298 49.1249 26.3376V14.4664C49.1249 14.2737 49.0512 14.0883 48.919 13.9481L38.394 3.9783C38.2568 3.83336 38.0678 3.74881 37.8683 3.74322C37.6689 3.73762 37.4754 3.81146 37.3304 3.94848L33.4509 8.06648C33.379 8.1344 33.3211 8.21584 33.2806 8.30615C33.2402 8.39647 33.2179 8.49387 33.2151 8.5928C33.2124 8.69172 33.2291 8.79022 33.2645 8.88265C33.2998 8.97509 33.3531 9.05964 33.4211 9.13148L43.0501 18.228C43.1825 18.3675 43.2562 18.5526 43.256 18.7449V21.4557C43.2553 21.6474 43.1817 21.8317 43.0501 21.9711Z" fill="#19191B"/>
                      <path d="M57.4718 21.9711L66.716 31.8231C66.8531 31.9683 66.927 32.1621 66.9214 32.3618C66.9158 32.5614 66.8312 32.7507 66.6862 32.8881L62.2685 37.0515C62.1233 37.1886 61.9295 37.2625 61.7299 37.2569C61.5302 37.2513 61.3409 37.1667 61.2035 37.0217L51.6029 26.8545C51.4714 26.7145 51.3983 26.5297 51.3984 26.3376V14.4664C51.3985 14.2737 51.4721 14.0883 51.6043 13.9481L62.1294 3.9783C62.2665 3.83336 62.4555 3.74881 62.655 3.74322C62.8544 3.73762 63.0479 3.81146 63.193 3.94848L67.0724 8.06648C67.2174 8.20384 67.302 8.39314 67.3076 8.59281C67.3132 8.79249 67.2393 8.98622 67.1022 9.13148L57.4718 18.228C57.3394 18.3675 57.2657 18.5526 57.2659 18.7449V21.4557C57.2666 21.6474 57.3402 21.8317 57.4718 21.9711Z" fill="#19191B"/>
                      <path d="M75.7794 14.6864V28.5215C75.7794 28.7143 75.856 28.8992 75.9924 29.0356C76.1287 29.1719 76.3137 29.2485 76.5065 29.2485H94.7648C94.9577 29.2485 95.1426 29.3251 95.2789 29.4615C95.4153 29.5978 95.4919 29.7828 95.4919 29.9756V34.4429C95.4919 34.5383 95.4731 34.6328 95.4365 34.7209C95.4 34.809 95.3464 34.8891 95.2788 34.9565C95.2113 35.0239 95.1312 35.0773 95.043 35.1137C94.9548 35.1501 94.8602 35.1687 94.7648 35.1685H72.1868C71.4885 35.1685 70.8187 34.8912 70.3247 34.3975C69.8308 33.9038 69.5531 33.2342 69.5527 32.5358V10.6678C69.5531 9.96948 69.8308 9.29985 70.3247 8.80616C70.8187 8.31248 71.4885 8.03516 72.1868 8.03516H94.7648C94.9577 8.03516 95.1426 8.11175 95.2789 8.2481C95.4153 8.38445 95.4919 8.56937 95.4919 8.7622V13.2281C95.4919 13.4209 95.4153 13.6058 95.2789 13.7422C95.1426 13.8785 94.9577 13.9551 94.7648 13.9551H76.5065C76.4106 13.9551 76.3158 13.9741 76.2273 14.0109C76.1388 14.0477 76.0584 14.1016 75.9909 14.1696C75.9233 14.2375 75.8698 14.3182 75.8335 14.4069C75.7973 14.4956 75.7789 14.5906 75.7794 14.6864Z" fill="#19191B"/>
                      <path d="M91.9414 23.9964V19.2124C91.9414 18.8987 91.6871 18.6444 91.3734 18.6444H78.7808C78.4671 18.6444 78.2128 18.8987 78.2128 19.2124V23.9964C78.2128 24.3101 78.4671 24.5644 78.7808 24.5644H91.3734C91.6871 24.5644 91.9414 24.3101 91.9414 23.9964Z" fill="#19191B"/>
                      <path d="M30.9389 8.65256V32.4276C30.9389 33.1259 30.6615 33.7955 30.1678 34.2892C29.6741 34.7829 29.0044 35.0603 28.3062 35.0603H15.708C12.2055 35.0603 8.84651 33.669 6.3699 31.1923C3.89329 28.7157 2.50195 25.3568 2.50195 21.8543V8.6483C2.50195 8.45548 2.57855 8.27055 2.7149 8.13421C2.85124 7.99786 3.03617 7.92126 3.22899 7.92126H7.99735C8.19018 7.92126 8.3751 7.99786 8.51145 8.13421C8.6478 8.27055 8.72439 8.45548 8.72439 8.6483V21.931C8.72439 23.7387 9.44251 25.4724 10.7208 26.7506C11.999 28.0289 13.7327 28.747 15.5404 28.747H23.9624C24.0612 28.747 24.159 28.7275 24.2502 28.6897C24.3414 28.6518 24.4243 28.5964 24.4941 28.5265C24.5639 28.4566 24.6192 28.3736 24.6568 28.2823C24.6945 28.191 24.7138 28.0932 24.7136 27.9944V8.65256C24.7136 8.45974 24.7902 8.27481 24.9265 8.13847C25.0629 8.00212 25.2478 7.92552 25.4406 7.92552H30.2104C30.306 7.92534 30.4007 7.944 30.4891 7.98046C30.5774 8.01691 30.6578 8.07043 30.7254 8.13797C30.7931 8.2055 30.8468 8.28571 30.8834 8.37401C30.92 8.46231 30.9389 8.55697 30.9389 8.65256Z" fill="#19191B"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="41" viewBox="0 0 98 41" fill="none">
                      <path d="M43.0501 21.9711L33.8059 31.8231C33.669 31.9685 33.5954 32.1624 33.6012 32.362C33.6071 32.5617 33.692 32.7509 33.8372 32.8881L38.2548 37.0515C38.4001 37.1886 38.5938 37.2625 38.7935 37.2569C38.9931 37.2513 39.1824 37.1667 39.3198 37.0217L48.919 26.8545C49.0509 26.7147 49.1245 26.5298 49.1249 26.3376V14.4664C49.1249 14.2737 49.0512 14.0883 48.919 13.9481L38.394 3.9783C38.2568 3.83336 38.0678 3.74881 37.8683 3.74322C37.6689 3.73762 37.4754 3.81146 37.3304 3.94848L33.4509 8.06648C33.379 8.1344 33.3211 8.21584 33.2806 8.30615C33.2402 8.39647 33.2179 8.49387 33.2151 8.5928C33.2124 8.69172 33.2291 8.79022 33.2645 8.88265C33.2998 8.97509 33.3531 9.05964 33.4211 9.13148L43.0501 18.228C43.1825 18.3675 43.2562 18.5526 43.256 18.7449V21.4557C43.2553 21.6474 43.1817 21.8317 43.0501 21.9711Z" fill="white"/>
                      <path d="M57.4718 21.9711L66.716 31.8231C66.8531 31.9683 66.927 32.1621 66.9214 32.3618C66.9158 32.5614 66.8312 32.7507 66.6862 32.8881L62.2685 37.0515C62.1233 37.1886 61.9295 37.2625 61.7299 37.2569C61.5302 37.2513 61.3409 37.1667 61.2035 37.0217L51.6029 26.8545C51.4714 26.7145 51.3983 26.5297 51.3984 26.3376V14.4664C51.3985 14.2737 51.4721 14.0883 51.6043 13.9481L62.1294 3.9783C62.2665 3.83336 62.4555 3.74881 62.655 3.74322C62.8544 3.73762 63.0479 3.81146 63.193 3.94848L67.0724 8.06648C67.2174 8.20384 67.302 8.39314 67.3076 8.59281C67.3132 8.79249 67.2393 8.98622 67.1022 9.13148L57.4718 18.228C57.3394 18.3675 57.2657 18.5526 57.2659 18.7449V21.4557C57.2666 21.6474 57.3402 21.8317 57.4718 21.9711Z" fill="white"/>
                      <path d="M75.7794 14.6864V28.5215C75.7794 28.7143 75.856 28.8992 75.9924 29.0356C76.1287 29.1719 76.3137 29.2485 76.5065 29.2485H94.7648C94.9577 29.2485 95.1426 29.3251 95.2789 29.4615C95.4153 29.5978 95.4919 29.7828 95.4919 29.9756V34.4429C95.4919 34.5383 95.4731 34.6328 95.4365 34.7209C95.4 34.809 95.3464 34.8891 95.2788 34.9565C95.2113 35.0239 95.1312 35.0773 95.043 35.1137C94.9548 35.1501 94.8602 35.1687 94.7648 35.1685H72.1868C71.4885 35.1685 70.8187 34.8912 70.3247 34.3975C69.8308 33.9038 69.5531 33.2342 69.5527 32.5358V10.6678C69.5531 9.96948 69.8308 9.29985 70.3247 8.80616C70.8187 8.31248 71.4885 8.03516 72.1868 8.03516H94.7648C94.9577 8.03516 95.1426 8.11175 95.2789 8.2481C95.4153 8.38445 95.4919 8.56937 95.4919 8.7622V13.2281C95.4919 13.4209 95.4153 13.6058 95.2789 13.7422C95.1426 13.8785 94.9577 13.9551 94.7648 13.9551H76.5065C76.4106 13.9551 76.3158 13.9741 76.2273 14.0109C76.1388 14.0477 76.0584 14.1016 75.9909 14.1696C75.9233 14.2375 75.8698 14.3182 75.8335 14.4069C75.7973 14.4956 75.7789 14.5906 75.7794 14.6864Z" fill="white"/>
                      <path d="M91.9424 23.9964V19.2124C91.9424 18.8987 91.6881 18.6444 91.3744 18.6444H78.7818C78.4681 18.6444 78.2138 18.8987 78.2138 19.2124V23.9964C78.2138 24.3101 78.4681 24.5644 78.7818 24.5644H91.3744C91.6881 24.5644 91.9424 24.3101 91.9424 23.9964Z" fill="white"/>
                      <path d="M30.9389 8.65256V32.4276C30.9389 33.1259 30.6615 33.7955 30.1678 34.2892C29.6741 34.7829 29.0044 35.0603 28.3062 35.0603H15.708C12.2055 35.0603 8.84651 33.669 6.3699 31.1923C3.89329 28.7157 2.50195 25.3568 2.50195 21.8543V8.6483C2.50195 8.45548 2.57855 8.27055 2.7149 8.13421C2.85124 7.99786 3.03617 7.92126 3.22899 7.92126H7.99735C8.19018 7.92126 8.3751 7.99786 8.51145 8.13421C8.6478 8.27055 8.72439 8.45548 8.72439 8.6483V21.931C8.72439 23.7387 9.44251 25.4724 10.7208 26.7506C11.999 28.0289 13.7327 28.747 15.5404 28.747H23.9624C24.0612 28.747 24.159 28.7275 24.2502 28.6897C24.3414 28.6518 24.4243 28.5964 24.4941 28.5265C24.5639 28.4566 24.6192 28.3736 24.6568 28.2823C24.6945 28.191 24.7138 28.0932 24.7136 27.9944V8.65256C24.7136 8.45974 24.7902 8.27481 24.9265 8.13847C25.0629 8.00212 25.2478 7.92552 25.4406 7.92552H30.2104C30.306 7.92534 30.4007 7.944 30.4891 7.98046C30.5774 8.01691 30.6578 8.07043 30.7254 8.13797C30.7931 8.2055 30.8468 8.28571 30.8834 8.37401C30.92 8.46231 30.9389 8.55697 30.9389 8.65256Z" fill="white"/>
                    </svg>
                    // <Image
                    //   src="/image/logo-white.png"
                    //   alt="REPLACE THIS"
                    //   // className="max-h-[44px]"
                    //   height={44}
                    //   width={98}
                    // />
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
