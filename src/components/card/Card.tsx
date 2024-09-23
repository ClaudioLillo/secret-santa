import React from "react";

import "./Card.css";

export type Device = {
  name: string;
  location: string;
  id: string;
};

export default function Card({
  device: { name, location, id },
}: {
  device: Device;
}) {
  return (
    <div className="card">
      <div className="card-content"></div>
      <div className="card-text">
        <h2 className="card-title">{name}</h2>
        <h2 className="card-subtitle">{location}</h2>
        <p className="card-id">{id}</p>
      </div>
    </div>
  );
}
