import { useEffect } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { usePiCalculatorContext } from "../hooks/usePiCalculatorContext";

const Home = () => {
  const { pi, precision, calculating, circumference, recalculate, dispatch } =
    usePiCalculatorContext();
  const radius = 696340;

  // on initial load, retrieve latest data from the backend and store in React context
  useEffect(() => {
    const fetchPiValue = async () => {
      const response = await fetch("/api/calculator");

      dispatch({ type: "UPDATING_VALUES" });

      const json = await response.json();

      if (response.ok) {
        const objects = json;

        if (objects?.length > 0) {
          dispatch({ type: "GET_VALUES", payload: objects[0] });
        }
      }
    };

    fetchPiValue();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to calculate the circumference based on the current pi value
  const calculateCircumference = () => {
    if (pi !== 0) {
      const circumference = 2 * pi * radius;
      dispatch({ type: "UPDATE_CIRCUMFERENCE", payload: circumference });
    }
  };

  // to update the pi value on backend for improved precision
  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "CLEAR_CIRCUMFERENCE" });

    const updatePiValue = { pi, precision };

    const response = await fetch("/api/calculator/62e38f524b55385f7710af02", {
      method: "PATCH",
      body: JSON.stringify(updatePiValue),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "UPDATING_VALUES" });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATING_VALUES_SUCCEEDED", payload: json });
    } else {
      console.log("failed:", json.error);
    }
  };

  return (
    <div className="home">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Calculate Circumference of the Sun
          </Typography>
          <Typography
            variant="body1"
            style={{ maxWidth: "55%", margin: "1rem auto 0 auto" }}
          >
            To calculate the circumference of the sun, increase the accuracy of
            π to the desired value and click on the "Calculate Circumference"
            button to get the circumference. Compare it to the reference
            circumference by Google.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={handleClick}
            variant="contained"
            style={{
              margin: "0.5rem",
              textTransform: "none",
              borderRadius: "1.25rem",
            }}
          >
            Increase π Accuracy
          </Button>
          <Button
            onClick={calculateCircumference}
            disabled={pi !== 0 || !calculating ? false : true}
            variant="outlined"
            style={{
              margin: "1rem",
              textTransform: "none",
              borderRadius: "1.25rem",
            }}
          >
            {recalculate
              ? "Recalculate Circumference"
              : "Calculate Circumference"}
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
              <Typography variant="body1">
                Precision of π ={" "}
                {calculating ? (
                  <CircularProgress style={{ width: "1rem", height: "1rem" }} />
                ) : (
                  `${precision} ${precision > 1 ? "decimals" : "decimal"}`
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Pi (π) ={" "}
                {calculating ? (
                  <CircularProgress style={{ width: "1rem", height: "1rem" }} />
                ) : (
                  `${pi}`
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Radius (r) = 696340 km</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Circumference = {circumference} km
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
