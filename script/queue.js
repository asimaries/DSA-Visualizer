const ul = document.getElementsByTagName("ul")[0];
const fele = document.getElementById("frontval");
const bele = document.getElementById("backval");
const inp = document.getElementsByTagName("input");
const queuetype = document.getElementsByName('queuetype');
const code = document.getElementsByTagName('code')[0];
const caption = document.getElementById('caption');

let codesstr = {
	"0": `void enque(Type value=(<span id="value"></span>)) {
<br>		// <i>cap</i> is capacity of <i>QUEUE</i>
<br>        if (size == cap) {
<br>            return;
<br>        }
<br>        else {
<br>        arr[(((front + size++ - 1) % cap) + 1) % cap] = x;
<br>        }
<br>    }`,
	"1": `void deque() {
<br>		// <i>cap</i> is capacity of <i>QUEUE</i>
<br>		if (size == 0) {
<br>			return;
<br>        }
<br>        else {
<br>            front = (front + 1) % cap;
<br>            size--;
<br>        }
<br>    }`,
	"2": `void enque(Type value=(<span id="value"></span>)){
<br>        Node *new_node = new Node(value);
<br>        if (head == NULL)
<br>        {
<br>            // Node* new_node = new Node(x);
<br>            head = new_node;
<br>            tail = new_node;
<br>        }
<br>        else
<br>        {
<br>            tail->next = new_node;
<br>            tail = new_node;
<br>        }
<br>        size++;
<br>    }`,
	"3": `void deque()
<br>    {
<br>        if (head == NULL)
<br>        {
<br>            return;
<br>        }
<br>        else
<br>        {
<br>            Node *temp = head;
<br>            head = head->next;
<br>            delete temp;
<br>            size--;
<br>        }
<br>    }`
}
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
		document
			.getElementById("error")
			.appendChild(
				document.createTextNode("QUEUE Overflow!"),
			);
		return;
	}

	const val = inp[0].value;
	if (val == "") {
		alert("Please enter a value")
		caption.innerText = "Please enter a value"
		return;
	}

	document.getElementById("error").textContent = "";
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
	if (size === 0) {
		document.getElementById("error").appendChild(
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