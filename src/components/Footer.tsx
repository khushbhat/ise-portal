import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  Information Science & Engineering Department
                  <br />
                  College Campus, City - 560001
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">+91 80 1234 5678</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">ise@college.edu</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/about" className="text-sm hover:text-secondary transition-colors">
                About Us
              </Link>
              <Link to="/faculty" className="text-sm hover:text-secondary transition-colors">
                Faculty
              </Link>
              <Link to="/research" className="text-sm hover:text-secondary transition-colors">
                Research
              </Link>
              <Link to="/events" className="text-sm hover:text-secondary transition-colors">
                Events
              </Link>
              <Link to="/achievements" className="text-sm hover:text-secondary transition-colors">
                Achievements
              </Link>
              <Link to="/contact" className="text-sm hover:text-secondary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ISE Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
