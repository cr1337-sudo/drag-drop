import { makeStyles, Typography, InputBase } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState, useContext } from "react";
import ContextAPI from "../context/ContextAPI"

const ListTitle = ({ title }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const {updateListTitle} = useContext(ContextAPI)

  const handleBlur=()=>{
    updateListTitle(newTitle, title)
    setOpen(false)
  }
  return (
    <>
      {open ? (
        <InputBase
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
          fullWidth
        inputProps={{className:classes.input}}
        onBlur={handleBlur}
        />
      ) : (
        <div className={classes.titleContainer} onClick={()=>setOpen(true)}>
          <Typography className={classes.titleText}>{title}</Typography>
          <MoreHorizIcon />
        </div>
      )}
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    margin: theme.spacing(1),
  },
  titleText: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1,2rem",
    margin: theme.spacing(1),
    fontWeight: "bold",
    "&:focus": {
      background: "#ddd"
    },
  },
}));

export default ListTitle;
