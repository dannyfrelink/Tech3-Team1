console.log("client side running");

const button = document.getElementById('btn');
button.addEventListener('click', test);

function test(){
    console.log('button was clicked');
}