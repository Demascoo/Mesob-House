import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <h3 className="site-footer__brand">Mesob House</h3>
          <p className="site-footer__text">
            Sharing traditions from the Ethiopian highlands — one Gursha at a
            time.
          </p>
          <div className="site-footer__badge">
            ☕ Traditional Coffee Ceremony daily at 4:00 PM
          </div>
        </div>

        <div>
          <h4 className="site-footer__heading">Hospitality Hours</h4>
          <p className="site-footer__text">
            Tuesday – Sunday: 11:30 AM – 11:00 PM
          </p>
          <p className="site-footer__text">
            Monday: Reserved for Private Banquets
          </p>
          <p className="site-footer__accent">
            Jebena Buna &amp; Fresh Roasting All Evening
          </p>
        </div>

        <div>
          <h4 className="site-footer__heading">
            Guest Account &amp; Traditions
          </h4>
          <Link to="/login" className="site-footer__link">
            Sign In to Mesob 
          </Link>
          <Link to="/register" className="site-footer__link">
            Create Member Profile
          </Link>
          <Link
            to="/menu?cat=Fasting%20%26%20Vegan%20%2F%20Tsom"
            className="site-footer__link"
          >
            Vegan Fasting (Beyaynetu / Tsom)
          </Link>
          <Link to="/menu/house-tej-carafe" className="site-footer__link">
            House Tej (Pure Honey Wine)
          </Link>
        </div>

        <div>
          <h4 className="site-footer__heading"> Location</h4>
          <p className="site-footer__text">
            Bole Medanialem, Addis Ababa &amp; express delivery across town.
          </p>
          <a href="tel:+251911234567" className="site-footer__phone">
            +251 911 234 567
          </a>
          <div className="site-footer__socials">
            <span>🍴</span>
            <span>☕</span>
            <span>🔗</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>
          © {new Date().getFullYear()} Mesob House Habesha Dining. Authentic
          Ethiopian Food
        </span>
        <span className="site-footer__legal">
          <a href="#">Gursha Hospitality</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Table</a>
        </span>
      </div>
    </footer>
  );
}
