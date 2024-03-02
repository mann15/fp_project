import React from "react";
import { Link } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { TiLocation } from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className=" jost">
    
      <div className="container">
      <div className="  flex-container">
        <div className="title ">SWIFTCART</div>
        <div className=' ico-contain '>
        <span className='icons'>
                <a
                  href="https://instagram.com/msu_paramarsh?igshid=MmJiY2I4NDBkZg=="
                  target="_blank"
                  rel="noopener noreferrer"
                > <AiOutlineInstagram
                color="grey"
                size={24}
                className="ico "
              /></a></span>
              <span  className='icons'><a
                  href="https://twitter.com/MSU_Paramarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter color="grey" size={24} className="ico" />

                </a></span>
                <span  className='icons'><a
                  href="https://youtube.com/@msu_paramarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsYoutube color="grey" size={24} className="ico " />
                </a></span>
                <span  className='icons'> <a
                  href="https://www.linkedin.com/company/paramarsh-ideas-infinite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn color="grey" size={24} className="ico " />
                </a></span>
                <span  className='icons'><a
                  href="https://m.facebook.com/ParamarshSangli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF color="grey" size={24} className="ico " />
                </a></span> 
        </div>
      </div>
        <div className=" fc ">
          <h3 className="text-slate-400 py-2 text-lg ">ONLINE</h3>
          <div className="link-container">
          <Link to="/">Men</Link>
          <Link to="/">Women</Link>
          <Link to="/">Kids</Link>
          <Link to="/">Home &amp; Living</Link>
          <Link to="/">Beauty</Link>
          </div>
         
        </div>
        <div className="fc">
          <h3 >ABOUT</h3>
          <div className="link-container">
          <Link to="/">Contact us</Link>
          <Link to="/">About us</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Press</Link>
          <Link to="/">Corporate Information</Link>
          </div>
        </div>
        <div className="fc">
          <h3 className="">HELP</h3>
          <div className="link-container">
          <Link to="/">Payment</Link>
          <Link to="/">Shipping</Link>
          <Link to="/">Cancellation & Returns</Link>
          <Link to="/">FAQs</Link>
          <Link to="/">Report Infringment</Link>
        </div>
        </div>
        <div className="fc">
          <h3 className="">CONSUMER POLICY</h3>
          <div className="link-container">
          <Link to="/">Terms Of Use</Link>
          <Link to="/">Security</Link>
          <Link to="/">Cancellation & Returns</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Sitemap</Link>
          </div>
        </div>
        
      </div>
    
      <div className="full-width-text ">
        © 2023 www.myntra.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
