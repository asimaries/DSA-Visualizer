const ul = document.getElementsByTagName("ul")[0];
const fele = document.getElementById("frontval");
const bele = document.getElementById("backval");
const inp = document.getElementsByTagName("input");
const queuetype = document.getElementsByName('queuetype');
const code = document.getElementsByTagName('code')[0];
const caption = document.getElementById('caption');
const errer = document.getElementById('error');
const tab = `&nbsp;&nbsp;&nbsp;&nbsp;`;
let codesstr = [
`void enque(Type value=(<mark id="value"></mark>)) {
<br>${tab}// <i>cap</i> is capacity of <i>QUEUE</i>
<br>${tab}if (size == cap) {
<br>${tab}${tab}return;
<br>${tab}}
<br>${tab}else {
<br>${tab}${tab}arr[(((front + size++ - 1) % cap) + 1) % cap] = x;
<br>${tab}}
<br>}`,
`void deque() {
<br>${tab}// <i>cap</i> is capacity of <i>QUEUE</i>
<br>${tab}if (size == 0) {
<br>${tab}${tab}return;
<br>${tab}}
<br>${tab}else {
<br>${tab}${tab}front = (front + 1) % cap;
<br>${tab}${tab}size--;
<br>${tab}}
<br>}`,
`void enque(Type value=(<mark id="value"></mark>)) {
<br>${tab}Node *new_node = new Node(value);
<br>${tab}if (head == NULL) {
<br>${tab}${tab}head = new_node;
<br>${tab}${tab}tail = new_node;
<br>${tab}}
<br>${tab}else {
<br>${tab}${tab}tail->next = new_node;
<br>${tab}${tab}tail = new_node;
<br>${tab}}
<br>${tab}size++;
<br>}`,
`void deque() {
<br>${tab}if (head == NULL) {
<br>${tab}${tab}return;
<br>${tab}}
<br>${tab}else {
<br>${tab}${tab}Node *temp = head;
<br>${tab}${tab}head = head->next;
<br>${tab}${tab}delete temp;
<br>${tab}${tab}size--;
<br>${tab}}
<br>}`
]	
let size = 3, usersize = 10;
let element = `<span class="arrow"></span>
			<span class="ele"></span>`;
inp[1].value = usersize;
function setFront() {
	ul.firstElementChild.firstElementChild.hidden = true;
	fele.innerText = ul.firstElementChild.innerText;
}
function setBack() {
	bele.innerText = ul.lastElementChild.innerText;
}
function setSIZE() {
	const siz = document.getElementById("size");
	siz.textContent = size;
}
function userSETsize() {
	usersize = Number(inp[1].value);
}
function push() {
	if (size === usersize) {
		if ( errer.innerHTML === `&nbsp;`)
		errer.appendChild(document.createTextNode("QUEUE Overflow!"));
		return;
	}

	const val = inp[0].value;
	if (val == "") {
		alert("Please enter a value")
		caption.innerText = "Please enter a value"
		return;
	}

	errer.innerHTML = `&nbsp;`;
	if (queuetype[0].checked) {
		code.innerHTML = codesstr[0]
	} else {
		code.innerHTML = codesstr[2]
	}
	caption.innerHTML = `<i>${val}</i> is Enqueued`
	document.getElementById("value").innerText = val;
	inp[0].value = "";
	const li = document.createElement("li");
	li.innerHTML = element;
	li.lastElementChild.textContent = val;
	ul.appendChild(li);
	setTimeout(() => {
		li.classList.add("show");
	}, 100);
	setBack();
	setFront();
	size += 1;
	setSIZE();
}

function pop() {
	if (size === 0  && errer.innerHTML === `&nbsp;`) {
		errer.appendChild(
			document.createTextNode("QUEUE is alreay EMPTY!"),
		);
		return;
	}
	if (queuetype[0].checked) {
		code.innerHTML = codesstr[1]
	} else {
		code.innerHTML = codesstr[3]
	}
	const val = document.getElementsByClassName("ele")[0].innerText;
	caption.innerHTML = `<i>${val}</i> is Dequeued`
	errer.innerHTML = `&nbsp;`;
	ul.firstElementChild.classList.remove("show");
	setTimeout(() => {
		ul.firstElementChild.remove();
		size -= 1;
		if (size === 0) {
			fele.innerText = "null";
			bele.innerText = "null";
		} else {
			setFront();
			setBack();
		}
		setSIZE();
	}, 400);
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