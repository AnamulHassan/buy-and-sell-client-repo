import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/Routes';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <section className="w-screen mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </section>
  );
}

export default App;
