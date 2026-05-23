const URL ="https://teachablemachine.withgoogle.com/models/NAtlT0g4Q/";


let recognizer;
let currentBrand = 0;
let score = 0;
let isListening = false;

const brands = [

    {
        name:"BMW",
        className:"BMW",
        image:"https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
    },

    {
        name:"Audi",
        className:"Audi",
        image:"https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg"
    },

    {
        name:"Toyota",
        className:"Toyota",
        image:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg"
    },

    {
        name:"Mercedes",
        className:"Mercedes",
        image:"https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg"
    },
    {
        name:"BMW",
        className:"BMW",
        image:"https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
    }


];