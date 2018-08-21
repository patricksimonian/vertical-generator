import brain from 'brain.js';

const net = new brain.NeuralNetwork();
//train network so that lighter colors produce a dark text color
//and darker color produce a light text color
net.train([
    {input: { r: .525, g: .259, b: .957 }, output: { black: 1 }},
    {input: { r: .4, g: .357, b: .467 }, output: { white: 1 }},
    {input: { r: .165, g: .157, b: .176 }, output: { white: 1 }},
    {input: { r: .165, g: .157, b: .176 }, output: { white: 1 }},
    {input: { r: 0, g: .545, b: .910 }, output: { white: 1 }},
    {input: { r: .09, g: .322, b: .478 }, output: { white: 1 }},
    {input: { r: .420, g: .651, b: .839 }, output: { black: 1 }},
    {input: { r: .949, g: 1, b: 0 }, output: { black: 1 }},
    {input: { r: .596, g: .608, b: .365 }, output: { black: 1 }},
    {input: { r: .608, g: 97, b: .365 }, output: { white: 1 }},
    {input: { r: .067, g: .039, b: .459 }, output: { black: 1 }},
    {input: { r: .82, g: .047, b: .635 }, output: { black: 1 }},
    {input: { r: 1, g: 1, b: 1 }, output: { black: 1 }},
    {input: { r: 0, g: 0, b: 0 }, output: { black: 1 }},
]);


export default net;