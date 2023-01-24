import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useViewportScroll } from 'framer-motion';
import styled from 'styled-components';
import imageModule from './util/imageModule';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Home from './Routes/Home';
import NotFoundPage from './Routes/404';
import About from './Routes/About';
import Work from './Routes/Work';
import Detail from './Routes/Detail';
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
    
  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setIsIntro(false)
    }, 2500);

    return(() => {
      clearTimeout(introTimeout)
    })
  },[])

  // test
  useEffect(() => {
    console.log('isIntro', isIntro)
  }, [isIntro])

  const { scrollY, scrollYProgress } = useScroll();

  return (
    <MyApp>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      {
        openMenu ? <Menu setOpenMenu={setOpenMenu}/>
        : 
        <Routes>
          <Route path='/' element={<Home isIntro={isIntro}/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/work' element={<Work/>} />
          <Route path='/work/:id' element={<Detail/>} />
          <Route />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      }

      
    </MyApp>
  );
}

export default App;
