import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from 'styled-components';
import skills from '../util/skills';
import resume from '../util/resume';
import Resume from '../Components/Resume';
import { upDownVariants } from './Home';
import { SplineEvent } from '@splinetool/react-spline';
import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const Container = styled(motion.div)`
    min-height: 100vh;
    font-family: 'Nanum Gothic Coding', monospace;
`
const TitleWrap = styled(motion.div)`
    height: 100vh;
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;
    z-index: 2;
    text-align: left;
`
const Title = styled(motion.div)<{position?: string, bottom?: string, size?: string}>`
    font-size: ${props => props.size ? props.size : '100px'};
    color: rgb(201 66 69);
    font-weight: 400;
    font-style: normal;
    font-family: 'Black Han Sans', sans-serif;
    position: ${props => props.position ? props.position : 'static'};
    bottom: ${props => props.bottom ? props.bottom : 'auto'};

`
const IntroduceBox = styled(motion.div)`
    background-color: rgba(255, 255, 255, .6);
    border-radius: 10px;
    position: fixed;
    padding: 30px;
    right: 10vw;
    top: 30vh;
    line-height: 1.5rem;
`
const SectionContainer = styled.div`
    min-height: 200vh;
`
const Section = styled(motion.section)`
    min-height: 100vh;
    position: sticky;
    top: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`
const TimeLine = styled.div`
    width: 60%;
    margin-left: auto;
`
const Text = styled(motion.div)`
    font-size: 16px;
    font-weight: normal;
`
const Card = styled(motion.div)`
    width: 50%;
    height: 50%;
    border-radius: 10px;
    background: rgba(255, 255, 255, .9);
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 30px;
    position: absolute;
    right: 0;
    gap: 30px;
`
const Skill = styled(motion.img)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
`
const ResumeContainer = styled.div`
    border-left: 2px solid #f8c0ba;
    padding-bottom: 50px;
`
const containerVariants = {
    start: {
        background: 'rgb(248, 193, 186)',
        boxShadow: '0px 0px 0px 20px rgb(235, 84, 145) inset',
    },
    end: (custom :string) => ({
        boxShadow: '0px 0px 0px 0px rgb(235, 84, 145) inset',
        transition: {
            duration: 1,
        }
    })
}
const titleVariants = {
    start: (custom :number) => ({
      opacity: 0,
    }),
    end: (custom :number) => ({
      opacity: 1,
      transition: {
        duration: 1,
        delay: custom,
      }
    })
}
const skillVariants = {
    start: {
        opacity: 0,
        scale: 0,
    },
    end: (custom:number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            bounce: .8,
            duration: 2,
            delay: custom
        }
    })
}
const cardVariants = {
    offscreen: {
        x: 100,
        rotate: -1,
        opacity: 0
    },
    onscreen: {
        x: -50,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.7,
            duration: 2
        }
    }
};



function About() {
    const { scrollYProgress } = useScroll();
    const [ introduce, setIntroduce ] = useState(false);
    const [ titleWidth, setTitleWidht ] = useState(0);

    const titleRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(titleRef && titleRef.current) {
            setTitleWidht(titleRef.current.clientWidth);
        }
    }, [titleRef])

    const y = useTransform(scrollYProgress, [0, 1], [0, 100])
    const springY = useSpring(y, {
        stiffness: 100,
        damping: 30,
        bounce: 1,
        duration: 1,
    })

    const startX = window.innerWidth / 2 - (titleWidth / 2);

    const x = useTransform(scrollYProgress, [0, .2], [startX, 0]);
    const springX = useSpring(x, {
        stiffness: 100,
        damping: 30,
    })
    
    const scrollOpacity = useTransform(scrollYProgress, [.8, 1], [1, 0])
    const scrollSize = useTransform(scrollYProgress, [0, 1], ['60px', '30px'])
    const titleSize = useTransform(scrollYProgress, [0, .2], ['100px', '30px'])
    const background = useTransform(scrollYProgress, [.4, .5], ['rgb(248, 193, 186)', 'rgb(97, 96, 154)'])
    const titleColor = useTransform(scrollYProgress, [.4, .5], ['rgb(201, 66, 69)', 'rgb(248, 193, 186)'])

    const onMouseHover = (e:SplineEvent) => {
        e.target.name === 'head' ? setIntroduce(true) : setIntroduce(false);
    }

    const onMouseDown = (e:SplineEvent) => {
        e.target.name === 'computer' ? window.location.href = '#skill' : window.location.href = '#resume';
    }

    return (
        <Container variants={containerVariants} initial='start' animate='end'>
            {
                introduce &&
                <IntroduceBox variants={skillVariants}>
                    안녕하세요. <br/>
                    프론트엔드 개발자 최하영입니다. <br/>
                    프론트 개발을 좋아하는 이유는<br/>
                    상상했던 것을 눈에 보이게 만드는 일이기 때문입니다. <br/>
                    사용자 경험을 더욱 직관적이고 <br/>
                    풍부하게 만드는 것에 열정을 가지고 있습니다.<br/>
                    <br/>
                    키보드를 좋아하고, 타건은 더 좋아하는 개발자.<br/>
                    멋진 키보드로 특별한 것을 만들어 나가고 싶습니다.
                </IntroduceBox>
            }
            
            <motion.div style={{height: '100vh'}}>
                <TitleWrap style={{ left: springX, y:springY }} ref={titleRef}>
                    <Title variants={titleVariants} style={{ fontSize: titleSize, color:titleColor }}>
                        INTP (논리적인 사색가)
                    </Title>
                    <Spline scene="https://prod.spline.design/5m-7X8TXgkJktJ8H/scene.splinecode" 
                        onMouseHover={onMouseHover}
                        onMouseDown={onMouseDown}
                    />
                    <Title variants={upDownVariants} custom={2}
                        style={{color:titleColor, opacity:scrollOpacity, fontSize:scrollSize}}>
                            Scroll
                    </Title>
                </TitleWrap>
                
            </motion.div>
            
            <SectionContainer id="skill">
                <Section style={{background}} initial='offscreen' whileInView='onscreen' viewport={{once: false, amount:1}}>
                    <Card variants={cardVariants}>
                        {
                            skills.map((skill, i) => {
                                return (
                                    <motion.div key={skill.name} initial='start' animate='end'>
                                        <Skill src={skill.image} variants={skillVariants} custom={i * .2}/>
                                        <Text variants={skillVariants} custom={i * .2}>{skill.name}</Text>
                                    </motion.div>
                                )
                            })
                        }
                    </Card>
                </Section>
            </SectionContainer>
            <SectionContainer id="resume">
                <Section style={{ background }} initial='offscreen' whileInView='onscreen' viewport={{once: false, amount:.7}}>
                    <TimeLine>
                        <Title position='absolute' initial={{opacity: 0, x: 500}} whileInView={{opacity: 1, x: 20}} viewport={{once: false, amount:.1}}>
                            RESUME
                        </Title>
                        <ResumeContainer>
                            {
                                resume.company.works.map((work, i) => {
                                    return (
                                        <Resume key={i} work={work} company={resume.company.companyNm} period={resume.company.employmentPerid}/>
                                    ) 
                                })
                            
                            }
                        </ResumeContainer>
                    </TimeLine>
                </Section>
            </SectionContainer>
        </Container>
    )
}

export default About;