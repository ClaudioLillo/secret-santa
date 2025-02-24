type Props = {
    color?: string;
}

export default function Supermarket({color}: Props){
    const stroke = color ? color : 'black';
    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20,50 L 30,70 L 70,70 L 80,40 L 90,40" style={{fill:"none",stroke,strokeWidth:2}}/>
            <path d="M 35,70 L 35,75 Z" style={{fill:"none",stroke,strokeWidth:2}}/>
            <path d="M 65,70 L 65,75 Z" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="5" cx="35" cy="80" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="5" cx="65" cy="80" style={{fill:"none",stroke,strokeWidth:2}}/>
            
        </svg>
    )
}