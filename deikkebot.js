var lastQ;
var lastA;
var questions = ["ben jij een robot?", "hoe heet jij?", "hoi", "hallo", "hou oud ben jij?", "wat vind je lekker?"];
var awnsers = ["ja", "ikke", "hallo", "hoi", "dat weet ik niet", "electriciteit"];

// var greetings = ["hoi", "hallo", "ook hallo", "gegroet"];
var geenidees = ["ehm", "ik begrijp je niet","op die vraag heb ik geen antwoord", "...", "doe /leer VRAAG;ANTWOORD om mij iets te leren"];

var possibleAwnsers = [];

var faqTitles = ["Wat is de Coderclass?", "Is de Coderclass een normale opleiding op h/v niveau?", "Waar komen die 5 lesuren voor de Coderclass vandaan?", "Hoe houdt de Coderclass rekening met verschillen tussen leerlingen?", "Wie kunnen zich aanmelden voor de Coderclass?", "Wanneer is iemand geschikt voor de Coderclass?", "Als achteraf blijkt dat de Coderclass toch niet zo’n goede keuze was, kun je dan ook een overstap maken naar een reguliere havo- of vwo-klas?", "Kunnen zij-instromers , leerlingen van een andere h/v school, zich ook aanmelden voor de Coderclass?", "Kunnen leerlingen een bezoek brengen aan de Coderclass?", "Masterclass", "Meeloopdag", "Wat is het verschil tussen de Coderclass en het Technasium?"];
var faqContents = ["De Coderclass is een opleiding op havo en vwo (h/v) niveau die vanaf het schooljaar 2016-2017 is gestart op het MML. In de Coderclass krijgen geïnteresseerde en gemotiveerde leerlingen de kans om zich te bekwamen op diverse onderdelen van de informatica waarbij het leren programmeren centraal staat.", "Tijdens de opleiding krijgen leerlingen alle vakken die wettelijk gelden voor havo en vwo. Daarnaast krijgen ze 5 uur in de week les in informatica.",
"Die vijf lesuren zijn deels in plaats van keuzewerktijd en deels als extra uren die opgenomen zijn in het rooster.",
"In de Coderclass werkt de school met badges. Dat zijn certificaten die leerlingen krijgen als ze een onderdeel hebben afgerond. Er zijn badges voor onderdelen in programmeren, robotica, webdevelopment, 3D ontwerpen, ontwikkeling van apps, embedded systems, gamedevelopment en nog veel meer. Leerlingen volgen een basisprogramma maar kunnen daarnaast hun leerweg vervolgen met een module of een project dat weer een stuk moeilijker is. Zo krijgen leerlingen de kans om in hun eigen tempo te werken.",
"Alle leerlingen die toelaatbaar zijn voor een havo of vwo opleiding en die zo geïnteresseerd zijn in informatica dat ze veel energie daarin willen steken.",
"Enthousiasme, motivatie, leergierigheid, doorzettingsvermogen en zelfstandigheid zijn belangrijke eigenschappen van leerlingen die in de Coderclass zitten. Een grote interesse voor computers en programmeren staat natuurlijk bovenaan! We willen graag leerlingen in de Coderclass die er voor gaan en geen spijt krijgen van hun keuze omdat het toch niet bij ze past. Daarom willen we met proeflessen en intakegesprekken aftasten of de Coderclass een goede keuze zal zijn voor de desbetreffende leerling.",
"Halverwege het schooljaar gaan we inderdaad kijken of de Coderclass een goede keuze is geweest voor de leerling. We letten vooral op aspecten als motivatie, voortgang en zelfstandigheid. Sommige leerlingen zouden dan het advies kunnen krijgen om in het tweede jaar een overstap naar een reguliere klas te maken. Dit zal uiteraard in overleg met ouders/verzorgers gaan.",
"Dat kan in een aantal gevallen als er voldoende plaats is in de betreffende klas. Leerlingen krijgen een intakegesprek om te zien of ze passen in de Coderclass. Bovendien moeten ze bereid zijn om de gemiste stof in te halen of te laten zien dat ze de vaardigheden beheersen.",
"Dat kan op twee manieren. Met een zogenaamde Masterclass of een meeloopdag. Doe /faq Masteclasss of /faq meeloopdag voor meer info.",
"Op dinsdag 28 februari houden we een masterclass voor leerlingen die geïnteresseerd zijn in de Coderclass. Vind je het leuk om te programmeren en wil je meer weten over de Coderclass, dan ben je van harte welkom! De masterclass is tussen 13:00 en 16:00. Je kunt je inschrijven via dit formulier. Er is plek voor maximaal 25 deelnemers. Wees er dus snel bij!",
"Als je al best ver bent met programmeren dan mag je een ochtend meelopen met de huidige Coderclass. We kunnen je dan toegang verlenen tot ons lesmateriaal. Je kunt je via dit aanmeldingsformulier inschrijven voor een meeloopdag.",
"Omdat we bij ons op school ook een Technasium hebben is dit een vaak gestelde vraag. De belangrijkste verschillen zijn:\nMet de Coderclass ligt de focus echt op de informatica en het programmeren, terwijl het Technasium vrij breed is. Per project focus je je op één van de zeven betawerelden.\nIn de Coderclass werken we in groepjes aan projecten en zelfstandig aan modules. Op het Technasium werkt men uitsluitend in projectvorm.\nOp het Technasium ligt het accent ook heel duidelijk op onderzoek. Met de Coderclass is dat veel minder het geval."
];

