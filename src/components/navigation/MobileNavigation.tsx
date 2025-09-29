"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { buildLocalePath } from "@/utils/localePaths";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

interface MobileNavigationProps {
  locale: Locale;
  items: Dictionary["navigation"]["items"];
}

export default function MobileNavigation({ locale, items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((previous) => !previous);
  const closeMenu = () => setIsOpen(false);

  // 点击外部关闭菜单
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#mobile-navigation') && !target.closest('[aria-controls="mobile-navigation"]')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="md:hidden relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] space-y-2 rounded-lg border border-gray-200 bg-white p-3 shadow-xl z-[200]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={buildLocalePath(locale, item.href)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              onClick={closeMenu}
            >
              <div>{item.title}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </Link>
          ))}
          <div className="rounded-md border-t border-gray-200 px-3 pt-3">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
