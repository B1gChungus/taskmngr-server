
var itemname = document.getElementById("name")
var desc = document.getElementById("description")
var tasks = document.getElementById("tasks")
var taskdiv = document.getElementsByClassName("task")[0].cloneNode(true)
document.getElementsByClassName("task")[0].remove()

async function send(type, data) {
    let body = {
        method: type,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    if (!data) {
        body = {
            method: type,
            headers: { 'Content-Type': 'application/json' },
        }
    }
    return fetch("/tasks", body).then((r) => r.json()).then((r) => { return r })
}

async function getalltasks() {
    let json = await send("GET")
    return json
}

function addtask(data) {
    data = data || {}
    let done = data.completed || false
    let mouseTimer
    let newtask = taskdiv.cloneNode(true)
    let name = data.name || itemname.value
    let descrip = data.description || desc.value
    let completeobj = newtask.children[2]
    newtask.children[0].children[0].textContent = name
    newtask.children[1].textContent = descrip
    function changetruefalse() {
        completeobj.children[0].textContent = (done == true && "true") || "false"
        completeobj.children[0].style.color = (done == false && "rgb(255, 125, 125)") || "rgb(52, 248, 118)"
    }
    let c1 = completeobj.addEventListener("click", function () {
        send("POST", { type: "change", name: name, description: descrip, completed: done })
        done = !done
        changetruefalse()
    })
    function mdown() {
        mup();
        mouseTimer = window.setTimeout(troll, 1000); //set timeout to fire in 2 seconds when the user presses mouse button down
    }
    function mup() {
        if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
    }
    function troll() {
        removeEventListener(completeobj, c1)
        removeEventListener(completeobj, c2)
        removeEventListener(completeobj, c3)
        console.log("remove", name)
        send("POST", { type: "remove", name: name, description: descrip, completed: done })
        newtask.remove()
    }
    changetruefalse()
    let c2 = completeobj.addEventListener("mousedown", mdown);
    let c3 = newtask.addEventListener("mouseup", mup);
    console.log("adding", name, descrip, done)
    send("POST", { type: "add", name: name, description: descrip, completed: done })
    tasks.appendChild(newtask)
}

getalltasks().then(r => {
    for (const [k, v] of Object.entries(r)) {
        console.log(v)
        addtask({ name: v.name, description: v.description, completed: v.completed })
    }
})