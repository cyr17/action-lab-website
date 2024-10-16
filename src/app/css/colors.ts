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
    'white': 'bg-white text-black',
    'gray': 'bg-gray-300 text-black',
    'orange': 'bg-orange-700 text-white',
    'red': 'bg-red-700 text-white',
};
const textColors =
{
    'black': 'text-black',
    'white': 'text-white',
    'gray': 'text-gray-300',
    'orange': 'text-orange-700',
    'red': 'text-red-700',
};
export default colors;