/* We want new content to show in the html 'document' when the 'start' button shown on the page is clicked, so we use a 'querySelector' to target the button with ID 'start'. */
let startButton = document.querySelector('#start');

/* Similary, we create a 'querySelector' that updates the contents of the <section> with class 'game' in the html with the appropriate content (i.e., switching from displaying the 'intro/rules' screen to the questions of the quiz themselves). */
let gameSection = document.querySelector('.game');

/* One more 'let' uses a 'querySelector' to target the <article> with ID 'quiz', so that it can be dynamically  updated with new options (i.e., question and answers) as the quiz progresses. depending on the user's progress through the array of 5 questions they'll be asked.*/
let quizArticle = document.querySelector('#quiz');

/* We then create a function that 'starts' the quiz when the user clicks the 'start button'. The <article> with ID 'quiz' is actually always present, but this function changes it's display from 'none' to 'flex', letting it show on the page. Then, 'gameSection 'replace's the 'Child' of quiz*/
function startQuiz() {
    quizArticle.style.display = 'flex';
    gameSection.replaceChild(quizArticle, gameSection.firstElementChild);
    highscores.style.display = 'none';
    time.style.display = 'none';
    generateQuestions();
}

startButton.addEventListener('click', startQuiz);

// title (string), choices (array), correct (string)        
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

];



function generateQuestions() {
    let questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = questions[0].title;
    let questionChoicesEl = document.getElementById('button-zone');
    for (let i = 0; i < 4; i++) {
        let tempBtn = document.createElement('button');
        tempBtn.textContent = i + 1 + '. ' + questions[0].choices[i];
        tempBtn.onclick = checkAnswer;
        tempBtn.className = 'button';
        questionChoicesEl.appendChild(tempBtn);
    }
}

//This proves that it is calling the function in the console.
function checkAnswer() {
    let userChoice = this.textContent;
    let correctAnswer = questions[0].correct;
    if (userChoice === correctAnswer) {
        console.log('You are correct!');

    };
}



/* We also declare more 'selectors' to target elements in the html that we want to change with user interaction. 'gameSection' shows the Javascript what we consider to be the area that the 'game' itself will take place'. This area will populate with new 'articles', with IDs 'quiz–q5' (one ID assigned to the content for each question in the quiz).*/

let introArticle = document.querySelector('#intro');

/* Here, we declare the 4 buttons that will appear on all of our question 'screens'. */
let button1 = document.getElementById('b1');
let button2 = document.getElementById('b2');
let button3 = document.getElementById('b3');
let button4 = document.getElementById('b4');

/* We do this so that we can use a querySelector toe 'listen' for a 'click' on each, which is set up below. */

let q2Article = document.querySelector('#q2');

/*We then 'add' an 'EventListener' to 'listen'/notice when the 'startButton' is 'click'ed. When it is, our the 'intro' is replaced by our 1st question of the quiz. */




//Need to assign 'correct', 'incorrect' 'values' to each of the 4 buttons, in each of the 5 question 'articles'.


//Need all ID=q to update with 'Correct' or 'Wrong' message, depending on answer, with a gray hz line separating this text from the question section above it.

//Need set-up Timer.

//Need create 'done' screen.

//Need create field for initials entry, with submit button. Need to store input from this field so that initials and scores are viewable.

//Need to view list of initials and scores when 'View high scores' clicked on 'into' screen.