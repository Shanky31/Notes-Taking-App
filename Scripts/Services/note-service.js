// it has the CRUD operation
// logic is always written on different 

// data me changes service karaega

import Note from '../models/note.js'

export const noteOperations={
    notes:[],
    add(noteObject){
        const note=new Note(noteObject);
        this.notes.push(note);
    },
    searchById(id){
        // it return the object  whose id is matched whom we click on the trash button
        return this.notes.find(note=>note.id==id);
        // this means noteOperations
    },
    toggleMark(id){
        // it searches the object whose id is needed
        this.searchById(id).toggleMark();
    //    const noteObject= this.searchById(id);
    //    noteObject.isMarked=!noteObject.isMarked;
    // the above 1 line is breaking SRP(Single Responsible Principle --> Har ek file ek hi functionality)
    },
    total(){
        return this.notes.length;
    },
    markTotal(){
        return this.notes.filter(note=>note.isMarked).length;
    },
    unMarkTotal(){
        return this.total() - this.markTotal();
    },
    remove(){
        this.notes=this.notes.filter(note=>!note.isMarked);
// false wale bhej rhe
    },
    getNotes(){
        return this.notes;
    },
    sort(){
        
    }

}