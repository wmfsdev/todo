
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
}

const projectFactory = (title='default') => {
    const proto = {
    stuff: [],
    title: title
    }

    const crud = crudMethods(proto)
    return Object.assign(proto, crud);
}

const Collection = (data, id, index) => {
    return {
        data,
        id,
        index
    }
}

export { todoFactory, projectFactory, Collection }