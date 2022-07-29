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
      <h3>Home</h3>
      <p>Pi = {pi}</p>
    </div>
  );
};

export default Home;
