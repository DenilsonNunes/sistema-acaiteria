import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'
import { routes } from './App.tsx'
import PedidoProvider from './contexts/PedidoContext.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <PedidoProvider>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>

    </PedidoProvider>

  </StrictMode>,
)
