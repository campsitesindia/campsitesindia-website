import React, {FC, useState, forwardRef, useEffect,} from "react";
import CommonLayout from "./CommonLayout";
import {RMIUploader} from "react-multiple-image-uploader";
import {useAppDispatch, useAppSelector} from "../../campsitesindia/config/store";
import {uploadPhotos} from "../../campsitesindia/photos/redux/photosupload.reducer";
import Button from "../../shared/Button/Button";
import {IListing} from "../../campsitesindia/listing/model/listing.model";
import FormItem from "./FormItem";

export interface PageAddListing7Props {
    imgList:string[];
    imgListFiles:File[];
    listingProps:IListing;
    onFormDataUpdate:(imgList:string[],imgFilesForUpload:File[]) => void

}




const PageAddListing7:  FC<PageAddListing7Props> = ({imgList,imgListFiles,listingProps,onFormDataUpdate}) => {
    const dispatch = useAppDispatch();

    const fileArray:File [] = [];
    let imgArray=[];
    const photosUploadEntity = useAppSelector(state => state.photosupload.entity);
    const [update, setUpdate] = useState(false);
    const [img, setImg] = useState<File[]>([]);
    const [imgFile, setImgFile] = useState([]);
    const [coverImg, setCoverImg] = useState<File>();
    const [coverImgFile, setCoverImgFile] = useState(undefined);



    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        for (let i = 0; i <  fileList.length; i++) {
            console.log("number of files..."+i)

            setImg(currentArray => [...currentArray, fileList[i]])

            setImgFile(currentValue => [...currentValue,URL.createObjectURL(fileList[i])]);

            setUpdate(true)
        }

    };
    useEffect(() => {
        if(update) {
            onFormDataUpdate(imgFile, img)
            setUpdate(false)
        }
    }, [img, imgFile])

    const handleCoverImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setCoverImg(fileList[0])
        setCoverImgFile(URL.createObjectURL(fileList[0]));

    };

    const uploadFile = function () {
        const formData = new FormData();
        if (img) {
            for (let i = 0; i <  img.length; i++) {
                formData.append("files", img[i], img[i].name);

            }
            formData.append("location", 'test')
            formData.append('listingName', 'mp')
        }

       // dispatch(uploadPhotos({files: formData, location: 'test', listingName: 'mp'}));
    };
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        //alert(userName+password+rememberMe)

        //handleLogin(userName,password,rememberMe)
        //dispatch(uploadPhotos(img))

    }

    return (
        <CommonLayout
            index="07"
            backtHref="/add-listing-6"
            nextHref="/add-listing-8"
        >
            <>
                {/*<form onSubmit={submitForm}>*/}
                    {/*<input type="text" required name="location"/>*/}
                    {/*<input type="text" required name="listingName"/>*/}
                    {/*<input type="file" required name="files"/>*/}
                    {/*<input type="submit" name="button"/>*/}
                {/*</form>*/}
                <div>
                    <h2 className="text-2xl font-semibold">Pictures of the place { !img ? (0):(img.length)}</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            A few beautiful photos will help customers have more sympathy for
            your property.
          </span>
                </div>

                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">
                    {/* ----------------- */}
                    <div>
                        <span className="text-lg font-semibold">Cover Picture</span>
                        <div className="mt-12 ">
                            <div className="space-y-1 text-center">

                                <div
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-neutral-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    <div className="flex justify-center text-sm text-neutral-6000 dark:text-neutral-300">
                                        <label
                                            htmlFor="cover-file-upload"
                                            className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                        >
                                            <span>Upload a file</span>
                                            {/*<form className="grid grid-cols-1 gap-6" onSubmit={submitForm}>*/}
                                            <input
                                                id="cover-file-upload"
                                                name="cover-file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleCoverImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                </div>
                                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                                        <div className="flex relative">
                                            <img alt="gallery"
                                                 className="absolute inset-0 w-full h-full object-cover object-center"
                                                 src={coverImgFile}/>
                                            <div
                                                className="relative  w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE
                                                    SUBTITLE</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Shooting
                                                    Stars</h1>
                                                <p className="leading-relaxed">Photo booth fam kinfolk
                                                    cold-pressed sriracha leggings jianbing microdosing
                                                    tousled waistcoat.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-lg font-semibold">Pictures of the place {img.length}</span>

                        <div
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                            <div className="grid grid-rows-2">

                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-neutral-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>

                                    <div className="flex justify-center text-sm text-neutral-6000 dark:text-neutral-300">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                        >
                                            <span>Upload a file</span>
                                            {/*<form className="grid grid-cols-1 gap-6" onSubmit={submitForm}>*/}
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                    <Button
                                        onClick={uploadFile}

                                    >
                                        Choose Picture
                                    </Button>
                                    <div className="container px-5   mx-auto">

                                        <div className="flex flex-wrap -m-4">
                                            { imgList && imgList.map((sweetItem,index) => {
                                                console.log(imgList)
                                                console.log(imgListFiles)
                                                return (
                                                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                                                        <div className="flex relative">
                                                            <img key={index} alt="gallery"
                                                                 className="absolute inset-0 w-full h-full object-cover object-center"
                                                                 src={sweetItem}/>
                                                            <div
                                                                className="relative  w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE
                                                                    SUBTITLE</h2>
                                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Shooting
                                                                    Stars</h1>
                                                                <p className="leading-relaxed">Photo booth fam kinfolk
                                                                    cold-pressed sriracha leggings jianbing microdosing
                                                                    tousled waistcoat.</p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                )


                                            })

                                            }



                                        </div>
                                    </div>

                            </div>



                            </div>
                            </div>




                    </div>

                </div>
                <FormItem>
                    <button
                        className="
            mx-3
            bg-blue-800
            text-white
            active:bg-purple-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none

            ease-linear
            transition-all
            duration-150
          "
                        type="submit"
                        //disabled={isCreated}

                    >
                        Save
                    </button>
                </FormItem>
            </>
        </CommonLayout>
    );
};

export default PageAddListing7;
