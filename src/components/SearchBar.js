import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      maxWidth: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const SearchBar = ({ placeholder = "Search", onSearchClick }) => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      <MenuIcon />
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          onSearchClick(e.target.value);
        }}
        onEmptied={() => {
          setSearchInput("");
          onSearchClick("");
        }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onSearchClick(searchInput)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
