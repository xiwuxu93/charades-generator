import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { buildLocalePath } from "@/utils/localePaths";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

interface NavigationProps {
  locale: Locale;
  items: Dictionary["navigation"]["items"];
}

export default function Navigation({ locale, items }: NavigationProps) {
  const homeHref = buildLocalePath(locale, "/");

  return (
    <nav className="critical-nav">
      <div className="critical-container">
        <div className="critical-flex">
          <Link href={homeHref} className="flex items-center space-x-2" aria-label="Charades Generator homepage">
            <Image
              src="/logo.svg"
              alt="Charades Generator"
              width={320}
              height={64}
              className="critical-logo"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={buildLocalePath(locale, item.href)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          <MobileNavigation locale={locale} items={items} />
        </div>
      </div>
    </nav>
  );
}
