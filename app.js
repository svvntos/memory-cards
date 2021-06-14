const cardsContainerEL = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEL = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEL = document.getElementById('question');
const answerEL = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');



let currentActiveCard = 0;

const cardsEl = [];

const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;

    card.addEventListener('click' || 'touchstart', () => card.classList.toggle('show-answer'));

    cardsEl.push(card);
    cardsContainerEL.appendChild(card);
    updateCurrentEl();
}

function updateCurrentEl() {
    currentEL.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}


createCards();

//Next button
nextBtn.addEventListener('click' || 'touchstart', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentEl();
});
// Prev button
prevBtn.addEventListener('click' || 'touchstart', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentEl();
});
//Show button

showBtn.addEventListener('click' || 'touchstart', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click' || 'touchstart', () => addContainer.classList.remove('show'));

// add new card

addCardBtn.addEventListener('click' || 'touchstart', () => {
    const question = questionEL.value;
    const answer = answerEL.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        questionEL.value = '';
        answerEL.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);


    }

});

clearBtn.addEventListener('click' || 'touchstart', () => {
    localStorage.clear();
    cardsContainerEL.innerHTML = '';
    window.location.reload();
})