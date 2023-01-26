import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import imageModule from '../util/imageModule';
import FlyingKeycaps from '../Components/FlyingKeycaps';
import Spline from '@splinetool/react-spline';
import { SplineEvent } from '@splinetool/react-spline';

const Container = styled(motion.div)`
  height: 100vh;
  overflow: hidden;
`
const Control = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 18vh;
  font-size: 20px;
`
const Information = styled(Control)`
  bottom: auto;
  top: 10vh;
`
const ControlGrid = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  text-align: center;
  column-gap: 20px;
  background-color: rgba(255, 255, 255, .5);
  padding: 20px;
  border-radius: 20px;
`
const ControlText = styled(motion.div)<{size:number, color:string}>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
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
      //delay: .5,
    }
  }
}
const introVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    background: 'rgb(242, 158, 192)',
    boxShadow: '0px 0px 0px 25px rgb(133, 117, 237) inset',
    transition: {
      duration: 1
    }
  }
}
const informationVariants = {
  animate: {
    scale: [1, 1.5, 1],
    transition: {
      duration: 3,
      times: [0, 0.2, 0.5],
      repeat: Infinity
    }
  }
}
export const upDownVariants = {
  start: {
    y: 15
  },
  end: (custom?: number) => ({
    y: [10, 0, 10],
    transition: {
      delay: custom ? custom * 0.2 : 0.2,
      duration: 1,
      times: [0, 0.2, 0.5],
      repeat: Infinity,
    }
  })
};
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
const keyboardVariants = {
  start: {
    y: 0,
    x: 0,
  },
  end : {
    y: '100%',
    x: '-100%',
    transition: {
      duration: 1.5,
      bounce: .6,
    }
  }
}

function Home(props:{isIntro:boolean, setIsIntro:(intro:boolean)=>void}) {
  // const Spline = React.lazy(() => import('@splinetool/react-spline'));
  const [ enter, setEenter ] = useState(false);
  const [ textAnyDone, setTextAnyDone ] = useState(false);
  const [ infoText, setInfoText ] = useState('Press any key.');

  useEffect(() => {
    if(enter) {
      const introTimeout = setTimeout(() => {
        props.setIsIntro(false)
      }, 1000);  
      
      return(() => {
        clearTimeout(introTimeout)
      })
    } else {
      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  },[enter])

  const onAnimationComplete = () => {
    setTextAnyDone(true);
  }

  const onKeyDown = (e:KeyboardEvent) => {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
    if(check.test(e.key)) {
      setInfoText('Only English key!');
    } else {
      setInfoText('Press any key.');
    }
  }

  const onKeyUp = (e: SplineEvent) => {
    e.target.name === 'enter' && setEenter(true);
  }

  return (
      <Container variants={ props.isIntro ? introVariants  :  containerVariants } initial="start" animate="end">
          {
              props.isIntro && !enter ? (
                // <Suspense fallback={<CenterDiv><TitleBox>loading...</TitleBox></CenterDiv>}>
                <>
                  <Information variants={informationVariants} animate='animate'>
                    <TitleBox>{infoText}</TitleBox>
                  </Information>
                  <Control>
                    <ControlGrid>
                      <ControlText size={20} color='#c94245' variants={upDownVariants} custom={0} initial='start' animate='end'>🖱️⟳</ControlText> 
                      <ControlText size={20} color='#c94245' variants={upDownVariants} custom={1} initial='start' animate='end'>⌨️</ControlText> 
                      <ControlText size={20} color='#c94245' variants={upDownVariants} custom={2} initial='start' animate='end'>⬅︎ enter</ControlText>
                      <ControlText size={16} color='#666363' variants={upDownVariants} custom={0} initial='start' animate='end'>rotate</ControlText>
                      <ControlText size={16} color='#666363' variants={upDownVariants} custom={1} initial='start' animate='end'>(en)key down</ControlText>
                      <ControlText size={16} color='#666363' variants={upDownVariants} custom={2} initial='start' animate='end'>home</ControlText>
                    </ControlGrid>
                  </Control>
                  <Spline scene="https://prod.spline.design/IDif4eUTn3x-L0Ir/scene.splinecode"
                    onKeyUp={(e) => onKeyUp(e)}/>
                </>
                // </Suspense>
              )
              :
              props.isIntro && enter ? 
                <Keyboard variants={keyboardVariants}>
                  <img src={imageModule.images.keyboardIntro} alt="keyboard" style={{width: '80%'}}/>
                </Keyboard>
              :
              <>
                <FlyingKeycaps isIntro={props.isIntro} />
                <Wrapper>
                    <FlexDiv>
                        <TitleBox custom={[0, .8]} variants={textAnyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                        Wellcome
                        </TitleBox>
                        <TitleBox custom={[.2, .8]} variants={textAnyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                        To
                        </TitleBox>
                    </FlexDiv>
                    <TitleBox custom={[.4, 1.5]} variants={textAnyDone ? titleEndVariants :titleVariants} initial="start" animate="end">
                        ha0peno's
                    </TitleBox>
                    <TitleBox custom={[.6, 1.5]} variants={textAnyDone ? titleEndVariants :titleVariants} initial="start" animate="end" onAnimationComplete={onAnimationComplete}>
                        page
                    </TitleBox>
                </Wrapper>
                </>
          }
          
      </Container>
  )
}

export default Home;