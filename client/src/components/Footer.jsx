import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 mt-5 w-100">
      <div className="container">
        {/* Top section */}
        <div className="row border-bottom border-secondary pb-4 mb-4">
          {/* Left: Logo and description */}
          <div className="col-md-4 mb-4 mb-md-0">
            <img src={assets.logo} alt="logo" className="img-fluid mb-3" />
            <p className="small">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex gap-2 mt-3">
              <img src={assets.googlePlay} alt="google play" className="img-fluid" style={{ height: '36px' }} />
              <img src={assets.appStore} alt="app store" className="img-fluid" style={{ height: '36px' }} />
            </div>
          </div>

          {/* Right: Company and Contact */}
          <div className="col-md-8 d-flex justify-content-md-end gap-4 flex-wrap">
            {/* Company */}
            <div className="mb-3">
              <h5 className="fw-semibold mb-3">Company</h5>
              <ul className="list-unstyled small mb-0">
                <li><a href="#" className="text-light text-decoration-none">Home</a></li>
                <li><a href="#" className="text-light text-decoration-none">About us</a></li>
                <li><a href="#" className="text-light text-decoration-none">Contact us</a></li>
                <li><a href="#" className="text-light text-decoration-none">Privacy policy</a></li>
              </ul>
            </div>

            {/* Get in touch */}
            <div className="mb-3">
              <h5 className="fw-semibold mb-3">Get in touch</h5>
              <div className="small">
                <p className="mb-1">+1-234-567-890</p>
                <p className="mb-0">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <p className="text-center small pb-3 mb-0">
          Copyright {new Date().getFullYear()} © <a href="https://prebuiltui.com" className="text-light text-decoration-none">PrebuiltUI</a>. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
