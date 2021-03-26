console.log("client side running");



var switchKnop = document.querySelector('#switch');
var likeContent = document.querySelector('#likes')
var matchesContent = document.querySelector('#matches')

function likes () {
    likeContent.classList.add('like')
    matchesContent.classList.remove('match')

}
function matches () {
    likeContent.classList.remove('like')
    matchesContent.classList.add('match')


}

likeContent.addEventListener('click', likes);
matchesContent.addEventListener('click', matches);

