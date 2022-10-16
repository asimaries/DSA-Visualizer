const ul = document.getElementsByClassName("canvas")[0];
			const fele = document.getElementById("frontval");
			const bele = document.getElementById("backval");
			const inp = document.getElementsByTagName("input");
			let size = 3,usersize = 10;
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
					document
						.getElementById("error")
						.appendChild(
							document.createTextNode("QUEUE Overflow!"),
						);
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
				setTimeout(() => {
					li.classList.add("show");
				}, 100);
				setBack();
				setFront();
				size += 1;
				setSIZE();
			}
			function pop() {
				if (size === 0) {
					document.getElementById("error").appendChild(
							document.createTextNode("QUEUE is alreay EMPTY!"),
						);
				return;
				}
				document.getElementById("error").textContent = "";
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