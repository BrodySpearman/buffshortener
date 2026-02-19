import Header from './components/header/header';
import URLInput from './components/url-input/url-input'
import URLList from './components/url-list/url-list'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#222222] font-sans">
      <Header />
      <div className="body">
        <URLInput />
        <URLList />
      </div>
    </div>
  );
}
