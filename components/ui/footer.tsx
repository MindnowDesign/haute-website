"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer 
      className="bg-[#000000] text-white relative w-full pt-32 pb-24" 
      style={{ backgroundColor: '#000000' }}
    >
        <div className="container mx-auto px-4 max-w-[1400px]">

        {/* Main content container */}
        <div className="relative flex flex-col items-center gap-12 lg:gap-[84px] pt-16 lg:pt-24 w-full">
          {/* HAUTE Logo Container */}
          <div className="w-full flex justify-center mb-12 lg:mb-16">
            <Image
              src="/Logos/Haute Logo white.svg"
              alt="HAUTE"
              width={138}
              height={28}
              className="w-full h-auto"
            />
          </div>

          {/* Info sections */}
          <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-[88px] items-start">
            {/* Contact Info */}
            <div className="flex-1 flex flex-col gap-8 items-start">
              <div className="w-8 h-[3px] border-t-[3px] border-white"></div>
              <div className="flex flex-col gap-4 items-start text-white">
                <h3 className="text-[13.2px] font-bold tracking-[0.21px] leading-[25.2px]">
                  HAUTE SA
                </h3>
                <div className="text-[14px] font-normal leading-[25.2px]">
                  <p>Talstrasse 65, 8001 Zurich</p>
                  <p>welcome@haute.ch</p>
                  <p>T +41 43 344 72 72</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex-1 flex flex-col gap-8 items-start">
              <div className="w-8 h-[3px] border-t-[3px] border-white"></div>
              <div className="flex flex-col gap-4 items-start">
                <h3 className="text-[13.2px] font-bold tracking-[0.21px] uppercase leading-[25.2px]">
                  Opening Hours
                </h3>
                <div className="flex flex-col gap-3 text-[14px] font-normal">
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Monday to Friday</p>
                    <p className="leading-[21.2px] opacity-50">11.30am – 12.00am</p>
                  </div>
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Saturday / Sunday</p>
                    <p className="leading-[21.2px] opacity-50">On request</p>
                  </div>
                  <div className="leading-[21.2px]">
                    <p>HAUTE will be closed from 20th</p>
                    <p>December 2025, through 4th January</p>
                    <p>2026 (except New Year's Eve).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex-1 flex flex-col gap-8 items-start">
              <div className="w-8 h-[3px] border-t-[3px] border-white"></div>
              <div className="flex flex-col gap-4 items-start">
                <h3 className="text-[13.2px] font-bold tracking-[0.21px] uppercase leading-[25.2px]">
                  Parking
                </h3>
                <div className="flex flex-col gap-3 text-[14px] font-normal">
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Talgarten</p>
                    <p className="leading-[21.2px] opacity-50">
                      Nüschelerstrasse 31, 8001 Zurich
                      <br />
                      Open: 24/7
                    </p>
                  </div>
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Bleicherweg</p>
                    <p className="leading-[21.2px] opacity-50">
                      Beethovenstrasse 35, 8002 Zurich
                      <br />
                      Hours: Mon–Sun, 6:00 am – 4:30 am
                    </p>
                  </div>
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Jelmoli</p>
                    <p className="leading-[21.2px] opacity-50">
                      Steinmühleplatz 1, 8001 Zurich
                      <br />
                      Hours: Daily, 6:00 am – 1:00 am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Garages */}
            <div className="flex-1 flex flex-col gap-8 items-start">
              <div className="w-8 h-[3px] border-t-[3px] border-white"></div>
              <div className="flex flex-col gap-4 items-start">
                <h3 className="text-[13.2px] font-bold tracking-[0.21px] uppercase leading-[25.2px]">
                  Nearby Garages
                </h3>
                <div className="flex flex-col gap-3 text-[14px] font-normal">
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Parkhaus Gessnerallee</p>
                    <p className="leading-[21.2px] opacity-50">
                      Gessnerallee 14, 8001 Zurich
                      <br />
                      Open: 24/7
                    </p>
                  </div>
                  <div className="flex flex-col gap-px">
                    <p className="leading-[25.2px]">Park Hyatt Zurich</p>
                    <p className="leading-[21.2px] opacity-50">
                      Beethovenstrasse 21, 8002 Zurich
                      <br />
                      Open: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom section */}
          <div className="w-full flex flex-col gap-8 lg:gap-[40px] items-center mt-8">
            {/* Partner logos */}
            <div className="flex flex-nowrap gap-8 lg:gap-20 items-center justify-center px-4 lg:px-[214px] py-[17px]">
              <a 
                href="http://www.gammacatering.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[180px] lg:w-[225px] h-[24px] lg:h-[30px] flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Image
                  src="/Logos/gamma-footer.png"
                  alt="Gamma"
                  fill
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.zunfthauszursaffran.ch/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[180px] lg:w-[225px] h-[24px] lg:h-[30px] flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Image
                  src="/Logos/saffran-footer.png"
                  alt="Saffran"
                  fill
                  className="object-contain"
                />
              </a>
              <a 
                href="http://www.theatercasino.ch/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[72px] lg:w-[90px] h-[40px] lg:h-[50px] flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Image
                  src="/Logos/tcz-footer.png"
                  alt="TCZ"
                  fill
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.ginto.guide/entries/82858fa4-4373-4476-b627-3359df6991aa?lnk_src=business" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[50px] lg:w-[63px] h-[48px] lg:h-[60px] flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Image
                  src="/Logos/Link - OKGO_LOGO → OKGO_LOGO-200x200.png.png"
                  alt="OKGO"
                  fill
                  className="object-contain"
                />
              </a>
            </div>

            {/* Footer links */}
            <div className="flex flex-wrap gap-6 lg:gap-[54px] items-center justify-center text-center capitalize text-[13px] lg:text-[13.7px] tracking-[0.21px]">
              <a href="#" className="footer-link leading-[25.2px]">
                GAMMA Group
              </a>
              <a href="#" className="footer-link leading-[25.2px]">
                Jobs
              </a>
              <a href="#" className="footer-link leading-[25.2px]">
                GAMMA Design
              </a>
              <a href="#" className="footer-link leading-[25.2px]">
                Legal notice
              </a>
              <a href="#" className="footer-link leading-[25.2px]">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

