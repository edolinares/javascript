// GLOBAL VARIABLES
let database = [];
let numbersAvr = [];
let index = -1
let filter = 0;
let myTable = document.querySelector('#table');
let table = document.createElement('table');
table.setAttribute('id', 'empTable');
let input = document.getElementById("age");
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
    let genders = document.getElementsByName("gender");
    // CICLE
    for (let i = 0, length = genders.length; i < length; i++) {
    gender = genders[i].checked ? genders[i].value : gender;
   }
   const error = document.getElementById('error');
   if(!name || !age || gender == 1 || age<0 || age >120){
    errormessage();
   }
   else{
      error.innerHTML = '';
      index++;
      // ARRAY
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
   notificationelements();
}

function tableaddrow(id){
    let row = document.createElement('tr');
    // FUNCIONES DE ORDEN SUPERIOR
    Object.values(database[id]).forEach(text => {
        // DOM
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })
    let cell = document.createElement('td');
 //   let span = document.createElement('span');
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Remove');
    button.setAttribute('class', 'buttonX');
    button.setAttribute('onclick', 'removeRow(this)');
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);
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
    m,f = 0;
    for (let i = 0; i < database.length; i++) {
        if(database[i].gender == "man"){  m += 1; } 
        else {                            f += 1; }
    }
    f = filter == 1 ? 0 : f;
    m = filter == 2 ? 0 : m;
}

function average(numbersAvr){
    avg = 0;
    for (let i = 0; i < numbersAvr.length; i++) {
        avg = avg + numbersAvr[i];
    }
    avg = (avg / numbersAvr.length).toFixed(2);
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
    let removed = database.splice(row,1);
    index--;
    generetotals();
    graphupdate();
    average(numbersAvr);
}

function tablefilter(a){
  // ADVANCED OPERATORS
  filter = a == 'any'   ? 0 : filter;
  filter = a == "man"   ? 1 : filter;
  filter = a == "woman" ? 2 : filter;
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
  if (index != -1) {
    let rowCnt = empTab.rows.length; 
    for (let i = rowCnt; i > 1; i--) {
      empTab.deleteRow(i-1); 
    }
  }
}

function filterclicked(){
  let submit2 = document.getElementsByClassName('submit-2');
  submit2[0].style.backgroundColor = "#D9D9DC";
  submit2[1].style.backgroundColor = "#D9D9DC";
  submit2[2].style.backgroundColor = "#D9D9DC";
  switch (filter){
    case 1: submit2[0].style.backgroundColor = "#AECBF6";
            break;
    case 2: submit2[1].style.backgroundColor = "#AECBF6";
            break;
    case 0: submit2[2].style.backgroundColor = "#AECBF6";
            break;
  }
}

function save(){
  // LOCAL STORAGE
  const jsonArr = JSON.stringify(database);
  localStorage.setItem("array", jsonArr);
  savemessage();
}

function reload(){
  // JSON
  const str = localStorage.getItem("array");
  database = JSON.parse(str);
  filter = 0;
  tablefilter("any");
  index = database.length-1;
  generetotals();
  graphupdate();
  average(numbersAvr);
}
 // LIBRARIES
function errormessage(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'THe form needs to be correctly submited',
  })
}

function savemessage(){
  Swal.fire({
    icon: 'success',
    title: 'Saved',
    text: 'Your changes are saved to local storage',
  })
}

function notificationelements() {
  myTable.appendChild(table);
  Toastify({
    text: "Se cuentan con "+database.length+" registros",
    duration: 3000,
    gravity: 'top',
    position: 'left'
}).showToast();
}
