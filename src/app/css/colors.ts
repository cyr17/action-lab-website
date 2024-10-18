export const colors = (type,color) =>
{
    switch(type)
    {
        case 'bg':
            return backgroundColors[color];
        case 'text':
            return textColors[color];
        default:
            return backgroundColors[color];
    }
}

const backgroundColors = {
    'black': 'bg-black text-white',
    'purple': 'bg-purple-500 text-white',
    'red': 'bg-red-700 text-white',
    'yellow': 'bg-yellow-500 text-white',
    'blue': 'bg-blue-500 text-white',
    'orange': 'bg-orange-700 text-white',
    'pink': 'bg-pink-500 text-white',
    'green': 'bg-green-500 text-white',
    'white': 'bg-white text-black',
    'gray': 'bg-gray-300 text-black',
};
const textColors =
{
    'black': 'text-black',
    'white': 'text-white',
    'gray': 'text-gray-300',
    'orange': 'text-orange-700',
    'red': 'text-red-700',
    'green': 'text-green-500',
    'yellow': 'text-yellow-500',
    'blue': 'text-blue-500',
    'pink': 'text-pink-500',
    'purple': 'text-purple-500',
};
export default colors;