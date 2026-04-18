console.log("main run!");

let plantDescriptors = [];

const sendButton = document.getElementById("testData");
sendButton.addEventListener('click', sendData(100));


async function sendData(data){
    console.log('sending data');
    await fetch('/data/?value=40')
    .then(
        fetchGarden()
    )
}

async function fetchGarden(){
    await fetch('/garden/');
}