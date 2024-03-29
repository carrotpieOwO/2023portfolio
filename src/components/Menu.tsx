import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { cursors } from '../util/imageModule';
import { useNavigate } from 'react-router-dom';

const MenuContainer = styled(motion.div)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
`
const Li = styled(motion.div)`
    list-style-type: none;
    overflow: 'hidden';
    height: 170px;
    height: 170px;
`
const Nav = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
`
const NavItem = styled(motion.a)`
    font-size: 150px;
    font-family: 'Lilita One', cursive;
    -webkit-text-stroke: 1px #000;
    text-decoration-line: none;
    &:hover {
        cursor: url(${cursors.pointerCursor}), auto;
    }
`
const containerVariants = {
    start: {
        background: 'rgb(242, 158, 192)',
    },
    end: (custom :string) => ({
        boxShadow: '0px 0px 0px 20px rgb(235, 84, 145) inset',
        background: custom,
        transition: {
            duration: 1,
        }
    })
}
const listVariants = {
    start: (custom :number) => ({
      y: 100,
      rotate: custom,
      opacity: 0,
    }),
    end: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: .5,
        delay: .5,
        mode: 'spring'
      }
    }
}
const itemVariants = {
    animate: (custom :string) => ({
        color: custom,
        transition: {
            duration: .5
        }
    })
}
type NavInfo = {
    text: string,
    bgColor: string,
    textColor: string,
    y: [number, number],
    x: [number, number]
}

const navInfo:NavInfo[] = [
    {
        text: 'ABOUT', 
        bgColor: 'rgb(248 193 186)',
        textColor: 'rgb(201 66 69)',
        y: [500, 250],
        x: [0, 0]
    },
    {
        text: 'WORK',
        bgColor: 'rgb(97, 96, 154)',
        textColor: 'rgb(244, 237, 51)',
        y: [0, 0],
        x: [0, 200]
    },
    {
        text: 'CONTACT',
        bgColor: 'rgb(249, 204, 114)',
        textColor: 'rgb(172, 79, 152)',
        y: [500, 207],
        x: [0, 0]
    },
]


function Menu(props:{setOpenMenu:(a:boolean)=>void}) {
    const navigate = useNavigate();
    const [ bgColor, setBgColor ] = useState('rgb(196, 189, 243)');
    const [ textColor, setTextColor ] = useState('rgb(248, 251, 165)');
    
    const hoverStart = (t: NavInfo) => {
        setBgColor(t.bgColor)
        setTextColor(t.textColor)
    }

    const goPage = (link: string) => {
        navigate(link);
        props.setOpenMenu(false);
    }
    
    return (
        <MenuContainer custom={bgColor} variants={containerVariants} initial="start" animate="end">
            <Nav>
                <ul>
                {
                    navInfo.map((t, i) => {
                        return (
                            <Li key={t.text} custom={i%2 === 0 ? 10 : -10} variants={listVariants} initial="start" animate="end">
                                <NavItem variants={itemVariants} animate="animate" custom={textColor} 
                                    whileHover={{textDecorationLine: 'line-through', textDecorationThickness: '2rem'}}
                                    onHoverStart={() => hoverStart(t)}
                                    onClick={() => goPage(`/${t.text.toLowerCase()}`)}>
                                        {t.text}
                                </NavItem>
                            </Li>
                        )
                    })
                }
                </ul>
            </Nav>
        </MenuContainer>
    )
}
export default Menu;