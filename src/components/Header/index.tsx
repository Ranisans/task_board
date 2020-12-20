import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from "clsx";

import { ESortDirection, ESortFields, Sorting } from "../../appConstants";
import { AppState } from "../../store";
import { resetKey, openLoginWindow } from "../../store/login";
import { setSorting, setDirection } from "../../store/taskList";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    marginRight: 5,
  },
  whiteColor: {
    color: "#fff",
  },
  select: {
    width: 80,
  },
  button: {
    width: 80,
  },
}));

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { authKey } = useSelector((state: AppState) => state.loginReducer);
  const { sorting, direction } = useSelector(
    (state: AppState) => state.taskListReducer
  );
  const styles = useStyles();

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as ESortFields;
    dispatch(setSorting(value));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDirection(event.target.checked));
  };

  const onLogInOut = () => {
    if (authKey) {
      // logout
      dispatch(resetKey());
    } else {
      // login
      dispatch(openLoginWindow());
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.root}>
        <div>
          <InputLabel
            htmlFor="sorting-label"
            className={clsx(styles.label, styles.whiteColor)}
          >
            Sort by
          </InputLabel>
          <Select
            labelId="sorting-label"
            value={sorting}
            onChange={handleSelectChange}
            className={clsx(styles.select, styles.whiteColor)}
          >
            {Sorting.map((element) => (
              <MenuItem value={element.value} key={element.value}>
                {element.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <FormControlLabel
          control={
            <CheckBox
              checked={direction === ESortDirection.ASC}
              onChange={handleCheckboxChange}
              name="checkedF"
              indeterminate
            />
          }
          label="Asc/Desc"
        />
        <Button
          className={clsx(styles.whiteColor, styles.button)}
          onClick={onLogInOut}
        >
          {authKey ? "LogOut" : "LogIn"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
