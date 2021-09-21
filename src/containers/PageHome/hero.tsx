import React, {FC} from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import HeroSearchForm from "../../components/HeroSearchForm/HeroSearchForm";

export interface heroProps {

  className?: string;
}


    const Hero: FC<heroProps> = ({ className = "" }) => {
    return (
        <div id="product">
            <div style={{textShadow:'0px 1px 1px gray' , backgroundImage: `url(/content/img/campsite/cottege.jpeg)`}}  className=" rounded-lg  flex flex-col items-center justify-start font-sans min-h-96 bg-gray-50 lg:pt-10 lg:pb-20   lg:bg-cover">
                <div className="flex flex-col lg:flex-row lg:items-center">

                    <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
                        <h2 className="font-medium text-4xl text-white md:text-5xl xl:text-7xl leading-[110%]">
                            Camping, Home stay & experiences
                        </h2>
                        <span className="text-base px-5 md:text-lg text-white dark:text-neutral-400">
           Love camping and glamping? Find the India's best campsites & Homestays
                        </span>
                        <ButtonPrimary>Start your search</ButtonPrimary>
                    </div>
                    {/*<div className="flex-grow">*/}
                        {/*<img className="w-full" src={imagePng} alt="hero" />*/}
                    {/*</div>*/}
                </div>

                <div className="z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
                    <HeroSearchForm />
                </div>
            </div>

            </div>


    );
};

export default Hero;
