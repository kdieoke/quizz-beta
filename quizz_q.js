let round = 1; 
let level = "easy"; 
let question;
let full_points = 0;
let q_num_easy;
let q_num_medium;
let q_num_hard;
let q_num_epic;
let q_num_legy;
let points = parseInt(localStorage.getItem("points"));
let max = 20;
let easy = [];
let medium = [];
let hard = [];
let epic = [];
let legy = [];
let a;
let b;
let c;
let d;

function setup(){
//Easy
for(let i = 1; i<= questions.easy.amount; i++){
easy.push(questions.easy[`q${i}`].name)
}
//log
console.log("EASY::" + easy)

//Medium
for(let i = 1; i<= questions.medium.amount; i++){
medium.push(questions.medium[`q${i}`].name)
}
//log
console.log("MEDIUM::" + medium)

//Hard
for(let i = 1; i<= questions.hard.amount; i++){
hard.push(questions.hard[`q${i}`].name)
}
//log
console.log("HARD::" + hard)

//Epic
for(let i = 1; i<= questions.epic.amount; i++){
epic.push(questions.epic[`q${i}`].name)
}
//log
console.log("EPIC::" + epic)

//Legy
for(let i = 1; i<= questions.legy.amount; i++){
legy.push(questions.legy[`q${i}`].name)
}
//log
console.log("LEGY::" + legy)
}


//update the difficulty
function checkdiff(){

let l = document.getElementById("pointer");

if(round <= settings_difficulty.medium) level = "easy"; 
if(round <= settings_difficulty.hard && round > settings_difficulty.medium) redrawPointer("medium");
if(round <= settings_difficulty.epic && round > settings_difficulty.hard) redrawPointer("hard");
if(round <= settings_difficulty.legy && round > settings_difficulty.epic) redrawPointer("epic");
if(round <= max && round > settings_difficulty.legy) redrawPointer("legy");

console.log("DIFFICULTY::" + round + " LEVEL :: " + level);
}


//update page
function displayQ(){

//define points
points = parseInt(localStorage.getItem("points"));

//console log round and points
console.log("ROUND::" + round);
console.log("Points:" + points)

//display round
let display_headline = document.getElementById("round");
display_headline.innerText = `Frage ${round}/${max}`;

//random int between 0 and [difficulty]length
q_num_easy = (Math.floor(Math.random()*(easy.length)+1))-1
q_num_medium = (Math.floor(Math.random()*(medium.length)+1))-1
q_num_hard = (Math.floor(Math.random()*(hard.length)+1))-1
q_num_epic = (Math.floor(Math.random()*(epic.length)+1))-1
q_num_legy = (Math.floor(Math.random()*(legy.length)+1))-1

//get random question based on difficulty
if(level == "easy") question = easy[q_num_easy];
if(level == "medium") question = medium[q_num_medium];
if(level == "hard") question = hard[q_num_hard];
if(level == "epic") question = epic[q_num_epic];
if(level == "legy") question = legy[q_num_legy];

//count for max points
let p_gained = questions[level][question].points
full_points += p_gained;

//display background_image
console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--background-image'))
document.documentElement.style.setProperty('--background-image', `url('./images/${questions[level][question].b_img}')`);

//console.log (debug)
console.log("QUESTIONS.[LEVEL].AMOUNT::" + questions[level][question].name)
console.log("QUESTION:" + question)
console.log("LEVEL::" + level)

//randomize Question Order
let all = ["A", "B", "C", "D"]
let taken = [];
//set a
a = all[Math.floor(Math.random() * all.length)]; taken.push(a);
console.log(a)
console.log(taken)

//set b
while(taken.includes(b) || b == undefined){
b = all[Math.floor(Math.random() * all.length)];
}
console.log(taken.includes(b))
taken.push(b);
console.log(b)
console.log(taken)


//set c
while(taken.includes(c) || c == undefined){
c = all[Math.floor(Math.random() * all.length)];
}
taken.push(c);
console.log(c)
console.log(taken)


//set d
while(taken.includes(d) || d == undefined){
d = all[Math.floor(Math.random() * all.length)];
}
taken.push(d);
console.log(d)
console.log(taken)


//display question 
let Q = document.getElementById("Q-box");
Q.innerText = questions[level][question].q
//display answer A
let aA = document.getElementById("A-box");
aA.innerText = questions[level][question][`ans${a}`];
//display answer B
let aB = document.getElementById("B-box");
aB.innerText = questions[level][question][`ans${b}`];
//display answer C
let aC = document.getElementById("C-box");
aC.innerText = questions[level][question][`ans${c}`];
//display answer D
let aD = document.getElementById("D-box");
aD.innerText = questions[level][question][`ans${d}`];
}



