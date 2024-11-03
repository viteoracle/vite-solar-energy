document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        // Sample questions
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Shakespeare", "Dickens", "Hemingway", "Tolstoy"],
            answer: "Shakespeare"
        },
        {
            question: "What is the square root of 16?",
            options: ["2", "4", "8", "16"],
            answer: "4"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            answer: "H2O"
        }
        // Add more questions as needed
    ];

    let selectedQuestions = [];

    document.getElementById("selectButton").addEventListener("click", function() {
        selectedQuestions = selectRandomQuestions(questions, 5);
        displayQuestions(selectedQuestions);
        document.getElementById("submitButton").style.display = "block";
    });

    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        evaluateAnswers(selectedQuestions);
    });

    function selectRandomQuestions(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function displayQuestions(questions) {
        const container = document.getElementById("questionsContainer");
        container.innerHTML = "";
        questions.forEach((questionObj, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";
            const questionText = document.createElement("p");
            questionText.textContent = `${index + 1}. ${questionObj.question}`;
            questionDiv.appendChild(questionText);

            const optionsDiv = document.createElement("div");
            optionsDiv.className = "options";

            questionObj.options.forEach(option => {
                const optionLabel = document.createElement("label");
                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question${index}`;
                optionInput.value = option;
                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(option));
                optionsDiv.appendChild(optionLabel);
                optionsDiv.appendChild(document.createElement("br"));
            });

            questionDiv.appendChild(optionsDiv);
            container.appendChild(questionDiv);
        });
    }

    function evaluateAnswers(questions) {
        const container = document.getElementById("questionsContainer");
        let score = 0;

        questions.forEach((questionObj, index) => {
            const selectedOption = container.querySelector(`input[name="question${index}"]:checked`);
            const correctAnswer = questionObj.answer;

            if (selectedOption) {
                if (selectedOption.value === correctAnswer) {
                    score++;
                } else {
                    flagIncorrectAnswer(selectedOption, correctAnswer);
                }
            } else {
                flagUnanswered(container, index, correctAnswer);
            }
        });

        displayResult(score, questions.length);
    }

    function flagIncorrectAnswer(selectedOption, correctAnswer) {
        const parentLabel = selectedOption.parentNode;
        parentLabel.style.color = "red"; // Mark incorrect in red
        const correctLabel = document.createElement("span");
        correctLabel.textContent = ` (Correct answer: ${correctAnswer})`;
        correctLabel.style.color = "green"; // Correct answer in green
        parentLabel.appendChild(correctLabel);
    }

    function flagUnanswered(container, index, correctAnswer) {
        const questionDiv = container.querySelector(`.question:nth-child(${index + 1}) .options`);
        const correctLabel = document.createElement("p");
        correctLabel.textContent = `Correct answer: ${correctAnswer}`;
        correctLabel.style.color = "green"; // Correct answer in green
        questionDiv.appendChild(correctLabel);
    }

    function displayResult(score, total) {
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.textContent = `You scored ${score} out of ${total}.`;
    }
});
