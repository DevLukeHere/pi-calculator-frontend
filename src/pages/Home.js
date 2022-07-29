import { useEffect, useState } from "react";

const Home = () => {
  const [pi, setPi] = useState(0);

  useEffect(() => {
    const fetchPiValue = async () => {
      const response = await fetch("/api/calculator");
      const json = await response.json();

      if (response.ok) {
        const objects = json;

        objects.map((object) => {
          setPi(object.pi);
        });
      }
    };

    fetchPiValue();
  }, []);

  return (
    <div className="home">
      <h2>Calculate Circumference of the Sun</h2>
      <p>Formula to calculate circumference = 2 x π x r</p>
      <p>Pi (π) = {pi}</p>
      <p>Radius (r) = 696340 km</p>
      <p>Circumference (based on precision of π) = 43790987 km</p>
      <p>Circumference (reference from Google) = 4.379 million km</p>
    </div>
  );
};

export default Home;
