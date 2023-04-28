/* We want the first screen of our 'quiz' to display the article
with ID 'intro' (in the html), so here we're targetting that ID with
a 'querySelector'. */
let introArticle = document.querySelector('#intro');

/* Here, we're targetting the 'button' with ID = 'start' in the html
with a 'querySelector'. We're asking  it 'listen' for the event of a
'click' on this button, at which point, functions that will 'startTimer'
and 'we want new content to show in the html 'document' when the 'start'
button shown on the 'intro' screen is clicked, so we use a 'querySelector'
to target the button with ID 'start'. */

/*These 'let' declarations use a 'querySelector' to target the elements named between
the ( ) for each in the html, so that they can be updated as the quiz progresses.*/
let gameSection = document.querySelector('.game');
let quizArticle = document.querySelector('#quiz');

/*This declaration gives the JS access to the element 'time' in our
html, which will eventually keep track of the time/score of the quiz.
Here, the inintial time is also set to 75 seconds.*/
let timeElement = document.getElementById('time');
let timeRemaining = 75;

/*Here, 'quizEnded' is set to 'false', to prevent the 'end-screen'
content (present in the html) from showing prematurely. 'timerInterval'
is also being declared here so that other functions like 'setInterval',
which is used to decrement the time at the rate of our choosing. */
let quizEnded = false;

/*Here, we establish each of our 5 questions, their possible answers and the correct
answer, which form the 'objects' of our 'questions' array. The strings shown for 
'correct' here will later be compared to the user's choice, to determine whether or
not they chose the correct answer on each question.*/
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

/*Here, we declare a variable, to give us a starting point in the array of questions,
at the '0-indexed' (aka: 1st question) that we listed above .*/
let currentQuestion = 0;

/*This function sets up an event listener to register when a 'click' is made on a 'button'
within 'quizArticle'. 'trim' is here to remove the 'space' that is included in the
button name (the space between '1.' and the answer text, for example).*/
quizArticle.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        checkAnswer(event.target.textContent.trim());
    }
});


function checkAnswer(choice) {
    let resultEl = document.querySelector('#result');
    if (!resultEl) {
        resultEl = document.createElement('p');
        resultEl.id = 'result';
        quizArticle.appendChild(resultEl);
    }

    let choiceText = choice.split('. ')[1];

    if (choiceText === questions[currentQuestion].correct) {
        resultEl.textContent = 'That is correct!';
        resultEl.className = 'correct';

    } else {
        resultEl.textContent = 'That is incorrect.'
        resultEl.className = 'incorrect';
        if (timeRemaining >= 10) {
            timeRemaining -= 10;
        } else {
            timeRemaining = 0;
        }

        updateTimeElement();
    }

    setTimeout(function () {
        resultEl.remove();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            generateQuestions();
        } else {
            endQuiz();
        }
    }, 400);
}

/*'generateQuestions' helps to make our 'questions' appear. It retrieves the elements
with IDs in the html matching what appears between the ( ) and respectively assigns
them to the 2 variables, 'questionTitleEl' and 'questionChoicesEl'. The 'textContent'
property of 'questionTitleEl' gets set to the 'title' property of our 'currentQuestion'.
'questionChoicesEl' clears the 'button-zone' of any answers previously given by the
user, in preparation for loading the next set of buttons. Within the 'for' loop, we
'create' an 'Element' called 'button' in the html 'document'. Since there are
consistently 4, numbered-options for each of the 5 questions, the 'for' loop here is set
to add the 'textContent' of 'i' (currently set to '0', but then is incremented to '+1',
and then by 1, each time the loop runs, until it reaches the 'length' of questions,
which is 4) — as well as add a '.' after the answer's number — to each of the buttons,
so they are numbered consistenly. Upon 'onclick', 'tempBtn' assigns the 'checkAnswer'
function we established as the event handler, invoking 'checkAnswer' when the button is
clicked. 'tempBtn' then gets assigned a 'className' of 'button', so it can be styled
by our CSS. Finally, 'tempBtn' gets 'appended' as a 'Child' of the 'questionChoicesEl'
making our choice buttons visible to the user.*/
function generateQuestions() {
    let questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = questions[currentQuestion].title;
    let questionChoicesEl = document.getElementById('button-zone');
    questionChoicesEl.innerHTML = '';

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        let tempBtn = document.createElement('button');
        tempBtn.textContent = i + 1 + '. ' + questions[currentQuestion].choices[i];
        tempBtn.onclick = checkAnswer;
        tempBtn.className = 'button';
        questionChoicesEl.appendChild(tempBtn);
    }
}

