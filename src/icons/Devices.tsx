type Props = {
    color?: string;
}

export default function Devices({color}: Props){
    const stroke = color ? color : 'black';
    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="15" cx="50" cy="60" style={{fill:"none",stroke,strokeWidth:2}}/>
            <rect x="35" y="40" width="30" height="20" style={{fill:"white", stroke, strokeWidth:2}} />
            <rect x="39" y="20" width="3" height="20" style={{fill:"white", stroke, strokeWidth:2}} />
            <rect x="49" y="20" width="3" height="20" style={{fill:"white", stroke, strokeWidth:2}} />
            <rect x="59" y="20" width="3" height="20" style={{fill:"white", stroke, strokeWidth:2}} />
            <path d="M 50 75  Q 50 90 70 85 " style={{fill:"none",stroke,strokeWidth:2}}/>
        </svg>
    )
}