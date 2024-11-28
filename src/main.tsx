import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MoviesList from './pages/home.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import MovieDetail from './pages/details.tsx'
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const links = () => [
//   { rel: "preconnect", href: "https://fonts.googleapis.com" },
//   {
//     rel: "preconnect",
//     href: "https://fonts.gstatic.com",
//     crossOrigin: "anonymous",
//   },
//   {
//     rel: "stylesheet",
//     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
//   },
//   // { rel: "stylesheet", href: stylesheet },
// ];

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
