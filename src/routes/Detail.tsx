import { useNavigate, useParams } from "react-router-dom";
import works from "../util/works";
import styled from 'styled-components';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cursors } from '../util/imageModule';
import { useEffect } from "react";

const Container = styled(motion.div)<{background?:string}>`
    width: 100vw;
    font-family: 'ChosunGu', sans-serif;
    min-height: 500vh;
    background-color: ${props => props.background};
`
const Cover = styled(motion.div)<{background?:string}>`
    width: 100vw;
    height: 100vh;
    background-image: url(${props => props.background}), linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7));
    background-size: cover;
    background-blend-mode: overlay;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled(motion.div)<{color?:string}>`
    font-size: 250px;
    color: ${props => props.color};
    font-family: 'Black Han Sans', sans-serif;
`
const Summary = styled(motion.div)`
    display: flex;
    color: #fff;
    font-size: 20px;
`
const Scroll = styled(motion.div)<{color?:string}>`
    display: flex;
    width: 100%;
    justify-content: center;
    color: ${props => props.color ? props.color : '#ff9354'};
    width: 100%;
    padding-top: 100px;
    font-size: 30px;
    font-weight: bold;
`
const Text = styled(motion.div)`
    font-size: 25px;
    font-weight: normal;
    color: #000;
    font-weight: bold;
`
const Skill = styled(motion.span)`
    gap: 20px;
    margin-right: 50px;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Content = styled(Skill)`
    align-items: center;
    padding: 40px;
`
const ButtonWrap = styled(motion.div)`
    gap: 10px;
    display: flex;
    position: absolute;
    bottom: 10vh;
`
const Button = styled(motion.button)`
    width: 300px;
    height: 100px;
    background: rgb(255, 255, 255);
    border: 3px solid #000;
    font-size: 30px;
    font-family: 'Black Han Sans', sans-serif;
    &:hover {
        cursor: url(${cursors.pointerCursor}), auto;
    }
`
const Card = styled(motion.div)<{background?: string}>`
    width: 70vw;
    border-radius: 20px;
    height: 50vh;
    background-image: url(${props => props.background});
    background-size: cover;
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    margin-left: auto;
    margin-right: auto;
`
const springVariants = {
    start: (custom?:boolean) => ({
        opacity: 0, 
        y: 100, 
        rotateY: custom ? 300 : 0
    }),
    end: (custom?:boolean) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        rotateY: {
          duration: 0.3
        },
        y: {
          type: "spring",
          damping: 3,
          stiffness: 50,
          restDelta: 0.01,
          duration: 0.3,
        },
        // delay: custom ? custom : 0
      }
    })
};
const scrollVariants = {
    start: {
        opacity: 0,
        y: 15,
        
    },
    end: {
        opacity: 1,
        y: -15,
        transition: {
            delay: 1.2,
            type: 'spring',
            duration: 1,
            repeat: Infinity,
        }
    }
};
const btnVariants = {
    out: {
        background: 'rgb(255, 255, 255)',
        borderColor: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)'
    },
    in: (custom:string) => ({
        background: custom,
        borderColor: 'rgb(255, 255, 255)',
        color: 'rgb(255, 255, 255)',
        transition: {
            duration: .5
        }
    })
}

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const work = works.find(w => w.projectId === id);

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return(
       <Container background={work?.color}>
            <Cover variants={springVariants} initial='start' animate='end' background={work?.mainImg}>
                <Title variants={springVariants} color={work?.color}>{work?.projectNm}</Title>
                <Summary  variants={springVariants}>{work?.period}</Summary>
                <Summary  variants={springVariants}>
                    {
                        work?
                        work.skills.map((skill, i) => 
                            <p key={i}> 
                                {skill}&nbsp; { i !== work.skills.length - 1 ? '|' : null }&nbsp;
                            </p>
                        )
                        :null
                    }
                </Summary>
                <Scroll variants={scrollVariants} color={work?.color}>
                    ⬇︎
                </Scroll>
                <ButtonWrap  variants={springVariants}>
                    {
                        work?.link&&
                            work.link.map(link => 
                                <Button onClick={() => window.open(link.url)} variants={btnVariants} initial='out' whileHover= 'in' custom={work?.color}>{link.type}</Button>
                            )
                    }
                    
                </ButtonWrap>
            </Cover>
            <div style={{ padding:'60px'}}>
                {
                    work?.contents.map(content => 
                        <>
                            <Card background={content.image} 
                                variants={springVariants} 
                                custom={true} 
                                initial='start' 
                                whileInView='end'
                                viewport={{ once: true, amount: 0.3 }}
                            ></Card>
                            <Content>
                            {
                                content.content.map(c => <Text variants={springVariants} initial='start' whileInView='end' >🐰 {c}</Text>)
                            }
                            </Content>
                        </>
                    )
                }
            </div>
            <div style={{display: 'flex', justifyContent:'center', padding:'60px'}}>
                <Button variants={btnVariants} initial='out' whileHover= 'in' custom={work?.color}
                onClick={()=>navigate('/work')}>프로젝트 목록으로! 😎</Button>
            </div>
        </Container>
    )
}

export default Detail;