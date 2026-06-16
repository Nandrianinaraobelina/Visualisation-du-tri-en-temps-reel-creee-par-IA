const sourceCode = `def insertionSort(a):
    n = len(a)
    for i in range(1, n):
        key = a[i]
        j = i
        while j > 0 and a[j - 1] > key:
            a[j] = a[j - 1]
            j -= 1
        a[j] = key`;

const defaultCustomCode = `async function customSort(arr, tools) {
    let n = arr.length;

    // Exemple d'un Tri à Bulles (Bubble Sort) entièrement animé !
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            // 1. On illumine et compare les deux barres voisines
            let doitChanger = await tools.compare(j, j + 1);

            if (doitChanger) {
                // 2. On inverse les valeurs visuellement si nécessaire
                await tools.swap(j, j + 1);
            }
        }
    }
    // 3. On termine proprement l'animation
    await tools.done();
}`;

// ============================================
// ÉTAT DE L'APPLICATION
// ============================================
const state = {
    array: [],
    isRunning: false,
    speed: 400,
    arraySize: 9,
};

const elements = {
    arraySize: document.getElementById("arraySize"),
    generateBtn: document.getElementById("generateBtn"),
    startBtn: document.getElementById("startBtn"),
    speedSlider: document.getElementById("speedSlider"),
    speedValue: document.getElementById("speedValue"),
    barsContainer: document.getElementById("barsContainer"),
    actionMessage: document.getElementById("actionMessage"),
    toggleCodeBtn: document.getElementById("toggleCodeBtn"),
    codeContent: document.getElementById("codeContent"),
    codeText: document.getElementById("codeText"),
    lineNumbers: document.getElementById("lineNumbers"),
    toggleCustomCodeBtn: document.getElementById("toggleCustomCodeBtn"),
    customCodeContent: document.getElementById("customCodeContent"),
    customCodeEditor: document.getElementById("customCodeEditor"),
    testCustomCodeBtn: document.getElementById("testCustomCodeBtn"),
    resetCodeBtn: document.getElementById("resetCodeBtn"),
    errorMessage: document.getElementById("errorMessage"),
};

// Événements
elements.generateBtn.addEventListener("click", generateArray);
elements.startBtn.addEventListener("click", startSorting);
elements.speedSlider.addEventListener("input", updateSpeed);
elements.toggleCodeBtn.addEventListener("click", () =>
    elements.codeContent.classList.toggle("visible"),
);
elements.toggleCustomCodeBtn.addEventListener("click", () =>
    elements.customCodeContent.classList.toggle("visible"),
);
elements.resetCodeBtn.addEventListener("click", resetCustomCode);
elements.testCustomCodeBtn.addEventListener("click", executeCustomCode);

// Initialisation
initializeCodeDisplay();
resetCustomCode();
generateArray();

function initializeCodeDisplay() {
    const lines = sourceCode.split("\n");
    elements.lineNumbers.innerHTML = lines
        .map((_, i) => `<div>${i + 1}</div>`)
        .join("");
    elements.codeText.innerHTML = lines
        .map((line, i) => {
            let formatted = line
                .replace(/def /g, '<span class="keyword">def </span>')
                .replace(/range/g, '<span class="function">range</span>')
                .replace(/len/g, '<span class="function">len</span>')
                .replace(/while /g, '<span class="keyword">while </span>')
                .replace(/for /g, '<span class="keyword">for </span>')
                .replace(/in /g, '<span class="keyword">in </span>')
                .replace(/and /g, '<span class="keyword">and </span>')
                .replace(/[0-9]+/g, '<span class="number">$&</span>')
                .replace(/([a-z_]+)\(/g, '<span class="function">$1</span>(');
            return `<div class="code-line" id="line-${i + 1}">${formatted}</div>`;
        })
        .join("");
}

function resetCustomCode() {
    elements.customCodeEditor.value = defaultCustomCode;
    clearError();
}

function clearError() {
    elements.errorMessage.textContent = "";
    elements.errorMessage.className = "error-message";
}

function generateArray() {
    if (state.isRunning) return;
    const size = parseInt(elements.arraySize.value);
    if (isNaN(size) || size < 5 || size > 15) {
        alert("Size must be between 5 and 15");
        return;
    }
    state.arraySize = size;
    state.array = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    renderBars();
    elements.startBtn.removeAttribute("disabled");
    elements.testCustomCodeBtn.removeAttribute("disabled");
    elements.actionMessage.textContent = "New array generated. Ready to sort!";
    clearHighlight();
}

function renderBars() {
    elements.barsContainer.innerHTML = state.array
        .map(
            (val, idx) => `
        <div class="bar-item" id="item-${idx}">
            <div class="key-label" id="label-${idx}">KEY</div>
            <div class="bar" id="bar-${idx}">${val}</div>
        </div>
    `,
        )
        .join("");
}

function updateSpeed() {
    state.speed = parseInt(elements.speedSlider.value);
    elements.speedValue.textContent = `${state.speed}ms`;
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, state.speed));
}

function setGUIRunning(running) {
    state.isRunning = running;
    if (running) {
        elements.generateBtn.setAttribute("disabled", "true");
        elements.startBtn.setAttribute("disabled", "true");
        elements.testCustomCodeBtn.setAttribute("disabled", "true");
        elements.arraySize.setAttribute("disabled", "true");
    } else {
        elements.generateBtn.removeAttribute("disabled");
        elements.startBtn.removeAttribute("disabled");
        elements.testCustomCodeBtn.removeAttribute("disabled");
        elements.arraySize.removeAttribute("disabled");
    }
}

function highlightLine(lineNum) {
    clearHighlight();
    const el = document.getElementById(`line-${lineNum}`);
    if (el) el.classList.add("highlight");
}

function clearHighlight() {
    document
        .querySelectorAll(".code-line")
        .forEach((el) => el.classList.remove("highlight"));
}

async function startSorting() {
    if (state.isRunning) return;
    setGUIRunning(true);
    elements.codeContent.classList.add("visible");

    let a = [...state.array];
    let n = a.length;

    // Animation initiale
    document.getElementById("bar-0").classList.add("sorted");

    for (let i = 1; i < n; i++) {
        highlightLine(3); // for i in range(1, n)
        let key = a[i];
        let j = i;

        const currentBar = document.getElementById(`bar-${i}`);
        const currentLabel = document.getElementById(`label-${i}`);

        currentBar.classList.add("current");
        currentLabel.classList.add("visible");
        elements.actionMessage.textContent = `Picked key: ${key} at index ${i}`;
        highlightLine(4); // key = a[i]
        await sleep();
        highlightLine(5); // j = i
        await sleep();

        while (j > 0) {
            highlightLine(6); // while j > 0 and a[j-1] > key
            elements.actionMessage.textContent = `Comparing key (${key}) with ${a[j - 1]}`;

            const compareBar = document.getElementById(`bar-${j - 1}`);
            compareBar.classList.add("comparing");
            await sleep();

            if (a[j - 1] > key) {
                elements.actionMessage.textContent = `${a[j - 1]} > ${key}, shifting right`;
                highlightLine(7); // a[j] = a[j-1]

                // Changement de valeur visuel (décalage)
                a[j] = a[j - 1];
                document.getElementById(`bar-${j}`).textContent = a[j];
                document.getElementById(`bar-${j}`).classList.add("sorted");

                compareBar.classList.remove("comparing");

                // Déplacer visuellement le focus de la clé
                currentLabel.classList.remove("visible");
                currentBar.classList.remove("current");

                j--;
                highlightLine(8); // j -= 1

                const nextBar = document.getElementById(`bar-${j}`);
                const nextLabel = document.getElementById(`label-${j}`);
                nextBar.classList.add("current");
                nextLabel.classList.add("visible");

                await sleep();
            } else {
                compareBar.classList.remove("comparing");
                break;
            }
        }

        elements.actionMessage.textContent = `Inserting key (${key}) at index ${j}`;
        highlightLine(9); // a[j] = key
        a[j] = key;

        const finalBar = document.getElementById(`bar-${j}`);
        finalBar.textContent = key;
        finalBar.classList.remove("current");
        finalBar.classList.add("sorted");
        document.getElementById(`label-${j}`).classList.remove("visible");

        // Assurer que tout le préfixe est marqué vert
        for (let k = 0; k <= i; k++) {
            document.getElementById(`bar-${k}`).classList.add("sorted");
        }
        await sleep();
    }

    clearHighlight();
    elements.actionMessage.textContent = "Array fully sorted successfully !";
    setGUIRunning(false);
}