/*The 'startQuiz' function overwrites the previous display value of
'quizArticle' (set to 'none' in the CSS, so that it will remain hidden
until the quiz begins) and gives it a display of 'flex' once the quiz
begins. It sets the 'gameSection' to an 'empty string', so that section
will be cleared and essentially makes our questions and answer options
viewable by the user.*/
function startQuiz() {
    quizArticle.style.display = 'flex';
    gameSection.innerHTML = '';
    gameSection.appendChild(quizArticle);
    generateQuestions();
}

/*When called, this function will 'start' the 'Timer' that is displayed in the
top-right corner of the quiz when called. 'setInterval' declares that the
initial value of 'timeRemaining' (set at '75' above) should be
decremented by '1' per second (shown in milliseconds, 1000 here)
when the quiz begins. It 'updates' the 'TimeElement' based on the
results of the 'if' statement, which compares 'timeRemaining' to 0
and also takes into account 'quizEnded', which is triggered when
the user has answered the 5th question. This will 'stop' the 'Timer'
and 'display' the 'Message' in ( ) to the user, on-screen.*/
function startTimer() {
    updateTimeElement();
    timerInterval = setInterval(function () {
        timeRemaining--;
        updateTimeElement();
        if (timeRemaining <= 0 || quizEnded) {
            stopTimer();
            displayMessage("Time's up!");
        }
    }, 1000);
}

/*We target the element with ID 'start' in the html and assign that as the 
value to 'startButton'*/
let startButton = document.querySelector('#start');
startButton.addEventListener('click', function () {
    startTimer();
    startQuiz();
});

/*This function will 'stop' the 'Timer'*/
function stopTimer() {
    clearInterval(timerInterval);
}

/*This function 'updates' the ' 'Time: ' element in the html, displaying
the 'timeRemaining' countdown.*/
function updateTimeElement() {
    timeElement.textContent = 'Time: ' + timeRemaining;
}

let endScreen = document.getElementById('end-screen');
let highScoresScreen = document.getElementById('high-scores-screen');
let highScoresList = document.getElementById('high-scores-list');
let goBackButton = document.getElementById('go-back');
let clearHighScores = document.getElementById('clear-high-scores');

function endQuiz() {
    quizArticle.style.display = 'none';
    let finalScore = document.getElementById('final-score');
    let initialsInput = document.getElementById('initials');
    let submitButton = document.getElementById('submit-initials');

    endScreen.style.display = 'flex';

    let score = timeRemaining;
    finalScore.textContent = 'Your final score is ' + score;

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        let initials = initialsInput.value;

        let message = 'Thank you for submitting your initials, ' + initials;
        displayMessage(message);

        saveHighScore(initials, score);

        showHighScores();
        quizEnded = true;
    });
}

function showHighScores() {
    introArticle.style.display = 'none';
    quizArticle.style.display = 'none';
    endScreen.style.display = 'none';
    highScoresScreen.style.display = 'block';

    let highScores = retrieveHighScores();
    displayHighscores(highScores);
}

function retrieveHighScores() {
    return [
        { initials: 'AB', score: 100 },
        { initials: 'CD', score: 90 },
        { initials: 'EF', score: 80 },
    ];
}

function displayHighscores(scores) {
    highScoresList.innerHTML = '';
    scores.forEach((score, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = (index + 1) + '. ' + score.initials + ' ' + score.score;
        highScoresList.appendChild(listItem);
    });
}