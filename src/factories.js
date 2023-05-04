
const todoFactory = (title, desc, due, priority) => {
   
    return { title, desc }
}


const Collection = (title, todo, id) => {
    let stuff = [];
    let object = {}
    
   // 
    return {
        title,
        todo,
        id
    }
}

export { todoFactory, Collection }

// const createUUID = () => self.crypto.randomUUID()

// const projectsFactory = (title='default', _id=createUUID()) => {
//     let stuff = [];
//     let observers = {}

//     const add = (item, _id=createUUID() )=> {
//       const thing = Object.freeze({_id, data: item})
//       stuff = [...stuff, thing];
//       observers.add?.forEach( (observerFunc) =>
//       observerFunc(thing, {_id, title, collection:[...stuff]} )
//     ) 
//        console.log(stuff)
//       return thing
//     }
// }

//     const subscribe = (action, observerFunction) => {
//       if(!observers.hasOwnProperty(action)){
//         observers[action]=[];
//       }
//       observers[action].push(observerFunction)
     
//     }

//     const remove = (id) => {
//       stuff = stuff.filter(thing => thing._id != id);
//     }

//     const find = (func) => stuff.filter(({data})=>func(data) );
//     const findAll = () => [...stuff];
//       return {
//           get title() { return title; },
//           get _id(){ return _id; },
//           findAll,
//           add,
//           find,
//           remove,
//           subscribe
//       } 
// }
