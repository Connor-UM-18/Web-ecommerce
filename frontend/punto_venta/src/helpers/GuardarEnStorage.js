export const GuardarEnStorage =(key,item)=>{

    

    //Conseguir los elementos que ya tenemos en el local storage
    let items = JSON.parse(localStorage.getItem(key));

    //Comprobar si es un array
    if(Array.isArray(items)){ 
        //Guardar dentro del array un elemento nuevo
        items.push(item);
    }else{
        //Crear un array con peli nueva
        items=[item];
    }

    //Guardar en el localstorage
    localStorage.setItem(key,JSON.stringify(items));

    //Devolver Objeto
    return item;

}