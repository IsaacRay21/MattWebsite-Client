import './css/Contact.css';
import { Navbar } from "../components/navbar.jsx";
import { About } from "../components/about.jsx";

function Contact() {
  return (
    <div className='home'>
      <Navbar/>
      <div className="content"> 
        <About/>
      </div>
    </div>
  )
}

export default Contact;