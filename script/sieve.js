const inp = document.getElementsByTagName('input');
const container = document.getElementsByClassName('container')[0];
let blockList = document.getElementsByClassName("block");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const start = document.getElementById("start");
const skip = document.getElementById("skip");
let n = inp[0].value = 100;
let delay = 500;
rejectAndEnd = () => {}
deley = document.querySelector('#speed').valueAsNumber;
let wait = false;
function setSize() {
    n = inp[0].value;
    rejectAndEnd()
    rejectAndEnd = () => {}
    generate();
}
function generate() {
    start.removeAttribute('disabled');
    pause.setAttribute('disabled', 'true');
    skip.setAttribute('disabled', 'true');
    container.innerHTML = ``;
    n = Number(inp[0].valueAsNumber);
    for (let i = 1; i <= n; i++) {
        let block = document.createElement('div');
        block.append(document.createElement("h3").textContent = i);
        block.classList.add("block");
        container.appendChild(block);
    }
    blockList[0].classList.add('whte')
}

function pauser() {
    return new Promise(resolve => {
        let playbuttonclick = function () {
            pause.removeAttribute("disabled")
            play.setAttribute("disabled", "true")
            play.removeEventListener("click", playbuttonclick);
            wait = false;
            resolve(true);
        }
        rejectAndEnd = function () {
          wait = false;
          pause.removeAttribute("disabled")
          play.setAttribute("disabled", "true")
          play.removeEventListener("click", playbuttonclick)
          resolve(false);
        }
        play.addEventListener("click", playbuttonclick)
        skip.addEventListener("click", playbuttonclick)
    })
}
async function sieve() {
    rejectAndEnd()
    rejectAndEnd = () => {}
    generate();
    start.setAttribute("disabled", "true");
    pause.removeAttribute("disabled");
    skip.removeAttribute("disabled");
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
            deley = document.querySelector('#speed').valueAsNumber;
            blockList[i - 1].classList.remove("whte");
            blockList[i - 1].style.backgroundColor = "yellow";
            await new Promise((res) =>
                setTimeout(() => {
                    res();
                }, delay));
            if (wait) {
                let _temp = await pauser();
                if (!_temp) {
                  return;
                } 
            }
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
document.querySelector('#skip').addEventListener("click", (event) => {
    if (event) {
        inp[1].value = 0;
        inp[1].onchange();
    }
});
inp[1].onchange = ()=>{
    delay = inp[1].valueAsNumber;
    document.querySelector('label').textContent = `SPEED: ${delay/1000}s`
}
generate();
// sieve();
