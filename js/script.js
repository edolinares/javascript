// GLOBAL VARIABLES
let database = [];
let numbersAvr = [];
let index = -1
let filter = 0;
let myTable = document.querySelector('#table');
let table = document.createElement('table');
table.setAttribute('id', 'empTable');
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

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').valueAsNumber;
    let gender = 1;
    var genders = document.getElementsByName("gender");
    for (var i = 0, length = genders.length; i < length; i++) {
     if (genders[i].checked) {
        gender = genders[i].value;
       break;
     }
   }
   const error = document.getElementById('error');
   if(!name || !age || gender == 1){
    error.innerHTML = 'Please fill all the form.';
   }
   else{
      error.innerHTML = '';
      index++;
      database.push({name,age,gender});
      document.getElementById('myform').reset();
      document.getElementById('name').focus();
      tableaddrow(index);
      generetotals(0);
      graphupdate();  
      numbersAvr = [];
      for (let i = 0; i < database.length; i++){
        numbersAvr.push(database[i].age);
      }
      average(numbersAvr);
   }
}

function tableaddrow(id){
    let row = document.createElement('tr');
    Object.values(database[id]).forEach(text => {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })
    let cell = document.createElement('td');
    let span = document.createElement('span');
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Remove');
    button.setAttribute('class', 'buttonX');
    button.setAttribute('onclick', 'removeRow(this)');
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);
    //agregado
    myTable.appendChild(table);
}

function tableheader(){
    let headers = ['Name', 'Age','Sex','Del'];
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
    if (filter == 1) { f = 0;}
    if (filter == 2) { m = 0;}
}

function average(numbersAvr){
    avg = 0;
    for (let i = 0; i < numbersAvr.length; i++) {
        avg = avg + numbersAvr[i];
    }
    avg = avg / numbersAvr.length;
    avg = avg.toFixed(2);
    const avg2 = document.getElementById('average');
    avg2.innerHTML = 'The average Age is: '+avg+'  ';
}

function graphupdate(){
    myChart.config.data.datasets[0].data[0] = m;
    myChart.config.data.datasets[0].data[1] = f;
    myChart.update();
}

let removeRow = (oButton) => {
    let empTab = document.getElementById('empTable');
    row = oButton.parentNode.parentNode.rowIndex;
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); 
    row--;
    var removed = database.splice(row,1);
    index--;
    generetotals();
    graphupdate();
    average();
}

function tablefilter(a){
  
  if (a == "man")   { filter = 1; }
  if (a == "woman") { filter = 2; }
  filterclicked();
  Cleartable();
  if(a == "any"){
    numbersAvr = [];
    for (let i = 0; i < database.length; i++){
      numbersAvr.push(database[i].age);
    }
    for (let j = 0; j < database.length; j++) {
      sex = database[j].gender;
        tableaddrow(j);
    }
    filter = 0;
  }
  else{

    numbersAvr = [];
    for (let j = 0; j < database.length; j++) {
      sex = database[j].gender;
      if (sex == a){
        tableaddrow(j);
        numbersAvr.push(database[j].age);
      }
    }
  }
  generetotals();

  graphupdate();
  average(numbersAvr);
}

function Cleartable(){
  let empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length; 
  for (let i = rowCnt; i > 1; i--) {
    empTab.deleteRow(i-1); 
  }
}

function filterclicked(){
  let submit2 = document.getElementsByClassName('submit-2');
if (filter == 1){ 
  submit2[0].style.backgroundColor = "#AECBF6";
  submit2[1].style.backgroundColor = "#D9D9DC";
  submit2[2].style.backgroundColor = "#D9D9DC";
}
if (filter == 2){ 
  submit2[0].style.backgroundColor = "#D9D9DC";
  submit2[1].style.backgroundColor = "#AECBF6";
  submit2[2].style.backgroundColor = "#D9D9DC";
}
if (filter == 0){ 
  submit2[0].style.backgroundColor = "#D9D9DC";
  submit2[1].style.backgroundColor = "#D9D9DC";
  submit2[2].style.backgroundColor = "#AECBF6";
}
}