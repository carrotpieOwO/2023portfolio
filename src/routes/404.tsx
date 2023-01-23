import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { images } from "../util/imageModule";
import { cursors } from '../util/imageModule';
import { useNavigate } from 'react-router-dom';

const Container = styled(motion.div)`
    background-color: rgb(174, 164, 241);
    // #d5ed89;
    //rgb(174, 164, 241);
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 1.2fr 1fr;
    justify-content: center;
`
const BackSpace = styled(motion.a)`
    background-image: url(${images.backSpace});
    background-size: cover;
    width: 200px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    &:hover {
        background-image: url(${images.backSpaceActive});
        cursor: url(${cursors.pointerCursor}), auto;
    }
    position: relative;
    overflow: hidden;
`
const BtnTitle = styled(motion.a)`
    position: absolute;
    top: 20px;
    font-size: 40px;
    color: #9d5ff1;
    -webkit-text-stroke: 1px #000;
    right: -100px;
    font-family: 'Lilita One', cursive;
`
const imgVariants = {
    animate: {
        rotate: [3, -3, 3],
        transition: {
            duration: .5,
            repeat: Infinity,
            type: 'spring',
            stiffness: 400, 
            damping: 10,
            ease: "easeInOut",
        }
    },
}
const btnVariants = {
    animate: (custom:boolean) => ({
        x: custom ? -130 : 0,
        transition: {
            type: 'spring',
            duration: .5,
            stiffness: 50, 
            damping: 5,
            ease: "easeInOut",
        }
    })
}
function NotFoundPage () {
    const [ hover, setHover ] = useState(false);
    const navigate = useNavigate();

    return (
        <Container animate='end'>
            <div></div>
            <motion.img src={images.notFound} alt="" variants={imgVariants} animate='animate'/>
            <BackSpace 
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
                onClick={() => navigate(-1)}>
                <BtnTitle variants={btnVariants} custom={hover} animate='animate'>BACK</BtnTitle>
            </BackSpace>
        </Container>
    )
}
export default NotFoundPage;