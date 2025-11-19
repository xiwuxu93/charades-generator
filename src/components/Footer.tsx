import Link from "next/link";
import Image from "next/image";
import { buildLocalePath } from "@/utils/localePaths";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

interface FooterProps {
  locale: Locale;
  footer: Dictionary["footer"];
}

function interpolate(template: string, replacements: Record<string, string | number>) {
  return template.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
    const value = replacements[key.trim()];
    return value === undefined ? "" : String(value);
  });
}

export default function Footer({ locale, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const sections = [
    {
      key: "charades",
      title: footer.sections.charades.title,
      links: footer.sections.charades.links,
    },
    {
      key: "info",
      title: footer.sections.info.title,
      links: footer.sections.info.links,
    },
    {
      key: "legal",
      title: footer.sections.legal.title,
      links: footer.sections.legal.links,
    },
  ] as const;

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-800">{footer.brandTitle}</span>
            </div>
            <p className="text-sm text-gray-600">{footer.brandDescription}</p>
            <div className="text-sm text-gray-500">{footer.brandTagline}</div>
          </div>

          {sections.map(({ key, title, links }) => (
            <div key={key} className="space-y-4">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={buildLocalePath(locale, link.href)}
                      className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-gray-800">{footer.sections.partnersTitle}</h3>
          <ul className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <li>
              <a href="https://magicbox.tools" target="_blank" rel="noopener noreferrer">
                <Image src="https://magicbox.tools/badge-dark.svg" alt="Featured on MagicBox.tools" width={200} height={54} />
              </a>
            </li>
            <li>
              <a href="https://imglab.dev/item/charades-generator-knot" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://imglab.dev/svg/badge.svg"
                  alt="Listed on imglab"
                  width={125}
                  height={60}
                />
              </a>
            </li>
            <li>
              <a href="https://fwfw.app/item/charades-generator" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://fwfw.app/badge-white.svg"
                  alt="Featured on FWFW"
                  width={250}
                  height={54}
                />
              </a>
            </li>
            <li>
              <a href="https://acidtools.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://acidtools.com/assets/images/badge.png"
                  alt="Acid Tools badge"
                  width={159}
                  height={54}
                />
              </a>
            </li>
            <li className="leading-none">
              <a href="https://kontext-ai.com/" target="_blank" rel="noopener noreferrer">
                Kontext AI
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row md:gap-0">
            <div>{interpolate(footer.rights, { year: currentYear })}</div>
            <div className="text-center md:text-right space-y-1">
              <div>{footer.slogan}</div>
              <div className="text-xs text-gray-500">
                As an Amazon Associate we may earn from qualifying purchases made through product links on this site.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
