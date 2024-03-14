import React, { Component } from "react";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import reviewImage from "../../assets/images/review/review.png";

const dummyData = [
  {
    id: 1,
    title: "Card 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 2,
    title: "Card 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 3,
    title: "Card 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 4,
    title: "Card 4",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 5,
    title: "Card 5",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 6,
    title: "Card 6",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
];

export default class AutoPlay extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      speed: 1000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 768, // Medium screen size
          settings: {
            slidesToShow: 2, // Display 3 items on medium screens
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 560, // Large screen size
          settings: {
            slidesToShow: 1, // Display 5 items on large screens
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (

      <div className="md:mt-7 mt-3 w-[80%] mx-auto">
        <h1 className="text-center text-[#bf2b2b] font-bold text-xl my-[70px]">
          REVIEWS
        </h1>        
        <Slider {...settings}>
          {dummyData.map((item) => (
            <div key={item.id} className="flex flex-col pr-4">
              <div>
                <img
                  src={reviewImage}
                  alt={`explore-${item.id}`}
                  className="w-full object-cover p-0"
                />
              </div>
              <div className="flex flex-col mt-4 text-center">
                <div className="text-[#ff3e3e]">{item.title}</div>
                <div>
                  <p>{item.description}</p>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
