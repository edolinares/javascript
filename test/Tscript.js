
    let arrHead = new Array();
    arrHead = ['', 'Emp. Name', 'Designation', 'Age']; // table headers.

    // first create a TABLE structure by adding few headers.
    let createTable = () => {
        let empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable');  // table id.

        let tr = empTable.insertRow(-1);

        for (let h = 0; h < arrHead.length; h++) {
            let th = document.createElement('th'); // the header object.
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }

        let div = document.getElementById('cont');
        div.appendChild(empTable);    // add table to a container.
    }

    // function to add new row.
    let addRow = () => {
        let empTab = document.getElementById('myTable');

        let rowCnt = empTab.rows.length;    // get the number of rows.
        let tr = empTab.insertRow(rowCnt); // table row.
        tr = empTab.insertRow(rowCnt);

        for (let c = 0; c < arrHead.length; c++) {
            let td = document.createElement('td');          // table definition.
            td = tr.insertCell(c);

            if (c == 0) {   // if its the first column of the table.
                // add a button control.
                let button = document.createElement('input');

                // set the attributes.
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Remove');

                // add button's "onclick" event.
                button.setAttribute('onclick', 'removeRow(this)');

                td.appendChild(button);
            }
            else {
                // the 2nd, 3rd and 4th column, will have textbox.
                let ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', '');

                td.appendChild(ele);
            }
        }
    }

    // function to delete a row.
    let removeRow = (oButton) => {
        let empTab = document.getElementById('empTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
    }

    // function to extract and submit table data.
    let submit = () => {
        let myTab = document.getElementById('empTable');
        let arrValues = new Array();

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length - 1; row++) {
            // loop through each cell in a row.
            for (c = 0; c < myTab.rows[row].cells.length; c++) {
                let element = myTab.rows.item(row).cells[c];
                if (element.childNodes[0].getAttribute('type') == 'text') {
                    arrValues.push("'" + element.childNodes[0].value + "'");
                }
            }
        }
        
        // finally, show the result in the console.
        console.log(arrValues);
    }
