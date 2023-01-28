
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    display: flex;
`
function Footer() {
    return (
        <Container>
            © 2023 ha0peno 
            <motion.div 
                animate={{ scale: [1, 1.5, 1.1] }}
                transition={{ duration: 3, times: [0, 0.2, 1], repeat:Infinity, }}
            >
                &nbsp; 💜
            </motion.div>
        </Container>
    )
}

export default Footer;