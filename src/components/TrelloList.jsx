import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCardOrList from "./AddCardOrList";
import ListTitle from "./ListTitle";
import TrelloCard from "./TrelloCard";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#ebecf0",
    margin: theme.spacing(1),
  },
}));

const TrelloList = ({ data, index }) => {
  const classes = useStyle();
  return (
    <Draggable draggableId={data.id} index={index} key={data.id}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <ListTitle title={data.title} id={data.id} />
            <Droppable droppableId={data.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data.cards.map((info, index) => (
                    <TrelloCard card={info} key={info.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddCardOrList type="card" listId={data.id} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
