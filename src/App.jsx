import { useState } from 'react'
import NewsSection from './components/NewsSection'
import NewsListing from './components/NewsListing'
import NewsDetails from './components/NewsDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsSection />} />
        <Route path="/news-list" element={<NewsListing />} />
        <Route path="/news-details/:id" element={<NewsDetails />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
