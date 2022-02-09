import {
  Paper,
  InputBase,
  makeStyles,
  Button,
  IconButton,
  alpha,
} from "@material-ui/core";
import { Clear, MoreHoriz } from "@material-ui/icons";
import { useState, useContext } from "react";
import ContextAPI from "../context/ContextAPI.js";

const AddCardOrListText = ({ type, setOpen, listId }) => {
  const classes = useStyle();
  const { addCard, addList } = useContext(ContextAPI);
  const [title, setTitle] = useState("");

  const handleAddCardOrList = () => {
    if (type === "card") {
      addCard(title, listId);
    } else {
      addList(title);
    }
    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.card}>
        <InputBase
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          multiline
          placeholder={`Enter a title for this ${type}`}
          fullWidth
          className={classes.input}
          onBlur={() => setOpen(false)}
        />
      </Paper>

      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button
            className={classes.btnConfirm}
            onClick={handleAddCardOrList}
          >{`Add ${type}`}</Button>
          <IconButton onClick={() => setOpen(false)}>
            <Clear />
          </IconButton>
        </div>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </div>
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  confirm: {
    display: "flex",
    margin: theme.spacing(0, 1, 1, 1),
  },
  options: {
    flexGrow: 1,
  },
  btnConfirm: {
    background: "#5aac44",
    color: "#fff",
    "&:hover": {
      background: alpha("#5aac44", 0.64),
    },
  },
}));

export default AddCardOrListText;
