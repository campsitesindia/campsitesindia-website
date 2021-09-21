import React, {useEffect} from "react";
import {DEMO_POSTS} from "data/posts";
import {Helmet} from "react-helmet";

import Hero from "./hero";


import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const PageHome2: React.FC = () => {
    useEffect(() => {
        const $body = document.querySelector("body");
        if ($body) {
            $body.className = "theme-orange-grey";
        }
        return () => {
            if ($body) {
                $body.className = "";
            }
        };
    }, []);

    return (
        <div className="nc-PageHome2 overflow-hidden relative">
            <Helmet>
                <title>Home 3 || Blog Magazine React Template</title>
            </Helmet>

            {/* ======== BG GLASS ======== */}
            <BgGlassmorphism />

            {/* ======= START CONTAINER ============= */}
            <div className="container relative">
                {/* === SECTION 1 === */}
                <Hero className="pb-16 lg:pb-28"  />


            </div>
        </div>





    );
};

export default PageHome2;