//on answer given
function next(ans){

//define points
points = parseInt(localStorage.getItem("points"));

//clear console
console.clear();

//new round
round++;

//check wether answer was correct
if(ans == questions[level][question].correct) localStorage.setItem("points", `${points + questions[level][question].points}`)
console.log("CORRECT:" + questions[level][question].correct)
console.log("RECIEVED ANSWER:" + ans)
console.log("POINTS::" + points + "..." + questions[level][question].points)

//check if quizz has ended
if(round > max) {

//end timer
let end = Date.now();

//save full_points 
localStorage.setItem("full-points", full_points)

//save time
localStorage.setItem('Time', `${(Math.floor((end-time)/1000))}`)

//send to quizz_end
location.replace("quizz_end.html");

//end quizz_q.js
return;
}
//delete question from question pool
if(level == "easy") easy.splice(q_num_easy, 1), console.log("EASY[]::" + easy);
if(level == "medium") medium.splice(q_num_medium, 1), console.log("MEDIUM[]::" + medium);
if(level == "hard") hard.splice(q_num_hard, 1), console.log("HARD[]::" + hard);
if(level == "epic") epic.splice(q_num_epic, 1), console.log("EPIC[]::" + epic);
if(level == "legy") legy.splice(q_num_legy, 1), console.log("LEGY[]::" + legy);

//increase diff and update level
checkdiff();
displayQ();
}

//update difficulty through css
function redrawPointer(diff){
if(diff == level) return;
let a = document.getElementsByTagName('link');

//set new level
level = diff

//set new css variables
document.documentElement.style.setProperty('--pointer-left-from', `${pointer_settings[diff].l_f}`)
document.documentElement.style.setProperty('--pointer-left', `${pointer_settings[diff].l}`);

//redraw element
let l = document.getElementById("pointer")

l.classList.remove("pointer")
void l.offsetWidth
l.classList.add("pointer")
}




function epmtyStorage(){
localStorage.setItem("points", 0)
}



