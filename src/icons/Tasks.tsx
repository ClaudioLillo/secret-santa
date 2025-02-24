type Props = {
    color?: string;
}

export default function Books({color}: Props){
    const stroke = color ? color : 'black';
    
    const points: number[] = []

    for (let i=0; i<3; i++){
        points.push(i*20);
    }

    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            {points.map(t=>(
                <>
                <rect x="30" y={`${30 + t}`} width="8" height="8" style={{fill:"none", stroke, strokeWidth:2}} key={t}/>
                <line x1="45" y1={`${33 + t}`} x2="80" y2={`${33 + t}`} style={{stroke, strokeWidth:2}} />
                </>
            ))}
        </svg>
    )
}