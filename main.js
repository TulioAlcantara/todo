//-----------------------------------------------------------------------------BUTTON FUNCIONS---------------------------------------------------------------------------------------//

function createTaskContent(newTask) {
    //Criando e definindo a nova tarefa
    let task = document.getElementById("textBox").value;
    let text = document.createTextNode(task);
    newTask.appendChild(text);
}

function createCheckBox(newTask) {
    //Criando e definindo checkBox da tarefa
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("class", "chk");
    newTask.appendChild(check);
}

function createEditButton(newTask) {
    //Criando botão de edit
    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.setAttribute("type", "button");
    edit.setAttribute("class", "edt");
    newTask.appendChild(edit);

    //Event listener para quando o botão edit é clicado
    edit.addEventListener('click', function () {
        editTask(newTask, edit)
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function initializer() {
    let txt = document.getElementById("textBox").addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            addTask();
        }
    })
}

function addTask() {
    //Node com a nova task (um li no caso)
    let newTask = document.createElement("li");
    newTask.setAttribute("class", "txt");
    document.getElementById("taskList").appendChild(newTask);

    //Funções que criam botões adicionais
    createTaskContent(newTask);
    createCheckBox(newTask);
    createEditButton(newTask);

    document.getElementById("textBox").value = ""; //Deixa a textBox em branco 
}

function removeTask() { 
    //Obtem todos os elementos caixa e texto
    let boxes = document.getElementsByClassName('chk');
    let texts = document.getElementsByClassName('txt');
    let edits = document.getElementsByClassName('edt');

    let tuples = [];
    for (let i = 0; i < boxes.length; i++) {
        tuples.push([texts[i], boxes[i], edits[i]]);
    }

    //Itera Pelas caixas, buscando as marcadas e deletando as mesmas
    for (let i = 0; i < tuples.length; i++) {
        let txt = tuples[i][0];
        let box = tuples[i][1];
        let edt = tuples[i][2];
        if (box.checked == true) {
            txt.parentElement.removeChild(txt);
            box.parentElement.removeChild(box);
            edt.parentElement.removeChild(edt);
        }
    }

}

function editTask(newTask, editButton) {
    //Crio a textbox da nova task que será usada na substituição
    let txt = document.createElement("input");
    txt.setAttribute = ("class", "newTxt")
    txt.setAttribute = ("type", "text");
    newTask.appendChild(txt);

    //Remove o botão de Edit e checkbox
    let check = newTask.childNodes[1];
    editButton.parentNode.removeChild(editButton);
    check.parentNode.removeChild(check);
    
    //Cria os botões de Confirm e Abort
    let yes = document.createElement("button");
    yes.textContent = "Confirm";
    let no = document.createElement("button");
    no.textContent = "Abort";
    newTask.appendChild(yes);
    newTask.appendChild(no);


    //Quando pressionar enter, edito a task original e removo a textbox
    txt.addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            newTask.firstChild.textContent = txt.value;
            txt.parentNode.removeChild(txt);
            yes.parentNode.removeChild(yes);
            no.parentNode.removeChild(no);
            createEditButton(newTask);
        }
    })

    //Caso Confirm
    yes.addEventListener('click', function () {
        newTask.firstChild.textContent = txt.value;
        txt.parentNode.removeChild(txt);
        yes.parentNode.removeChild(yes);
        no.parentNode.removeChild(no);
        createEditButton(newTask);
    })

    //Caso Abort
    no.addEventListener('click', function () {
        txt.parentNode.removeChild(txt);
        yes.parentNode.removeChild(yes);
        no.parentNode.removeChild(no);
        createEditButton(newTask);
    })
}

function removeAll() {
    var cfm = confirm("Are you sure?"); //Confirma a remoção de todas as tasks
    if (cfm == true) {
        let trash = document.getElementById("taskList");
        //Enquanto o node trash possuir filhos, delete o primeiro filho
        while (trash.firstChild) {
            trash.removeChild(trash.firstChild);
        }
        document.getElementById("textBox").value = ""; //Deixa a textBox em branco 
    }
}