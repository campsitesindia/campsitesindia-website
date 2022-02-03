import rightImg from "images/about-hero-right.png";
import React, {FC} from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import {Helmet} from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Booking React Template</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
        {/*-------*/}

        {/*-------*/}
        <div className="container bg-gray-200 mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="left-1/2  border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
                     ></div>
                { /*-- right timeline --*/}

                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12 "></div>
                    <div className="z-20 order-1 flex justify-center bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto font-semibold text-lg text-white ">1</h1>
                    </div>


                    <div className=" order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">




                        <h3 className="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book.</p>
                        <div className="relative -left-8 bottom-20 h-10 w-10 transform rotate-45   bg-gradient-to-r from-gray-400  "></div>
                    </div>

                </div>



                {/*-- left timeline --*/}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex justify-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                    </div>
                    <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
                        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Lorem
                            Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>

                { /*-- right timeline --*/}
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex justify-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                    </div>
                    <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Lorem Ipsum is
                            simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>

                {/*-- left timeline --*/}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
                    </div>
                    <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
                        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Lorem
                            Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container bg-gray-200 mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="border-2-2 absolute border-dashed border-blue-500 h-full border"
                     ></div>



                <div className="mb-8 flex justify-between items-center w-full">
                    <div className="order-2 w-6/12"></div>
                    <div className="z-20">
                        <div
                            className="my-4 rounded-full h-10 w-10 flex items-center bg-indigo-300 ring-4 ring-indigo-400 ring-opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <div className="order-1 bg-gray-300 rounded-lg shadow-xl w-5/12 px-6 py-4">
                        <div className="flex flex-row">
                            <h3 className="mb-3 font-bold text-gray-800 text-xl">Status</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="red">
                                <path fill-rule="evenodd"
                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <h5 className="mb-3 font-bold text-gray-800 text-xl">Loc</h5>
                        </div>

                        <p className="text-base leading-snug tracking-wide text-gray-900 text-opacity-100">statusinfo
                            helooooooooooooooooooooooo</p>
                    </div>
                </div>



                <div className="mb-8 flex justify-between items-center w-full">
                    <div className="order-2 w-6/12"></div>
                    <div className="z-20">
                        <div
                            className="my-4 rounded-full h-10 w-10 flex items-center bg-indigo-300 ring-4 ring-indigo-400 ring-opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <div className="order-1 bg-red-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
                        <div className="flex flex-row">
                            <h3 className="mb-3 font-bold text-gray-800 text-xl">Status</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="red">
                                <path fill-rule="evenodd"
                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <h5 className="mb-3 font-bold text-gray-800 text-xl">Loc</h5>
                        </div>

                        <p className="text-base leading-snug tracking-wide text-gray-900 text-opacity-100">statusinfo
                            helooooooooooooooooooooooo</p>
                    </div>
                </div>



            </div>
        </div>
        <section>
            <div className="bg-black text-white py-8">
                <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
                    <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                        <p className="ml-2 text-yellow-300 uppercase tracking-loose">Working Process</p>
                        <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">Working Process of
                            Fest</p>
                        <p className="text-sm md:text-base text-gray-50 mb-4">
                            Here’s your guide to the tech fest 2021 process. Go through all the steps to know the exact
                            process of the
                            fest.
                        </p>
                        <a href="#"
                           className="bg-transparent mr-auto hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            Explore Now</a>
                    </div>
                    <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
                        <div className="container mx-auto w-full h-full">
                            <div className="relative wrap overflow-hidden p-10 h-full">
                                <div className="border-2-2 border-yellow-555 absolute h-full border"
                                       ></div>
                                <div className="border-2-2 border-yellow-555 absolute h-full border"
                                      ></div>
                                <div
                                    className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                    <div className="order-1 w-5/12"></div>
                                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                                        <p className="mb-3 text-base text-yellow-300">1-6 May, 2021</p>
                                        <h4 className="mb-3 font-bold text-lg md:text-2xl">Registration</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                            Pick your favourite event(s) and register in that event by filling the form
                                            corresponding to that
                                            event. Its that easy :)
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8 flex justify-between items-center w-full right-timeline">

                                    <div className="order-1 w-5/12"></div>
                                    <div className="order-1  w-5/12 px-1 py-4 text-left">
                                        <p className="mb-3 text-base text-yellow-300">6-9 May, 2021</p>
                                        <h4 className="mb-3 font-bold text-lg md:text-2xl">Participation</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                            Participate online. The links for your registered events will be sent to you
                                            via email and whatsapp
                                            groups. Use those links and show your talent.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                    <div className="order-1 w-5/12"></div>
                                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                                        <p className="mb-3 text-base text-yellow-300"> 10 May, 2021</p>
                                        <h4 className="mb-3 font-bold text-lg md:text-2xl">Result Declaration</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                            The ultimate genius will be revealed by our judging panel on 10th May, 2021
                                            and the resukts will be
                                            announced on the whatsapp groups and will be mailed to you.
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                                    <div className="order-1 w-5/12"></div>

                                    <div className="order-1  w-5/12 px-1 py-4">
                                        <p className="mb-3 text-base text-yellow-300">12 May, 2021</p>
                                        <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Prize
                                            Distribution</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                            The winners will be contacted by our team for their addresses and the
                                            winning goodies will be sent at
                                            their addresses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img className="mx-auto -mt-36 md:-mt-36"
                                 src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-coolGray-100 text-coolGray-800">
            <div className="container max-w-5xl px-4 py-12 mx-auto">
                <div className="grid gap-4 mx-4 sm:grid-cols-12">
                    <div className="col-span-12 sm:col-span-3">
                        <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-600">
                            <h3 className="text-3xl font-semibold">Morbi tempor</h3>
                            <span className="text-sm font-bold tracking-wider uppercase text-coolGray-600">Vestibulum diam nunc</span>
                        </div>
                    </div>
                    <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                        <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-coolGray-300">
                            <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600">

                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src="/content/img/restaurant_6.jpg" alt="Mountain"/>
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Mountain</div>
                                            <p className="text-gray-700 text-base">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                        </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600">
                                <h3 className="text-xl font-semibold tracking-wide">Aliquam sit amet nunc ut</h3>
                                <time className="text-xs tracking-wide uppercase text-coolGray-600">Jul 2019</time>
                                <p className="mt-3">Morbi vulputate aliquam libero non dictum. Aliquam sit amet nunc ut diam aliquet tincidunt nec nec dui. Donec mollis turpis eget egestas sodales.</p>
                            </div>
                            <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600">
                                <h3 className="text-xl font-semibold tracking-wide">Pellentesque habitant morbi</h3>
                                <time className="text-xs tracking-wide uppercase text-coolGray-600">Jan 2016</time>
                                <p className="mt-3">Suspendisse tincidunt, arcu nec faucibus efficitur, justo velit consectetur nisl, sit amet condimentum lacus orci nec purus. Mauris quis quam suscipit, vehicula felis id, vehicula enim.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="min-h-screen bg-gray-100">

            <div className="min-h-screen flex justify-center">
                <div className="w-2/3 mx-auto">
                    <div className="flex flex-row w-full">


                        <div className=" w-2/5 px-2 py-10">
                            <div className=" flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                                <div className="text-gray-600 mb-2 flex justify-between">
                                    <div className="font-bold">
                                        Svjatoslav Torn
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200">
                                            <i className="far fa-edit"></i></button>
                                        <button className="text-red-500 hover:text-red-300 transition duration-200"><i
                                            className="far fa-trash-alt"></i></button>
                                    </div>
                                </div>
                                <div className="text-gray-600">
                                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa
                                    deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem
                                    quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe,
                                    voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                                </div>
                            </div>

                        </div>

                        <div className="w-1/5  flex justify-center">
                            <div className="relative flex h-full w-1 bg-green-300 items-center justify-center">
                                <div
                                    className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-green-300 leading-none text-center z-10 bg-white font-thin">
                                    <div>20</div>
                                    <div>September</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/5 px-2 py-10 ">

                        </div>
                    </div>
                    <div className="flex flex-row w-full">


                        <div className="w-2/5 px-2 py-10">

                        </div>

                        <div className="w-1/5  flex justify-center">
                            <div className="relative flex h-full w-1 bg-green-300 items-center justify-center">
                                <div
                                    className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-blue-800 leading-none text-white text-center z-10 bg-blue-800 font-thin">
                                    <div>20</div>
                                    <div>сентября</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/5 px-2 py-10 ">
                            <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                                <div className="text-gray-600 mb-2 flex justify-between">
                                    <div className="font-bold">
                                        Svetlana Torn
                                    </div>
                                </div>
                                <div className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis enim esse fuga
                                    modi quisquam veritatis?
                                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa
                                    deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem
                                    quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe,
                                    voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">


                        <div className="w-2/5 px-2 py-10">
                            <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                                <div className="text-gray-600 mb-2 flex justify-between">
                                    <div className="font-bold">
                                        Svjatoslav Torn
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200">
                                            <i className="far fa-edit"></i></button>
                                        <button className="text-red-500 hover:text-red-300 transition duration-200"><i
                                            className="far fa-trash-alt"></i></button>
                                    </div>
                                </div>
                                <div className="text-gray-600">
                                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa
                                    deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem
                                    quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe,
                                    voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                                </div>
                            </div>

                        </div>

                        <div className="w-1/5  flex justify-center">
                            <div className="relative flex h-full w-1 bg-green-300 items-center justify-center">
                                <div
                                    className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-green-300 leading-none text-center z-10 bg-white font-thin">
                                    <div>20</div>
                                    <div>сентября</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/5 px-2 py-10 ">

                        </div>
                    </div>
                </div>


            </div>

        </div>

        <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
