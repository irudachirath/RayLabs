import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const userReviews = [
  {
    id: 1,
    username: "johndoe",
    rating: 5,
    comment:
      "RayLabs is an outstanding diagnostic tool! The accuracy of its results is impressive, and it significantly reduces the time needed to get a preliminary diagnosis. The interface is intuitive and easy to navigate. Highly recommend it to anyone in need of a reliable personal diagnostic assistant.",
    date: "2024-07-17",
  },
  {
    id: 2,
    username: "janedoe",
    rating: 4,
    comment:
      "I found RayLabs to be very user-friendly and efficient. The app's ability to quickly analyze X-ray images and provide detailed reports is commendable. It has become an indispensable tool in my routine. However, I believe there is still room for improvement in terms of speed.",
    date: "2024-07-16",
  },
  {
    id: 3,
    username: "alexsmith",
    rating: 3,
    comment:
      "Good app with a lot of potential. RayLabs offers great diagnostic capabilities and its accuracy is quite reliable. However, the app could benefit from additional features and a more streamlined user experience. Looking forward to future updates.",
    date: "2024-07-15",
  },
  {
    id: 4,
    username: "emilyjones",
    rating: 5,
    comment:
      "RayLabs is simply amazing! It has helped me a lot with quick and accurate medical diagnoses. The automated personal diagnostic assistant feature is a game-changer. The app is well-designed and easy to use. I highly recommend it!",
    date: "2024-07-14",
  },
  {
    id: 5,
    username: "michaelbrown",
    rating: 4.5,
    comment:
      "RayLabs is a great app with impressive diagnostic accuracy. The ability to get detailed reports from X-ray images in such a short time is fantastic. The app is very helpful, although it could be made a bit faster. Overall, a valuable tool for anyone needing quick medical insights.",
    date: "2024-07-13",
  },
];

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - rating === 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
}

function UserReviews() {
  return (
    <div className="w-5/6 m-auto py-[124px] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-16">Our Patients' Feedback</h1>
      <div className="w-full flex items-center justify-center">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {userReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="min-h-80 flex flex-col bg-[#8F3E97] items-center justify-center p-4 px-10 rounded-lg">
                <h1 className="text-3xl font-bold">@{review.username}</h1>
                <div className="flex mt-4">{renderStars(review.rating)}</div>
                <p className="text-sm mt-6">{review.comment}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default UserReviews;
