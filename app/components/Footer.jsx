import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo />
          <p className="text-xs sm:text-sm text-gray-600 font-light hidden md:block">© 2024 DPCON. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-light text-gray-600">
          <a href="#" className="hover:text-black transition-colors">Services</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Privacy</a>
          <a href="#" className="hover:text-black transition-colors">Terms</a>
          <a href="tel:9833133366" className="hover:text-black transition-colors">Call Us</a>
        </nav>
        <p className="text-xs sm:text-sm text-gray-600 font-light md:hidden">© 2024 DPCON</p>
      </div>
    </footer>
  );
}
