'use client';

import {useState} from 'react';

import Nav from "@components/Nav";
import {Provider} from "@components/Provider";
import '@styles/globals.css';
import {Filecontext} from '@utils/filecontext';

const RootLayout = ({children}) => {
  const [user, setUser] = useState({name: '', email: '', username: ''});

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Provider>
          <Filecontext.Provider value={{user, setUser}}>
            <div className="main">
              <div className="gradient"></div>
            </div>

            <main className="app">
              <Nav/>
              {children}
            </main>
          </Filecontext.Provider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
