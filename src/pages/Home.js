import { useEffect, useState } from "react";
import { Button, Typography, Grid } from "@mui/material";

const Home = () => {
  const [pi, setPi] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const radius = 696340;

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

  const calculateCircumference = () => {
    if (pi !== 0) {
      const circumference = 2 * pi * radius;
      setCircumference(circumference);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="home">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4">
            Calculate Circumference of the Sun
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onSubmit={handleSubmit}
            variant="contained"
            style={{
              marginRight: "1rem",
              textTransform: "none",
              borderRadius: "1.25rem",
            }}
          >
            Increase π Accuracy
          </Button>
          <Button
            onClick={calculateCircumference}
            disabled={pi !== 0 ? false : true}
            variant="outlined"
            style={{
              textTransform: "none",
              borderRadius: "1.25rem",
            }}
          >
            Calculate Circumference
          </Button>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid
                  item
                  style={{
                    borderRadius: "0.5rem",
                    width: "fit-content",
                    border: "2px solid black",
                    backgroundColor: "#E2DCC8",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ padding: "1rem", fontWeight: "600" }}
                  >
                    Formula to calculate circumference = 2 x π x r
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1">Pi (π) = {pi}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Radius (r) = 696340 km</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Circumference (based on precision of π) = {circumference} km
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid
                  item
                  style={{
                    borderRadius: "0.5rem",
                    width: "fit-content",
                    border: "2px solid black",
                    backgroundColor: "#FCF8E8",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ padding: "1rem", fontWeight: "600" }}
                  >
                    Circumference (reference from Google) = 4379000 km
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
