// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Causes', href: '/causes' },
    { name: 'Impact', href: '/impact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo and Brand Section */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo Image - No background */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Qalbin Saliim" 
                  fill 
                  className="object-contain" 
                />
                {/* Fallback icon - Lime green */}
                <span className="text-lime-500 font-bold text-xl md:text-2xl"></span>
              </div>
              
              {/* Brand Name and Tagline */}
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-lime-600 to-lime-500 bg-clip-text text-transparent group-hover:from-lime-500 group-hover:to-lime-400 transition-all duration-300 tracking-tight leading-tight">
                  Qalbin Saliim
                </span>
                <span className="text-xs md:text-sm text-orange-500 group-hover:text-orange-600 transition-all duration-300 tracking-wide">
                  Loving and Caring Heart
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 font-medium text-sm rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-lime-600 bg-lime-50'
                      : 'text-gray-600 hover:text-lime-600 hover:bg-gray-50/80'
                  }`}
                >
                  {link.name}
                  {/* Active indicator underline */}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-lime-500 rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Donate Button */}
              <Link
                href="/donate"
                className="ml-4 bg-gradient-to-r from-lime-500 to-lime-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:shadow-md hover:scale-105 transition-all duration-300 active:scale-95"
              >
                Donate Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-lime-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay - Fixed position that covers content */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel - Fixed position below header */}
          <div className="md:hidden fixed top-20 left-0 right-0 bg-white shadow-2xl z-40 max-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-lime-50 text-lime-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-lime-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Donate Button */}
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-gradient-to-r from-lime-500 to-lime-600 text-white px-5 py-3 rounded-xl font-medium text-center hover:shadow-md transition-all duration-300"
              >
                Donate Now
              </Link>
            </nav>
          </div>
        </>
      )}
      
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-20 md:h-24" />
    </>
  )
}