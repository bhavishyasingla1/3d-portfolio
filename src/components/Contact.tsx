import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:say@hibhavishya.in"
                data-cursor="disable"
              >
                say@hibhavishya.in
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech Computer Engineering, Thapar Institute — 2023–2027
              <br />
              AI, digital systems, entrepreneurship
            </p>
            <h4>Certifications</h4>
            <p>
              <a
                href="https://www.credly.com/badges/381dff2f-21a8-4c91-9693-c23bc5dd9ac5/linked_in_profile"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                McKinsey Forward
              </a>
              {" · "}
              <a
                href="https://www.credly.com/badges/d79774ee-9198-43f8-b8f3-9ac126f9405a/public_url"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                GitHub Foundations
              </a>
              {" · "}
              <a
                href="https://www.linkedin.com/learning/certificates/364ccf881067cb97c1379b381eef4cd654623f48ccb40b6bbc9b5c3b1e1c210a"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Microsoft Generative AI
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/bhavishyasingla1/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/bhavishyasingla1/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.youtube.com/@bhavishyasingla1"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              YouTube <MdArrowOutward />
            </a>
            <a
              href="https://instagram.com/bhavishyasingla1"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/newsletters/7353859555715436544/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Newsletter <MdArrowOutward />
            </a>
            <a
              href="https://www.youtube.com/@bhavishyasingla1/podcasts"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Podcast <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h4>Leadership</h4>
            <a
              href="https://mvp.microsoft.com/en-US/studentambassadors/profile/cf3ff340-d6ae-432c-a26c-e382359c71f6"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Microsoft Student Ambassador (Gold) <MdArrowOutward />
            </a>
            <a
              href="https://sites.google.com/view/iic-tiet/home"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Innovation Ambassador — IIC TIET <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/company/ctd-tiet/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Senior Coordinator — CTD TIET <MdArrowOutward />
            </a>
            <h5 className="contact-credit">
              <MdCopyright /> 2026{" "}
              <a
                href="https://www.linkedin.com/in/bhavishyasingla1/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Bhavishya Singla
              </a>
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
