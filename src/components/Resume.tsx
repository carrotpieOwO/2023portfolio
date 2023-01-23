import { motion } from 'framer-motion';
import styled from 'styled-components';

const Card = styled(motion.div)`
    width: 90%;
    height: 50%;
    border-radius: 10px;
    background: rgba(255, 255, 255, .7);
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    padding: 10px;
    text-align: left;
    margin-left: auto;
    margin: 20px;
    &::before {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 12px;
        background-color: #fff;
        border: 7px solid pink;
        left: -35px;
    }
`
const InnerCard = styled(Card)`
    /* width: 90%; */
    background: #fff;
    box-shadow: none;
    border: 2px solid #f0b4bf;
    &::before {
        width: 0;
        height: 0;
        border: none;
    }
`
const TextWrap = styled.div<{center?:boolean}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.center ? 'center' : 'unset'};
    gap: 5px;
    line-height: 1;
`
const Title = styled.div`
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    color: #c94245;
    font-family: 'Black Han Sans', sans-serif;
`
const Content = styled.div`
    padding: 20px;
`
const Skill = styled.span`
    background-color: rgba(150, 150, 150, .1);
    border: 1px solid rgba(100,100,100,.2);
    padding: 3px;
    border-radius: 3px;
    font-size: 14px;
`
const Text = styled.span<{weight?: string, line?: number}>`
    font-weight: ${props => props.weight ? props.weight : 'normal'};
    line-height: ${props => props.line ? props.line : 1};
`
const cardVariants = {
    offscreen: {
      y: 300,
      rotate: -10
    },
    onscreen: {
      y: 50,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
};

type Work = {
    projectNm: string,
    period: string,
    skill: string[],
    content: string[]
}
function Resume(props:{work:Work, company:string, period:string}) {
    const work = props.work
    return (
        <Card variants={cardVariants} initial='offscreen' whileInView='onscreen' viewport={{once: false, amount:.2}}>
            <InnerCard>
            <TextWrap center>
                <h3>{props.company}</h3>
                <Text>{props.period}</Text>
            </TextWrap>
            <Title>{work.projectNm} ({work.period})</Title>
            <Content>
                <TextWrap>
                    <Text weight='bold' line={3}>🌱 사용기술 : </Text>
                    {
                        work.skill.map((s, i) => {
                            return <Skill key={i}>{s}</Skill>
                        })
                    }
                </TextWrap>
                {
                    work.content.map((c, i) => {
                        
                        return (
                            <TextWrap key={i}>
                                {
                                    c.split(':').length > 1 ? 
                                    <>
                                        <Text weight='bold' line={2}>- {c.split(':')[0]}</Text>
                                        <Text line={2}>: {c.split(':')[1]}</Text>
                                    </>
                                    :
                                    <Text>- {c}</Text>
                                }
                              
                            </TextWrap>
                        )
                    })
                }
            </Content>
            </InnerCard>
        </Card>
    )
}

export default Resume;