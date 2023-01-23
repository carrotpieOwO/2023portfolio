import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled(motion.div)`
    width: 100vw;
    font-family: 'ChosunGu', sans-serif;
    min-height: 500vh;
`
const CardWrap = styled(motion.div)`
    position: fixed;
    display: flex;
    top: 25vh;
`
const Card = styled(motion.div)`
    width: 70vw;
    border-radius: 25%/50%;
    height: 50vh;
    background: rgba(255, 255, 255, .9);
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    text-align: center;
    font-size: 30px;
    margin: 0 20px;
`
const OpenCard = styled(Card)`
    width: 90vw;
    height: 90vh;
    border-radius: 10vw;
    top: 5vh;
    left: 5vw;
    position: fixed;
`
const containerVariants = {
    start: {
        background: 'rgb(172, 79, 152)',
        boxShadow: '0px 0px 0px 20px rgb(235, 84, 145) inset',
    },
    end: {
        background: 'rgb(172, 79, 152)',
        boxShadow: '0px 0px 0px 0px rgb(235, 84, 145) inset',
        transition: {
            duration: 1,
        }
    }
}

const slides = [
    { id: '0', content: "test1"},
    { id: '1', content: "test2"},
    { id: '2', content: "test3"},
    { id: '3', content: "test4"},
    { id: '4', content: "test5"},
    { id: '5', content: "test6"},
    { id: '6', content: "test7"}
];


function Work() {
    const [layoutId, setLayoutId] = useState<null | string>(null);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        scrollYProgress.onChange(() =>{
            console.log(scrollYProgress.get())
        })
    })

    useEffect(() => {
        const goDetail = setTimeout(() => {
            let selected = slides.find(silde => silde.id === layoutId)
            if(layoutId) alert(selected?.content)
        }, 1000);

        return () => {
            clearTimeout(goDetail);
        }
    }, [layoutId])

    const maxWidth = - window.innerWidth * .7 * (slides.length-1)
    
    const x = useTransform(scrollYProgress, [0, 1], [0, maxWidth])
    const springX = useSpring(x, {
        stiffness: 100,
        damping: 30,
    })

    const onClick = (id:string) => {
        setLayoutId(id);
    }
    
    return (
        <Container variants={containerVariants} initial='start' animate='end'>
            <CardWrap style={{left: springX}}>
            {
                slides.map((item,i) => 
                    <Card key={item.id} layoutId={item.id} whileTap={{ scale: 0.9 }}
                        
                        onClick={() => onClick(item.id)}
                        >{item.content}
                    </Card> 
                )
            }
            </CardWrap>                
            <AnimatePresence>
                {
                    layoutId ? 
                    <OpenCard layoutId={layoutId}>
                        {
                            slides.map(item => item.id === layoutId && item.content)
                        }
                    </OpenCard> : null
                }
            </AnimatePresence>
        </Container>
    )
    
}
export default Work;