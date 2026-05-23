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

const logo = document.getElementById("logo");
const labelContainer =
    document.getElementById("label-container");

const scoreText =
    document.getElementById("score");

const bestScoreText =
    document.getElementById("bestScore");

function loadBrand(){

    logo.src = brands[currentBrand].image;
}

async function createModel() {

    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    recognizer = window.speechCommands.create(
        "BROWSER_FFT",
        undefined,
        checkpointURL,
        metadataURL
    );

    await recognizer.ensureModelLoaded();
}


async function init() {

    if(isListening){
        return;
    }

    try {

        isListening = true;

        labelContainer.innerHTML =
            "⏳ Loading model...";

        await createModel();

        const classLabels =
            recognizer.wordLabels();

        labelContainer.innerHTML =
            "🎧 Listening... Say the brand name!";

        recognizer.listen(result => {

            const scores = result.scores;

            let highestScore = 0;
            let predictedClass = "";

            for (let i = 0; i < classLabels.length; i++) {

                if(scores[i] > highestScore){

                    highestScore = scores[i];
                    predictedClass = classLabels[i];
                }
            }

            console.log(
                "Detected:",
                predictedClass,
                highestScore
            );

            if(highestScore > 0.75){

                checkAnswer(predictedClass);
            }

        }, {

            includeSpectrogram: true,
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.5

        });

    } catch(error){

        console.error(error);

        labelContainer.innerHTML =
            "❌ Error: " + error.message;

        alert(error.message);

        isListening = false;
    }
}