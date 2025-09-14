import React from "react";
import { useParams } from "react-router";

const City = () => {
  const city = useParams();
  console.log(city);
  return (
    <div>
      <h1 className="text-3xl">I came to this {city}</h1>
    </div>
  );
};

export default City;
