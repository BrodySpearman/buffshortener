import Header from './components/header/header';
import URLInput from './components/url-input/url-input';
import URLList from './components/url-list/url-list';
import Footer from './components/footer/footer';
import ParticleBackground from './components/background/particle-background';
import { fetchUrlList } from './components/url-list/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const urlList = await fetchUrlList();

  return (
    <main className="relative min-h-screen w-full isolate">
      {/* Background layer */}
      <ParticleBackground />
      {/* Foreground layer*/}
      <div className="relative z-10 flex flex-col min-h-screen items-center font-sans">
        <Header />
        <div className="divider"></div>
        <div className="mainContainer">
          <URLInput />
          <URLList urlList={urlList} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
