import React from 'react'

export default function Button({ children, onClick = () => { alert('Button clicked') } }) {
    const generateRandomColorForTailwind = () => {
        const colors = ['#3D365C', '#7C4585', '#C95792', '#F8B55F', ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    }
    const randomColor = generateRandomColorForTailwind();
    return (
        <button style={{
            backgroundColor: randomColor,
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#3D365C',
            }
        }} className={` text-white p-2 rounded-md`} onClick={onClick}>
           {children}
        </button>
    )
}
