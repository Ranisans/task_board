import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    gridGap: 15,
  },
  dialog: {
    "& .MuiPaper-root": {
      backgroundColor: "#ccc",
    },
  },
  typography: {
    color: "#606079",
  },
  title: {
    margin: 0,
    display: "flex",
    padding: theme.spacing(2),
  },
  action: {
    justifyContent: "space-around",
    marginBottom: 10,
    alignItems: "baseline",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#000",
  },
  completeIcon: {
    padding: 0,
  },
  formContainer: {
    width: 400,
    margin: "auto",
  },
}));

export default useStyles;
