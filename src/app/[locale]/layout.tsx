import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <LocaleProvider initialLocale={locale}>
      <Navigation />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}