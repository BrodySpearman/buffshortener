import Header from './components/header/header';
import URLInput from './components/url-input/url-input'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#222222] font-sans">
      <Header />

      <div className="body">
        <URLInput />
      </div>
    </div>
  );
}
