import React from 'react'
import { ButtonProps } from '../../types/propTypes'
import { Container } from './ButtonElements'

const Button = ({ title, type, disabled, onClick }: ButtonProps) => {
    return (
        <Container
            style={{ position: 'absolute', top: '70px', right: '10px', width: '10%', backgroundColor: '#e90a42' }}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {disabled ? 'Processing...' : title}
        </Container>
    )
}

export default Button