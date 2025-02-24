type Props = {
    color?: string;
}

export default function Recipes({color}: Props){
    const stroke = color ? color : 'black';
    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30,50 L 30,80 L 70,80 L 70,50" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="10" cx="30" cy="40" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="10" cx="50" cy="40" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="10" cx="70" cy="40" style={{fill:"none",stroke,strokeWidth:2}}/>
            <rect x="32" y="40" width="36" height="20" style={{fill:"white", stroke:"white", strokeWidth:2}} />
        </svg>
    )
}