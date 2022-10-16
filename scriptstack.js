let size = 3;
const inp = document.getElementsByTagName("input");
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
	if (size === 10) {
		document
			.getElementById("error")
			.appendChild(document.createTextNode("STACK Overflow!"));
		return;
	}
	document.getElementById("error").textContent = "";
	const val = inp[0].value;
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
inp[0].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		push();
	}
});
