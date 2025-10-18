import { useState } from 'react'
import React from 'react'
import { Header } from './components/Header.jsx'
import { Subreddits } from './components/Subreddits.jsx'
import { PopularCard} from './components/PopularCard.jsx'
import { Footer } from './components/Footer.jsx'


function App() {
  return (
    <div>
      <Header />
      <Subreddits />
      <PopularCard />
      <Footer />
    </div>
  )
};
export default App;
