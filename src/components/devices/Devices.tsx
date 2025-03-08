import React from "react";
import Card from "../card/Card";
import Header from "../header/Header";

import "./Devices.css";
import "../../App.css";

const devices = [
  {
    id: "3032c1e4-2d15-4430-b0ab-1b6798389d51",
    name: "Luz living",
    location: "living",
  },
  {
    id: "d666b6e9-24a3-44a3-bb50-399eee7e9f29",
    name: "Luz comedor",
    location: "comedor",
  },
  {
    id: "3032c1e4-2d15-4430-b0ab-1b6798389d52",
    name: "Lavadora",
    location: "cocina",
  },
  {
    id: "d666b6e9-24a3-44a3-bb50-399eee7e9f23",
    name: "Blandina",
    location: "living",
  },
  {
    id: "3032c1e4-2d15-4430-b0ab-1b6798389d54",
    name: "Iluminación plantas 1",
    location: "balcón",
  },
  {
    id: "d666b6e9-24a3-44a3-bb50-399eee7e9f25",
    name: "Iluminación plantas 2",
    location: "balcón",
  },
];

export default function Devices() {
  return (
    <div className="app">
      <Header />
      <div className="devices">
        {devices.map((device) => (
          <Card key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}
