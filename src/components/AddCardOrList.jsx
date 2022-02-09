import {
  Collapse,
  alpha,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import AddCardOrListText from "./AddCardOrListText";

const AddCardOrList = ({ type,listId }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddCardOrListText type={type} setOpen={setOpen} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.addCardOrListText}
          onClick={() => setOpen(true)}
        >
          {type === "card" ? (
            <Typography>+ Add a card</Typography>
          ) : (
            <Typography>+ Add another list</Typography>
          )}
        </Paper>
      </Collapse>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1),
  },
  addCardOrListText: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    background: "#ebecf0",
    cursor: "pointer",
    "&:hover": {
      background:alpha("#000", 0.25),
    },
  },
}));

export default AddCardOrList;
