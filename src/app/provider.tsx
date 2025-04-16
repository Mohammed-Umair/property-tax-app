// app/provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import React, { useState } from "react";
import { store, persistor } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 70 * 1000,
            gcTime: 30 * 60 * 1000,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}


// // app/provider.tsx
// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
// import React, { useState } from "react";
// import { store } from "@/redux/store";

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 5 * 70 * 1000,
//             gcTime: 30 * 60 * 1000,
//           },
//         },
//       })
//   );

//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </Provider>
//   );
// }
