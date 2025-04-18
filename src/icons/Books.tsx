import React from "react";

type Props = {
  color?: string;
};

export default function Books({ color }: Props) {
  const stroke = color ? color : "black";

  const tooth: number[] = [];

  for (let i = 0; i < 12; i++) {
    tooth.push(i * 30);
  }

  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="30"
        y="20"
        width="40"
        height="60"
        style={{ fill: "none", stroke, strokeWidth: 2 }}
      />
    </svg>
  );
}
