import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'
import { routes } from './routes/index.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Toaster } from 'sonner';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>

      <QueryClientProvider client={queryClient}>
        <Toaster/>
        <RouterProvider router={routes} />
      </QueryClientProvider>
      
    </AuthProvider>


  </StrictMode>,
)
