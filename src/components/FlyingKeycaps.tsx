import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { flyingKeycaps } from '../util/imageModule';

const MovingKey = styled(motion.div)<{img: string}>`
    background-image: url(${props => props.img});
    width: 200px;
    height: 183px;
    top: ${Math.random()};
    left: ${Math.random()};
    position: absolute;
`

function FlyingKeycaps(props: {isIntro:boolean}) {
    const [ x , setX ] = useState(Math.random() * window.innerWidth);
    const [ y, setY ] = useState(Math.random() * window.innerHeight);
    
    const keyVariants = {
        start: {
            x: x,
            y: y,
            opacity: 0,
        },
        end: (custom :number) => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 1,
            rotate: Math.random() * 100,
            transition: {
                duration: 2,
                delay: custom,
            }
        }),
    }


    const onAnimationComplete = () => {
        setX(Math.random() * window.innerWidth)
        setY(Math.random() * window.innerHeight)
    }

    return (
        <>
            {
                flyingKeycaps.map((keyCap, i) => {
                    return <MovingKey key={i} img={keyCap} custom={props.isIntro ? 1 : .01} 
                        variants={keyVariants} initial="start" animate="end" 
                        onAnimationComplete={onAnimationComplete}/>  
                })
            }
        </>
    )
}
export default React.memo(FlyingKeycaps);