import hero2 from "../../assets/images/hero.png";
import video from "../../assets/Add.mp4";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Hero() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-5 md:mx-2 mx-0 py-2">
        <div className="relative w-full">
          <Carousel
            autoPlay
            showThumbs={false}
            infiniteLoop
            emulateTouch
            swipeable
            showStatus={false}
          >
            {/* First slide with video */}
            <div>
              <video
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Second slide with image */}
            {/* <div>
              <img
                src={hero2}
                className="object-cover w-full h-full"
                alt="Slide 2"
              />
            </div> */}
            {/* Third slide with image (optional) */}
            {/* <div>
              <img src={hero2} className="object-cover" alt="Slide 3" />
            </div> */}
          </Carousel>
          <Link to="/products">
            <button className="border border-r-0 border-primary absolute bottom-10 right-0 text-primary bg-white md:px-6 px-2 py-2 font-bold md:text-xl">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
