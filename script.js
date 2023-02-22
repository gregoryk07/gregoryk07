let originTitle = document.title;

function oldTitle() {
    document.title = originTitle;
    console.log('User has come back to this window');
}

function newTitle() {
    document.title = 'We miss you ♥';
    console.log('User has left this window');
}

window.onblur = newTitle;
window.onfocus = oldTitle;