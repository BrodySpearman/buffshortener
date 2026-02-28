import Header from './components/header/header';
import URLInput from './components/url-input/url-input'
import URLList from './components/url-list/url-list'
import Footer from './components/footer/footer'

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#222222] font-sans">
      <Header />
      <div className="divider"></div>
      <div className="mainContainer">
        <URLInput />
        <URLList />
      </div>
      <Footer />
    </div>
  );
}