let questions = {

    easy: {

        q1:{
            name: "q1",
            q: "Wieviele Bundesländer hat Deutschland?",
            points: 1,
            ansA: "18", 
            ansB: "16",
            ansC: "15",
            ansD: "17",
            correct: "B",
            b_img: "q1.jpg"
        },
        q2:{
            name: "q2",
            q: "Wieviele Nachbarländer hat Deutschland",
            points: 1,
            ansA: "8", 
            ansB: "12",
            ansC: "7",
            ansD: "9",
            correct: "D",
            b_img: "q2.jpg"
        },
        q3:{
            name: "q3",
            q: "Welches ist kein Nachbarland von Deutschland?",
            points: 1,
            ansA: "Tschechische Republik", 
            ansB: "Lichtenstein",
            ansC: "Frankreich",
            ansD: "Schweiz",
            correct: "B",
            b_img: "q3.jpg"
        },
        q4:{
            name: "q4",
            q: "Welcher Ozean ist der größte der Welt?",
            points: 1,
            ansA: "Indischer Ozean", 
            ansB: "Pazifischer Ozean",
            ansC: "Nordpolarmeer",
            ansD: "Atlantischer Ozean",
            correct: "B",
            b_img: "q3.jpg"
        },
        q5:{
            name: "q5",
            q: "Ein deutsche Sprichwort besagt 'Schönheit liegt im Auge des ... '",
            points: 1,
            ansA: "Einzelnen", 
            ansB: "Betrachters",
            ansC: "Beobachters",
            ansD: "Begutachters",
            correct: "B",
            b_img: "q3.jpg"
        },
        q6:{
            name: "q6",
            q: "Das englische wort 'rual' meint: ",
            points: 1,
            ansA: "ruihg", 
            ansB: "(be)-herrschen",
            ansC: "radikal",
            ansD: "ländlich",
            correct: "D",
            b_img: "q3.jpg"
        },
        q7:{
            name: "q7",
            q: "17 * 3 + 7 ergibt?",
            points: 1,
            ansA: "68", 
            ansB: "58",
            ansC: "3 * 4^2 + 9",
            ansD: "119",
            correct: "B",
            b_img: "q3.jpg"
        },
        q8:{
            name: "q8",
            q: "Der höchste Punkt Deutschlands heißt?",
            points: 1,
            ansA: "Großer Gipfel", 
            ansB: "Kalte Spitze",
            ansC: "Einsame Spitze",
            ansD: "Zugspitze",
            correct: "D",
            b_img: "q3.jpg"
        },
        q9:{
            name: "q9",
            q: "Welcher dieser Filme erzielte das höchsten Einspielergebnis (stand 2021)?",
            points: 1,
            ansA: "Titanic", 
            ansB: "Avengers: Endgame",
            ansC: "Avatar - Aufbruch nach Pandora",
            ansD: "Jurassic World",
            correct: "B",
            b_img: "q3.jpg"
        },
        q10:{
            name: "q10",
            q: "Worum handelt es sich bei einem 'meme' (englisch)?",
            points: 1,
            ansA: "eine Imitation einer Person oder Situation", 
            ansB: "Ein Scherz",
            ansC: "ein Streich",
            ansD: "ein Follower auf TikTok ('Abonnent' auf Youtube)",
            correct: "A",
            b_img: "q3.jpg"
        },
        
        amount: 10
    },
    medium: {

        q1:{
            name: "q1",
            q: "Welche Stadt ist die Hauptstadt von Norwegen?",
            points: 1,
            ansA: "Oslo", 
            ansB: "Koppenhagen",
            ansC: "Dublin",
            ansD: "Stockholm",
            correct: "A",
            b_img: "q1.jpg"
        },
        q2:{
            name: "q2",
            q: "Wie wird die richterliche Gewalt in Deutschland genannt?",
            points: 1,
            ansA: "Legislative", 
            ansB: "Executive",
            ansC: "Judikative",
            ansD: "Legilastive",
            correct: "C",
            b_img: "q2.jpg"
        },
        q3:{
            name: "q3",
            q: "Wie lautet das chemische Zeichen für Silber?",
            points: 1,
            ansA: "S", 
            ansB: "Sb",
            ansC: "Sv",
            ansD: "Ag",
            correct: "D",
            b_img: "q2.jpg"
        },
        q4:{
            name: "q4",
            q: "Welcher Stoff gibt Blättern ihre grüne Farbe?",
            points: 1,
            ansA: "Kaliumhexacyanoferrat", 
            ansB: "Chromoplast",
            ansC: "Chlorophyll",
            ansD: "Chloroplast",
            correct: "C",
            b_img: "q2.jpg"
        },
        q5:{
            name: "q5",
            q: "Wann wurde der Buchdruck erfunden?",
            points: 1,
            ansA: "Mitte des 12. Jahrhunderts", 
            ansB: "Anfang des 14. Jahrhunderts",
            ansC: "Mitte des 15. Jahrhunderts",
            ansD: "Ende des 15. Jahrhunderts",
            correct: "C",
            b_img: "q2.jpg"
        },
        q6:{
            name: "q6",
            q: "Wie heißt das Pendant der 10 Gebote des Islam?",
            points: 1,
            ansA: "Die 5 Säulen des Islam", 
            ansB: "Die 10 Gebote des Islam",
            ansC: "Die 7 Sünden",
            ansD: "Die 8 Wahrsagungen des Islam ",
            correct: "A",
            b_img: "q2.jpg"
        },
        q7:{
            name: "q7",
            q: "Welches chemische Element steht im Periodensystem als 'Fe'?",
            points: 1,
            ansA: "Chlor", 
            ansB: "Stickstoff",
            ansC: "Eisen",
            ansD: "Fluor",
            correct: "C",
            b_img: "q2.jpg"
        },
        q8:{
            name: "q8",
            q: "In welchem Jahr wurde die deutsche Mauer erbaut?",
            points: 1,
            ansA: "1949", 
            ansB: "1961",
            ansC: "1955",
            ansD: "1957",
            correct: "B",
            b_img: "q2.jpg"
        },
        q9:{
            name: "q9",
            q: "In welchem historischen Krieg überquerte Hannibal mit seinen Elefanten die Alpen?",
            points: 1,
            ansA: "1. punischer Krieg", 
            ansB: "2. punischer Krieg",
            ansC: "1. peloponnesischer Krieg",
            ansD: "3. punischer krieg",
            correct: "B",
            b_img: "q2.jpg"
        },  
        q10:{
            name: "q10",
            q: "Welche Flagge trägft die Farben Orange-Weiß-Grün (beachte Reihenfolge)",
            points: 1,
            ansA: "Äthiopien", 
            ansB: "Elfenbeinküste",
            ansC: "Irland",
            ansD: "Belgien",
            correct: "B",
            b_img: "q2.jpg"
        },
        amount: 10

    },
    hard:{

        q1:{
            name: "q1",
            q: "Wer entdeckte Australien?",
            points: 1,
            ansA: "Ferdinand Magellan", 
            ansB: "Galileo Galilei",
            ansC: "James Cook",
            ansD: "Marco Polo",
            correct: "C",
            b_img: "q1.jpg"
        },
        q2:{
            name: "q2",
            q: "Wieviele Video-Aufrufe erreichte das Spiel Minecraft bisher auf Youtube?",
            points: 1,
            ansA: "1.000.000.000.000", 
            ansB: "10.000.000.000.000",
            ansC: "50.000.000.000",
            ansD: "500.000.000",
            correct: "A",
            b_img: "q2.jpg"
        },
        q3:{
            name: "q3",
            q: "Worum handelt es sich in der Literatur bei 'Neologismus'(rethorisches Mittel) ",
            points: 1,
            ansA: "Beschönigung", 
            ansB: "Wortneuschöpfung",
            ansC: "Übertreibung",
            ansD: "Verniedlichung",
            correct: "B",
            b_img: "q2.jpg"
        },
        q4:{
            name: "q4",
            q: "Wie nennt man die Zahl unter der Wurzel?",
            points: 1,
            ansA: "Radikand", 
            ansB: "Quotient",
            ansC: "Exponnent",
            ansD: "Rotend",
            correct: "A",
            b_img: "q2.jpg"
        },
        q5:{
            name: "q5",
            q: "Welcher Staat ist kein Gründungsmitglied der EU?",
            points: 1,
            ansA: "Belgien", 
            ansB: "Spanien",
            ansC: "Deutschland",
            ansD: "Luxemburg",
            correct: "B",
            b_img: "q2.jpg"
        },
        q6:{
            name: "q6",
            q: "In welchem Jahr fanden die ersten offiziellen Paralympischen Spiele statt?",
            points: 1,
            ansA: "1954", 
            ansB: "1962",
            ansC: "1960",
            ansD: "1932",
            correct: "C",
            b_img: "q2.jpg"
        },
        q7:{
            name: "q7",
            q: "Welche ist die größte Wüste der Welt?",
            points: 1,
            ansA: "Kalahari", 
            ansB: "Mojave-Wüste",
            ansC: "Antarktis",
            ansD: "Sahara",
            correct: "C",
            b_img: "q2.jpg"
        },
        q8:{
            name: "q8",
            q: "Seit wann gibt es die deutsche Fußball-Bundesliga?",
            points: 1,
            ansA: "30. Juni 1877", 
            ansB: "22. August 1958",
            ansC: "2. Januar 1964",
            ansD: "38. Juli 1962",
            correct: "D",
            b_img: "q2.jpg"
        },
        q9:{
            name: "q9",
            q: "Welche ist die zweitgrößte Religion (Anzahl der Mitglider)?",
            points: 1,
            ansA: "Budhismus", 
            ansB: "Islam",
            ansC: "Judentum",
            ansD: "Hinduismus",
            correct: "B",
            b_img: "q2.jpg"
        },
        q10:{
            name: "q10",
            q: "Wie lautet der zweit-häufigste Straßenname in Deutschland",
            points: 1,
            ansA: "Bergstraße", 
            ansB: "Hauptstraße",
            ansC: "Schulstraße",
            ansD: "Gartenstraße",
            correct: "C",
            b_img: "q2.jpg"
        },
        
        amount: 10
    },
    epic:{
        q1:{
            name: "q1",
            q: "Welches Kaiserreich endete als letztes?",
            points: 1,
            ansA: "Japan", 
            ansB: "Deutschland",
            ansC: "China",
            ansD: "Russland",
            correct: "B",
            b_img: "q2.jpg"
        },
        q2:{
            name: "q2",
            q: "",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q3:{
            name: "q3",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q4:{
            name: "q4",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q5:{
            name: "q5",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q6:{
            name: "q6",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q7:{
            name: "q7",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q8:{
            name: "q8",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q9:{
            name: "q9",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q10:{
            name: "q10",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        amount: 10
    },
    legy:{
        q1:{
            name: "q1",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q2:{
            name: "q2",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q3:{
            name: "q3",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        q4:{
            name: "q4",
            q: "PLACEHOLDER",
            points: 1,
            ansA: "ANSWER A", 
            ansB: "ANSWER B",
            ansC: "ANSWER C",
            ansD: "ANSWER D",
            correct: "D",
            b_img: "q2.jpg"
        },
        amount: 4


    }


}

//difficulty settings
let settings_difficulty = {
easy: 0,
medium: 4,
hard: 8,
epic: 12,
legy: 16
}

//pointer settings
let pointer_settings = {
medium: {
    l_f: '0px',
    l: '62.5px'
},
hard: {
    l_f: '62.5px',
    l: '125px'
},
epic: {
    l_f: '125px',
    l: '187.5px'
},
legy: {
    l_f: '187.5px',
    l: '240px'
}
}

//start (setup Listeners)
let A = document.getElementById("A");
let B = document.getElementById("B");
let C = document.getElementById("C");
let D = document.getElementById("D");

A.addEventListener("click", function (){ next(a) })
B.addEventListener("click", function (){ next(b) })
C.addEventListener("click", function (){ next(c) })
D.addEventListener("click", function (){ next(d) })

//set full-points 0 
localStorage.setItem('full-points', '0')

//set time 0
localStorage.setItem('Time', 0)

//start time
let time = Date.now()

//initiate
epmtyStorage()
setup();
displayQ();
