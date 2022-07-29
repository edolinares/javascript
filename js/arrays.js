
let names = [];
let ages = [];
function getData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').valueAsNumber;
    const error = document.getElementById('error');
    error.innerHTML = (!name || !age) ? 'Name & Age are required.' : '';
    if (name && age) {
        names.push(name);
        ages.push(age);
        console.log(names.length);
    }
    document.getElementById('myform').reset();
    document.getElementById('name').focus();
}

function publish(){
    alert('Se crearon '+names.length+' registros');
}

function show(){
    for (let i = 0; i < names.length; i++) {
        console.log("Name: "+names[i]+" Age: "+ages[i]);
    }
    const average = ages.reduce((a, b) => a + b, 0) / ages.length;
    console.log("Average of ages: "+average);
    /* names.forEach(element => console.log(element)); */
}

var input = document.getElementById("age");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getData();
  }
});