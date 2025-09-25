'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { buildLocalePath } from '@/utils/localePaths';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { dictionary, t, locale } = useLocale();

  const sections = [
    {
      key: 'charades',
      title: dictionary.footer.sections.charades.title,
      links: dictionary.footer.sections.charades.links,
    },
    {
      key: 'info',
      title: dictionary.footer.sections.info.title,
      links: dictionary.footer.sections.info.links,
    },
    {
      key: 'legal',
      title: dictionary.footer.sections.legal.title,
      links: dictionary.footer.sections.legal.links,
    },
  ] as const;

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-800">{dictionary.footer.brandTitle}</span>
            </div>
            <p className="text-gray-600 text-sm">{dictionary.footer.brandDescription}</p>
            <div className="text-sm text-gray-500">{dictionary.footer.brandTagline}</div>
          </div>

          {sections.map(({ key, title, links }) => (
            <div key={key} className="space-y-4">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={buildLocalePath(locale, link.href)}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
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
          <h3 className="font-semibold text-gray-800">{dictionary.footer.sections.partnersTitle}</h3>
          <ul className="space-y-2 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-6">
            <li>
              <a href="https://magicbox.tools" target="_blank" rel="noopener noreferrer">
                <Image src="https://magicbox.tools/badge-dark.svg" alt="Featured on MagicBox.tools" width={200} height={54} />
              </a>
            </li>
            <li>
              <a href="https://imglab.dev/item/charades-generator-knot" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://imglab.dev/svg/badge.svg" alt="Listed on imglab" style={{ height: '54px', width: 'auto' }} />
              </a>
            </li>
            <li>
              <a href="https://fwfw.app/item/charades-generator" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://fwfw.app/badge-white.svg" width="250" height="54" alt="Featured on FWFW" />
              </a>
            </li>
            <li>
              <a href="https://acidtools.com" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://acidtools.com/assets/images/badge.png" alt="Acid Tools" height="54" />
              </a>
            </li>
            <li className="md:leading-none">
              <a href="https://kontext-ai.com/" target="_blank" rel="noopener noreferrer">
                Kontext AI
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">{t('footer.rights', { year: currentYear })}</div>
            <div className="text-sm text-gray-600">{dictionary.footer.slogan}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
