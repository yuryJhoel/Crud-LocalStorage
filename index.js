'use strict'
// variables globales
let btn = document.querySelector('#btn');
let tarea = document.querySelector('#tarea');
let form = document.querySelector('#form');
let tasksUI = document.querySelector('#tasks');
let arrayTasks = [];

// funciones
let saveLocaStorage = ()=>{
    localStorage.setItem('tasks' ,JSON.stringify(arrayTasks));
    read();
}

let taskAccomplished = (task)=>{
    arrayTasks.forEach((element)=>{
        if(element.name === task){
            element.accomplished = true;
            saveLocaStorage();
        }
    })
}
let create = (task)=>{
    var repeat = false
    arrayTasks.forEach((element)=>{
        if(element.name === task){
            repeat = true;
        }
    })
    if(!repeat){
        let actividad = {
            name:task,
            accomplished:false
        }
        arrayTasks.push(actividad); 
        saveLocaStorage()
    }else{
        alert('Se repite una tarea')
    }
    repeat = false
}
let read = ()=>{
    arrayTasks = JSON.parse(localStorage.getItem('tasks'))
    tasksUI.innerHTML = '';

    if( arrayTasks === null ){
        arrayTasks = [];
        
    }else{
        arrayTasks.forEach(element => {
            if(element.accomplished === false){
                tasksUI.innerHTML += `
                <div class="alert alert-danger d-flex justify-content-between col-12">
                    <div>
                        <p>${element.name}</p>
                    </div>
                    <div>
                        <i class="material-icons" style="cursor:pointer">
                            done
                            </i>
                    <i class="material-icons" style="cursor:pointer">
                            delete
                            </i>
                    </div>
                </div>
                `
            }else{
                tasksUI.innerHTML += `
                <div class="alert alert-success d-flex justify-content-between col-12">
                    <div>
                        <p>${element.name}</p>
                    </div>
                    <div>
                        <i class="material-icons" style="cursor:pointer">
                            done
                            </i>
                    <i class="material-icons" style="cursor:pointer">
                            delete
                            </i>
                    </div>
                </div>
                `
            }
        });

    }


}
let update = ()=>{

}
let deleteTask = (task)=>{
    let indexTask = arrayTasks.findIndex((element)=>element.name === task)
    arrayTasks.splice(indexTask, 1);
    saveLocaStorage();
    read();

}

// Even Listener
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    create(tarea.value);
    form.reset();
    
});
document.addEventListener('DOMContentLoaded',read);
tasksUI.addEventListener('click',(e)=>{
    e.preventDefault();

    let task = e.path[2].childNodes[1].childNodes[1].innerHTML

    if(e.target.innerHTML.trim() === 'done'){
        taskAccomplished(task)
    }
    if(e.target.innerHTML.trim() === 'delete'){
        deleteTask(task)
    }
})
