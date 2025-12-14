const nextQuestionBtn = document.getElementById("next-question-btn")
const factTextElem = document.getElementById("fact-text-elem")
const responseButtonsArr = document.querySelectorAll(".response-btn")
const upperMultiple = 12

nextQuestionBtn.addEventListener("click", getNewFact)
document.addEventListener("click", chooseAnswer)

// generate two operands for the multiplication fact and calculate the product
function getNewFact() {
    const num1 = getRandomNum(upperMultiple)
    const num2 = getRandomNum(12)
    factTextElem.textContent = `${num1} x ${num2}`

    const correctAnswer = num1 * num2
    populateButtonText(correctAnswer)
}

// generate a random index for the response buttons
// display the correct response in the button with the random index
// mark the button with a temporary className 
// display a random number within a suitable range on the other buttons
function populateButtonText(correctAnswer) {
    const numberOfChoices = responseButtonsArr.length
    // subtract 1 as needs to be 0-indexed
    const correctAnswerIndex = getRandomNum(numberOfChoices) - 1

    for (let i = 0; i < numberOfChoices; i++) {
        if (i === correctAnswerIndex) {
            const targetButton = responseButtonsArr[i]
            targetButton.textContent = correctAnswer
            targetButton.classList.add("correct")
        }
        else {
            // we do not want a random answer to be the same as the correct answer
            let randomAnswer
            do {
                randomAnswer = getRandomNum(upperMultiple * 12)
                responseButtonsArr[i].textContent = randomAnswer
            } while (
                randomAnswer === correctAnswer
            )
            
        }
    }
}

// if the user clicks on the button with the temporary className reward them with a confetti celebration
// remove the marker className from the button
function chooseAnswer(event) {
    const targetClassList = event.target.classList
    if(targetClassList.contains("correct")) {
        const rect = event.target.getBoundingClientRect();

        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const originX = buttonCenterX / window.innerWidth;
        const originY = buttonCenterY / window.innerHeight;

        confetti({
            particleCount: 200,
            spread: 70,
            origin: { x: originX, y: originY }
        });

        targetClassList.remove("correct")   
    }  
}

function getRandomNum(upperValue) {
    return Math.floor(Math.random() * upperValue + 1)
}
