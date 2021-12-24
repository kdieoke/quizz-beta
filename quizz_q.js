let A = document.getElementById("A");
let B = document.getElementById("B");
let C = document.getElementById("C");
let D = document.getElementById("D");
let Q = document.getElementById("Q-box");   


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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkdiff(){

let l = document.getElementById("pointer");

if(round <= settings_difficulty.medium) level = "easy"; 
if(round <= settings_difficulty.hard && round > settings_difficulty.medium) redrawPointer("medium");
if(round <= settings_difficulty.epic && round > settings_difficulty.hard) redrawPointer("hard");
if(round <= settings_difficulty.legy && round > settings_difficulty.epic) redrawPointer("epic");
if(round <= max && round > settings_difficulty.legy) redrawPointer("legy");

console.log("DIFFICULTY::" + round + " LEVEL :: " + level);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayQ(){
let A = document.getElementById("A-box");
let B = document.getElementById("B-box");
let C = document.getElementById("C-box");
let D = document.getElementById("D-box");
let Q = document.getElementById("Q-box");    

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
Q.innerText = questions[level][question].q
//display answer A
A.innerText = "A) " + questions[level][question][`ans${a}`];
//display answer B
B.innerText = "B) " + questions[level][question][`ans${b}`];
//display answer C
C.innerText = "C) " + questions[level][question][`ans${c}`];
//display answer D
D.innerText = "D) " + questions[level][question][`ans${d}`];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function next(ans){

let iscorrect = false;

//define points
points = parseInt(localStorage.getItem("points"));

//clear console
console.clear();

//check wether answer was correct
if(ans == questions[level][question].correct) localStorage.setItem("points", `${points + questions[level][question].points}`), iscorrect = true;

//console.log(debug)
console.log("CORRECT:" + questions[level][question].correct)
console.log("RECIEVED ANSWER:" + ans)
console.log("POINTS::" + points + "..." + questions[level][question].points)

//new round
round++;

//check if quizz has ended
if(round > max) {

//end timer
let end = Date.now();

//save time
localStorage.setItem('Time', `${(Math.floor((end-time)/1000))}`)

//save full_points 
localStorage.setItem("full-points", full_points)

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

//before delete from pool
displaySolution(iscorrect)

//increase diff and update level
checkdiff();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displaySolution(iscorrect){

let A = document.getElementById("A");
let B = document.getElementById("B");
let C = document.getElementById("C");
let D = document.getElementById("D");
let Q = document.getElementById("Q-box");   
let box = document.getElementById("box")

let correct = questions[level][question].correct;
let correctAns = questions[level][question][`ans${correct}`];

//add info-box
let newInfo = document.createElement("div")
newInfo.setAttribute('id', 'info')
box.appendChild(newInfo);

let Info = document.getElementById("info")
Info.classList.add('info')
Info.innerHTML = '<p id = "info-text"> </p>'

let info = questions[level][question].info

if(info == 'standart' || info == null || info == undefined || info == '0' || info == 0 || info == '' || info == ' ') {
    if(iscorrect) info = "Sehr gut. Machen Sie weiter so!";
    if(!iscorrect) info = "Leider falsch, beim nächsten Mal klappt's bestimmt!"
}

//add info-text
let infoText = document.getElementById("info-text")
infoText.innerText = `${info}`

//remove all the answers
A.remove();
B.remove();
C.remove();
D.remove();

//display advice
let newAdvice = document.createElement("p")
newAdvice.setAttribute('id', 'advice')
document.body.appendChild(newAdvice)

//set advice text
let Advice = document.getElementById("advice")
Advice.innerText = 'Drücken Sie eine beliebige Taste um fortzufahren!'

//display solution and info
if(iscorrect) Q.innerText = "Richtig!";
if(!iscorrect) Q.innerText = `Falsch! Richtig wäre:  ${correct}) ${correctAns}`


document.addEventListener("keypress", end);
document.addEventListener("touchstart", end)

function end(){


//read answers
let newA = document.createElement("div")
newA.classList.add("A-box")
newA.setAttribute('id', 'A')
box.appendChild(newA);

let A = document.getElementById("A")
let newPA = document.createElement("p")
newPA.setAttribute('id', 'A-box')
A.appendChild(newPA)

//create B
let newB = document.createElement("div")
newB.classList.add("B-box")
newB.setAttribute('id', "B")
box.appendChild(newB);

let B = document.getElementById("B")
let newPB = document.createElement("p")
newPB.setAttribute('id', 'B-box')
B.appendChild(newPB)

//create C
let newC = document.createElement("div")
newC.classList.add("C-box")
newC.setAttribute('id', "C")
box.appendChild(newC);

let C = document.getElementById("C")
let newPC = document.createElement("p")
newPC.setAttribute('id', 'C-box')
C.appendChild(newPC)

//create D
let newD = document.createElement("div")
newD.classList.add("D-box")
newD.setAttribute('id', "D")
box.appendChild(newD);

let D = document.getElementById("D")
let newPD = document.createElement("p")
newPD.setAttribute('id', 'D-box')
D.appendChild(newPD)

void this.offsetWidth

//remove advice and info
Info.remove();
Advice.remove();

setListeners();

document.removeEventListener("keypress", end)
document.removeEventListener("touchstart", end)

checkdiff();
displayQ();

}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//update difficulty through css
function redrawPointer(diff){

//check if already updated    
if(diff == level) return;

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let questions = {

    easy: {

        q1:{
            name: "q1",
            q: "Wie viele Bundesländer hat Deutschland?",
            points: 1,
            ansA: "18", 
            ansB: "16",
            ansC: "15",
            ansD: "17",
            correct: "B",
            b_img: "BrandenburgerTor.jpg"
        },
        q2:{
            name: "q2",
            q: "Wie viele Nachbarländer hat Deutschland",
            points: 1,
            ansA: "8", 
            ansB: "12",
            ansC: "7",
            ansD: "9",
            correct: "D",
            info: "Das sind: Dänemark, Polen, Tschechische Republik, Österreich, Schweiz, Frankreich, Luxemburg, Belgien und die Niederlande.",
            b_img: "schloss.jpg"
        },
        q3:{
            name: "q3",
            q: "Welches Land ist kein Nachbarland von Deutschland?",
            points: 1,
            ansA: "Tschechische Republik", 
            ansB: "Lichtenstein",
            ansC: "Frankreich",
            ansD: "Schweiz",
            correct: "B",
            info: "Lichtenstein wird südlich von Deutschland von Österreich und der Schweiz umschlossen.",
            b_img: "alteLandkarte.jpg"
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
            info: "Das Nordpolarmeer oder auch der 'Arktischer Ozean ist mit lediglich 14,09 Millionen km^2 der Kleinste aller Ozeane.",
            b_img: "wellenSchaum.jpg"
        },
        q5:{
            name: "q5",
            q: "Ein deutsches Sprichwort besagt 'Schönheit liegt im Auge des ... '",
            points: 1,
            ansA: "Einzelnen", 
            ansB: "Betrachters",
            ansC: "Beobachters",
            ansD: "Begutachters",
            correct: "B",
            b_img: "auge.jpg"
        },
        q6:{
            name: "q6",
            q: "Das englische Wort 'rural' meint: ",
            points: 1,
            ansA: "ruhig", 
            ansB: "(be)-herrschen",
            ansC: "radikal",
            ansD: "ländlich",
            correct: "D",
            b_img: "TowerBridge.jpg"
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
            info: "Punkt vor Strich!",
            b_img: "rechenschieber.jpg"
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
            b_img: "bergSchnee.jpg"
        },
        q9:{
            name: "q9",
            q: "Welcher dieser Filme erzielte das höchste Einspielergebnis (stand 2021)?",
            points: 1,
            ansA: "Titanic", 
            ansB: "Avengers: Endgame",
            ansC: "Avatar - Aufbruch nach Pandora",
            ansD: "Jurassic World",
            correct: "B",
            info: "Hier ist zu beachten, dass aufgrund von Inflation neuere Filme höhere Einspielergebnisse erreichen. So ist Avatar (inflationsbereinigt) der erfolgreichste Film dieses Jahrhunderts und 'Vom Winde verweht', mit einem umgerechneten Einspielergebnis von ca. 7mrd usd, der erfolgreichste Film jemals!",
            b_img: "filmstreifen.jpg"
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
            b_img: "TowerBridge.jpg"
        },
        q11:{
            name: "q11",
            q: "Die Wurzel aus 625 ist",
            points: 1,
            ansA: "25", 
            ansB: "5",
            ansC: "20",
            ansD: "27",
            correct: "A",
            b_img: "rechenschieber.jpg"
        },
        q12:{
            name: "q12",
            q: "Wie viele Planeten beherbergt unser Sonnensystem?",
            points: 1,
            ansA: "8", 
            ansB: "12",
            ansC: "7",
            ansD: "9",
            correct: "A",
            info: "Das sind (von der Sonne aus): Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus, Neptun. Pluto ist seit 2006 kein Planet mehr, dafür aber ein sog. Zwergplanet!",
            b_img: "milchstraße.jpg"
        },
        q13:{
            name: "q13",
            q: "Das englishe Wort 'obvious' meint:",
            points: 1,
            ansA: "offensichtlich", 
            ansB: "unwissend",
            ansC: "nervig",
            ansD: "sicherlich",
            correct: "A",
            b_img: "TowerBridge.jpg" 
        },        
        q14:{
            name: "q14",
            q: "Wie oft finden die Olympischen Spiele statt?",
            points: 1,
            ansA: "alle 2 Jahre", 
            ansB: "viermal im Jahr",
            ansC: "nervig",
            ansD: "jedes Jahr",
            correct: "A",
            info: "Die olympischen Sommer Spiele sowie auch die olympischen Winterspiele finden alle 4 Jahre statt. Allerdings wechseln sie sich praktisch ab. So (sollten) die letzten olympischen Sommerspiele 2020 und die nächsten olympischen Winterspiele 2022 stattfinden.",
            b_img: "olympiaSteine.jpg" 
        },
        q15:{
            name: "q15",
            q: "7 + 12 - 13 ergibt?",
            points: 1,
            ansA: "32", 
            ansB: "-8",
            ansC: "6",
            ansD: "8",
            correct: "C",
            info: "Hier gibt's keine faulen Tricks!",
            b_img: "rechenschieber.jpg" 
        },
        q16:{
            name: "q16",
            q: "Welches dieser Länder liegt nicht auf dem Südamerikanischen Kontinent?",
            points: 1,
            ansA: "Brasilien", 
            ansB: "Bolivien",
            ansC: "Argentinien",
            ansD: "Guatemala",
            correct: "D",
            info: "Guatemala liegt in der Mitte von Nord- und Südamerika (Zentralamerika), gehört jedoch offiziell zu Nordamerika.",
            b_img: "alteLandkarte.jpg" 
        },
        q17:{
            name: "q17",
            q: "Wie groß ist der Eiffelturm?",
            points: 1,
            ansA: "415 Meter", 
            ansB: "324 Meter",
            ansC: "300 Meter",
            ansD: "170 Meter",
            correct: "B",
            info: "Der Eiffelturm selbst ist zwar 300 Meter hoch, allerdings erstreckt er sich mit seiner massiven Antenne über ca. 324 Meter.",
            b_img: "Eiffelturm.jpg" 
        },        
        q18:{
            name: "q18",
            q: "Das englische Wort 'obvious' meint:",
            points: 1,
            ansA: "offensichtlich", 
            ansB: "unwissend",
            ansC: "nervig",
            ansD: "sicherlich",
            correct: "A",
            b_img: "TowerBridge.jpg" 
        },
        q19:{
            name: "q19",
            q: "Wie viele Geburtstage hat der Mensch? (im Durchschnitt)",
            points: 1,
            ansA: "1", 
            ansB: "80",
            ansC: "85",
            ansD: "67",
            correct: "A",
            info: "Man wird ja schließlich nur einmal 'geboren'.",
            b_img: "geburtstag.jpg" 
        },
        q20:{
            name: "q20",
            q: "Einige Monate haben 31 Tage, andere 30. Wie viele Monate haben 28 Tage?",
            points: 1,
            ansA: "1", 
            ansB: "2",
            ansC: "10",
            ansD: "12",
            correct: "D",
            info: "Jeder Monat hat mindestens 28 Tage!",
            b_img: "kalendar.jpg" 
        },
        q21:{
            name: "q21",
            q: "Ein Bauer hat 10 Schafe, alle sterben außer 9. Wie viele lebende Schafe hat er noch?",
            points: 1,
            ansA: "1", 
            ansB: "9",
            ansC: "11",
            ansD: "nichts von allem",
            correct: "B",
            b_img: "Schafe.jpg" 
        },
        q22:{
            name: "q22",
            q: "Welches ist das größte Landtier der Welt?",
            points: 1,
            ansA: "Afrikanischer Elefant", 
            ansB: "Weißes Nashorn",
            ansC: "Blauwal",
            ansD: "Königsgiraffe",
            correct: "A",
            info: 'Während der Blauwal das größte Tier der Erde (nicht Organismus) ist, belegt das weiße Nashorn lediglich den vierten Platz (nach 3 Elefantenarten) in der Liste der schwersten Landtiere.',
            b_img: "loewenbaby.jpg" 
        },
        q23:{
            name: "q23",
            q: "Wie hoch ist der höchste Berg Deutschlands?",
            points: 1,
            ansA: "2.412 Meter", 
            ansB: "2.962 Meter",
            ansC: "2.730 Meter",
            ansD: "3.017 Meter",
            correct: "B",
            b_img: "bergspitze.jpg" 
        },
        q24:{
            name: "q24",
            q: "Wie hoch ist der höchste Wolkenkratzer der Welt?",
            points: 1,
            ansA: "800 Meter", 
            ansB: "829 Meter",
            ansC: "940 Meter",
            ansD: "720 Meter",
            correct: "B",
            info: "Das höchste menschengemachte Objekt ist der Burj Khalifa. Der 829 Meter hohe Wolkenkratzer steht in Dubai, den Vereinigten Arabischen Emiraten",
            b_img: "hochhaeuser.jpg" 
        },
        q25:{
            name: "q25",
            q: "Wann wurde Rom der Legende nach gegründet?",
            points: 1,
            ansA: "112 vor Christus", 
            ansB: "753 vor Christus",
            ansC: "27 nach Christus",
            ansD: "1253 vor Christus",
            correct: "B",
            info: "7 5 3, Rom schlüpft aus dem Ei!",
            b_img: "kolluseum.jpg" 
        },
        q26:{
            name: "q26",
            q: "In welche Himmelsrichtung zeigt der Polarstern?",
            points: 1,
            ansA: "Norden", 
            ansB: "Süden",
            ansC: "Westen",
            ansD: "Osten",
            correct: "A",
            info: "Da der Polarstern auf der Erde relativ hell strahlt und für uns praktisch 'im Norden' steht, eignet er sich zur Bestimmung der Himmelsrichtungen.",
            b_img: "nachtSterneStadt.jpg" 
        },
        q27:{
            name: "q27",
            q: "Wobei handelt es sich bei 'CoC', 'LoL' und 'WoW'?",
            points: 1,
            ansA: "Maßeinheiten", 
            ansB: "Automodelle",
            ansC: "Abkürzungen für Computerspiele",
            ansD: "Begriffe der organischen Biologie",
            correct: "C",
            info: "Das sind: Clash of Clans, League of Legends und World of Warcraft.",
            b_img: "fragezeichen.jpg" 
        },
        q28:{
            name: "q28",
            q: "Wie viele Us-Dollar sind ein Euro (stand 23.12.21, 13:04)?",
            points: 1,
            ansA: "1,24 Euro", 
            ansB: "2 Euro",
            ansC: "1,37 Euro",
            ansD: "1,13 Euro",
            correct: "D",
            b_img: "waehrungen.png" 
        },       
        q29:{
            name: "q29",
            q: "Wie viele Englische Pfund sind ein Euro (stand 23.12.21, 13:07)?",
            points: 1,
            ansA: "17,34 Pfund", 
            ansB: "1,37 Pfund",
            ansC: "0,12 Pfund",
            ansD: "0,84 Pfund",
            correct: "D",
            b_img: "waehrungen.png" 
        },
        q30:{
            name: "q30",
            q: "Welches Wort ist keine umgangssprachliche Bezeichnung für Geld?",
            points: 1,
            ansA: "Kohle", 
            ansB: "Maüse",
            ansC: "Knete",
            ansD: "Kröten",
            correct: "B",
            info: "Von Zeit zu Zeit sollt man auch mal auf die Rechtschreibung achten!",
            b_img: "geldbuendelDollar.jpg" 
        },
        amount: 30
    },
    medium: {

        q1:{
            name: "q1",
            q: "Welche Stadt ist die Hauptstadt von Norwegen?",
            points: 1,
            ansA: "Oslo", 
            ansB: "Kopenhagen",
            ansC: "Dublin",
            ansD: "Stockholm",
            correct: "A",
            info: 'Oslo = Norwegen, Kopenhagen = Dänemark, Dublin = Irland und Stockholm = Schweden.',
            b_img: "hochhaeuser.jpg"
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
            info: "Legislative = gesetzliche Gewalt, Judikative = richterliche Gewalt, Executive = ausführende Gewalt.",
            b_img: "justiziaDeutschland.jpg"
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
            info: "Ag leitet sich vom lateinischen 'argentum' für 'Silber' ab.",
            b_img: "silber.jpg"
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
            info: "Während Chlorophyll die Blätter grün färbt, färbt Chromoplast die Blätter gelb, rot oder orange.",
            b_img: "gruenBlatt.jpg"
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
            info: "Der Buchdruck wurde um 1440 von Johannes Gutenberg erfunden.",
            b_img: "buchAlt.jpg"
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
            b_img: "moshee.jpg"
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
            info: "Fe leitet sich vom lateinischen Wort 'ferrum' für 'Eisen' ab.",
            b_img: "tresorEisen.jpg"
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
            info: "Also erst 16 Jahre nach Kriegsende.",
            b_img: "BerlinerMauer.jpg"
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
            info: "Der zweite punische Krieg zwischen Karthagern und Römern hätte für die Römer vernichtend ausgehen können. Nachdem Hannibal die Alpen überquerte, weigerte er sich nach vielen erfolgreichen Schlachten, in Rom einzumarschieren. Das sollten die Karthager später bereuen, da sie im 3. punischen Krieg vernichtend geschlagen wurden.",
            b_img: "elefantenWanderung.jpg"
        },  
        q10:{
            name: "q10",
            q: "Welche Flagge trägt die Farben Orange-Weiß-Grün (beachte Reihenfolge)",
            points: 1,
            ansA: "Äthiopien", 
            ansB: "Elfenbeinküste",
            ansC: "Irland",
            ansD: "Belgien",
            correct: "B",
            info: "Die Flagge Irlands trägt dieselben Farben wie die Flagge der Elfenbeinküste. Sie sind lediglich umgekehrt.",
            b_img: "flaggenEu.jpg"
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
            info: "Maggelan umsegelte die Erde, Marco Polo reiste nach China und Galileo Galilel machte als Naturwissenschaftler bahnbrechende Entdeckungen. James Cook entdeckte Australien bevor er 9 Jahre später ermordet wurde.",
            b_img: "australienSydney.jpg"
        },
        q2:{
            name: "q2",
            q: "Wie viele Video-Aufrufe erreichte das Spiel Minecraft bisher auf YouTube?",
            points: 1,
            ansA: "1.000.000.000.000", 
            ansB: "10.000.000.000.000",
            ansC: "50.000.000.000",
            ansD: "500.000.000",
            correct: "A",
            info: "Im Dezember 2021 erreichte das beliebte Computerspiel Minecraft die eine Billionen Videoaufrufe auf YouTube",
            b_img: "minecraft.jpg"
        },
        q3:{
            name: "q3",
            q: "Worum handelt es sich in der Literatur bei 'Neologismus' (reheorisches Mittel) ",
            points: 1,
            ansA: "Beschönigung", 
            ansB: "Wortneuschöpfung",
            ansC: "Übertreibung",
            ansD: "Verniedlichung",
            correct: "B",
            info: "Neologismen in unserem Alltag sind beispielsweise: googlen, twittern, chillen, liken und unkaputtbar.",
            b_img: "buchAlt.jpg"
        },
        q4:{
            name: "q4",
            q: "Wie nennt man die Zahl unter der Wurzel?",
            points: 1,
            ansA: "Radikand", 
            ansB: "Quotient",
            ansC: "Exponent",
            ansD: "Rotend",
            correct: "A",
            info: "Radikand = Zahl unter der Wurzel, Quotient = Ergebnis von Division, Exponent = z.B. das 3 in 5^3, Rotend = frei erfunden.",
            b_img: "matheFormeln.jpg"
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
            info: "Die sechs Gründungsmitglieder der EU sind: Belgien, Deutschland, Luxemburg, Frankreich, die Niederlande und Italien.",
            b_img: "flaggenEu.jpg"
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
            b_img: "paralympischeSpiele.jpg"
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
            info: "Unter Wüste versteht man: Aufgrund von Trockenheit vegetationslose oder vegetationsarme Gebiete der Erde",
            b_img: "oedland.jpg"
        },
        q8:{
            name: "q8",
            q: "Seit wann gibt es die deutsche Fußball-Bundesliga?",
            points: 1,
            ansA: "30. Juni 1877", 
            ansB: "22. August 1958",
            ansC: "2. Januar 1964",
            ansD: "28. Juli 1962",
            correct: "D",
            info: "Die Bundesliga startete in der Saison 1963/1964. Der erste Meister war der 1.FC Köln.",
            b_img: "fußballStadion.jpg"
        },
        q9:{
            name: "q9",
            q: "Welche ist die zweitgrößte Religion (Anzahl der Mitglieder)?",
            points: 1,
            ansA: "Buddhismus", 
            ansB: "Islam",
            ansC: "Judentum",
            ansD: "Hinduismus",
            correct: "B",
            info: "Religionen nach Anhängeranzahl: 1.Christentum, 2.Islam, 3.Budhismus, 4.Hinduismus, 5.Judentum",
            b_img: "moshee.jpg"
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
            info: "Der Häufigste Straßenname ist 'Hauptstraße'.",
            b_img: "straße.jpg"
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
            info: "Ende großer Kaiserreiche von 1912 zu 1945: Kaiserreich China, Kaiserreich Russland, Kaiserreich Deutschland, Kaiserreich Japan.",
            b_img: "caesarBueste.jpg"
        },
        q2:{
            name: "q2",
            q: "Wie viele Werke schrieb Mozart",
            points: 1,
            ansA: "über 250", 
            ansB: "ca. 100",
            ansC: "über 290",
            ansD: "137",
            correct: "A",
            info: "Offiziell sind es heute 262 Werke die Wolfgang Amadeus Mozart zwischen 1756 und 1791 komponierte.",
            b_img: "musiknotenAlt.jpg"
        },
        q3:{
            name: "q3",
            q: "Was versteht man unter 'semantische Sättigung'?",
            points: 1,
            ansA: "Heiserkeit", 
            ansB: "Psychologisches Phänomen",
            ansC: "Medizinischer Ausdruck",
            ansD: "Verletzung des Magens",
            correct: "B",
            info: "Unter semantischer Sättigung versteht man den Bedeutungsverlust/Bedeutungswandel eines Wortes nach zu vielen Wiederholungen dieses Worts",
            b_img: "buecherregal.jpg"
        },
        q4:{
            name: "q4",
            q: "Wer soll angeblich gesagt haben: 'Ich kann garnicht so viel fressen, wie ich kotzen möchte '",
            points: 1,
            ansA: "Max Liebermann", 
            ansB: "Kurt Tucholsky",
            ansC: "Franz Mark",
            ansD: "Bertolt Brecht",
            correct: "A",
            info: "Welch ein grandioses Zitat!",
            b_img: "buecherregal.jpg"
        },
        amount: 4
    },
    legy:{
        q1:{
            name: "q1",
            q: "wie schreibt man 's o v i e l' in 'Ich möchte ... schlafen wie möglich'?",
            points: 1,
            ansA: "soviel", 
            ansB: "beides ist möglich",
            ansC: "so viel",
            ansD: "so-viel",
            correct: "C",
            info: "Beide Schreibweisen werden heute gebraucht. Allerdings schreibt man 'soviel' nur wenn es sich um eine Konjunktion handelt",
            b_img: "buecherregal.jpg"
        },
        q2:{
            name: "q2",
            q: "Wie heißt die Sonde, die 2015 Pluto erreichte?",
            points: 1,
            ansA: "Kepler", 
            ansB: "New Horizons",
            ansC: "DSCOVR",
            ansD: "Juno",
            correct: "B",
            b_img: "pluto.jpg"
        },
        q3:{
            name: "q3",
            q: "Wie groß ist Afrika?",
            points: 1,
            ansA: "28.446.178 km^2", 
            ansB: "31.742.558 km^2",
            ansC: "29.612.413 km^2",
            ansD: "30.221.532 km^2",
            correct: "D",
            info: "Mit über 30 Millionen km^2 ist Afrika der zweitgrößte Kontinent der Erde.",
            b_img: "afrikaWueste.jpg"
        },
        q4:{
            name: "q4",
            q: "Das Wort 'Astronaut leitet sich aus dem Griechischen ab. Was bedeutet es?",
            points: 1,
            ansA: "Sternenschiffer", 
            ansB: "Raumläufer",
            ansC: "Sternenschwimmer",
            ansD: "Sternenwandler",
            correct: "D",
            b_img: "astronaut.jpg"
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//start (setup Listeners)
function setListeners(){

let A = document.getElementById("A");
let B = document.getElementById("B");
let C = document.getElementById("C");
let D = document.getElementById("D");
let Q = document.getElementById("Q-box"); 

A.addEventListener("click", function (){ next(a) })
B.addEventListener("click", function (){ next(b) })
C.addEventListener("click", function (){ next(c) })
D.addEventListener("click", function (){ next(d) })

A.addEventListener("mouseout", function(){
    void A.offsetWidth;
    A.classList.add("A-box-UnHover")
})

B.addEventListener("mouseout", function(){
    void this.offsetWidth;
    B.classList.add("B-box-UnHover")
})

C.addEventListener("mouseout", function(){
    void this.offsetWidth;
    C.classList.add("C-box-UnHover")
})

D.addEventListener("mouseout", function(){
    void this.offsetWidth;
    D.classList.add("D-box-UnHover")
})

}

setListeners();

//set full-points 0 
localStorage.setItem('full-points', '0')

//set time 0
localStorage.setItem('Time', 0)

//start time
let time = Date.now()

//empty storage
function epmtyStorage(){
localStorage.setItem("points", 0)
}

//initiate
epmtyStorage();
setup();
displayQ();
