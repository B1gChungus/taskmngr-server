let e = require("express")
let path = require("path")

let app = e()
let { add, remove, get, change } = require("./api")
let funcs = {
    "add": add, "remove": remove, "change": change, "remove": remove
}
app.use(e.urlencoded({ extended: false }))
app.use(e.json())

app.use(e.static("./"))

app.get("/", function (r, re) {
    re.sendFile(path.resolve(__dirname, "index.html"))
})

app.post("/tasks", function (r, re) {
    console.log("thepost")
    let stuff = r.body
    if (stuff) {
        funcs[stuff.type]({ name: stuff.name, description: stuff.description, completed: stuff.completed })
    }
})
app.get("/tasks", function (r, re) {
    get().then(respo => {
        console.log("get request....")
        re.send(respo)
    })
})

app.listen(5000)