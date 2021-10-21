import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, {useEffect} from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import {TaxonomyType} from "data/types";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import {Helmet} from "react-helmet";
import {useAppDispatch, useAppSelector} from "../../campsitesindia/config/store";
import {getEntities} from "../../campsitesindia/location/redux/location.reducer";
import Listing from "../../campsitesindia/listing/redux/listing";
import ErrorBoundaryRoute from "../../shared/error/error-boundary-route";

const categories:TaxonomyType[]= new Array()
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

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "#",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "#",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const DEMO_CATS_3:TaxonomyType[] = [
    {
        id: "1",
        href: "#",
        name: "Camping",
        taxonomy: "category",
        count: 1882,
        thumbnail:
            "/content/img/campaign_listing.png",
    },
    {
        id: "2",
        href: "#",
        name: "Home Stays",
        taxonomy: "category",
        count: 8288,
        thumbnail:
            "/content/img/home_stay.png",
    },
    {
        id: "3",
        href: "#",
        name: "Road Trips",
        taxonomy: "category",
        count: 1288,
        thumbnail:
            "/content/img/roadtrip.png",
    },
    {
        id: "4",
        href: "#",
        name: "Trekking",
        taxonomy: "category",
        count: 112,
        thumbnail:
            "/content/img/trekking.png",
    },

];

function PageHome() {
    const dispatch = useAppDispatch();



    const locationList = useAppSelector(state => state.location.entities);
    const loading = useAppSelector(state => state.location.loading);
    const totalItems = useAppSelector(state => state.location.totalItems);

    const getAllEntities = () => {
        dispatch(
            getEntities({
                page: 1 - 1,
                size: 50,
                sort: ``,
            })
        );

    };
    useEffect(() => {
        getAllEntities()

    }, []);



    function objectMap(locationList) {

           // console.log("inside locations:::..............."+locationList.length)
        let cats :TaxonomyType[]=[]
            for (let [k, v] of Object.entries(locationList)) {
                let newObj1 = locationList[k]
                let taxonomy:TaxonomyType= {
                    id: k,
                    href: "#",
                    name: "Test"+k,
                    taxonomy: "category",
                    count: newObj1.count,
                    thumbnail: "http://campsitesindia.in/wp-content/uploads/2021/05/himachalpradesh.jpg",

                };
                cats.push(taxonomy)
              //  console.log("locations::::::" + k + taxonomy.name+"   "+cats.length)

        }
        return cats;

    }
    //
    // {
    //     id: "1",
    //         href: "#",
    //     name: "Himachal Pradesh",
    //     taxonomy: "category",
    //     count: 270,
    //     thumbnail:
    //     "http://campsitesindia.in/wp-content/uploads/2021/05/himachalpradesh.jpg",
    // },

    return (

    <div className="nc-PageHome relative overflow-hidden">

      <Helmet>
        <title>Campsites India || Love camping and glamping? Find the India's best campsites</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />


      <div className="container  relative space-y-24 mb-24 lg:space-y-32 lg:mb-32">
        {/* SECTION HERO */}

        <SectionHero className="pt-10 lg:pt-28 pb-16" />



          {/* SECTION Total number of listed by category  */}
          <SectionGridCategoryBox categories={DEMO_CATS_3} headingCenter={false} />

          {/* SECTION Location listing */}
        {/*<SectionSliderNewCategories categories={DEMO_CATS} />*/}
          {locationList && locationList.length > 0 &&
          <SectionSliderNewCategories categories={objectMap(locationList)}/>
          }

        {/*/!* SECTION2 *!/*/}
        {/*<SectionOurFeatures />*/}

        {/* SECTION Camping Listing*/}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces  />
            <ErrorBoundaryRoute path={''} component={Listing} />
                    </div>

        {/* SECTION */}
        {/*<SectionHowItWork />*/}

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Featured Home Stays"
            subHeading="Popular places to stay that Campsites recommends for you"
            sliderStyle="style2"
          />
        </div>

          {/* SECTION Experience */}
          <div className="relative py-16">
              <BackgroundSection className="bg-white  dark:bg-black dark:bg-opacity-20 " />
              <SectionSliderNewCategories
                  categories={DEMO_CATS_2}
                  categoryCardType="card4"
                  itemPerRow={4}
                  heading="Featured Experiences"
                  subHeading="Popular Experiences that Campsites recommends for you"
                  sliderStyle="style2"
              />
          </div>

        {/* SECTION */}
        <SectionSubscribe2 />




        {/* SECTION */}
        <SectionVideos />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
