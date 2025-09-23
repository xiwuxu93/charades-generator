"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const navigationItems = [
  {
    title: "Free Generator",
    href: "/",
    description: "Main charades generator",
  },
  {
    title: "Kids Charades",
    href: "/charades-generator-for-kids",
    description: "Child-friendly words",
  },
  {
    title: "Movie Charades",
    href: "/movie-charades-generator",
    description: "Films & cinema",
  },
  {
    title: "Disney Charades",
    href: "/disney-charades-generator",
    description: "Disney characters",
  },
  {
    title: "Christmas Charades",
    href: "/christmas-charades-generator",
    description: "Holiday themed words",
  },
  {
    title: "How to Use",
    href: "/how-to-use",
    description: "Complete guide & rules",
  },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="critical-nav">
      <div className="critical-container">
        <div className="critical-flex">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Charades Generator"
              width={320}
              height={64}
              className="critical-logo"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div>{item.title}</div>
                  <div className="text-xs text-gray-400">
                    {item.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
