// GLOBAL VARIABLES
let database = [];
let index = -1
let myTable = document.querySelector('#table');
let table = document.createElement('table');
var input = document.getElementById("age");
let avg = 0;
let m = 0;
let f = 0;
const labels = [
    'Man',
    'Woman'
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Quantity',
      backgroundColor: ['rgb(46, 70, 171)','rgb(255, 99, 132)'],
      borderColor: 'rgb(255, 255, 255)',
      data: [m, f],
    }]
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {}
  };
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  
//LISTENERS 
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getData();
  }
});

// FUNCTIONS
function getData() {
    index++;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').valueAsNumber;
    let gender = "x"
    var genders = document.getElementsByName("gender");
    for (var i = 0, length = genders.length; i < length; i++) {
     if (genders[i].checked) {
        gender = genders[i].value;
       break;
     }
   }
    const error = document.getElementById('error');
    error.innerHTML = (!name || !age) ? 'Please fill all the form.' : '';
    if (name && age) {
        database.push({name,age,gender});
        console.log(database.length);
    }
   document.getElementById('myform').reset();
   document.getElementById('name').focus();
   tableupdate();
   average();
   const avg = document.getElementById('average');
   avg.innerHTML = 'The average Age is: '+average()+'  ';
   graphupdate();  
}

function tableupdate(){
    if(index == 0){
        tableheader();
        tableaddrow();
    }
    else{
        tableaddrow();
    }
    myTable.appendChild(table);
}

function tableaddrow(){
    let row = document.createElement('tr');
    Object.values(database[index]).forEach(text => {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })
    table.appendChild(row);
}

function tableheader(){
    let headers = ['Name', 'Age','Sex'];
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
}


function generetotals(){
    m = 0;
    f = 0;
    for (let i = 0; i < database.length; i++) {
        if(database[i].gender == "man"){ 
            m += 1;
        } 
        else {
            f += 1;
        }
    }
    console.log("male: "+m+" female: "+f);
}

function average(){
    avg = 0;
    for (let i = 0; i < database.length; i++) {
        avg = avg + database[i].age;
    }
    avg = avg / database.length;
    avg = avg.toFixed(2);
    console.log("Average of ages: "+avg);
    return avg;
}

function graphupdate(){
    generetotals();
    myChart.config.data.datasets[0].data[0] = m;
    myChart.config.data.datasets[0].data[1] = f;
    myChart.update();
}

















































//unused functions

function generategraph(){
    generetotals();

    

}

function publish(){
    alert('Se crearon '+database.length+' registros');
}

function show(){
    for (let i = 0; i < database.length; i++) {
        console.log("Name: "+database[i]);
    }
    generatetable();
    generategraph();
}

function generatetablex(){
    let myTable = document.querySelector('#table');
    let table = document.createElement('table');
        let row = document.createElement('tr');
        Object.values(database[items]).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    myTable.appendChild(table);
}
// let newtable = 0;
//test
function test(){
    average();
    const avg = document.getElementById('average');
    avg.innerHTML = 'The average Age is: '+average()+'  ';
    
    // Inicia la creacion de la tabla
    let myTable = document.querySelector('#table');
    let headers = ['Name', 'Age','Sex'];
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    if (newtable == 1){

    }
    else {
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
            newtable = 1;
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
}
function generatetable(){
    average();
    const avg = document.getElementById('average');
    avg.innerHTML = 'The average Age is: '+average()+'  ';

    // Inicia la creacion de la tabla
    let myTable = document.querySelector('#table');
    let headers = ['Name', 'Age','Sex'];
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








