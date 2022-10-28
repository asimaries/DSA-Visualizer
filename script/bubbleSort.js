const container = document.getElementById("array");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const inp = document.getElementsByTagName('input');
let size = 15;
let arr = [];
let wait = false;
function createArray() {
	arr = inp[0].value.split(`,`).map(x => +x)
	generatearray();
}

function setSize() {
	size = Number(inp[1].value);
}

function generatearray() {
	arr = arr.filter((x) => { return x > 0 })
	pause.setAttribute("disabled", "true")
	play.setAttribute("disabled", "true")
	container.innerHTML = ``;
	size = inp[1].value = arr.length;
	let extra = 10;
	for (let i in arr) {
		let ht = arr[i];
		if (ht > 100) { ht = 100 + extra;}
		const array_ele = document.createElement("div");
		array_ele.classList.add("block");
		array_ele.style.height = `${ht * 3}px`;
		array_ele.style.transform = `translate(${i * 30}px)`;

		const array_ele_label = document.createElement("label");
		array_ele_label.classList.add("block_id");
		array_ele_label.innerText = arr[i];

		container.appendChild(array_ele);
		array_ele.appendChild(array_ele_label);
	};
}

function generateRandomarray() {
	arr = [];
	for (let i = 0; i < size; i++) {
		const value = Math.ceil(Math.random() * 100);
		arr.push(value);
	}
	inp[0].value = arr;
	generatearray();
}

function swap(el1, el2) {
	return new Promise((resolve) => {

		let temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;
		window.requestAnimationFrame(function () {

			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}
function pauser() {
	return new Promise(resolve => {
		let playbuttonclick = function () {
			pause.removeAttribute("disabled")
			play.setAttribute("disabled", "true")
			play.removeEventListener("click", playbuttonclick);
			wait = false;
			resolve("resolved");
		}
		play.addEventListener("click", playbuttonclick)
	})
}
async function BubbleSort(delay = 100) {

	pause.removeAttribute("disabled");
	let blocks = document.querySelectorAll(".block");
	for (let i = 0; i < blocks.length; i += 1) {
		for (let j = 0; j < blocks.length - i - 1; j += 1) {

			blocks[j].style.backgroundColor = "#ff0000";
			if (wait) await pauser();
			blocks[j + 1].style.backgroundColor = "#ff0000";

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);
			console.log("run");
			const value1 = Number(blocks[j].childNodes[0].innerHTML);
			const value2 = Number(blocks[j + 1]
				.childNodes[0].innerHTML);

			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}
			blocks[j].style.backgroundColor = "#3c80c0";
			blocks[j + 1].style.backgroundColor = "#3c80c0";
		}

		blocks[blocks.length - i - 1]
			.style.backgroundColor = "#0f0";
	}
}

pause.addEventListener("click", function () {
	wait = true;
	pause.setAttribute("disabled", "true")
	play.removeAttribute("disabled")
})
inp[0].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		createArray();
	}
});
inp[1].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		setSize();
	}
});

generateRandomarray();