import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const EvolutionSlider = ({ evolutions }) => {
  return (
    <div className="evolution-slider">
      <h3>Evolution Chain</h3>
      <Swiper 
        spaceBetween={20}
        slidesPerView={3}
        navigation
        modules={[Navigation]}
      >
        {evolutions.map((poke, index) => (
          <SwiperSlide key={index}>
            <div className="evo-card">
              <img src={poke.image} alt={poke.name} className="evo-img" />
              <p>{poke.name}</p>
              {poke.level && <p>Lv. {poke.level}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EvolutionSlider;
