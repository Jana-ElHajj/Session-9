const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of woords for game
const words=[
    'sigh',
    'tense',
    'airplane',
    'banana',
    'apple',
    'orange',
    'ball',
    'juice',
    'warlike',
    'bad',
    'north',
    'steer',
    'drag',
    'admit',
    'silver',
    'highfalutin',
    'superficial',
    'eight',
    'loving'
];

//Init word
let randomWord;

//Init Score
let score= 0;

//init time
let time=10;

//set Difficulty to value in local storge or medium
let difficulty=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set diff select value
difficultySelect.value=localStorage.getItem('difficulty');

//focus on text on start
text.focus();

//start counting down
const timeInterval= setInterval(updateTime, 1000);

//game over, show end sreen
function gameOver(){
    endgameEl.innerHTML=`
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button  onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display='flex';
}

//Generate a random word from array words
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

//Add word  to DOM
function addWordToDOM(){
    randomWord= getRandomWord();
    word.innerHTML= randomWord;
}

//update score
function updateScore(){
    score++;
    scoreEl.innerText= score;
}

//Update time
function updateTime(){
    time--;
    timeEl.innerText=time + 's';

    if(time===0){
        clearInterval(timeInterval);

        //end game
        gameOver();
    }
}
addWordToDOM();

//Event Listeners

//Typing
text.addEventListener('input', e=>{
    const insertedText=e.target.value;

    if(insertedText===randomWord){
        addWordToDOM();
        updateScore();
        //Clear text
        e.target.value='';


        if(difficulty==='hard'){
            time+=2;
        }else if(difficulty==='medium'){
            time+=3;
        }else{
            time+=5;
        }
        updateTime();
    }

})

//Settings btn click
settingsBtn.addEventListener('click', ()=> settings.classList.toggle('hide'))

//settings select
settingsForm.addEventListener('change', e => {
    difficulty=e.target.value;
    localStorage.setItem('difficulty', difficulty);
})