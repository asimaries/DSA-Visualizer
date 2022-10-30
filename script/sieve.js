const inp = document.getElementsByTagName('input');
const container = document.getElementsByClassName('container')[0];
let blockList = document.getElementsByClassName("block");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const start = document.getElementById("start");
let n = inp[0].value = 100;
let wait = false;
function setSize(){
    n = inp[0].value;
    generate();
}
function generate() {
    container.innerHTML = ``;
    n = Number(inp[0].valueAsNumber);
    for (let i = 1; i <= n; i++) {
        let block = document.createElement('div');
        block.append(document.createElement("h3").textContent = i);
        block.classList.add("block");
        container.appendChild(block);
    }
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
async function sieve(delay = 500) {
    generate();
    start.setAttribute("disabled", "true");
	pause.removeAttribute("disabled");
    const sqt = Math.sqrt(n);
    let f = true;
    for (let p = 2; p <= sqt; p++) {
        if (blockList[p - 1].style.backgroundColor == "grey")
            continue;
        if (blockList[p - 1].style.backgroundColor == "white")
            f = true;
        blockList[p - 1].style.backgroundColor = "red";
        // console.log("p" + p);
        for (let i = p * p; i <= n; i += p) {
            // console.log("i" + i);
            if (i - 1 > n) continue;

            blockList[i - 1].classList.remove("whte");
            blockList[i - 1].style.backgroundColor = "yellow";
            await new Promise((res) =>
                setTimeout(() => {
                    res();
                }, delay));
            if (wait) await pauser();
            console.log(i, p)
            blockList[i - 1].style.backgroundColor = "grey";
            blockList[i - 1].classList.add("whte");
        }
        if (f) {
            blockList[p - 1].style.backgroundColor = "white";
        } else
            f = true;
    }
}
pause.addEventListener("click", function () {
	wait = true;
	pause.setAttribute("disabled", "true")
	play.removeAttribute("disabled")
});
inp[0].addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		setSize();
	}
});
generate();
// sieve();