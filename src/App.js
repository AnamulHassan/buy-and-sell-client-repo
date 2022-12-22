import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/Routes';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import LoaderPrimary from '../src/components/LoaderPrimary/LoaderPrimary';

function App() {
  const [siteLoading, setSiteLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setSiteLoading(false), 1000);
  }, []);

  if (siteLoading) {
    return (
      <div className="w-screen h-screen bg-white flex items-center justify-center">
        <LoaderPrimary></LoaderPrimary>
      </div>
    );
  }
  return (
    <section className="w-screen mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </section>
  );
}

export default App;
