let database = [];
function getData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').valueAsNumber;
    const error = document.getElementById('error');
    error.innerHTML = (!name || !age) ? 'Name & Age are required.' : '';
    if (name && age) {
        database.push({name,age});
        console.log(database.length);
    }
    document.getElementById('myform').reset();
    document.getElementById('name').focus();
}

function publish(){
    alert('Se crearon '+names.length+' registros');
}

function show(){
    for (let i = 0; i < database.length; i++) {
        console.log("Name: "+database[i]);
    }
    generatetable();
}

var input = document.getElementById("age");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getData();
  }
});

function generatetable(){
    average();
    const avg = document.getElementById('average');
    avg.innerHTML = 'The average Age is: '+average()+'  ';
    let myTable = document.querySelector('#table');
    let headers = ['Name', 'Age'];
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    database.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    myTable.appendChild(table);
}
let avg = 0;

function average(){
    avg = 0;
    for (let i = 0; i < database.length; i++) {
        avg = avg + database[i].age;
    }
    avg = avg / database.length;
    console.log("Average of ages: "+avg);
    return avg;
}