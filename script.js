console.log('Script geladen');

function setVocabels() {
    var obj = {};
    for (var key in vokabeln) {
        if (vokabeln.hasOwnProperty(key)) {
            console.log(key + " -> " + vokabeln[key]);
            obj[key] = vokabeln[key];
            
        }
    }
    return obj;
}

if (localStorage.getItem("count_wrong") !== null) {
    var wrong_answers = JSON.parse(localStorage.getItem("count_wrong"));
} else {
    var wrong_answers = 0;
}
if (localStorage.getItem("count_correct") !== null) {
    var correct_answers = JSON.parse(localStorage.getItem("count_correct"));
} else {
    var correct_answers = 0;
}
if (localStorage.getItem("streak") !== null) {
    var streak_array = JSON.parse(localStorage.getItem("streak"));
} else {
    var streak_array = [];
}

var streaks = document.querySelectorAll('.streak div');
console.log(streaks.length);
if (streaks.length == 0) {
    if (localStorage.getItem("streak") !== null) {
        streak_array.forEach(element => {
            var empty_streak = document.createElement('div');
            if (element == "c") {
                empty_streak.classList.add('streak_correct');
            } else if (element == "w") {
                empty_streak.classList.add('streak_wrong');                
            } else {
                empty_streak.classList.add('streak_empty');
            }
            document.querySelector('.streak').append(empty_streak);
        });
    } else {
        for (let index = 0; index < 10; index++) {
            empty_streak = document.createElement('div');
            empty_streak.classList.add('streak_empty');
            document.querySelector('.streak').append(empty_streak);
            streak_array.push('e');
        }
    }
    
}
document.querySelector('.counter_wrong').innerHTML = wrong_answers;
document.querySelector('.counter_correct').innerHTML = correct_answers;


const vokabeln = {
    "Vertrieb" : "distribution",
    "Marktforschung" : "market research",
    "Dauerwerbesendung (mit Information)" : "infomercial",
    "Wiedereinführung" : "re-launch",
    "Markentreue / Markenbindung" : "brand loyalty",
    "Außendienstmitarbeiter" : "sales rep",
    "Richtlinie" : "guideline",
    "Fragebogen / Umfrage" : "questionnaire",
    "Konkurrenz / Wettbewerb" : "competition",
    "günstiges Werbegeschenk / 'Give-away'" : "freebie",
    "Mitarbeiterstab" : "staff",
    "Einzelhändler / Wiederverkäufer" : "retailer",
    "Arbeitsgruppe" : "focus group",
    "Nachfassaktion" : "follow-up",
    "Werbeaktion, die bei anderen mitläuft" : "piggyback mailshot",
    "(Zeitschriften-) Anzeige" : "advertisement",
    "Vermarktung" : "promotion",
    "Kundenpflege" : "customer care",
    "Geschäft mit Vollsortiment" : "one-stop-shop",
    "Marketing Maßnahmen" : "marketing measures" 
}
console.log(localStorage.getItem("notAsked"));
console.log(localStorage.getItem("test"));
if (localStorage.getItem("notAsked") !== null) {
    var notAsked = JSON.parse(localStorage.getItem("notAsked"));
} else {
    var notAsked = setVocabels();
}

var wrongVocabels = {};
var correctVocabels = {};

var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};


nextVokabel();
document.querySelector('.user_submit').addEventListener('click', (e) => {
    checkInput();   
})
document.querySelector('.user_input').addEventListener('keyup', (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        checkInput(); 
    }
      
})

function checkInput() {
    console.log(document.querySelector('.user_input').value);
    console.log(document.querySelector('.vokabel').innerHTML);
    var question = notAsked[document.querySelector('.vokabel').innerHTML];
    var answer = document.querySelector('.vokabel').innerHTML;
    var streak = document.createElement('div');
    if (document.querySelector('.user_input').value == notAsked[document.querySelector('.vokabel').innerHTML]) {
        streak.classList.add('streak_correct');
        var streak_value = "c";
        correct_answers += 1;
        correctVocabels[answer] = question;
        console.log('Richtig!');
        console.log(correctVocabels);
        console.log(vokabeln);
        document.querySelector('.alert').classList.add('correct');
        document.querySelector('.alert_question').innerHTML = answer;
        document.querySelector('.alert_answer').innerHTML = question;
        document.querySelector('.alert_text').innerHTML = 'Correct';
        window.setTimeout(() => {
            document.querySelector('.alert').classList.remove('correct');
        }, 1000)
    } else {
        console.log('Falsch!');
        streak.classList.add('streak_wrong');
        var streak_value = "w";
        wrong_answers += 1;
        wrongVocabels[answer] = question;
        document.querySelector('.alert').classList.add('wrong');
        document.querySelector('.alert_text').innerHTML = 'Wrong';
        document.querySelector('.alert_question').innerHTML = answer;
        document.querySelector('.alert_answer').innerHTML = question;

        window.setTimeout(() => {
            document.querySelector('.alert').classList.remove('wrong');
        }, 3000)
    }
    console.log(notAsked);
    document.querySelector('.counter_wrong').innerHTML = wrong_answers;
    document.querySelector('.counter_correct').innerHTML = correct_answers;
    delete notAsked[answer];
    console.log(notAsked);
    
    document.querySelector('.streak div').remove();
    document.querySelector('.streak').append(streak);
    streak_array.push(streak_value);
    streak_array.shift();
    console.log(streak_array);
    saveStatus();
    nextVokabel();

}

function saveStatus() {
    localStorage.setItem("notAsked", JSON.stringify(notAsked));
    localStorage.setItem("count_wrong", JSON.stringify(wrong_answers));
    localStorage.setItem("count_correct", JSON.stringify(correct_answers));
    localStorage.setItem("streak", JSON.stringify(streak_array));
    retrievedObject = localStorage.getItem("notAsked");
    console.log(JSON.parse(retrievedObject));
}

function nextVokabel() {
    if (Object.entries(notAsked).length === 0 && notAsked.constructor === Object) {
        console.log('Empty Object');
        if (Object.entries(wrongVocabels).length === 0 && wrongVocabels.constructor === Object) {
            console.log('Keine Falschen mehr');
            console.log(vokabeln);
            notAsked = setVocabels();
        } else {
            notAsked = wrongVocabels;
        }
        
    } 
    document.querySelector('.vokabel').innerHTML = getKeyByValue(notAsked, randomProperty(notAsked));
    //document.querySelector('.vokabel').innerHTML = getKeyByValue(vokabeln, randomProperty(vokabeln));
    document.querySelector('.user_input').value = '';
}

function startTest() {
    for (var key in vokabeln) {
        if (vokabeln.hasOwnProperty(key)) {
            console.log(key + " -> " + vokabeln[key]);
            document.querySelector('.vokabel').innerHTML = key;
            
        }
    }
}



function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }