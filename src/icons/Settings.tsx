type Props = {
    color?: string;
}

export default function Settings({color}: Props){
    const stroke = color ? color : 'black';
    
    const tooth: number[] = []

    for (let i=0; i<12; i++){
        tooth.push(i*30);
    }

    return(
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="10" cx="50" cy="50" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="15" cx="50" cy="50" style={{fill:"none",stroke,strokeWidth:2}}/>
            <circle r="25" cx="50" cy="50" style={{fill:"none",stroke,strokeWidth:2}}/>
            <rect x="46" y="22" width="8" height="8" style={{fill:"none", stroke, strokeWidth:2}} />
            {tooth.map(t=>(
                <rect x="46" y="22" width="8" height="8" style={{fill:"none", stroke, strokeWidth:2}} transform-origin="center" transform={`rotate(${t})`} key={t}/>
            ))}
            

            
        </svg>
    )
}