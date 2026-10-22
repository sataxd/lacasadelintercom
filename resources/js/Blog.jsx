import React, { useState } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import Filter from './Components/Blog/Filter';
import Results from './Components/Blog/Results';
import { CarritoProvider } from './context/CarritoContext';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';

function Blog({ categories, initialPosts = [], showSlogan = true }) {

  const [filter, setFilter] = useState({
    category: null,
    search: null,
    sortOrder: 'asc',
  })

  return <>
    <Header
      showSlogan={showSlogan}
    >
    </Header>

    <Filter categories={categories} filter={filter} setFilter={setFilter} />

    <Results filter={filter} initialResults={initialPosts} />

    <Footer />
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <CarritoProvider>
      <Base {...properties}>
        <Blog {...properties} />
      </Base>
    </CarritoProvider>
  );
})