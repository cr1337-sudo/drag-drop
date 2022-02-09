  export const onDragEnd = (result,data,setData) => {
    const {
      destination,
      destination: { droppableId: destDroppableId, index: destIndex },
      source,
      source: {
        droppableId: sourceDroppableId,
        index: sourceIndex,
      },
      draggableId,
      type,
    } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(sourceIndex, 1);
      newListIds.splice(destIndex, 0, draggableId);
      return;

    } else {
      const sourceList = data.lists[sourceDroppableId];
      const destinationList = data.lists[destDroppableId];
      const draggingCard = sourceList.cards.filter(
        (card) => card.id === draggableId
      )[0];

      if (sourceDroppableId === destDroppableId) {
        //Intercambio de índices
        sourceList.cards.splice(sourceIndex, 1);
        destinationList.cards.splice(destIndex, 0, draggingCard);
        //Actualizar data
        setData({
          ...data,
          lists: {
            ...data.lists,
            [sourceList.id]: destinationList,
          },
        });
      } else {
        sourceList.cards.splice(sourceIndex, 1);
        destinationList.cards.splice(destIndex, 0, draggingCard);
        //Actualizar data
        setData({
          ...data,
          lists: {
            ...data.lists,
            [sourceList.id]: sourceList,
            [destinationList.id]: destinationList,
          },
        });
      }
    }
  }
