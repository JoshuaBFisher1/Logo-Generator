const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getLogoSVG = (text, textColor, shape, shapeColor) => {
    let svgShape;

    switch (shape) {
        case 'circle':
            svgShape = `<circle cx="150" cy="100" r="90" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            svgShape = `<polygon points="150,10 280,190 20,190" fill="${shapeColor}" />`;
            break;
        case 'square':
            svgShape = `<rect width="180" height="180" x="60" y="10" fill="${shapeColor}" />`;
            break;
        default:
            break;
    }

    return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${svgShape}
    <text x="150" y="115" font-family="Arial" font-size="40" fill="${textColor}" text-anchor="middle">${text}</text>
</svg>
    `;
};

rl.question('Enter text for the logo (up to 3 characters): ', (text) => {
    if (text.length > 3) {
        console.error('Text should be up to 3 characters only.');
        rl.close();
        return;
    }

    rl.question('Enter the text color (keyword or hex): ', (textColor) => {
        rl.question('Select a shape (circle, triangle, square): ', (shape) => {
            if (!['circle', 'triangle', 'square'].includes(shape)) {
                console.error('Invalid shape.');
                rl.close();
                return;
            }

            rl.question('Enter the shape color (keyword or hex): ', (shapeColor) => {
                const svgData = getLogoSVG(text, textColor, shape, shapeColor);
                require('fs').writeFileSync('logo.svg', svgData, 'utf8');
                console.log('Generated logo.svg');
                rl.close();
            });
        });
    });
});