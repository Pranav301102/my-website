import './Index.css'
import { FaGithub,FaLinkedin,FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


export function Footer() {
    return (
      <>
        <div className='footer'>
        <div class="main">
          <div class="col1">
            <p class="heading">Contact Me</p>
            <ul>
              <li>
                Pranav Trivedi  
              </li>
              <li>
              <a href="https://www.linkedin.com/in/pranav-trivedi-699662233/" ><FaLinkedin/></a>
                <a href="https://www.instagram.com/pranav_trivedi_02/" ><FaInstagram/></a>
                <a href="https://github.com/Pranav301102" ><FaGithub/></a>
              </li>
            </ul>
          </div>
          <div class="col2">
            <p class="heading"></p>
            <ul>
              <li>
                
              </li>
            </ul>
          </div>
          <div class="col3">
            <p class="heading">My Email</p>
            <ul>
              <li>
                Pranavtrivedi02@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <p class="copyright">© 2020 IEEE Techithon. All rights reserved.</p>
        </div>
        </div>
      </>
    );
  }
  