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
    edit.setAttribute("class", "bubbly-button");
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
    newTask.setAttribute("class", "tsk");
    document.getElementById("taskList").appendChild(newTask);

    //Funções que criam botões adicionais
    createTaskContent(newTask);
    createCheckBox(newTask);
    createEditButton(newTask);

    document.getElementById("textBox").value = ""; //Deixa a textBox em branco 
}

function removeTask() { 
    //all é a lista de todos os elementos li, ou seja, todas as taks
    let all = document.getElementById("taskList").childNodes;

    //itero a partir do ultimo elemento de all, deletando todos os itens com checkbox marcada
    for(i=all.length-1; i >=0; i--){
        if(all[i].childNodes[1].checked){
            all[i].parentElement.removeChild(all[i]);
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
            createCheckBox(newTask);
            createEditButton(newTask);
        }
    })

    //Caso Confirm
    yes.addEventListener('click', function () {
        newTask.firstChild.textContent = txt.value;
        txt.parentNode.removeChild(txt);
        yes.parentNode.removeChild(yes);
        no.parentNode.removeChild(no);
        createCheckBox(newTask);
        createEditButton(newTask);
    })

    //Caso Abort
    no.addEventListener('click', function () {
        txt.parentNode.removeChild(txt);
        yes.parentNode.removeChild(yes);
        no.parentNode.removeChild(no);
        createCheckBox(newTask);
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

//------------------------------------------------------BUTTON ANIMATION---------------------------------------------------------------------------------------------------//

var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }