import ThemeRegistry from './components/providers/theme-registry';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>
          <Header />
            {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}