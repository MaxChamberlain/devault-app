import { motion } from 'framer-motion';

export default function Header() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: '#24262a',
        }}>
            <a href='/login' style={{textDecoration: 'none', color: 'white'}}>
                <motion.div style={{
                    position: 'absolute',
                    top: 10,
                    right: 100,
                    width: 60,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#5865F2',
                    border: '1px solid #5865F2',
                    fontSize: 18,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}>Login</motion.div>
            </a>
            <a href='/register' style={{textDecoration: 'none', color: 'white'}}>
                <motion.div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 80,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#24262a',
                    border: '1px solid #5865F2',
                    fontSize: 18,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#5865F2',
                    filter: 'contrast(1.1)',
                }}
                whileHover={{ backgroundColor: '#5865F2', color: 'white' }}
                transition={{ duration: 0.2, type: 'tween' }}>Register</motion.div>
            </a>
        </div>
    )
}