let size = 3;
const inp = document.getElementsByTagName("input")[0];
const ul = document.getElementById("canvas").firstElementChild;
const siz = document.getElementById("size");
function setSIZE() {
    siz.textContent = size;
}
function setTop() {
    if (size === 0) document.getElementById("topval").innerText = "NULL";
    else
        document.getElementById("topval").innerText =
            document.getElementById(
                "canvas"
            ).firstElementChild.firstElementChild.innerText;
}
function pop() {
    if (size === 0) {
        document
            .getElementById("error")
            .appendChild(document.createTextNode("STACK underflow!"));
        return;
    }
    size -= 1;
    ul.removeChild(ul.firstElementChild);
    setSIZE();
    setTop();
}
function push() {
    if (size === 13) {
        document
            .getElementById("error")
            .appendChild(document.createTextNode("STACK Overflow!"));
        return;
    }
    document.getElementById("error").textContent = "";
    const val = inp.value;
    inp.value = "";
    console.log(val);
    const li = document.createElement("li");
    li.textContent = val;
    ul.prepend(li);
    size += 1;
    setSIZE();
    setTop();
}
