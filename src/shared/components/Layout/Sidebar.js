import { useEffect, useState } from "react";
import { getBanner } from "../../../services/Api";
import { getImageBanner } from "../../ultils";
const Sidebar = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanner({})
      .then(({ data }) => setBanners(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banners?.map((banner, index) => (
            <div key={index} className="banner-item">
              <a href="#">
                <img className="img-fluid" src={getImageBanner(banner.image)} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
