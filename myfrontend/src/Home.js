import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100vh",
    flexGrow: 1,
  },
  menu: {
    "&$selected": {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#DAF1F2",
      },
    },
    "&:hover": {
      backgroundColor: "#DAF1F2",
    },
  },
  selected: {},
  menuPaper: {
    maxHeight: 330,
    borderRadius: "10px",
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "4px",
    },
    "*::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px #DAF1F2",
      borderRadius: "2px",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#48CCCC",
      borderRadius: "2px",
    },
    "*::-webkit-scrollbar-button:start:decrement": {
      height: "5%",
    },
    "*::-webkit-scrollbar-button:end:increment": {
      height: "5%",
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  const [list, setList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [randomJoke, setRandomJoke] = useState("");

  useEffect(() => {
    axios
      .get("/getCategories")
      .then((response) => {
        setList(response.data.categories);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/getRandom")
      .then((response) => {
        setRandomJoke(response.data.random_joke);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField id="search" label="Search"></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={categoryName}
              onChange={handleChange}
              MenuProps={{
                classes: { paper: classes.menuPaper },
              }}
            >
              {list.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  classes={{ root: classes.menu, selected: classes.selected }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {randomJoke}
        </Grid>
      </Grid>
    </div>
  );
}
