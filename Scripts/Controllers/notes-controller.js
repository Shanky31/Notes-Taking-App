// Controller works--> (I/O) + Events + Talk to Service

import {noteOperations} from '../Services/note-service.js'
// import{notes}from'../Services/note-service.js'
window.addEventListener('load',init);

function init(){
  showCounts();
  bindEvents();
//   disableButton();
}
const enableButton=()=>
    document.querySelector("#delete").disabled=false;

// for disabling the delete function 
const disableButton=()=>
    document.querySelector("#delete").setAttribute("disabled",true);


function bindEvents(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#search').addEventListener('click',showDiv);
    document.querySelector('#sort').addEventListener('click',sortbutton);
}

function showCounts(){
    noteOperations.markTotal()>0?enableButton():disableButton();
    document.querySelector('#total').innerText=noteOperations.total(); 
    document.querySelector('#marktotal').innerText=noteOperations.markTotal(); 
    document.querySelector('#unmarktotal').innerText=noteOperations.unMarkTotal();    
}   

// function divcreation(){  
//     const div1=document.createElement("div");
//     div1.innerHTML="BY ID";
//     const div2=document.createElement("div");
//     div2.innerHTML="BY Title";
//     document.body.appendChild(div1);
//     let e=document.getElementById("#search");
    
// }


// function showDiv(){
//     // const obj1=divcreation();
//     // obj1[0]="By ID";
//     // obj1[1]="By Title";
//     // // console.log(obj1); 
//     // let e=document.getElementById("#search");
//     // e.appendChild( obj1[0]);
//     // e.appendChild( obj1[1]);
//     // console.log(e);
//     divcreation();

// }
function printButton(){
    const iTag=document.createElement('i');
    // <i class="fa-solid fa-up"></i>
    // iTag.className=`fa-solid fa-${className}`;
    iTag.className="fa-solid fa-up";
    return iTag;
}

function sortbutton(){
    // let tableid=document.querySelector("#thid");
    // let completionid=document.querySelector("#cd");\
    let table=document.getElementsByClassName(".dynamic");
    table.appendChild(printButton());
}

function addNote(){
    // read id,title,description,completion date,importance
    // DOM 
    // document.getElementById('')
    const fields=["id","title","desc","cdate","importance"];
    const noteObject={};// Object Literals    This object is god object and we have to convert it into specific object so that it can be accesed within specific scope
    for(let field of fields)
    // let --> good practice block level scope i.e. only for
    {
      noteObject[field] = document.querySelector(`#${field}`).value;
    //   key will be named as field written inside [];
    }
    // noteObject["ismark"]=false;
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
    // console.log(noteObject);


    // const id=document.querySelector('#id').value;
    // const title=document.querySelector('#title').value;
    // const desc=document.querySelector('#desc').value;
}
// one function have to do one operation '

function printIcon(myClassName='trash',fn,id)
{
    // we have to create dynamic tag so that in add it will have trash icon in every field
    // <i class="fa-solid fa-trash"></i>    for delete icon
    // <i class="fa-solid fa-user-pen"></i>    for edit icon
   const iTag= document.createElement('i');
//  we are creating a new customized attribute for ourself,so that no other can use this id bcz id can be used for applying css 
   iTag.setAttribute('note-id',id);
   //document.createELement always creates a object
   iTag.className=` fa-solid fa-${myClassName} me-3 hand`;
    iTag.addEventListener('click',fn);
    // whenever we call object.function then it gives this to the function 
    // itag ka reference will be accessible in fn function
   return iTag;

//    by default we have passed the value as trash in myClassName so that if we call by default then it will print the icon of trash else we have to pass user-pen for edit (usr pen bcz it is type of favicon)
}

function printNotes(notes){
    const tbody=document.querySelector("#notes");
    tbody.innerHTML='';
    notes.forEach(note=>printNote(note));
    showCounts();
}

function printNote(noteObject){
    // body k andar row , row k andar cell

    const tbody=document.querySelector('#notes');
    const row=tbody.insertRow();//it creates tr for table
    // loop is used so that we can create td equal to the field inside the objectNote
    for( let key in noteObject){
        if(key=="isMarked") continue;
        const td=row.insertCell();// this line creates td in table
        // now passing the value inside the table data
        td.innerText=noteObject[key];
    }
    const td=row.insertCell();
    // callback function are passed
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon('user-pen',edit,noteObject.id));
}



function toggleMark(){
    // console.log("Toggle ",this);
    const icon=this;
    const id=this.getAttribute('note-id');
    // calling toggleMark so that we can take out the object from id
    noteOperations.toggleMark(id);

    const tr= icon.parentNode.parentNode;
    // tr.className='table-danger';
    tr.classList.toggle('table-danger');
    // it maintains a classList and if present then removes the class

    showCounts();

}

function edit(){
console.log("edit");
}

function deleteMarked(){
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}








// function markNode(){
//     const tr=this.parentNode.parentNode;
//     const tds=tr.getElementsByTagName('td');
//     for ( var i=0;i<tds.length;i++){
//         tds[i].style.backgroundColor="red";
//     }
//     var el1=document.getElementsByTagName("ele");
//     // console.log(el1);
//     // noteObject["ismark"]=true;
// }