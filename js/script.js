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
}

function average(){
    avg = 0;
    for (let i = 0; i < database.length; i++) {
        avg = avg + database[i].age;
    }
    avg = avg / database.length;
    avg = avg.toFixed(2);
    return avg;
}

function graphupdate(){
    generetotals();
    myChart.config.data.datasets[0].data[0] = m;
    myChart.config.data.datasets[0].data[1] = f;
    myChart.update();
}