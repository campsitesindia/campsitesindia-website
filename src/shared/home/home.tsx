import React, {useState} from 'react';
import {Maincontents} from "./Maincontents";

// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

export const Home = () => {
  const [maincontent, setmaincontent] = useState(Maincontents)
  //Owl Carousel Settings
  const options = {
    margin: 30,

    nav:true,
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 3,
      }
    },
  };

  return (
    <main >
      <section className="slider">
        <div id="slider" className="flexslider">
          <ul className="slides">
            <li>
              <img src="./content/img/flex_slides/camping_slide_1.jpeg" alt=""/>
                <div className="meta">
                  <h3>Bangkok, A city that never stays the same</h3>
                  <div className="info">
                    <p><strong>220</strong> Hotels - <strong>150</strong> Restaurant</p>
                  </div>
                  <a href="#0" className="btn_1">Read more</a>
                </div>
            </li>
            <li>
              <img src="./content/img/flex_slides/slide_2.jpg" alt=""/>
                <div className="meta">
                  <h3>Dubai, The most attractive destination</h3>
                  <div className="info">
                    <p><strong>220</strong> Hotels - <strong>150</strong> Restaurant</p>
                  </div>
                  <a href="#0" className="btn_1">Read more</a>
                </div>
            </li>
            <li>
              <img src="./content/img/flex_slides/slide_3.jpg" alt=""/>
                <div className="meta">
                  <h3>Cairo, Traditions and culture</h3>
                  <div className="info">
                    <p><strong>220</strong> Hotels - <strong>150</strong> Restaurant</p>
                  </div>
                  <a href="#0" className="btn_1">Read more</a>
                </div>
            </li>
            <li>
              <img src="./content/img/flex_slides/slide_4.jpg" alt=""/>
                <div className="meta">
                  <h3>Nassau, Unique beaches and horizons</h3>
                  <div className="info">
                    <p><strong>220</strong> Hotels - <strong>150</strong> Restaurant</p>
                  </div>
                  <a href="#0" className="btn_1">Read more</a>
                </div>
            </li>
            <li>
              <img src="./content/img/flex_slides/slide_5.jpg" alt=""/>
                <div className="meta">
                  <h3>Rome, The Eternal City</h3>
                  <div className="info">
                    <p><strong>220</strong> Hotels - <strong>150</strong> Restaurant</p>
                  </div>
                  <a href="#0" className="btn_1">Read more</a>
                </div>
            </li>
          </ul>
          <div id="icon_drag_mobile"></div>
        </div>
        <div id="carousel_slider_wp">
          <div id="carousel_slider" className="flexslider">
            <ul className="slides">
              <li>
                <img src="../content/img/flex_slides/slide_1_thumb.jpg" alt=""/>
                  <div className="caption">
                    <h3>Bangkok <span>Thailand</span></h3>
                    <small>$75 per person</small>
                  </div>
              </li>
              <li>
                <img src="../content/img/flex_slides/slide_2_thumb.jpg" alt=""/>
                  <div className="caption">
                    <h3>Dubai <span>Emirates</span></h3>
                    <small>$75 per person</small>
                  </div>
              </li>
              <li>
                <img src="../content/img/flex_slides/slide_3_thumb.jpg" alt=""/>
                  <div className="caption">
                    <h3>Cairo <span>Egypt</span></h3>
                    <small>$45 per person</small>
                  </div>
              </li>
              <li>
                <img src="../content/img/flex_slides/slide_4_thumb.jpg" alt=""/>
                  <div className="caption">
                    <h3>Nassau <span>Bahamas</span></h3>
                    <small>$85 per person</small>
                  </div>
              </li>
              <li>
                <img src="../content/img/flex_slides/slide_5_thumb.jpg" alt=""/>
                  <div className="caption">
                    <h3>Rome <span>Italy</span></h3>
                    <small>$75 per person</small>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </section>


    </main>


  );
};

export default Home;