async function executeCustomCode() {
    if (state.isRunning) return;
    clearError();

    const userCode = elements.customCodeEditor.value;
    let customSortFunc;

    try {
        // Validation basique par parsing dynamique
        const creationContainer = new Function(`return (${userCode});`);
        customSortFunc = creationContainer();
        if (typeof customSortFunc !== "function") {
            throw new Error("Le code doit définir une fonction principale.");
        }
    } catch (err) {
        elements.errorMessage.textContent = `Erreur de Syntaxe: ${err.message}`;
        elements.errorMessage.className = "error-message error";
        return;
    }

    setGUIRunning(true);
    let workingArray = [...state.array];

    // Objet d'outils d'animations injecté pour l'utilisateur
    const animationTools = {
        compare: async (idx1, idx2) => {
            if (idx1 >= workingArray.length || idx2 >= workingArray.length || idx1 < 0 || idx2 < 0) {
                throw new Error(`Index out of bounds lors de compare(${idx1}, ${idx2})`);
            }
            elements.actionMessage.textContent = `Custom Code: Comparing index ${idx1} and ${idx2}`;
            const b1 = document.getElementById(`bar-${idx1}`);
            const b2 = document.getElementById(`bar-${idx2}`);
            b1.classList.add("comparing");
            b2.classList.add("comparing");
            await sleep();
            b1.classList.remove("comparing");
            b2.classList.remove("comparing");
            return workingArray[idx1] > workingArray[idx2];
        },
        swap: async (idx1, idx2) => {
            if (idx1 >= workingArray.length || idx2 >= workingArray.length || idx1 < 0 || idx2 < 0) {
                throw new Error(`Index out of bounds lors de swap(${idx1}, ${idx2})`);
            }
            elements.actionMessage.textContent = `Custom Code: Swapping index ${idx1} ↔ ${idx2}`;
            const b1 = document.getElementById(`bar-${idx1}`);
            const b2 = document.getElementById(`bar-${idx2}`);

            b1.classList.add("current");
            b2.classList.add("current");
            await sleep();

            let tmp = workingArray[idx1];
            workingArray[idx1] = workingArray[idx2];
            workingArray[idx2] = tmp;

            b1.textContent = workingArray[idx1];
            b2.textContent = workingArray[idx2];

            b1.classList.remove("current");
            b2.classList.remove("current");
            await sleep();
        },
        done: async () => {
            elements.actionMessage.textContent = "Custom Algorithm finished execution !";
            for (let i = 0; i < workingArray.length; i++) {
                document.getElementById(`bar-${i}`).classList.add("sorted");
            }
        },
    };

    try {
        await customSortFunc(workingArray, animationTools);
        elements.errorMessage.textContent = "Algorithme exécuté sans erreur.";
        elements.errorMessage.className = "error-message success";
    } catch (runtimeErr) {
        elements.errorMessage.textContent = `Erreur d'Exécution: ${runtimeErr.message}`;
        elements.errorMessage.className = "error-message error";
    } finally {
        setGUIRunning(false);
    }
}