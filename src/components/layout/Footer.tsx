// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white">Qalbin Saliim</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Empowering underserved communities through clean water, food, education, vocational training, iftaar preparation, dhuhiya preparation, and sustainable development.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Social placeholders - add real links later */}
            <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/causes" className="hover:text-white transition">Our Causes</Link></li>
            <li><Link href="/impact" className="hover:text-white transition">Impact Reports</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog & News</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link href="/donate" className="hover:text-white transition">Donate</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Qalbin Saliim Charity Organisation. All rights reserved.</p>
        <p className="mt-1">Built with transparency, care, and purpose.</p>
        <p className="mt-1">By Sufiyan Technologies</p>
      </div>
    </footer>
  );
}