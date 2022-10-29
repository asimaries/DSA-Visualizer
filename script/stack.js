let size = 3, usersize = 9;
const inp = document.getElementsByTagName("input");
const ul = document.getElementById("canvas").firstElementChild;
const siz = document.getElementById("size");
const queuetype = document.getElementsByName('queuetype');
const code = document.getElementsByTagName('code')[0];
const caption = document.getElementById('caption');
const tab = `&nbsp;&nbsp;&nbsp;&nbsp;`;
let codesstr = [
	`void push(Type value=(<mark id="value"></mark>)) {
	<br>${tab}if (top == cap - 1) {
	<br>${tab}${tab}cout << "Overflow " << x << " cannot be push\n";
	<br>${tab}}
	<br>${tab}else {
	<br>${tab}${tab}arr[++top] = x;
	<br>${tab}}
	<br>}`,
	`void pop() {
	<br>${tab}if (top == -1) {
	<br>${tab}${tab}cout << "underflow\n";
	<br>${tab}}
	<br>${tab}else {
	<br>${tab}${tab}arr[top--] = 0;
	<br>${tab}}
	<br>}`,
	`void push(Type value=(<mark id="value"></mark>)) {
	<br>${tab}Node *new_node = new Node(x);
	<br>${tab}if (head == NULL) {
	<br>${tab}${tab}head = new_node;
	<br>${tab}}
	<br>${tab}else {
	<br>${tab}${tab}new_node->next = head;
	<br>${tab}${tab}head = new_node;
	<br>${tab}}
	<br>${tab}size++;
	<br>}`,
	`void pop() {
	<br>${tab}if (size == 0 && head == NULL) {
	<br>${tab}${tab}cout << "underflow: stack is empty ";
	<br>${tab}${tab}return 0;
	<br>${tab}}
	<br>${tab}else {
	<br>${tab}${tab}Node *temp = head;
	<br>${tab}${tab}head = head->next;
	<br>${tab}${tab}delete temp;
	<br>${tab}${tab}size--;
	<br>${tab}}
	<br>}`
	]
	
function setSIZE() {
	siz.textContent = size;
}
inp[1].value = usersize;
function setTop() {
	if (size === 0)
		document.getElementById("topval").textContent = "NULL";
	else
		document.getElementById("topval").textContent = ul.firstElementChild.innerText;
}
function pop() {
	if (size === 0 && document
		.getElementById("error").innerHTML === `&nbsp;`) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("STACK underflow!"));
		return;
	}

	if (queuetype[0].checked) {
		code.innerHTML = codesstr[1]
	} else {
		code.innerHTML = codesstr[3]
	}
	const val = ul.firstElementChild.textContent;
	caption.innerHTML = `<i>${val}</i> is Popped`
	document.getElementById("error").innerHTML = `&nbsp;`;
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
		if (document.getElementById("error").innerHTML === `&nbsp;`) {
			document
				.getElementById("error")
				.appendChild(document.createTextNode("STACK Overflow!"));
			caption.innerText = "STACK Overflow!";
		}
		return;
	}
	const val = inp[0].value;
	if (val == "") {
		alert("Please enter a value")
		caption.innerText = "Please enter a value"
		return;
	}
	if (queuetype[0].checked) {
		code.innerHTML = codesstr[0]
	} else {
		code.innerHTML = codesstr[2]
	}
	caption.innerHTML = `<i>${val}</i> is Pushed`
	document.getElementById("value").innerText = val;
	document.getElementById("error").innerHTML = `&nbsp;`;
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

