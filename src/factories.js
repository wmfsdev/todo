
const crudMethods = (object) => {
    const setProperty = (property, value) => {
      object[property] = value;
    };
  
    const getProperty = (property) => object[property];
  
    const getObject = () => object;
  
    const markDeleted = () => {
      object.deleted = true;
    };
  
    return { setProperty, getProperty, getObject, markDeleted };
  };


const todoFactory = (title, desc, due, priority) => {

    const proto = {
        title: title,
        desc: desc,
        due: due,
        priority: priority
    }

    const crud = crudMethods(proto)
    return Object.assign(proto, crud);

    // const crud = crudMethods(proto)
    // return Object.assign(proto, crud)
    // no good, all contained in one object
    
   // return { title, desc }
}



const projectFactory = (title='default') => {

    const proto = {
    stuff: [],
    title: title
    }
    // could I create a public method that allows 
    // us to push to the array so as to keep the
    // array private?

    const crud = crudMethods(proto)
    return Object.assign(proto, crud);

    //return Object.assign(Object.create(proto), crud);

    // return { title, stuff }
}

const Collection = (data, id) => {
    return {
        data,
        id,
    }
}

export { todoFactory, projectFactory, Collection }




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


