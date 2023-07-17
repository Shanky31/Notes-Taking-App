// model stands for pototype
// deep down 
// ES6 introduced class--> deep down it uses function inside
// ES6 introduced export--> it crreates an object and then return object (if we use export with class) see below , it can be created multiple time
// export class Note{
     class Note {
    // creating specific object
    constructor(noteObject){
        for(let key in noteObject){
            this[key]=noteObject[key];
        }
        this.isMarked=false;
    }
    toggleMark(){
        this.isMarked=!this.isMarked;
    }
}

export default Note;
// this send the class as it is
// export default is only used once