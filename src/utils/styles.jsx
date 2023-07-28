const volumeStyle = (volume) => {
    return `
        linear-gradient(45deg, 
        rgba(59, 173, 227, 1) ${Math.min(5, 0 + Math.max(0, volume))}%,
        rgba(87, 111, 230, 1) ${Math.min(40, 25 + Math.max(0, volume-25))}%,
        rgba(152, 68, 183, 1) ${Math.min(60, 51 + Math.max(0, volume-51))}%,
        rgba(255, 53, 127, 1) 100%)
    `;
}

export { 
    volumeStyle 
};
  