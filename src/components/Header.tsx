import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { icons, cursors } from '../util/imageModule';
import { useNavigate } from 'react-router-dom';

const Container = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  z-index: 8;
  overflow: hidden;
`
const MenuBtnContainer = styled(motion.div)`
  margin-top: 30px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MenuTitle = styled(motion.div)`
  text-align: center;
  font-family: 'Lilita One';
  font-size: 25px;
  color: #f29ec0;
  -webkit-text-stroke: 1px #000;
  padding: 10px 0;
`
const HomeBtn = styled(motion.a)`
  width: 110px;
  height: 48px;
  background-image: url(${icons.homeIcon});
  background-size: cover;
  &:hover{
    cursor: url(${cursors.handCursor}), pointer;
  }
`
const MenuBtn = styled(motion.a)`
  width: 30px;
  height: 48px;
  background-image: url(${icons.menuIcon});
  background-size: cover;
  &:hover{
    cursor: url(${cursors.handCursor}), pointer;
  }
`
const containerVariants = {
  start: {
    y: -100
  },
  end: {
    y: 0,
    transition: {
      delay: 1.5,
      duration: 1.5,
    }
  }
}
const btnVariants = {
    hover: (custom:number[]) => ({
        rotate: custom,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10, 
            duration: .2, 
            repeat: Infinity
        }
    }),
}
const menuTitleVariants = {
    default: (custom:number) => ({
        x: custom,
        y: 40,
        opacity: 0
    }),
    hover: {
        y: 0,
        opacity: 1,
    }
}
function Header(props: {setOpenMenu:(a:boolean)=>void, openMenu:boolean}) {
    const navigate = useNavigate();
    const [ homeHover, setHomeHover ] = useState(false);
    const [ menuHover, setMenuHover ] = useState(false);

    const onHoverStart = (type: string) => {
        type === 'home' ? setHomeHover(true) : setMenuHover(true);
    }

    const onHoverEnd = (type: string) => {
        type === 'home' ? setHomeHover(false) : setMenuHover(false);
    }

    const showMenu = () => {
        props.setOpenMenu(!props.openMenu);
    }

    const goHome = () => {
        navigate('/');
        props.setOpenMenu(false);
    }

    return (
        <Container>
            <MenuBtnContainer variants={containerVariants} initial='start' animate='end'>
                <HomeBtn
                    variants={btnVariants} custom={[-2, 2.3, 1]} whileHover='hover' 
                    onHoverStart={() => onHoverStart('home')} onHoverEnd={() => onHoverEnd('home')} 
                    onClick={ goHome }
                    >
                    <MenuTitle variants={menuTitleVariants} custom={0} initial='default' animate={homeHover ? 'hover' : 'default'}>
                        HOME
                    </MenuTitle>
                </HomeBtn>
                <MenuBtn 
                    variants={btnVariants} custom={[-3, 3.3, 2]} whileHover='hover'
                    onHoverStart={() => onHoverStart('menu')} onHoverEnd={() => onHoverEnd('menu')}
                    onClick={ showMenu }
                    >
                    <MenuTitle  variants={menuTitleVariants} custom={35} initial='default' animate={menuHover ? 'hover' : 'default'}>
                    {
                        props.openMenu ? '←CLOSE' : '←MENU'
                    }
                    </MenuTitle>
                </MenuBtn>
            </MenuBtnContainer>
        </Container>
    )
}

export default Header;