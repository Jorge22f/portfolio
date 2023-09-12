'use client';

import Nav from "@components/Nav";
import {AppProvider} from "@components/Provider";
import '@styles/globals.css';

const RootLayout = ({children}) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AppProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav/>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout;
