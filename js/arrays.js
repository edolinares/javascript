
let names = [];
let emails = [];
function getData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const error = document.getElementById('error');
    error.innerHTML = (!name || !email) ? 'Name & Email both values are required.' : '';
    if (name && email) {
        names.push(name);
        emails.push(email);
        console.log(names.length);
    }
}

function publish(){
    alert('Se crearon '+names.length+' registros');
}