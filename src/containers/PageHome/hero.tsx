import React, {FC} from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import HeroSearchForm from "../../components/HeroSearchForm/HeroSearchForm";
import {TaxonomyType} from "../../data/types";

export interface heroProps {

  className?: string;
}
const DEMO_CATS: TaxonomyType[] = [
    {
        id: "1",
        href: "#",
        name: "Himachal-Pradesh",
        taxonomy: "category",
        count: 270,
        thumbnail:
            "http://campsitesindia.in/wp-content/uploads/2021/05/himachalpradesh.jpg",
    },
    {
        id: "2",
        href: "#",
        name: "Uttrakhand",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "/content/img/campsite/Uttrakhand-Cover.jpeg",
    },
    {
        id: "3",
        href: "#",
        name: "Paris",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        id: "4",
        href: "#",
        name: "London",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
        id: "5",
        href: "#",
        name: "Tokyo",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
        id: "6",
        href: "#",
        name: "Maldives",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
];

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
