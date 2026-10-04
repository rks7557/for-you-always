/* =========================================================
   ELEMENT SHORTCUTS
========================================================= */

const $ = selector =>
    document.querySelector(selector);


const $$ = selector =>
    document.querySelectorAll(selector);



/* =========================================================
   MUSIC + OPENING SCREEN
========================================================= */

const openingScreen =
    document.getElementById("openingScreen");


const openLove =
    document.getElementById("openLove");


const loveSong =
    document.getElementById("loveSong");


const musicError =
    document.getElementById("musicError");



openLove.addEventListener(
    "click",
    async () => {


        /*
            Because this function runs after
            the user clicks the button,
            the browser is much more likely
            to allow audio playback.
        */


        try {

            await loveSong.play();


            console.log(
                "Music started successfully."
            );


        }

        catch (error) {

            console.error(
                "Music could not start:",
                error
            );


            musicError.textContent =
                "Music file not found. Check assets/for-a-reason.mp3";


            /*
                We still allow the website
                to open even if the music
                file has a problem.
            */

        }


        /*
            Hide opening screen
        */

        openingScreen.classList.add(
            "hide"
        );


        /*
            Start some hearts
        */

        heartRain(20);

    }
);



/* =========================================================
   FLOATING HEARTS
========================================================= */

function heartRain(count = 16) {


    const box =
        document.getElementById("hearts");


    for (
        let i = 0;
        i < count;
        i++
    ) {


        const heart =
            document.createElement("div");


        heart.className =
            "floating-heart";


        heart.textContent =
            [
                "♡",
                "♥",
                "❤",
                "✦"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.fontSize =
            (
                12 +
                Math.random() * 22
            ) + "px";


        heart.style.animationDuration =
            (
                5 +
                Math.random() * 7
            ) + "s";


        heart.style.animationDelay =
            (
                Math.random() * 2
            ) + "s";


        box.appendChild(heart);


        setTimeout(
            () => {

                heart.remove();

            },
            14000
        );

    }

}


/*
    Initial hearts
*/

heartRain(18);


/*
    Keep creating hearts
*/

setInterval(
    () => {

        heartRain(2);

    },
    1800
);



/* =========================================================
   HERO BUTTON
========================================================= */

document
    .getElementById("startBtn")
    .onclick = () => {


        document
            .querySelector(".letter")
            .scrollIntoView({

                behavior:
                    "smooth"

            });

    };



/* =========================================================
   BEAUTIFUL REASONS
========================================================= */

$$(".reason-card")
    .forEach(card => {


        card.onclick = () => {


            const message =
                card.dataset.text;


            document
                .getElementById(
                    "reasonOutput"
                )
                .textContent =
                message;


            heartRain(5);

        };

    });



/* =========================================================
   CATCH THE LOVE GAME
========================================================= */

let score = 0;

let gameTimer = null;



function spawnHeart() {


    const arena =
        document.getElementById(
            "heartArena"
        );


    const heart =
        document.createElement(
            "button"
        );


    heart.className =
        "target-heart";


    heart.textContent =
        "♥";


    heart.setAttribute(
        "aria-label",
        "catch heart"
    );


    heart.style.left =
        (
            5 +
            Math.random() * 88
        ) + "%";


    heart.style.top =
        (
            8 +
            Math.random() * 78
        ) + "%";


    heart.onclick = () => {


        score++;


        document
            .getElementById("score")
            .textContent =
            score;


        heart.remove();


        if (score >= 10) {


            clearInterval(
                gameTimer
            );


            document
                .getElementById(
                    "gameMessage"
                )
                .textContent =
                "You caught my heart. Again. ♡";


            heartRain(12);


        }

        else {


            spawnHeart();

        }

    };


    arena.appendChild(
        heart
    );

}



/*
    Start game
*/

document
    .getElementById("gameStart")
    .onclick = () => {


        score = 0;


        document
            .getElementById("score")
            .textContent =
            "0";


        document
            .getElementById(
                "gameMessage"
            )
            .textContent =
            "Catch them!";


        document
            .getElementById(
                "heartArena"
            )
            .innerHTML =
            "";


        clearInterval(
            gameTimer
        );


        spawnHeart();


        gameTimer =
            setInterval(
                () => {


                    if (score < 10) {


                        document
                            .getElementById(
                                "heartArena"
                            )
                            .innerHTML =
                            "";


                        spawnHeart();

                    }

                },
                900
            );

    };



/* =========================================================
   LOVE QUIZ
========================================================= */

const quiz = [


    {

        q:
            "When I am angry, what should I do first?",

        a: [

            "Say something I'll regret",

            "Take a pause and calm down",

            "Start an argument",

            "Disappear"

        ],

        c: 1

    },


    {

        q:
            "What does your boyfriend think you deserve?",

        a: [

            "Bare minimum",

            "A trophy",

            "Respect, love and reassurance",

            "A lifetime supply of fries"

        ],

        c: 2

    },


    {

        q:
            "What is the correct answer to “Am I pretty?”",

        a: [

            "Obviously yes",

            "Obviously yes",

            "OBVIOUSLY YES",

            "All of the above"

        ],

        c: 3

    },


    {

        q:
            "What should never be used during an argument?",

        a: [

            "A timeout",

            "Kindness",

            "Insecurities as a weapon",

            "A calm conversation"

        ],

        c: 2

    },


    {

        q:
            "Who is still very, very sorry?",

        a: [

            "The moon",

            "Me",

            "The Wi-Fi",

            "Your neighbour"

        ],

        c: 1

    }

];


let questionIndex = 0;



function loadQuiz() {


    const current =
        quiz[
            questionIndex
        ];


    document
        .getElementById("question")
        .textContent =
        current.q;


    document
        .getElementById("quizCount")
        .textContent =
        `Question ${
            questionIndex + 1
        } of ${
            quiz.length
        }`;


    document
        .getElementById("progress")
        .style.width =
        (
            (
                questionIndex + 1
            )
            /
            quiz.length
            *
            100
        ) + "%";


    document
        .getElementById("quizResult")
        .textContent =
        "";


    document
        .getElementById("answers")
        .innerHTML =
        "";


    current.a.forEach(
        (
            answer,
            index
        ) => {


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                answer;


            button.onclick = () => {


                document
                    .querySelectorAll(
                        ".answer"
                    )
                    .forEach(
                        button => {

                            button.disabled =
                                true;

                        }
                    );


                if (
                    index ===
                    current.c
                ) {


                    button.classList
                        .add(
                            "correct"
                        );

                }

                else {


                    button.classList
                        .add(
                            "wrong"
                        );


                    document
                        .querySelectorAll(
                            ".answer"
                        )[
                            current.c
                        ]
                        .classList
                        .add(
                            "correct"
                        );

                }


                setTimeout(
                    () => {


                        questionIndex++;


                        if (
                            questionIndex
                            <
                            quiz.length
                        ) {


                            loadQuiz();

                        }

                        else {


                            document
                                .getElementById(
                                    "question"
                                )
                                .textContent =
                                "Quiz complete. Your result:";


                            document
                                .getElementById(
                                    "answers"
                                )
                                .innerHTML =
                                "";


                            document
                                .getElementById(
                                    "quizResult"
                                )
                                .textContent =
                                "100% beautiful. 100% important. And yes, I know I'm lucky. ♡";


                            heartRain(10);

                        }


                    },
                    750
                );

            };


            document
                .getElementById(
                    "answers"
                )
                .appendChild(
                    button
                );

        }
    );

}


loadQuiz();



/* =========================================================
   PROMISE MODAL
========================================================= */

document
    .getElementById("forgiveBtn")
    .onclick = () => {


        document
            .getElementById("modal")
            .classList
            .add("show");

    };



document
    .getElementById("closeModal")
    .onclick = () => {


        document
            .getElementById("modal")
            .classList
            .remove("show");

    };



document
    .getElementById("modalOk")
    .onclick = () => {


        document
            .getElementById("modal")
            .classList
            .remove("show");


        document
            .getElementById("final")
            .scrollIntoView({

                behavior:
                    "smooth"

            });

    };



/* =========================================================
   FINAL ANSWERS
========================================================= */

document
    .getElementById("yesBtn")
    .onclick = () => {


        document
            .getElementById(
                "finalMessage"
            )
            .textContent =
            "Okay… come here. 🥺❤️ I promise the next chapter is going to be softer.";


        heartRain(30);

    };



document
    .getElementById("maybeBtn")
    .onclick = () => {


        document
            .getElementById(
                "finalMessage"
            )
            .textContent =
            "Take all the time you need. I won't rush you. I'm sorry, and I'm here when you're ready. ❤️";

    };



/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
    new IntersectionObserver(

        entries => {


            entries.forEach(
                entry => {


                    if (
                        entry.isIntersecting
                    ) {


                        entry.target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }
            );

        },

        {

            threshold:
                0.12

        }

    );



$$(".reveal")
    .forEach(
        element => {

            observer.observe(
                element
            );

        }
    );