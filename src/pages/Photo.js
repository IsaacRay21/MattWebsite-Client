import './css/Photo.css';
import { Carousel } from "../components/carousel.jsx";
import { Navbar } from "../components/navbar.jsx";
import { Spotlight} from "../components/spotlight.jsx";
import { Gallery } from "../components/gallery.jsx";


function Photo() {
  return (
    <div className='photo'>
      <Navbar/>
      <div className="content"> 
        <Spotlight type="storycarousel"/>
        <Gallery/>
      </div>
    </div>

  );
}

export default Photo;