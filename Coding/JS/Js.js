// link the canvas HTML element
var canvas = document.getElementById('canvas');
var brush = canvas.getContext('2d');
// create a variable to store the option on the main menu
var menu_item = 1;
// make a variable so their is a pause between scrolling on the main menu
var pressed = 0;
// link the title and subtitle HTML elements
var title = document.getElementById('title');
var sub = document.getElementById('sub');
// make a variable for the animation frame
var AF;
var BlackJack_menu_item = 1;
var user_card = [];
var user_score = 0;
var user_score_added_1 = 0;
var user_score_added_2 = 0;
var user_score_added_3 = 0;
var user_score_added_4 = 0;
var user_score_added_5 = 0;
var user_ace = 0;
var shown = 0;
// load the menu buttons into a variable
//************************************** ../Coding/IMAGES works with opening the file, ../IMAGES works with live preview**********************************
var BlackJack_button_highlighted = new Image();
BlackJack_button_highlighted.src = "../IMAGES/BlackJack-highlighted.png";
var BlackJack_button_unhighlighted = new Image();
BlackJack_button_unhighlighted.src = "../IMAGES/BlackJack-unhighlighted.png"
var SpaceInvaders_button_highlighted = new Image();
SpaceInvaders_button_highlighted.src = "../IMAGES/SpaceInvaders-highlighted.png";
var SpaceInvaders_button_unhighlighted = new Image();
SpaceInvaders_button_unhighlighted.src = "../IMAGES/SpaceInvaders-unhighlighted.png";
var SimonSays_button_highlighted = new Image();
SimonSays_button_highlighted.src = "../IMAGES/SimonSays-highlighted.png";
var SimonSays_button_unhighlighted = new Image();
SimonSays_button_unhighlighted.src = "../IMAGES/SimonSays-unhighlighted.png";
var Menu_button = new Image();
Menu_button.src = "../IMAGES/Menu_button.png";
//load the backgrounds into a variable
var Starry_background = new Image();
Starry_background.src = "../IMAGES/starry-background.png";
var main_menu_background = new Image();
main_menu_background.src = "../IMAGES/main_menu.png";
var BlackJack_background = new Image();
BlackJack_background.src = "../IMAGES/BlackJack_background.png";
var SimonSays_background = new Image();
SimonSays_background.src = "../IMAGES/SimonSays_background.png";
//create an array to store the keycode
var keys = [];
//create an array to store cards
var card_select = [];
//  craete a function for the main menu
function menu() {
    //change which button is highlighted
    if (menu_item == 1) {
        brush.clearRect(0, 0, 500, 500)
        brush.drawImage(main_menu_background, 0, 0, 300, 150);
        brush.drawImage(BlackJack_button_highlighted, 100, 20);
        brush.drawImage(SimonSays_button_unhighlighted, 100, 60);
        brush.drawImage(SpaceInvaders_button_unhighlighted, 100, 100);
    };
    if (menu_item == 2) {
        brush.clearRect(0, 0, 500, 500)
        brush.drawImage(main_menu_background, 0, 0, 320, 150);
        brush.drawImage(BlackJack_button_unhighlighted, 100, 20);
        brush.drawImage(SimonSays_button_highlighted, 100, 60);
        brush.drawImage(SpaceInvaders_button_unhighlighted, 100, 100);
    }
    if (menu_item == 3) {
        brush.drawImage(main_menu_background, 0, 0, 320, 150);
        brush.drawImage(BlackJack_button_unhighlighted, 100, 20);
        brush.drawImage(SimonSays_button_unhighlighted, 100, 60);
        brush.drawImage(SpaceInvaders_button_highlighted, 100, 100);
    }
    //request animation frame for the game function
    AF = requestAnimationFrame(game);
}
// create a function to switch between the menu options & play the game
function game() {
    // loop back to the menu function
    AF = requestAnimationFrame(menu);
    // check for key presses
    addEventListener('keydown', function (e) {
        keys[e.keyCode] = true;
        //prevent holding down the key for a bit
        pressed = 1;
    }, false);
    //delete the key from the keys array
    addEventListener('keyup', function (e) {
        delete keys[e.keyCode];
    }, false);
    //enter
    if (keys[13] && pressed == 1) {
        pressed = 0;
        //launch BlackJack
        if (menu_item == 1) {
            BlackJack();
        }
        //launch SimonSays
        if (menu_item == 2) {
            SimonSays();
        }
        //launch Space Invaders
        if (menu_item == 3) {
            SpaceInvaders();
        }
    }
    //up
    if (keys[38] && pressed == 1) {
        pressed = 0;
        // change the menu selection up by one
        menu_item--;
        // set menu selection to the third option if the user goes below 1
        if (keys[38] && menu_item < 1) {
            menu_item = 3;
        }
    }
    //down
    if (keys[40] && pressed == 1) {
        pressed = 0;
        // change the menu selection down by one
        menu_item++;
        // set menu selection to the first option of the user goes above 3
        if (keys[40] && menu_item > 3) {
            menu_item = 1;
        };
    }
}
// BlackJack
function BlackJack() {
    //change the title of the webpage
    document.title = "Black Jack"
        //change the header of the webpage
    title.innerText = "Black Jack";
    //remove the subtitle and leave a gap
    sub.innerHTML = "<br>";
    //clear the canvas
    brush.clearRect(0, 0, 500, 500);
    // Allow the user to go back to the main menu
    //variable for how many cards the user has
    var user_cards = 0;
    // make a variable to show when the user is ready
    var ready = 0;
    // make an array to store the users cards
    //variable for how mny cards the comp has
    var comp_cards = 0
    var comp_card = [];
    var comp_card_counter = Math.floor(Math.random() * 5 + 1);
    cancelAnimationFrame(AF);
    // make a function to draw on the canvas
    function BlackJack_Draw() {
        //draw the background
        brush.drawImage(BlackJack_background, 0, 0)
            // store all the cards into an array
            //ace
        card_select[0] = new Image();
        card_select[0].src = "../IMAGES/Cards/ace_card.png"
            //2
        card_select[1] = new Image();
        card_select[1].src = "../IMAGES/Cards/2_card.png"
            //3
        card_select[2] = new Image();
        card_select[2].src = "../IMAGES/Cards/3_card.png"
            //4
        card_select[3] = new Image();
        card_select[3].src = "../IMAGES/Cards/4_card.png"
            //5
        card_select[4] = new Image();
        card_select[4].src = "../IMAGES/Cards/5_card.png"
            //6
        card_select[5] = new Image();
        card_select[5].src = "../IMAGES/Cards/6_card.png"
            //7
        card_select[6] = new Image();
        card_select[6].src = "../IMAGES/Cards/7_card.png"
            //8
        card_select[7] = new Image();
        card_select[7].src = "../IMAGES/Cards/8_card.png"
            //9
        card_select[8] = new Image();
        card_select[8].src = "../IMAGES/Cards/9_card.png"
            //10
        card_select[9] = new Image();
        card_select[9].src = "../IMAGES/Cards/10_card.png"
            //jack
        card_select[10] = new Image();
        card_select[10].src = "../IMAGES/Cards/jack_card.png"
            //queen
        card_select[11] = new Image();
        card_select[11].src = "../IMAGES/Cards/queen_card.png"
            //king
        card_select[12] = new Image();
        card_select[12].src = "../IMAGES/Cards/king_card.png"
            //blank
        card_select[13] = new Image();
        card_select[13].src = "../IMAGES/Cards/blank.png"
            // check for key presses
        if (user_cards >= 1) {
            brush.drawImage(card_select[13], 0, 0, 50, 50);
            if (ready == 1) {
                brush.drawImage(user_card[1], 0, 0, 50, 50);
                shown++;
                if (shown > 0) {
                    switch (user_card[1].src) {
                    case card_select[0].src:
                        setTimeout(function () {
                            if (user_score_added_1 == 0) {
                                user_score_added_1++;
                                user_ace = parseInt(prompt("1 or 11"));
                                user_score = user_score + user_ace;
                                console.log(user_score);
                            };
                        });
                        break;
                    case card_select[1].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 2;
                            console.log(user_score);
                        };
                        break;
                    case card_select[2].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 3;
                            console.log(user_score);
                        };
                        break;
                    case card_select[3].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 4;
                            console.log(user_score);
                        };
                        break;
                    case card_select[4].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 5;
                            console.log(user_score);
                        };
                        break;
                    case card_select[5].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 6;
                            console.log(user_score);
                        };
                        break;
                    case card_select[6].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 7;
                            console.log(user_score);
                        };
                        break;
                    case card_select[7].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 8;
                            console.log(user_score);
                        };
                        break;
                    case card_select[8].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 9;
                            console.log(user_score);
                        };
                        break;
                    case card_select[9].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 10;
                            console.log(user_score);
                        };
                        break;
                    case card_select[10].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 10;
                            console.log(user_score);
                        };
                        break;
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 10;
                            console.log(user_score);
                        };
                    case card_select[11].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 10;
                            console.log(user_score);
                        };
                        break;
                    case card_select[12].src:
                        if (user_score_added_1 == 0) {
                            user_score_added_1++;
                            user_score = user_score + 10;
                            console.log(user_score);
                        };
                        break;
                    };
                };
            };
        };
        if (user_cards >= 2) {
            brush.drawImage(card_select[13], 50, 0, 50, 50);
            if (ready == 1) {
                brush.drawImage(user_card[2], 50, 0, 50, 50);
                switch (user_card[2].src) {
                case card_select[0].src:
                    setTimeout(function () {
                        if (user_score_added_2 == 0) {
                            user_score_added_2++;
                            user_ace = parseInt(prompt("1 or 11"));
                            user_score = user_score + user_ace;
                            console.log(user_score);
                        };
                    });
                    break;
                case card_select[1].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 2;
                        console.log(user_score);
                    };
                    break;
                case card_select[2].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 3;
                        console.log(user_score);
                    };
                    break;
                case card_select[3].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 4;
                        console.log(user_score);
                    };
                    break;
                case card_select[4].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 5;
                        console.log(user_score);
                    };
                    break;
                case card_select[5].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 6;
                        console.log(user_score);
                    };
                    break;
                case card_select[6].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 7;
                        console.log(user_score);
                    };
                    break;
                case card_select[7].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 8;
                        console.log(user_score);
                    };
                    break;
                case card_select[8].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 9;
                        console.log(user_score);
                    };
                    break;
                case card_select[9].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[10].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                case card_select[11].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[12].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                };
            };
        };
        if (user_cards >= 3) {
            brush.drawImage(card_select[13], 100, 0, 50, 50);
            if (ready == 1) {
                brush.drawImage(user_card[3], 100, 0, 50, 50)
                switch (user_card[3].src) {
                case card_select[0].src:
                    setTimeout(function () {
                        if (user_score_added_3 == 0) {
                            user_score_added_3++;
                            user_ace = parseInt(prompt("1 or 11"));
                            user_score = user_score + user_ace;
                            console.log(user_score);
                        };
                    });
                    break;
                case card_select[1].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 2;
                        console.log(user_score);
                    };
                    break;
                case card_select[2].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 3;
                        console.log(user_score);
                    };
                    break;
                case card_select[3].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 4;
                        console.log(user_score);
                    };
                    break;
                case card_select[4].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 5;
                        console.log(user_score);
                    };
                    break;
                case card_select[5].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 6;
                        console.log(user_score);
                    };
                    break;
                case card_select[6].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 7;
                        console.log(user_score);
                    };
                    break;
                case card_select[7].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 8;
                        console.log(user_score);
                    };
                    break;
                case card_select[8].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 9;
                        console.log(user_score);
                    };
                    break;
                case card_select[9].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[10].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                case card_select[11].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[12].src:
                    if (user_score_added_3 == 0) {
                        user_score_added_3++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                };
            }
        };
        if (user_cards >= 4) {
            brush.drawImage(card_select[13], 150, 0, 50, 50);
            if (ready == 1) {
                brush.drawImage(user_card[4], 150, 0, 50, 50)
                switch (user_card[4].src) {
                case card_select[0].src:
                    setTimeout(function () {
                        if (user_score_added_4 == 0) {
                            user_score_added_4++;
                            user_ace = parseInt(prompt("1 or 11"));
                            user_score = user_score + user_ace;
                            console.log(user_score);
                        };
                    });
                    break;
                case card_select[1].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 2;
                        console.log(user_score);
                    };
                    break;
                case card_select[2].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 3;
                        console.log(user_score);
                    };
                    break;
                case card_select[3].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 4;
                        console.log(user_score);
                    };
                    break;
                case card_select[4].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 5;
                        console.log(user_score);
                    };
                    break;
                case card_select[5].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 6;
                        console.log(user_score);
                    };
                    break;
                case card_select[6].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 7;
                        console.log(user_score);
                    };
                    break;
                case card_select[7].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 8;
                        console.log(user_score);
                    };
                    break;
                case card_select[8].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 9;
                        console.log(user_score);
                    };
                    break;
                case card_select[9].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[10].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                case card_select[11].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[12].src:
                    if (user_score_added_4 == 0) {
                        user_score_added_4++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                };
            }
        }
        if (user_cards >= 5) {
            brush.drawImage(card_select[13], 200, 0, 50, 50);
            if (ready == 1) {
                brush.drawImage(user_card[5], 200, 0, 50, 50)
                switch (user_card[5].src) {
                case card_select[0].src:
                    setTimeout(function () {
                        if (user_score_added_5 == 0) {
                            user_score_added_5++;
                            user_ace = parseInt(prompt("1 or 11"));
                            user_score = user_score + user_ace;
                            console.log(user_score);
                        };
                    });
                    break;
                case card_select[1].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 2;
                        console.log(user_score);
                    };
                    break;
                case card_select[2].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 3;
                        console.log(user_score);
                    };
                    break;
                case card_select[3].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 4;
                        console.log(user_score);
                    };
                    break;
                case card_select[4].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 5;
                        console.log(user_score);
                    };
                    break;
                case card_select[5].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 6;
                        console.log(user_score);
                    };
                    break;
                case card_select[6].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 7;
                        console.log(user_score);
                    };
                    break;
                case card_select[7].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 8;
                        console.log(user_score);
                    };
                    break;
                case card_select[8].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 9;
                        console.log(user_score);
                    };
                    break;
                case card_select[9].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[10].src:
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                    if (user_score_added_2 == 0) {
                        user_score_added_2++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                case card_select[11].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                case card_select[12].src:
                    if (user_score_added_5 == 0) {
                        user_score_added_5++;
                        user_score = user_score + 10;
                        console.log(user_score);
                    };
                    break;
                };
            }
        };
        if (comp_cards >= 1) {
            brush.drawImage(card_select[13], 0, 100, 50, 50);
            if (ready == 1) {
                brush.drawImage(comp_card[1], 0, 100, 50, 50)
            }
        };
        if (comp_cards >= 2) {
            brush.drawImage(card_select[13], 50, 100, 50, 50);
            if (ready == 1) {
                brush.drawImage(comp_card[2], 50, 100, 50, 50)
            }
        };
        if (comp_cards >= 3) {
            brush.drawImage(card_select[13], 100, 100, 50, 50);
            if (ready == 1) {
                brush.drawImage(comp_card[3], 100, 100, 50, 50)
            };
        };
        if (comp_cards >= 4) {
            brush.drawImage(card_select[13], 150, 100, 50, 50);
            if (ready == 1) {
                brush.drawImage(comp_card[4], 150, 100, 50, 50)
            };
        };
        if (comp_cards >= 5) {
            brush.drawImage(card_select[13], 200, 100, 50, 50);
            if (ready == 1) {
                brush.drawImage(comp_card[5], 200, 100, 50, 50)
            };
        };
        if (user_cards > 0) {
            if (BlackJack_menu_item == 1) {
                brush.font = "10px Arial";
                brush.fillStyle = "white";
                brush.fillText("Draw", 10, 60);
                brush.fillStyle = "black";
                brush.fillText("Done", 10, 70);
                brush.fillText("Quit", 10, 80);
            };
            if (BlackJack_menu_item == 2) {
                brush.font = "10px Arial";
                brush.fillStyle = "black";
                brush.fillText("Draw", 10, 60);
                brush.fillText("Quit", 10, 80);
                brush.fillStyle = "white";
                brush.fillText("Done", 10, 70);
            };
            if (BlackJack_menu_item == 3) {
                brush.font = "10px Arial";
                brush.fillStyle = "white";
                brush.fillText("Quit", 10, 80);
                brush.fillStyle = "black";
                brush.fillText("Done", 10, 70);
                brush.fillText("Draw", 10, 60);
            };
        }
        else {
            if (BlackJack_menu_item == 1) {
                brush.font = "10px Arial";
                brush.fillStyle = "white";
                brush.fillText("Draw", 10, 60);
                brush.fillStyle = "black";
                brush.fillText("Quit", 10, 80);
            }
            if (BlackJack_menu_item == 3) {
                brush.font = "10px Arial";
                brush.fillStyle = "black";
                brush.fillText("Draw", 10, 60);
                brush.fillStyle = "white";
                brush.fillText("Quit", 10, 80);
            }
        }
        // create an animation frame to play the game
        AF = requestAnimationFrame(BlackJack_Game);
    };
    // play BlackJack
    function BlackJack_Game() {
        //create an animation frame to loop back to blackjack_draw
        addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
            //prevent holding down the key for a bit
            pressed = 1;
        }, false);
        //delete the key from the keys array
        addEventListener('keyup', function (e) {
            delete keys[e.keyCode];
        }, false);
        //up
        if (keys[38] && pressed == 1) {
            pressed = 0;
            // change the menu selection up by one
            BlackJack_menu_item--;
            if (user_cards == 0) {
                if (BlackJack_menu_item == 2) {
                    BlackJack_menu_item = 1;
                };
            }
            // set menu selection to the third option if the user goes below 1\
            if (keys[38] && BlackJack_menu_item < 1) {
                BlackJack_menu_item = 3;
            }
        }
        //down
        if (keys[40] && pressed == 1) {
            pressed = 0;
            // change the menu selection down by one
            BlackJack_menu_item++;
            if (user_cards == 0) {
                if (BlackJack_menu_item == 2) {
                    BlackJack_menu_item = 3;
                };
            };
            // set menu selection to the first option of the user goes above 3
            if (keys[40] && BlackJack_menu_item > 3) {
                BlackJack_menu_item = 1;
            };
        };
        //enter
        if (keys[13] && pressed == 1) {
            pressed = 0;
            if (BlackJack_menu_item == 1) {
                user_cards++;
                user_card[user_cards] = card_select[Math.floor(Math.random() * 13)]
            }
            if (BlackJack_menu_item == 2) {
                ready = 1;
            }
            if (BlackJack_menu_item == 3) {
                //clear the canvas
                brush.clearRect(0, 0, 500, 500);
                // reload the page to go back to the main menu
                location.reload();
            }
        };
        if (comp_card_counter > comp_cards) {
            comp_cards++;
            comp_card[comp_cards] = card_select[Math.floor(Math.random() * 13)]
        }
        AF = requestAnimationFrame(BlackJack_Draw);
    };
    // start the animation
    AF = requestAnimationFrame(BlackJack_Draw);
};
// Simon Says
function SimonSays() {
    //change the title of the webpage
    document.title = "Simon Says"
        // change the header tag
    title.innerText = "Simon Says";
    // remove the subtitle and leave a gap
    sub.innerHTML = "<br>";
    //clear the canvas
    brush.clearRect(0, 0, 500, 500);
    // Allow the user to go back to the main menu
    cancelAnimationFrame(AF);
    //make a function to draw on the canvas
    function draw_SimonSays() {
        //draw a background
        brush.drawImage(SimonSays_background, 0, 0);
        // first box
        // change the colour of the box to green
        brush.fillStyle = "green";
        // draw the box
        brush.fillRect(10, 9, 128, 63);
        // second box
        // change the colour of the box to red
        brush.fillStyle = "red";
        // draw the box
        brush.fillRect(161, 9, 128, 63);
        // third box
        // change the colour of the box to yellow
        brush.fillStyle = "yellow";
        // draw the box
        brush.fillRect(10, 80, 128, 63);
        // fourth box
        //change the colour of the box to blue
        brush.fillStyle = "blue";
        //draw the box
        brush.fillRect(161, 80, 128, 63);
        //create an animation frame to play the game
        AF = requestAnimationFrame(game_SimonSays);
    };
    // play Simon Says
    function game_SimonSays() {
        // check for key presses
        addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
            //prevent holding down the key for a bit
            pressed = 1;
        }, false);
        //delete the key from the keys array
        addEventListener('keyup', function (e) {
            delete keys[e.keyCode];
        }, false);
        //enter
        if (keys[13] && pressed == 1) {
            pressed = 0;
            //clear the canvas
            brush.clearRect(0, 0, 500, 500);
            //reload the page to go back to the main menu
            location.reload();
        };
        //create an animation frame to loop back to draw SimonSays
        AF = requestAnimationFrame(draw_SimonSays);
    };
    //start the animation
    AF = requestAnimationFrame(draw_SimonSays);
}
// Space Invaders
function SpaceInvaders() {
    // Change the title of the webpage
    document.title = "Space Invaders";
    // Change the header tag
    title.innerText = "Space Invaders";
    // Remove the subtitle and leave a gap
    sub.innerHTML = "<br>";
    // Clear the canvas
    brush.clearRect(0, 0, 500, 500);
    // Allow the user to go back to the main menu
    cancelAnimationFrame(AF);
    // Make a function to draw on the canvas
    function Draw_SpaceInvaders() {
        // create a variable to store the image of an alien
        var alien_image = new Image();
        alien_image.src = "../IMAGES/alien.png";
        // create a variable to store the image of the ship
        var ship_image = new Image();
        ship_image.src = "../IMAGES/ship.png";
        //draw the background
        brush.drawImage(Starry_background, 0, 0);
        // draw and move the aliens
        brush.drawImage(alien_image, 10, 10);
        // draw the ship
        brush.drawImage(ship_image, 150, 130)
            // play space invaders
        AF = requestAnimationFrame(Game_SpaceInvaders);
    };
    // create a function to play Space Invaders
    function Game_SpaceInvaders() {
        // check for key presses
        addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
            //prevent holding down the key for a bit
            pressed = 1;
        }, false);
        //delete the key from the keys array
        addEventListener('keyup', function (e) {
            delete keys[e.keyCode];
        }, false);
        //enter
        if (keys[13] && pressed == 1) {
            pressed = 0;
            //clear the canvas
            brush.clearRect(0, 0, 500, 500);
            // reload the page to go back to the main menu
            location.reload();
        };
        // loop back to the draw function
        AF = requestAnimationFrame(Draw_SpaceInvaders);
    };
    // create an animation frame to start Space Invaders
    AF = requestAnimationFrame(Draw_SpaceInvaders);
};
AF = requestAnimationFrame(menu);