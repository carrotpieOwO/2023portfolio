import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import works from '../util/works';
import { cursors } from '../util/imageModule';
import { WorkType } from '../util/works';
import { upDownVariants } from './Home';

const Container = styled(motion.div)`
    width: 100vw;
    font-family: 'ChosunGu', sans-serif;
    min-height: 500vh;
`
const Scroll = styled(motion.div)`
    position: fixed;
    bottom: 7vh;
    display: flex;
    width: 100%;
    justify-content: center;
    color: #ff9354;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
`
const CardWrap = styled(motion.div)`
    position: fixed;
    display: flex;
    top: 32vh;
`
const Card = styled(motion.div)<{background?: string}>`
    width: 70vw;
    border-radius: 25%/50%;
    height: 50vh;
    background-image: url(${props => props.background});
    background-size: cover;
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    text-align: center;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
   
    &:hover {
        cursor: url(${cursors.pointerCursor}), auto;
    }
`
const Title = styled(motion.div)<{color?: string}>`
    font-family:  'Black Han Sans', sans-serif;
    font-size: 150px;
    color: rgb(244, 237, 51);
`
const MainTitle = styled(Title)`
    color: #ff9354;
    font-size: 220px;
    top: 10vh;
    display: flex;
    justify-content: center;
    width: 100%;
    position: fixed;
`
const OpenCard = styled(Card)<{color?: string}>`
    width: 90vw;
    height: 90vh;
    border-radius: 10vw;
    top: 5vh;
    left: 5vw;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:  'Black Han Sans', sans-serif;
    font-size: 200px;
    color: ${props => props.color};
    z-index: 9;
`
const containerVariants = {
    start: {
        background: 'rgb(97, 96, 154)',
        boxShadow: '0px 0px 0px 20px rgb(235, 84, 145) inset',
    },
    end: {
        background: 'rgb(97, 96, 154)',
        boxShadow: '0px 0px 0px 0px rgb(235, 84, 145) inset',
        transition: {
            duration: 1,
        }
    }
}

function Work() {
    const [ layoutId, setLayoutId ] = useState<null | string>(null);
    const [ content, setContent ] = useState<null | WorkType>(null);
    const { scrollYProgress } = useScroll();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const goDetail = setTimeout(() => {
            let selected = works.find( work => work.projectId === layoutId)
            if(layoutId) navigate(`/work/${selected?.projectId}`)
        }, 1500);

        return () => {
            clearTimeout(goDetail);
        }
    }, [layoutId])

    const maxWidth = - window.innerWidth * .7 * (works.length-1)
    
    const x = useTransform(scrollYProgress, [0, 1], [0, maxWidth])
    const springX = useSpring(x, {
        stiffness: 100,
        damping: 30,
    })

    const onClick = (content:WorkType) => {
        setLayoutId(content.projectId);
        setContent(content);
    }
    
    return (
        <Container variants={containerVariants} initial='start' animate='end'>
            <MainTitle>Works</MainTitle>
            <CardWrap style={{left: springX}}>
            {
                works.map(( item, i ) => 
                    <Card key={item.projectId} layoutId={item.projectId} 
                        whileTap={{ scale: 0.9 }}
                        background={item.mainImg}
                        onClick={() => onClick(item)}
                        >
                    <Title whileHover={{ color: item.color}}>{item.projectNm}</Title>
                    </Card> 
                )
            }
            </CardWrap>                
            <AnimatePresence>
                {
                    layoutId ? 
                    <OpenCard layoutId={layoutId} background={content?.mainImg} color={content?.color}>
                        {
                            works.map(item => item.projectId === layoutId && item.projectNm)
                        }
                    </OpenCard> : null
                }
            </AnimatePresence>
            <Scroll variants={upDownVariants} initial='start' animate='end'>
                ⬇︎
            </Scroll>
        </Container>
    )
    
}
export default Work;