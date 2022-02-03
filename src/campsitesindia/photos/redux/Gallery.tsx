import Glide from "@glidejs/glide";
import React, {FC, useEffect} from "react";
import NcImage from "shared/NcImage/NcImage";
import NextPrev from "shared/NextPrev/NextPrev";
import ncNanoId from "utils/ncNanoId";

export interface GalleryProps {
    className?: string;
    galleryImgs: string[];
    ratioClass?: string;
}

const Gallery: FC<GalleryProps> = ({
                                                   className = "",
                                                   galleryImgs,
                                                   ratioClass = "aspect-w-4 aspect-h-3",
                                               }) => {
    const UNIQUE_CLASS = "nc_glide2_" + ncNanoId();

    useEffect(() => {

    }, []);


        return (
            <section className="overflow-hidden text-gray-700 ">
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    {galleryImgs.map((item, index) => (
                        <div className="flex flex-wrap w-1/6">
                            <div className="w-25 p-1 md:p-2">
                                {/*<NcImage src={item} />*/}
                                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                                     src={item}/>
                            </div>
                        </div>

                    ))}

                </div>
                </div>
            </section>


        );



};

export default Gallery;
