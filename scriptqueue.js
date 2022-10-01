const ul = document.getElementById("canvas");
const fele = document.getElementById("frontval");
const bele = document.getElementById("backval");
const inp = document.getElementsByTagName("input");
let element = `<div class="arrow"></div>
                <div class="ele"></div>`;
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
let size = 3, usersize = 15;
function userSETsize() {
	usersize = Number(inp[1].value);
}
function push() {
	if (size === usersize) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("QUEUE Overflow!"));
		return;
	}
	document.getElementById("error").textContent = "";
	const val = inp[0].value;
	inp[0].value = "";
	console.log(val);
	const li = document.createElement("li");
	li.innerHTML = element;
	li.lastElementChild.textContent = val;
	ul.appendChild(li);
	setBack();
	setFront();
	size += 1;
	setSIZE();
}
function pop() {
	if (size === 0) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("QUEUE is alreay EMPTY!"));
	}
	ul.removeChild(ul.firstElementChild);
	size -= 1;
	if (size === 0) {
		fele.innerText = "null";
		bele.innerText = "null";
	} else {
		setFront();
		setBack();
	}
	setSIZE();
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
