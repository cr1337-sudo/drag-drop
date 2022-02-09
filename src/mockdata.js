const mockData = {
  lists:{
    list1:{
      id: "list1",
      title: "To do",
      cards: [{
        id:"card1",
        title:"Comprar un tele"
      },{
        id:"card2",
        title:"Comprar agua"
      },
        {
          id:"card3",
          title:"Comprar pan"
        }]
    },
    list2:{
      id:"list2",
      title:"In progress",
      cards:[]
    }
  },
  listIds:["list1", "list2"]
}

export default mockData
