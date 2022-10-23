let size = 3, usersize = 9;
const inp = document.getElementsByTagName("input");
const ul = document.getElementById("canvas").firstElementChild;
const siz = document.getElementById("size");
const code = document.getElementsByTagName('code')[0];

function setSIZE() {
	siz.textContent = size;
}
inp[1].value = usersize;
function setTop() {
	if (size === 0) document.getElementById("topval").innerText = "NULL";
	else
		document.getElementById("topval").innerText =
			document.getElementById(
				"canvas",
			).firstElementChild.firstElementChild.innerText;
}
function pop() {
	if (size === 0) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("STACK underflow!"));
		return;
	}
	code.innerText = `void pop() {
        if (size == 0 && head == NULL) {
            cerr << "STACK underflow!";
            return;
        }
        else {// size is greater then 1 or not empty
            int res = head->data;
            Node *temp = head;
            head = head->next;
    delete temp;
	size--;
    }
}`
	document.getElementById("error").textContent = "";
	size -= 1;
	ul.firstElementChild.classList.remove("show");
	setTimeout(() => {
		ul.removeChild(ul.firstElementChild);
		setSIZE();
		setTop();
	}, 400);
}
function push() {
	if (size >= usersize) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("STACK Overflow!"));
		return;
	}
	const val = inp[0].value;
	code.innerHTML = `void push(int value=<span style="color: red">${val}</span>) {<br>
        Node *new_node = new Node(value=<span style="color: red">${val}</span>);<br>
        if (head == NULL) {<br>
            head = new_node;<br>
        }<br>
        else {<br>
            new_node->next = head;<br>
            head = new_node;<br>
        }<br>
        size++;<br>
    }<br>`
	document.getElementById("error").textContent = "";
	inp[0].value = "";
	console.log(val);
	const li = document.createElement("li");
	li.textContent = val;
	ul.prepend(li);
	setTimeout(() => {
		li.classList.add("show");
	}, 100);
	size += 1;
	setSIZE();
	setTop();
}
function userSETsize() {
	usersize = Number(inp[1].value);
}
inp[0].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		push();
	}
});
inp[1].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		userSETsize();
	}
});
