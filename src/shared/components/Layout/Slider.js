import { getImageSlider } from "../../ultils";
import { useEffect, useState } from "react";
import { getSlider } from "../../../services/Api";
const Slider = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getSlider({})
      .then(({ data }) => setSliders(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div id="slide" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {sliders.map((slider, index) => (
            <li
              key={index}
              data-target="#slide"
              data-slide-to={slider.position - 1}
              className={slider.position === 0 ? "active" : ""}
            />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner">
          {sliders?.map((slider, index) => (
            <div key={index} className={slider.position === 1 ? "carousel-item active" : "carousel-item"}>
              <img src={getImageSlider(slider.image)} alt="Vietpro Academy" />
            </div>
          ))}
        </div>
        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
    </>
  );
};

export default Slider;
