import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './locale/i18n'; 
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routerConfig} />
    </QueryClientProvider>
  </StrictMode>,
)

// Reload the page when the i18n file changes
if (import.meta.hot) {
  import.meta.hot.accept(["./locale/i18n"], () => {
    location.reload();
  });
}
