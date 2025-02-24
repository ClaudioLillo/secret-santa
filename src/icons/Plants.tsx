type Props = {
    color?: string;
}

export default function Plant({color}: Props){
    const stroke = color ? color : 'black';
    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,50 70,50 60,90 40,90" style={{stroke,strokeWidth:3, fill:"none"}}/>
            <path d="M 50 50 L 50 20 Z" style={{fill:"none",stroke,strokeWidth:2}}/>
            <path d="M 50 50  Q 25 45 20 20 Z" style={{fill:"none",stroke,strokeWidth:1}}/>
            <path d="M 50 50  Q 45 25 20 20 Z" style={{fill:"none",stroke,strokeWidth:1}}/>
            <path d="M 50 40  Q 53 27 66 24 Z" style={{fill:"none",stroke,strokeWidth:1}}/>
            <path d="M 50 40  Q 63 37 66 24 Z" style={{fill:"none",stroke,strokeWidth:1}}/>
            
        </svg>
    )
}