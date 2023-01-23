import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import imageModule from '../util/imageModule';
import FlyingKeycaps from '../Components/FlyingKeycaps';

const Container = styled(motion.div)`
  height: 100vh;
  overflow: hidden;
`
const Keyboard = styled(motion.div)`
    width: 80%;
    position: fixed;
    top: calc(100%/3);
    left: calc(100%/10);
    z-index: 99;
`
const FlexDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
    position: relative;
    top: calc(100vh/4);
    text-align: center;
    top: 25vh;
`
const TitleBox = styled(motion.div)`
  overflow: 'hidden';
  color: rgb(248, 251, 165);
  height: 170px;
  font-size: 150px;
  font-family: 'Lilita One', cursive;
  -webkit-text-stroke: 1px #000;
  height: 170px;
`
const containerVariants = {
  start: {
    boxShadow: '0px 0px 0px 25px rgb(133, 117, 237) inset',
    background: 'rgb(242, 158, 192)'
  },
  end: {
    boxShadow: '0px 0px 0px 0px rgb(252, 232, 165) inset',
    background: 'rgb(255, 202, 212)',
    transition: {
      duration: 1.5,
      delay: .5,
    }
  }
}
const titleVariants = {
  start: {
    y: 100,
    rotate: -20,
    opacity: 0,
  },
  end : (custom :number[]) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    //scale: custom[1],
    transition: {
      duration: .5,
      delay: custom[0],
    }
  })
}
  
const titleEndVariants = {
  end: (custom :number[]) => ({
    scale: custom[1],
    y: -50,
    color: custom[1] < 1 ? 'rgb(196, 189, 243)' : 'rgb(248, 251, 165)',
    transition: {
      duration: 1,
      type: 'spring',
    }
  })
}

function Home(props: {isIntro:boolean}) {
  const [ anyDone, setAnyDone ] = useState(false);

  const keyboardVariants = {
      start: {
        y: 0,
        x: 0,
      },
      end : {
        y: '100%',
        x: '-100%',
        transition: {
          duration: 2,
          bounce: .6,
          delay: .5,
        }
      }
  }

  const onAnimationComplete = () => {
      setAnyDone(true)
  }

  return (
      <Container variants={containerVariants} initial="start" animate="end">
          {
              props.isIntro && (
                  <Keyboard variants={keyboardVariants}>
                    <img src={imageModule.images.keyboardIntro} alt="" style={{width: '80%'}}/>
                  </Keyboard>
              )
          }
          <FlyingKeycaps isIntro={props.isIntro} />
          <Wrapper>
              <FlexDiv>
                  <TitleBox custom={props.isIntro ? [2, .8] : [0, .8]} variants={anyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                  Wellcome
                  </TitleBox>
                  <TitleBox custom={props.isIntro ? [2.2, .8] : [.2, .8]} variants={anyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                  To
                  </TitleBox>
              </FlexDiv>
              <TitleBox custom={props.isIntro ? [2.4, 1.5] : [.4, 1.5]} variants={anyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                  ha0peno's
              </TitleBox>
              <TitleBox custom={props.isIntro ? [2.6, 1.5] : [.6, 1.5]} variants={anyDone ? titleEndVariants :titleVariants} initial="start" animate="end" onAnimationComplete={onAnimationComplete}>
                  page
              </TitleBox>
          </Wrapper>
      </Container>
  )
}

export default Home;