import Header from './components/header/header';
import URLInput from './components/url-input/url-input';
import URLList from './components/url-list/url-list';
import Footer from './components/footer/footer';
import ParticleBackground from './components/background/particle-background';
import { fetchUrlList } from './components/url-list/actions';
import { getUser } from './actions/session/getUser';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const urlList = await fetchUrlList();
  const user = await getUser();

  return (
    <main className="relative min-h-screen w-full isolate">
      {/* Background layer */}
      <ParticleBackground />
      {/* Foreground layer*/}
      <div className="relative z-10 flex flex-col min-h-screen items-center font-sans">
        <Header user={user} />
        <div className="divider"></div>
        <div className="mainContainer">
          <URLInput />
          <URLList urlList={urlList} />
        </div>
        <Footer user={user} />
      </div>
    </main>
  );
}
