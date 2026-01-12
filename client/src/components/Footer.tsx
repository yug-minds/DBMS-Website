import { Link } from "wouter";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-display font-bold text-lg">
                DB
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none">DAWN BUDS</span>
                <span className="text-xs text-white/70 font-medium tracking-widest uppercase">Model School</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering young minds with holistic education and values since 2000. 
              We strive for excellence in character and academics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Admissions", href: "/admissions" },
                { label: "Academics", href: "/academics" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Academics</h3>
            <ul className="space-y-3">
              <li className="text-white/70">Pre-Primary Wing</li>
              <li className="text-white/70">Primary Foundation</li>
              <li className="text-white/70">High School</li>
              <li className="text-white/70">State Board Curriculum</li>
              <li className="text-white/70">ICT-Enabled Learning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>123 School Lane, Shyamlal Buildings, Hyderabad, Telangana 500016</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@dawnbuds.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} Dawn Buds Model School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
