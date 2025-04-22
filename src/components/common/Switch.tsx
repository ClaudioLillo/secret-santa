import React, { useState } from "react";

import "./Switch.css";

type Props = {
  onChange: () => void;
};

export default function SearchInput({ onChange }: Props) {
  const [active, setActive] = useState(true);
  const handleActive = () => {
    setActive(!active);
    onChange();
  };
  return (
    <div className="switch" onClick={handleActive}>
      <div
        className={active ? "switch-option-active" : "switch-option-default"}
      >
        Activas
      </div>
      <div
        className={!active ? "switch-option-active" : "switch-option-default"}
      >
        Todo
      </div>
    </div>
  );
}
