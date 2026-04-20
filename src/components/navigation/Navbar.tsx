
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link-active' : '';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-2 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="bg-white/40 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/jeetasia-uploads/7e6f9b24-6c98-48a1-8e02-ff9bc51058f9.png" 
                alt="JEET Asia" 
                className="h-10 md:h-14"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 px-6 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link font-medium text-sm lg:text-base tracking-wide ${isActive(link.path)}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link to="/contact">
              <Button className="btn-primary">
                Get in Touch
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-white/40 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-jeet-gray-dark hover:text-jeet-blue transition-all"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl py-8 shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto px-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl font-semibold py-2 transition-colors ${location.pathname === link.path ? 'text-jeet-blue translate-x-2' : 'text-gray-700'} hover:text-jeet-blue hover:translate-x-2 transition-transform duration-300`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="btn-primary w-full py-6 text-lg">Get in Touch</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>

  );
};

export default Navbar;
