document.addEventListener('DOMContentLoaded',function(event){
    const dataText = [ "Hello!", "My name is...", "Aibek Saaliev"];

    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
                StartTextAnimation(0);
            }, 20000);
        }
        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function(){
                StartTextAnimation(i + 1);
            });
        }
    }
    StartTextAnimation(0);
});

// const circularProgress = document.querySelectorAll(".circular-progress");
//
// Array.from(circularProgress).forEach((progressBar) => {
//     const progressValue = progressBar.querySelector(".circular-progress__percentage");
//     const innerCircle = progressBar.querySelector(".circular-progress__inner-circle");
//     let startValue = 0,
//         endValue = Number(progressBar.getAttribute("data-percentage")),
//         speed = 50,
//         progressColor = progressBar.getAttribute("data-progress-color");
//
//     const progress = setInterval(() => {
//         startValue++;
//         progressValue.textContent = `${startValue}%`;
//         progressValue.style.color = `${progressColor}`;
//
//         innerCircle.style.backgroundColor = `${progressBar.getAttribute(
//             "data-inner-circle-color"
//         )}`;
//
//         progressBar.style.background = `conic-gradient(${progressColor} ${
//             startValue * 3.6
//         }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
//         if (startValue === endValue) {
//             clearInterval(progress);
//         }
//     }, speed);
// });

const circularProgressElements = document.querySelectorAll(".circular-progress");
const options = {
    root: null, // Используем видимую область браузера как корневой элемент
    rootMargin: "0px",
    threshold: 0.5, // Порог видимости элемента
};

function runCircularProgressOnIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progressValue = progressBar.querySelector(".circular-progress__percentage");
            const innerCircle = progressBar.querySelector(".circular-progress__inner-circle");
            let startValue = 0,
                endValue = Number(progressBar.getAttribute("data-percentage")),
                speed = 50,
                progressColor = progressBar.getAttribute("data-progress-color");

            const progress = setInterval(() => {
                startValue++;
                progressValue.textContent = `${startValue}%`;
                progressValue.style.color = `${progressColor}`;

                innerCircle.style.backgroundColor = `${progressBar.getAttribute(
                    "data-inner-circle-color"
                )}`;

                progressBar.style.background = `conic-gradient(${progressColor} ${
                    startValue * 3.6
                }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
                if (startValue === endValue) {
                    clearInterval(progress);
                    observer.unobserve(progressBar); // Прекращаем отслеживать элемент после запуска анимации
                }
            }, speed);
        }
    });
}

// Создаем экземпляр Intersection Observer
const observer = new IntersectionObserver(runCircularProgressOnIntersection, options);

// Начинаем отслеживать каждый элемент
circularProgressElements.forEach((progressBar) => {
    observer.observe(progressBar);
});





function runCircularProgress(event) {
    const progressBar = event.target.closest(".circular-progress");
    const progressValue = progressBar.querySelector(".circular-progress__percentage");
    const innerCircle = progressBar.querySelector(".circular-progress__inner-circle");
    let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 50,
        progressColor = progressBar.getAttribute("data-progress-color");

    const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}%`;
        progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
            "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${
            startValue * 3.6
        }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
        if (startValue === endValue) {
            clearInterval(progress);
        }
    }, speed);

    progressBar.addEventListener("mouseleave", () => {
        clearInterval(progress);
        startValue = 0;
        progressValue.textContent = `${endValue.toString()}%`;
        progressValue.style.color = progressColor;
        innerCircle.style.backgroundColor = "#222222";
        progressBar.style.background = `conic-gradient(${progressColor} ${
            endValue * 3.6
        }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    });
}

function downloadCV() {
    const fileUrl = 'pdf/Software Engineer Resume in Red Black Simple Style.pdf';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'CV Frontend Aibek Saaliev.pdf';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