const TeleBot = require("telebot");

const bot = new TeleBot({
    token: "505238404:AAHiHaeQ2ZRWT5TJkaBI2R625bnhz-CE8W8" // Telegram Bot API token.
});

function learn(q, a) { // learn(lastA, lastQ);
    this.b = 0;
    this.learned = true;
    while (this.b < questions.length) {
        if (questions[this.b] == q && awnsers[this.b] == a) {
            this.learned = false;
        }
        this.b += 1;
    }
    if (this.learned == true) {
        questions[questions.length] = q;
        awnsers[awnsers.length] = a;
    }
}

function random(min, max) {
    return(Math.floor(Math.random()*(max-min))+min);
}

function speak() {
    possibleAwnsers = [];
    for (var i = 0; i < questions.length; i ++) {
        if (lastQ.match(new RegExp(questions[i], "i"))) {
            possibleAwnsers[possibleAwnsers.length] = awnsers[i];
        }
    }
    if (possibleAwnsers.length > 0) {
        lastA = possibleAwnsers[random(0,possibleAwnsers.length)];
    } else {
        // speakAttempt2(lastQ);
        lastA = geenidees[random(0,geenidees.length)];
    }
}

// function speakAttempt2(QToAnswer) {
//     lastA == "";
//     var QHasGreeting = false;
//     for (var i = 0; i < greetings.length; i ++) {
//       console.log("/"+greetings[i]+"/");
//       if (QToAnswer.match("/"+greetings[i]+"/", "i")) {
//         QHasGreeting = true
//         break;
//       }
//     }
//     console.log(QHasGreeting);
//     if (QHasGreeting) {
//       lastA += greetings[random(0,greetings.length)];
//     }
// }

function cmdleer(leerData) {
    var matchLeerData = leerData.match(/(.*);(.*)/);
    if (matchLeerData !== null) {
      if (matchLeerData[1] !== undefined && matchLeerData[1].length >= 1 && matchLeerData[2] !== undefined && matchLeerData[2].length >= 1) {
        learn(matchLeerData[1], matchLeerData[2]);
        return("ok, begrepen.");
      } else {
        return("vraag of antwoord is niet correct meegegeven.");
      }
    } else {
      return("ongeldige data.");
    }
}

function cmdfaq(faqTitle) {
    console.log(faqTitle);
    if (faqTitles[faqTitle-1] === undefined) {
        this.returnSTR = "Sorry, maar die faq bestaat niet. Hier zijn alle vragen met nummers. Doe /faq <nummer> om het antwoord te zien.";
        this.a = 0;
        while (this.a < faqTitles.length) {
            this.returnSTR = this.returnSTR.concat("\n" + (this.a + 1).toString() + ": " + faqTitles[this.a]);
            this.a += 1;
        }
        console.log(this.returnSTR);
        return(this.returnSTR);
    } else {
        console.log(faqContents[faqTitle-1]);
        return(faqContents[faqTitle-1]);
    }
    return("Iets ging niet helemaal goed...");
}

bot.on(/(.*)/, function (msg, props) {
    if (props.match[0][0] == "/") {
      var matchLeer = props.match[0].match(/\/leer (.*)/);
      if (matchLeer !== null) {
          bot.sendMessage(msg.from.id, cmdleer(matchLeer[1]));
          return;
      }
      if (props.match[0].match(/\/geleerd/)) {
          console.log(questions);
          console.log(awnsers);
          bot.sendMessage(msg.from.id, questions.toString());
          bot.sendMessage(msg.from.id, awnsers.toString());
          return;
      }
      if (props.match[0].match(/\/start/)) {
          bot.sendMessage(msg.from.id, "Hallo, Ik ben Ikke De Bot en ik ben een chatbot. Ik kan een beetje chatten (mijn maker is hier nog mee bezig), maar ik kan ook veel vertellen over het Metis Montesorri Lyceum. Door '/' in te typen worden een paar commandos weergegeven. Met deze commandos kan je meer leren over de school.");
          return;
      }
      var matchFaq = props.match[0].match(/\/faq (.*)/);
      if (matchFaq !== null) {
          bot.sendMessage(msg.from.id, cmdfaq(matchFaq[1]));
          return;
      }
      bot.sendMessage(msg.from.id, "Dat commando ken ik niet. :(");
    } else {
        lastQ = props.match[0];
        learn(lastA, lastQ);
        speak();
        return bot.sendMessage(msg.from.id, lastA);
    }
 });

bot.start();
