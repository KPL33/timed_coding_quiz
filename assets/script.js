/* The first screen displays an article with ID 'intro' to the 'quiz'. This 'let' targets the 'intro' article so that it can be populated by new content later. */
let introArticle = document.querySelector('#intro');

/* We want new content to show in the html 'document' when the 'start' button shown on the 'intro' screen is clicked, so we use a 'querySelector' to target the button with ID 'start'. */
let startButton = document.querySelector('#start');

/* Similarly, we create a 'querySelector' that updates the contents of the <section> with class 'game' in the html with the appropriate content (i.e., switching from displaying the 'intro' screen to the questions of the quiz themselves). */
let gameSection = document.querySelector('.game');

/* One more 'let' uses a 'querySelector' to target the <article> with ID 'quiz', so that it can be dynamically updated with new content (i.e., the  questions and their answers), depending on the user's progress through the array of 5 questions they'll be asked.*/
let quizArticle = document.querySelector('#quiz');

let currentQuestion = 0;

/* We declare a new 'object' called 'questions' that holds our array of questions and answers. Each of our 5 questions is made of essentially 3 parts: 1) The question itself. 2) The answers from which the user can choose and 3) The correct answer. 'title' is simply a string. It shows the user the question, in plain text. 'choices' holds an array of the options the user can choose as their answer. 'correct' assigns the correct answer. Later in this code, the value of 'correct' will be directly compared to the user's choice on each question.*/
let questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        correct: 'alerts'
    },
    {
        title: 'The condition in an if/else statement is enclosed within____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        correct: 'parentheses'
    },
    {
        title: 'Arrays in JavaScript can be used to store____.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correct: 'all of the above'
    },
    {
        title: 'String values must be enclosed within____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        correct: 'quotes'
    },
    {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correct: 'console.log'
    },

];

/* We then create a function that 'starts' the 'Quiz' when the user clicks the 'startButton'. The <article> with ID 'quiz' is actually always present, but this function changes its initial display from 'none' (which is assigned in the css) to 'flex' when the click occurs, letting 'quiz' show on the page. Then, 'gameSection 'replaces' the 'Child' of quiz with the contents of 'quizArticle', */
function startQuiz() {
    quizArticle.style.display = 'flex';
    gameSection.replaceChild(quizArticle, gameSection.firstElementChild);
    generateQuestions();
}

/* We then 'add' an 'EventListener' to 'listen' for when a 'click' is made on the 'startButton'. When it is, the article with ID 'intro' is replaced by the article with ID 'quiz'. */
startButton.addEventListener('click', startQuiz);

/* Here, we target our 'Time:' element in the html.*/
// var timerEl=document.getElementById('time');

// function countdown ( {
//     var timeLeft = 75;
//     var timeLeft--;
//     timerEl.textContent=timeLeft 
// })


/*This function 'generates' each of the 5 the 'Questions', by using 'getElementById' to target the <h3> with ID 'question-title' and <section> with ID 'button-zone' in the html and populating them with the strings stored in our 'questions' array. It starts both the 'questionTitle' and 'questionChoice' at the first item in the corresponding arrays that are assigned above (index 0).*/
function generateQuestions() {
    let questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = questions[0].title;
    let questionChoicesEl = document.getElementById('button-zone');
    for (let i = 0; i < questions[0].choices.length; i++) {
        let tempBtn = document.createElement('button');
        tempBtn.textContent = i + 1 + '. ' + questions[0].choices[i];
        tempBtn.onclick = checkAnswer;
        tempBtn.className = 'button';
        questionChoicesEl.appendChild(tempBtn);
    }
}

quizArticle.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        checkAnswer(event.target.textContent.trim());
        generateQuestions();
    }
});

function checkAnswer(choice) {
    if (choice === questions[currentQuestion].correct) {
        let resultEl = document.createElement('p');
        resultEl.textContent = 'You are correct!';
        resultEl.className = 'result';
        quizArticle.appendChild(resultEl);
    } else {
        let resultEl = document.createElement('p');
        resultEl.textContent = 'That is incorrect.';
        resultEl.className = 'result';
        quizArticle.appendChild(resultEl);
    }
    currentQuestion++;
    if(currentQuestion < questions.length) {
        generateQuestions();
    } else {
        endQuiz();
    }
}



//This proves that it is calling the function in the console.
// function checkAnswer() {
//     let userChoice = this.textContent;
//     let correctAnswer = questions[0].correct;
//     if (userChoice === correctAnswer) {
//         console.log('You are correct!');

//     };
// }

// highscores.style.display = 'none';
// time.style.display = 'none';

// let button1 = document.getElementById('b1');
// let button2 = document.getElementById('b2');
// let button3 = document.getElementById('b3');
// let button4 = document.getElementById('b4');

/* We do this so that we can use a querySelector to 'listen' for a 'click' on each, which is set up below. */

/* We also declare more 'selectors' to target elements in the html that we want to change with user interaction. 'gameSection' shows the Javascript what we consider to be the area that the 'game' itself will take place'. This area will populate with new 'articles', with IDs 'quiz–q5' (one ID assigned to the content for each question in the quiz).*/

/* Here, we declare the 4 buttons that will appear on all of our question 'screens'. */



//Need all ID=q to update with 'Correct' or 'Wrong' message, depending on answer, with a gray hz line separating this text from the question section above it.

//Need set-up Timer.

//Need create 'done' screen.

//Need create field for initials entry, with submit button. Need to store input from this field so that initials and scores are viewable.

//Need to view list of initials and scores when 'View high scores' clicked on 'into' screen.