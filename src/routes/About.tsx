import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from 'styled-components';
import skills from '../util/skills';
import { images } from '../util/imageModule';
import resume from '../util/resume';
import Resume from '../Components/Resume';
const Container = styled(motion.div)`
    min-height: 100vh;
    font-family: 'ChosunGu', sans-serif;
`
const TitleWrap = styled(motion.div)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
        background: 'rgb(248 193 186)',
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
    
    const y = useTransform(scrollYProgress, [0, 1], [0, 100])
    const springY = useSpring(y, {
        stiffness: 100,
        damping: 30,
        bounce: 1,
        duration: 1,
    })
    const startX = window.innerWidth / 4;
    const x = useTransform(scrollYProgress, [.1, .2], [startX, 0]);
    const springX = useSpring(x, {
        stiffness: 100,
        damping: 30,
    })
    
    const scrollOpacity = useTransform(scrollYProgress, [.8, 1], [1, 0])
    const scale = useTransform(scrollYProgress, [.1, .15], [1, .5])
    const titleSize = useTransform(scrollYProgress, [0, .2], ['100px', '20px'])
    const textSize = useTransform(scrollYProgress, [.14, .2], ['12px', '18px'])
    const opacity = useTransform(scrollYProgress, [0, .2], [0, 1]);
    const background = useTransform(scrollYProgress, [.4, .5], ['rgb(248, 193, 186)', 'rgb(97, 96, 154)'])
    const titleColor = useTransform(scrollYProgress, [.4, .5], ['rgb(201, 66, 69)', 'rgb(248, 193, 186)'])
    const textColor = useTransform(scrollYProgress, [.4, .5], ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'])
    
    return (
        <Container variants={containerVariants} initial='start' animate='end'>
            <motion.div style={{height: '100vh'}}>
                <TitleWrap style={{ left: springX, y:springY }}>
                    <Title variants={titleVariants} style={{ fontSize: titleSize, color:titleColor }}>INTP (논리적인 사색가)</Title>
                    <motion.div style={{ color:textColor}}>
                        {
                            resume.introduce.map((text, i) => {
                                return <Text key={i} style={{ opacity, fontSize: textSize }}>{text}</Text>        
                            })
                        }
                    </motion.div>
                    <motion.img src={images.intp} variants={titleVariants} style={{scale}}/ >
                    <Title variants={titleVariants} custom={1.5} 
                        position='absolute' bottom='100px' size='60px' 
                        style={{color:titleColor, opacity:scrollOpacity}}>
                            Scroll
                    </Title>
                </TitleWrap>
                
            </motion.div>
            
            <SectionContainer>
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
            <SectionContainer>
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