import React, { useState } from 'react';
import styled from 'styled-components';
import imageModule from './util/imageModule';
import Header from './components/Header';
import Menu from './components/Menu';
import Home from './routes/Home';
import NotFoundPage from './routes/404';
import About from './routes/About';
import Work from './routes/Work';
import Detail from './routes/Detail';
import Contact from './routes/Contact';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

const MyApp = styled.div`
  cursor: url(${imageModule.cursors.rabbitCursor}) 20 30, auto;
  &:active {
    cursor: url(${imageModule.cursors.rabbitCursorClicked}), auto;
  }
  //overflow: hidden;
  height: 100vh;
  position: relative;
`

function App() {
  const [ openMenu, setOpenMenu ] = useState(false);
  const [ isIntro, setIsIntro ] = useState(true);
    
  return (
    <MyApp>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} isIntro={isIntro}/>
      {
        openMenu ? <Menu setOpenMenu={setOpenMenu}/>
        : 
        <Routes>
          <Route path='/' element={<Home isIntro={isIntro} setIsIntro={setIsIntro}/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/work' element={<Work/>} />
          <Route path='/work/:id' element={<Detail/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      }      
      <Footer/>
    </MyApp>
  );
}

export default App;
