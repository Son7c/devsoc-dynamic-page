import { useState } from 'react'
import NewsSection from './components/NewsSection'
import NewsListing from './components/NewsListing'
import NewsDetails from './components/NewsDetails'
import ErrorPage from './components/ErrorPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsSection />} />
        <Route path="/news-list" element={<NewsListing />} />
        <Route path="/news-details/:slug" element={<NewsDetails />} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
