import { makeStyles } from "@material-ui/core";
import AddCardOrList from "./components/AddCardOrList";
import TrelloList from "./components/TrelloList";
import mockData from "./mockdata";
import ContextAPI from "./context/ContextAPI";
import uuid from "react-uuid";
import { useState } from "react";
import { DragDropContext, Droppable, provided } from "react-beautiful-dnd";
import { onDragEnd } from "./functions/appFunctions";

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);
  const updateListTitle = (title, id) => {
    data.lists[id].title = title;
  };

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    let list = data.lists[listId];
    list.cards = [...list.cards, newCard];
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };

  const addList = (title) => {
    const newListId = uuid();
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title,
          cards: [],
        },
      },
    });
  };

  return (
    <ContextAPI.Provider value={{ updateListTitle, addList, addCard }}>
      <div className={classes.root}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, data, setData)}
        >
          <Droppable droppableId="$1" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={classes.container}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((item, index) => (
                  <TrelloList data={data.lists[item]} index={index} />
                ))}
                <AddCardOrList type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(() => ({
  root: {
    overflowY: "auto",
    height: "100vh",
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2022/01/10/16/30/flowers-6928749_960_720.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  container: {
    display: "flex",
  },
}));
export default App;
