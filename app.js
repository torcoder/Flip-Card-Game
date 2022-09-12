const game = document.getElementById('game');
const displayScore = document.getElementById('score');

const jeopardyCategories = [
  {
    genre: 'WHO',
    questions: [
      {
        question: 'Who wrote Harry Potter ?',
        answers: ['JK Rowling', 'JRR Tolkien'],
        correct: 'JK Rowling',
        level: 'easy',
      },
      {
        question: ' Who is the Prime Minister of England?',
        answers: [' David Cameron.', 'Matthew McConaughey'],
        correct: ' David Cameron.',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'WHERE',
    questions: [
      {
        question: 'Where is the Istanbul ?',
        answers: ['Turkey', 'England'],
        correct: 'Turkey',
        level: 'easy',
      },
      {
        question: 'Where is the Anıtkabir? ?',
        answers: ['Ankara', 'Kayseri'],
        correct: 'Ankara',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'WHEN',
    questions: [
      {
        question: 'When was child ?',
        answers: ['12', '14'],
        correct: '14',
        level: 'easy',
      },
      {
        question: 'When is Christmas Day?',
        answers: ['December 24th..', 'December 25th..'],
        correct: 'December 25th..',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'WHAT',
    questions: [
      {
        question: 'What is the capital of Turkey ?',
        answers: ['Ankara', 'Istanbul'],
        correct: 'Ankara',
        level: 'easy',
      },
      {
        question: 'What do you want to do tonight?',
        answers: ['Go to the cinema.', 'Go to home'],
        correct: 'Go to the cinema.',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'HOW MANY',
    questions: [
      {
        question: 'How many people in China ?',
        answers: ['1.1 bil', '1.4 bil'],
        correct: '1.4 bil',
        level: 'easy',
      },
      {
        question: 'How many days are in a year?',
        answers: ['364', '365'],
        correct: '365',
        level: 'medium',
      },
    ],
  },
];

let score = 0;

function addCategory(category) {
  const column = document.createElement('div');
  column.classList.add('genre-column');

  const genreTitle = document.createElement('div');
  genreTitle.classList.add('genre-title');
  genreTitle.innerHTML = category.genre;
  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement('div');
    card.classList.add('card');
    column.append(card);

    if (question.level === 'easy') {
      card.innerHTML = 100;
    }
    if (question.level === 'medium') {
      card.innerHTML = 200;
    }
    if (question.level === 'hard') {
      card.innerHTML = 300;
    }

    card.setAttribute('data-question', question.question);
    card.setAttribute('data-answer-1', question.answers[0]);
    card.setAttribute('data-answer-2', question.answers[1]);
    card.setAttribute('data-correct', question.correct);
    card.setAttribute('data-value', card.getInnerHTML());

    card.addEventListener('click', flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = '';
  this.style.fontSize = '15px';
  this.style.lineHeight = '30px';
  const textDisplay = document.createElement('div');
  textDisplay.classList.add('card-text');
  textDisplay.innerHTML = this.getAttribute('data-question');
  const firstButton = document.createElement('button');
  const secondButton = document.createElement('button');

  firstButton.classList.add('first-button');
  secondButton.classList.add('second-button');

  firstButton.innerHTML = this.getAttribute('data-answer-1');
  secondButton.innerHTML = this.getAttribute('data-answer-2');
  firstButton.addEventListener('click', getResult);
  secondButton.addEventListener('click', getResult);
  this.append(textDisplay, firstButton, secondButton);

  const allCards = Array.from(document.querySelectorAll('.card'));

  allCards.forEach((card) => card.removeEventListener('click', flipCard));
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'));
  allCards.forEach((card) => card.addEventListener('click', flipCard));
  const cardOfButton = this.parentElement;
  if (cardOfButton.getAttribute('data-correct') === this.innerHTML) {
    score += parseInt(cardOfButton.getAttribute('data-value'));
    displayScore.innerHTML = score;
    cardOfButton.classList.add('correct-answer');
    while (cardOfButton.firstChild) {
      cardOfButton.removeChild(cardOfButton.lastChild);
    }
    cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
  } else {
    cardOfButton.classList.add('wrong-answer');

    while (cardOfButton.firstChild) {
      cardOfButton.removeChild(cardOfButton.lastChild);
    }
    cardOfButton.innerHTML = 0;
  }
  cardOfButton.removeEventListener('click', flipCard);
}
