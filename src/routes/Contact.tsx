import styled from 'styled-components';
import { motion } from 'framer-motion';
import { icons } from '../util/imageModule';
import { cursors } from '../util/imageModule';
import { useState } from 'react';

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgb(249, 204, 114);
`
const Title = styled(motion.div)<{size?:number, color?:string}>`
    font-size: ${ props => props.size ? props.size : 150 }px;
    font-family: 'Lilita One', cursive;
    -webkit-text-stroke: 1px #000;
    color: ${props => props.color? props.color : 'rgb(172, 79, 152)'};
`
const Content = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 50vw;
    height: 50vh;
    gap: 10px;
`
const Card = styled(motion.div)`
    border-radius: 20px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    border: 5px dashed purple;
    gap: 10px;
`
const Link = styled(motion.a)<{bgcolor:string}>`
    background: ${props => props.bgcolor};
    padding: 10px;
    border-radius: 10px;
    color: #000;
    text-decoration-line: none;
    font-weight: bold;
    &:hover {
        cursor: url(${cursors.pointerCursor}), auto;
    }
`
const LinkIcon = styled(motion.img)`
    width: 100px;
    &:hover {
        cursor: url(${cursors.pointerCursor}), auto;
    }
`
const containerVariants = {
    start: {
        boxShadow: '0px 0px 0px 20px rgb(235, 84, 145) inset',
    },
    end: (custom:string) => ({
        backgroundColor: custom,
        boxShadow: '0px 0px 0px 0px rgb(235, 84, 145) inset',
        transition: {
            duration: 1,
        }
    })
}
const titleVariants = {
    start: {
        opacity: 0,
        scale: 0,
    },
    end: (custom:string) => ({
        scale: 1,
        opacity: 1,
        color: custom,
        transition: {
            type: 'spring',
            bounce: .6,
            duration: 1,
        }
    })
}
const listVariants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: .2,
        }
    }
}
const cardVariants = {
    start: {opacity: 0, sacle: 0, y: 30},
    end: {opacity: 1, scale: 1, y: 0}
}

type LinkItem  = {
    title: string,
    content?: string,
    image?: string,
    link: string,
    bgcolor: string,
    color: string,
}
const contactList: LinkItem[] = [
    {
        title: 'EMAIL',
        content: 'xxhayoxx@naver.com',
        link: 'mailto:xxhayoxx@naver.com',
        bgcolor: 'rgb(172, 79, 152)',
        color: 'rgb(181, 201, 149)',
    },
    {
        title: 'GITHUB',
        image: icons.git,
        link: 'https://github.com/carrotpieOwO',
        bgcolor: 'rgb(66, 66, 66)',
        color: 'rgb(0, 0, 0)',
    },
    {
        title: 'RESUME',
        content: '이력서 보러가기',
        link: 'https://inky-cloud-bda.notion.site/8692ead489654e929a03f4b39c12af36',
        bgcolor: 'rgb(248, 193, 186)',
        color: 'rgb(201, 66, 69)',
    },
    {
        title: 'VELOG',
        image: icons.velog,
        link: 'https://velog.io/@ha0',
        bgcolor: 'rgb(181, 201, 149)',
        color: 'rgb(34, 201, 151)',
    },
]

function Contact() {
    const [ bgColor, setBgColor ] = useState('rgb(196, 189, 243)');
    const [ textColor, setTextColor ] = useState('rgb(248, 251, 165)');
    
    const onHoverStart = (c: LinkItem) => {
        setBgColor(c.bgcolor)
        setTextColor(c.color)
    }

    const goToLink = (link:string) => {
        window.open(link);
    }

    return (
        <Container variants={containerVariants} initial='start' animate='end' custom={bgColor}>
            <Title variants={titleVariants} custom={textColor}>CONTACT</Title>
            <Content variants={listVariants}>
                {
                    contactList.map(item => 
                        <Card key={item.title} variants={cardVariants} onHoverStart={() => onHoverStart(item)}>
                            <Title size={50} color={item.color}>{item.title}</Title>
                            {
                                item.content && <Link href={item.link} bgcolor={item.color} target='_blank' whileHover={{ scale: 1.1 }}
                                >
                                    {item.content}
                                </Link>
                            }
                            {
                                item.image && <LinkIcon src={item.image} alt={item.title} whileHover={{ scale: 1.1 }}
                                    onClick={() => goToLink(item.link)} />
                            }
                            
                        </Card>
                    )
                }
            </Content>
        </Container>
    )
}

export default Contact;