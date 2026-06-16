import React from "react";

type Props = {
  color?: string;
};

export default function Plant({ color }: Props) {
  const stroke = color ? color : "black";
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="12" r="2" fill={stroke}/>
      <circle cx="12" cy="12" r="2" fill={stroke}/>
      <circle cx="18" cy="12" r="2" fill={stroke}/>
    </svg>
  );
}
