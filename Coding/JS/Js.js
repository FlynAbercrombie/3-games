/* vvvvvvvvvvvvvvvvTODO listvvvvvvvvvvvvvvv
All:
Add hi-score (1/3)
put more into functions (1/3)
move variables into appropriate functions(1/3)
BlackJack:
1.add a cash system to black jack
2.put boxes around certain elements
3.make it so the user has to input either 11 or 1 when they get an ace
4.remove quit option from playing screen
5.make a game over screen
6.make it so if money <= 0 the user is displayed the game over screen (retry or exit to main menu)
7.add quit option to game over screen



SimonSays:

Space Invaders:


final touches:
1.remember to use beautify.io to clean up project
2.add comments to everything that needs clarification

if i have enough time:
1.stylize buttons
2.sounds
3.animations (moving images)
4.make it HD
^^^^^^^^^^^^^^^^^ TODO LIST ^^^^^^^^^^^^^^^^*/
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
var rules = document.getElementById('rules');
// make a variable for the animation frame
var SI;
var SI2;
var AF;


//disable scrolling with arrow keys and space bar
window.onkeydown = function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
    if (e.keyCode == 40 && e.target == document.body) {
        e.preventDefault();
    }
    if (e.keyCode == 38 && e.target == document.body) {
        e.preventDefault();
    }
};
var Game_over_menu = 1;
var reverse = 0
// load the menu buttons into a variable
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
    title.innerText = "Main Menu"
    sub.innerText = "Select a game using the arrow keys then press enter to play."
    rules.innerText = ""
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
    sub.innerHTML = "How to play at the bottom of the screen";
    rules.innerHTML = '<h3>How To Play</h3> <br> Press enter to draw a card <br> use the arrow keys to select an option <br> press enter on Draw to draw another card or press enter on Done to flip the cards <br> if you go over 21 you lose money (the same applies to the computer going over 21) <br> if you get more points than the computer you win (the same applies to the computer getting more points than you) <br> if an Ace appears a prompt will appear, enter either 1 or 11 to get those points <br> running out of money means you lose and have to quit or retry'
    //clear the canvas
    brush.clearRect(0, 0, 500, 500);
    // Allow the user to go back to the main menu
    var BlackJack_menu_item = 1;
var user_card = [0, 0, 0, 0, 0, 0];
var BlackJack_user_score = 0;
var BlackJack_user_score_added_1 = 0;
var BlackJack_user_score_added_2 = 0;
var BlackJack_user_score_added_3 = 0;
var BlackJack_user_score_added_4 = 0;
var BlackJack_user_score_added_5 = 0;
var comp_score = 0;
var comp_score_added_1 = 0;
var comp_score_added_2 = 0;
var comp_score_added_3 = 0;
var comp_score_added_4 = 0;
var comp_score_added_5 = 0;
var user_ace = 0;
var comp_ace = 0;
var ace_entered_1 = 0;
var ace_entered_2 = 0;
var ace_entered_3 = 0;
var ace_entered_4 = 0;
var ace_entered_5 = 0;
var shown = 0;
    
    //variable for how many cards the user has
    var user_cards = 0;
    // make a variable to show when the user is ready
    var ready = 0;
    // make an array to store the users cards
    //variable for how mny cards the comp has
    var comp_cards = 0
    var comp_card = [];
    var comp_card_counter = Math.floor(Math.random() * 3 + 1);
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
                                if (BlackJack_user_score_added_1 == 0) {
                                    BlackJack_user_score_added_1++;
                                    user_ace = parseInt(prompt("1 or 11"));
                                    BlackJack_user_score = BlackJack_user_score + user_ace;
                                    ace_entered_1++;

                                };
                            });
                            break;
                        case card_select[1].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 2;

                            };
                            break;
                        case card_select[2].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 3;

                            };
                            break;
                        case card_select[3].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 4;

                            };
                            break;
                        case card_select[4].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 5;

                            };
                            break;
                        case card_select[5].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 6;

                            };
                            break;
                        case card_select[6].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 7;

                            };
                            break;
                        case card_select[7].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 8;

                            };
                            break;
                        case card_select[8].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 9;

                            };
                            break;
                        case card_select[9].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 10;

                            };
                            break;
                        case card_select[10].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 10;

                            };
                            break;
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 10;

                            };
                        case card_select[11].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 10;

                            };
                            break;
                        case card_select[12].src:
                            if (BlackJack_user_score_added_1 == 0) {
                                BlackJack_user_score_added_1++;
                                BlackJack_user_score = BlackJack_user_score + 10;

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
                            if (BlackJack_user_score_added_2 == 0) {
                                BlackJack_user_score_added_2++;
                                user_ace = parseInt(prompt("1 or 11"));
                                BlackJack_user_score = BlackJack_user_score + user_ace;
                                ace_entered_2++;

                            };
                        });
                        break;
                    case card_select[1].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 2;

                        };
                        break;
                    case card_select[2].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 3;

                        };
                        break;
                    case card_select[3].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 4;

                        };
                        break;
                    case card_select[4].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 5;

                        };
                        break;
                    case card_select[5].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 6;

                        };
                        break;
                    case card_select[6].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 7;

                        };
                        break;
                    case card_select[7].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 8;

                        };
                        break;
                    case card_select[8].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 9;

                        };
                        break;
                    case card_select[9].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[10].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                    case card_select[11].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[12].src:
                        if (BlackJack_user_score_added_2 == 0) {
                            BlackJack_user_score_added_2++;
                            BlackJack_user_score = BlackJack_user_score + 10;

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
                            if (BlackJack_user_score_added_3 == 0) {
                                BlackJack_user_score_added_3++;
                                user_ace = parseInt(prompt("1 or 11"));
                                ace_entered_3++;
                                BlackJack_user_score = BlackJack_user_score + user_ace;

                            };
                        });
                        break;
                    case card_select[1].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 2;

                        };
                        break;
                    case card_select[2].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 3;

                        };
                        break;
                    case card_select[3].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 4;

                        };
                        break;
                    case card_select[4].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 5;

                        };
                        break;
                    case card_select[5].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 6;

                        };
                        break;
                    case card_select[6].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 7;

                        };
                        break;
                    case card_select[7].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 8;

                        };
                        break;
                    case card_select[8].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 9;

                        };
                        break;
                    case card_select[9].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[10].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                    case card_select[11].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[12].src:
                        if (BlackJack_user_score_added_3 == 0) {
                            BlackJack_user_score_added_3++;
                            BlackJack_user_score = BlackJack_user_score + 10;

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
                            if (BlackJack_user_score_added_4 == 0) {
                                BlackJack_user_score_added_4++;
                                user_ace = parseInt(prompt("1 or 11"));
                                BlackJack_user_score = BlackJack_user_score + user_ace;
                                ace_entered_4++;

                            };
                        });
                        break;
                    case card_select[1].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 2;

                        };
                        break;
                    case card_select[2].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 3;

                        };
                        break;
                    case card_select[3].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 4;

                        };
                        break;
                    case card_select[4].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 5;

                        };
                        break;
                    case card_select[5].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 6;

                        };
                        break;
                    case card_select[6].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 7;

                        };
                        break;
                    case card_select[7].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 8;

                        };
                        break;
                    case card_select[8].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 9;

                        };
                        break;
                    case card_select[9].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[10].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                    case card_select[11].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[12].src:
                        if (BlackJack_user_score_added_4 == 0) {
                            BlackJack_user_score_added_4++;
                            BlackJack_user_score = BlackJack_user_score + 10;

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
                            if (BlackJack_user_score_added_5 == 0) {
                                BlackJack_user_score_added_5++;
                                user_ace = parseInt(prompt("1 or 11"));
                                BlackJack_user_score = BlackJack_user_score + user_ace;
                                ace_entered_5++;

                            };
                        });
                        break;
                    case card_select[1].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 2;

                        };
                        break;
                    case card_select[2].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 3;

                        };
                        break;
                    case card_select[3].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 4;

                        };
                        break;
                    case card_select[4].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 5;

                        };
                        break;
                    case card_select[5].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 6;

                        };
                        break;
                    case card_select[6].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 7;

                        };
                        break;
                    case card_select[7].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 8;

                        };
                        break;
                    case card_select[8].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 9;

                        };
                        break;
                    case card_select[9].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[10].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                    case card_select[11].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                    case card_select[12].src:
                        if (BlackJack_user_score_added_5 == 0) {
                            BlackJack_user_score_added_5++;
                            BlackJack_user_score = BlackJack_user_score + 10;

                        };
                        break;
                };
            };
        };
        // Computer points tally
        if (comp_cards >= 1) {
            brush.drawImage(card_select[13], 0, 100, 50, 50);
            if (ready == 1) {
                if (user_card[1].src != card_select[0].src || ace_entered_1 == 1) {
                    if (user_card[2].src != card_select[0].src || ace_entered_2 == 1) {
                        if (user_card[3].src != card_select[0].src || ace_entered_3 == 1) {
                            if (user_card[4].src != card_select[0].src || ace_entered_4 == 1) {
                                if (user_card[5].src != card_select[0].src || ace_entered_5 == 1) {
                                    brush.drawImage(comp_card[1], 0, 100, 50, 50);
                                    shown++;
                                    if (shown > 0) {
                                        switch (comp_card[1].src) {
                                            case card_select[0].src:
                                                setTimeout(function () {
                                                    if (comp_score_added_1 == 0) {
                                                        comp_score_added_1++;
                                                        if (comp_score + 11 < 21) {
                                                            comp_ace = 11;
                                                        } else {
                                                            comp_ace = 1;
                                                        }
                                                        comp_score = comp_score + comp_ace;

                                                    };
                                                });
                                                break;
                                            case card_select[1].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 2;

                                                };
                                                break;
                                            case card_select[2].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 3;

                                                };
                                                break;
                                            case card_select[3].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 4;

                                                };
                                                break;
                                            case card_select[4].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 5;

                                                };
                                                break;
                                            case card_select[5].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 6;

                                                };
                                                break;
                                            case card_select[6].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 7;

                                                };
                                                break;
                                            case card_select[7].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 8;

                                                };
                                                break;
                                            case card_select[8].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 9;

                                                };
                                                break;
                                            case card_select[9].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 10;

                                                };
                                                break;
                                            case card_select[10].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 10;

                                                };
                                                break;
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 10;

                                                };
                                            case card_select[11].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 10;

                                                };
                                                break;
                                            case card_select[12].src:
                                                if (comp_score_added_1 == 0) {
                                                    comp_score_added_1++;
                                                    comp_score = comp_score + 10;

                                                };
                                                break;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        if (comp_cards >= 2) {
            brush.drawImage(card_select[13], 50, 100, 50, 50);
            if (ready == 1) {
                if (user_card[1].src != card_select[0].src || ace_entered_1 == 1) {
                    if (user_card[2].src != card_select[0].src || ace_entered_2 == 1) {
                        if (user_card[3].src != card_select[0].src || ace_entered_3 == 1) {
                            if (user_card[4].src != card_select[0].src || ace_entered_4 == 1) {
                                if (user_card[5].src != card_select[0].src || ace_entered_5 == 1) {
                                    brush.drawImage(comp_card[2], 50, 100, 50, 50);
                                    switch (comp_card[2].src) {
                                        case card_select[0].src:
                                            setTimeout(function () {
                                                if (comp_score_added_2 == 0) {
                                                    comp_score_added_2++;
                                                    if (comp_score + 11 < 21) {
                                                        comp_ace = 11;
                                                    } else {
                                                        comp_ace = 1;
                                                    }
                                                    comp_score = comp_score + comp_ace;

                                                };
                                            });
                                            break;
                                        case card_select[1].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 2;

                                            };
                                            break;
                                        case card_select[2].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 3;

                                            };
                                            break;
                                        case card_select[3].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 4;

                                            };
                                            break;
                                        case card_select[4].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 5;

                                            };
                                            break;
                                        case card_select[5].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 6;

                                            };
                                            break;
                                        case card_select[6].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 7;

                                            };
                                            break;
                                        case card_select[7].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 8;

                                            };
                                            break;
                                        case card_select[8].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 9;

                                            };
                                            break;
                                        case card_select[9].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                        case card_select[10].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 10;

                                            };
                                        case card_select[11].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                        case card_select[12].src:
                                            if (comp_score_added_2 == 0) {
                                                comp_score_added_2++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        if (comp_cards >= 3) {
            brush.drawImage(card_select[13], 100, 100, 50, 50);
            if (ready == 1) {
                if (user_card[1].src != card_select[0].src || ace_entered_1 == 1) {
                    if (user_card[2].src != card_select[0].src || ace_entered_2 == 1) {
                        if (user_card[3].src != card_select[0].src || ace_entered_3 == 1) {
                            if (user_card[4].src != card_select[0].src || ace_entered_4 == 1) {
                                if (user_card[5].src != card_select[0].src || ace_entered_5 == 1) {
                                    brush.drawImage(comp_card[3], 100, 100, 50, 50)
                                    switch (comp_card[3].src) {
                                        case card_select[0].src:
                                            setTimeout(function () {
                                                if (comp_score_added_3 == 0) {
                                                    comp_score_added_3++;
                                                    if (comp_score + 11 < 21) {
                                                        comp_ace = 11;
                                                    } else {
                                                        comp_ace = 1;
                                                    }
                                                    comp_score = comp_score + comp_ace;

                                                };
                                            });
                                            break;
                                        case card_select[1].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 2;

                                            };
                                            break;
                                        case card_select[2].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 3;

                                            };
                                            break;
                                        case card_select[3].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 4;

                                            };
                                            break;
                                        case card_select[4].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 5;

                                            };
                                            break;
                                        case card_select[5].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 6;

                                            };
                                            break;
                                        case card_select[6].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 7;

                                            };
                                            break;
                                        case card_select[7].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 8;

                                            };
                                            break;
                                        case card_select[8].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 9;

                                            };
                                            break;
                                        case card_select[9].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                        case card_select[10].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 10;

                                            };
                                        case card_select[11].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                        case card_select[12].src:
                                            if (comp_score_added_3 == 0) {
                                                comp_score_added_3++;
                                                comp_score = comp_score + 10;

                                            };
                                            break;
                                    };
                                };
                            };
                        };
                    };
                };
            }
        };
        brush.font = "10px Arial"
        brush.fillStyle = "black"
        brush.fillText("your score:" + BlackJack_user_score, 60, 80);
        brush.fillText("computer score:" + comp_score, 140, 80);
        if (user_card[1].src != card_select[0].src || ace_entered_1 == 1) {
            if (user_card[2].src != card_select[0].src || ace_entered_2 == 1) {
                if (user_card[3].src != card_select[0].src || ace_entered_3 == 1) {
                    if (user_card[4].src != card_select[0].src || ace_entered_4 == 1) {
                        if (user_card[5].src != card_select[0].src || ace_entered_5 == 1) {
                            if (BlackJack_user_score > comp_score && BlackJack_user_score < 22) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("You Win!", 100, 60);
                            };
                            if (comp_score > BlackJack_user_score && comp_score < 22) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("You Lose!", 100, 60);
                            };
                            if (comp_score == BlackJack_user_score && shown >= 1 && comp_score < 22 && BlackJack_user_score < 22) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("Tie!", 100, 60);
                            };
                            if (BlackJack_user_score > 21 && comp_score < 22) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("You Bust! You Lose!", 100, 60);
                            };
                            if (comp_score > 21 && BlackJack_user_score < 22) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("Computer Bust! You Win!", 100, 60);
                            };
                            if (comp_score > 21 && BlackJack_user_score > 21) {
                                brush.font = "10px Arial";
                                brush.fillStyle = "black";
                                brush.fillText("Both Bust! Tie!", 100, 60);
                            };
                        };
                    };
                };
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
        } else {
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
                BlackJack_menu_item = 1;
                user_card = [0, 0, 0, 0, 0, 0];
                BlackJack_user_score = 0;
                BlackJack_user_score_added_1 = 0;
                BlackJack_user_score_added_2 = 0;
                BlackJack_user_score_added_3 = 0;
                BlackJack_user_score_added_4 = 0;
                BlackJack_user_score_added_5 = 0;
                comp_score = 0;
                comp_score_added_1 = 0;
                comp_score_added_2 = 0;
                comp_score_added_3 = 0;
                comp_score_added_4 = 0;
                comp_score_added_5 = 0;
                user_ace = 0;
                comp_ace = 0;
                ace_entered_1 = 0;
                ace_entered_2 = 0;
                ace_entered_3 = 0;
                ace_entered_4 = 0;
                ace_entered_5 = 0;
                shown = 0;

                menu();


                return;

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
    sub.innerHTML = "How to play at the bottom of the screen";
    // make rules
    rules.innerHTML = '<h3>How To Play</h3> <br> if "showing pattern" is displayed at the top of the game watch which of the 4 colours gets highlighted <br> when "showing pattern" is gone use the arrow keys and enter key to enter the pattern <br> if you guessed correctly the computer will show you the last colour then a different colour <br> you must then enter the first colour and the second colour and so on. <br> you must remember the whole pattern and enter it correctly to get points'
    //clear the canvas
    
var SimonSays_colour = 5;
var SimonSays_pattern = [];
var SimonSays_pattern_amount = -1;
var SimonSays_user_done = 0;
var SimonSays_user_score = 0;
var SimonSays_pattern_list = 0;
var SimonSays_colour_added = 0;
var SimonSays_pattern_repeat = 0;
var SimonSays_GameOver = 0;
    // Allow the user to go back to the main menu
    cancelAnimationFrame(AF);
    brush.drawImage(SimonSays_background, 0, 0);
    brush.fillStyle = "green";
    // draw the box
    brush.fillRect(10, 9, 128, 63);
    // second box
    // change the colour of the box to red
    brush.fillStyle = "#6d0000";
    // draw the box
    brush.fillRect(161, 9, 128, 63);
    // third box
    // change the colour of the box to yellow
    brush.fillStyle = "#6c6c00";
    // draw the box
    brush.fillRect(10, 80, 128, 63);
    // fourth box
    //change the colour of the box to blue
    brush.fillStyle = "#000064";
    //draw the box
    brush.fillRect(161, 80, 128, 63);
    SimonSays_colour = 0
    //make a function to draw on the canvas
    function draw_SimonSays() {
        //draw a background
        if (SimonSays_user_done == 0) {
            brush.font = "10px Arial";
            brush.clearRect(110, 0, 50, 8)
            brush.fillStyle = "black";
            brush.fillRect(110, 0, 110, 8);
            brush.fillRect(142, 1, 10, 10)
            brush.fillRect(7, 1, 100, 7)
            brush.font = "10px Arial";
            brush.fillStyle = "white";
            brush.fillText("Your score: " + SimonSays_user_score, 8, 8);
            brush.fillStyle = "white";
            brush.fillText("showing pattern", 110, 8);
            setTimeout(function () {
                while (SimonSays_pattern_amount >= SimonSays_pattern_list) {

                    if (SimonSays_pattern[SimonSays_pattern_list] == 0) {
                        SimonSays_pattern_list++;

                        brush.fillStyle = "#00d600";
                        // draw the box
                        brush.fillRect(10, 9, 128, 63);
                        // second box
                        // change the colour of the box to red
                        brush.fillStyle = "#6d0000";
                        // draw the box
                        brush.fillRect(161, 9, 128, 63);
                        // third box
                        // change the colour of the box to yellow
                        brush.fillStyle = "#6c6c00";
                        // draw the box
                        brush.fillRect(10, 80, 128, 63);
                        // fourth box
                        //change the colour of the box to blue
                        brush.fillStyle = "#000064";
                        //draw the box
                        brush.fillRect(161, 80, 128, 63);
                    }
                    if (SimonSays_pattern[SimonSays_pattern_list] == 1) {
                        SimonSays_pattern_list++;

                        brush.fillStyle = "green";
                        // draw the box
                        brush.fillRect(10, 9, 128, 63);
                        // second box
                        // change the colour of the box to red
                        brush.fillStyle = "#ff0000";
                        // draw the box
                        brush.fillRect(161, 9, 128, 63);
                        // third box
                        // change the colour of the box to yellow
                        brush.fillStyle = "#6c6c00";
                        // draw the box
                        brush.fillRect(10, 80, 128, 63);
                        // fourth box
                        //change the colour of the box to blue
                        brush.fillStyle = "#000064";
                        //draw the box
                        brush.fillRect(161, 80, 128, 63);
                    }
                    if (SimonSays_pattern[SimonSays_pattern_list] == 2) {
                        SimonSays_pattern_list++;

                        brush.fillStyle = "green";
                        // draw the box
                        brush.fillRect(10, 9, 128, 63);
                        // second box
                        // change the colour of the box to red
                        brush.fillStyle = "#6d0000";
                        // draw the box
                        brush.fillRect(161, 9, 128, 63);
                        // third box
                        // change the colour of the box to yellow
                        brush.fillStyle = "#ffff00";
                        // draw the box
                        brush.fillRect(10, 80, 128, 63);
                        // fourth box
                        //change the colour of the box to blue
                        brush.fillStyle = "#000064";
                        //draw the box
                        brush.fillRect(161, 80, 128, 63);
                    }
                    if (SimonSays_pattern[SimonSays_pattern_list] == 3) {
                        SimonSays_pattern_list++;

                        brush.fillStyle = "green";
                        // draw the box
                        brush.fillRect(10, 9, 128, 63);
                        // second box
                        // change the colour of the box to red
                        brush.fillStyle = "#6d0000";
                        // draw the box
                        brush.fillRect(161, 9, 128, 63);
                        // third box
                        // change the colour of the box to yellow
                        brush.fillStyle = "#6c6c00";
                        // draw the box
                        brush.fillRect(10, 80, 128, 63);
                        // fourth box
                        //change the colour of the box to blue
                        brush.fillStyle = "#0000ff";
                        //draw the box
                        brush.fillRect(161, 80, 128, 63);
                    }
                    setTimeout(function () {
                        SimonSays_user_done = 1;
                    }, 1000);
                }
            }, 1000);
        };
        //create an animation frame to play the game
        if (SimonSays_user_done == 1) {
            brush.fillStyle = "black";
            brush.fillRect(110, 0, 110, 8);
            brush.fillRect(141, 1, 11, 10)
            switch (SimonSays_colour) {
                case 0:
                    // first box
                    // change the colour of the box to green
                    brush.fillStyle = "#00d600";
                    // draw the box
                    brush.fillRect(10, 9, 128, 63);
                    // second box
                    // change the colour of the box to red
                    brush.fillStyle = "#6d0000";
                    // draw the box
                    brush.fillRect(161, 9, 128, 63);
                    // third box
                    // change the colour of the box to yellow
                    brush.fillStyle = "#6c6c00";
                    // draw the box
                    brush.fillRect(10, 80, 128, 63);
                    // fourth box
                    //change the colour of the box to blue
                    brush.fillStyle = "#000064";
                    //draw the box
                    brush.fillRect(161, 80, 128, 63);
                    break;
                case 1:
                    // first box
                    // change the colour of the box to green
                    brush.fillStyle = "green";
                    // draw the box
                    brush.fillRect(10, 9, 128, 63);
                    // second box
                    // change the colour of the box to red
                    brush.fillStyle = "#ff0000";
                    // draw the box
                    brush.fillRect(161, 9, 128, 63);
                    // third box
                    // change the colour of the box to yellow
                    brush.fillStyle = "#6c6c00";
                    // draw the box
                    brush.fillRect(10, 80, 128, 63);
                    // fourth box
                    //change the colour of the box to blue
                    brush.fillStyle = "#000064";
                    //draw the box
                    brush.fillRect(161, 80, 128, 63);
                    break;
                case 2:
                    // first box
                    // change the colour of the box to green
                    brush.fillStyle = "green";
                    // draw the box
                    brush.fillRect(10, 9, 128, 63);
                    // second box
                    // change the colour of the box to red
                    brush.fillStyle = "#6d0000";
                    // draw the box
                    brush.fillRect(161, 9, 128, 63);
                    // third box
                    // change the colour of the box to yellow
                    brush.fillStyle = "#ffff00";
                    // draw the box
                    brush.fillRect(10, 80, 128, 63);
                    // fourth box
                    //change the colour of the box to blue
                    brush.fillStyle = "#000064";
                    //draw the box
                    brush.fillRect(161, 80, 128, 63);
                    break;
                case 3:
                    // first box
                    // change the colour of the box to green
                    brush.fillStyle = "green";
                    // draw the box
                    brush.fillRect(10, 9, 128, 63);
                    // second box
                    // change the colour of the box to red
                    brush.fillStyle = "#6d0000";
                    // draw the box
                    brush.fillRect(161, 9, 128, 63);
                    // third box
                    // change the colour of the box to yellow
                    brush.fillStyle = "#6c6c00";
                    // draw the box
                    brush.fillRect(10, 80, 128, 63);
                    // fourth box
                    //change the colour of the box to blue
                    brush.fillStyle = "#0000ff";
                    //draw the box
                    brush.fillRect(161, 80, 128, 63);
                    break;
            };
        };
        AF = requestAnimationFrame(game_SimonSays);
    };
    // play Simon Says
    function game_SimonSays() {
        if (SimonSays_user_done == 0 && SimonSays_colour_added != 1) {
            SimonSays_pattern_amount++;
            SimonSays_user_done = 0;
            do {
                SimonSays_pattern[SimonSays_pattern_amount] = Math.floor(Math.random() * 4);
            } while (SimonSays_pattern[SimonSays_pattern_amount] == SimonSays_pattern[SimonSays_pattern_amount - 1])
            SimonSays_colour_added = 1;
            SimonSays_pattern_list = 0;

        };
        if (SimonSays_user_done == 1) {
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
            //right
            switch (SimonSays_colour) {
                case 0:
                    if (keys[39] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 1
                    };
                    if (keys[40] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 2
                    };
                    if (keys[13] && pressed == 1) {
                        pressed = 0;

                        if (SimonSays_pattern[SimonSays_pattern_repeat] == 0) {
                            SimonSays_pattern_repeat++;

                            if (SimonSays_pattern_repeat == SimonSays_pattern_amount + 1) {
                                SimonSays_user_done = 0;
                                SimonSays_pattern_repeat = 0;
                                SimonSays_colour_added = 0;
                                SimonSays_user_score++;
                            };
                        } else {
                            SimonSays_gameover();
                        }
                    };
                    break;
                case 1:
                    if (keys[37] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 0
                    };
                    if (keys[40] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 3
                    };
                    if (keys[13] && pressed == 1) {
                        pressed = 0;

                        if (SimonSays_pattern[SimonSays_pattern_repeat] == 1) {
                            SimonSays_pattern_repeat++;

                            if (SimonSays_pattern_repeat == SimonSays_pattern_amount + 1) {
                                SimonSays_user_done = 0;
                                SimonSays_pattern_repeat = 0;
                                SimonSays_colour_added = 0;
                                SimonSays_user_score++;
                            };
                        } else {
                            SimonSays_gameover();

                        }
                    };
                    break;
                case 2:
                    if (keys[39] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 3
                    };
                    if (keys[38] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 0
                    };
                    if (keys[13] && pressed == 1) {
                        pressed = 0;

                        if (SimonSays_pattern[SimonSays_pattern_repeat] == 2) {
                            SimonSays_pattern_repeat++;

                            if (SimonSays_pattern_repeat == SimonSays_pattern_amount + 1) {
                                SimonSays_user_done = 0;
                                SimonSays_pattern_repeat = 0;
                                SimonSays_colour_added = 0;
                                SimonSays_user_score++;
                            };
                        } else {
                            SimonSays_gameover();

                        }
                    };
                    break;
                case 3:
                    if (keys[37] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 2
                    };
                    if (keys[38] && pressed == 1) {
                        pressed = 0;
                        SimonSays_colour = 1
                    };
                    if (keys[13] && pressed == 1) {
                        pressed = 0;

                        if (SimonSays_pattern[SimonSays_pattern_repeat] == 3) {
                            SimonSays_pattern_repeat++;

                            if (SimonSays_pattern_repeat == SimonSays_pattern_amount + 1) {
                                SimonSays_user_done = 0;
                                SimonSays_pattern_repeat = 0;
                                SimonSays_colour_added = 0;
                                SimonSays_user_score++;
                            };
                        } else {
                            SimonSays_gameover();
                        }
                    };
                    break;
            }
        };
        if (SimonSays_GameOver != 1) {
            //create an animation frame to loop back to draw SimonSays
            AF = requestAnimationFrame(draw_SimonSays);
        };
    };

    function SimonSays_gameover() {

        brush.clearRect(0, 0, 500, 500);
        brush.fillStyle = "black";
        brush.fillRect(0, 0, 500, 500)
        SimonSays_GameOver = 1;
        brush.font = "30px Arial";
        brush.fillStyle = "red";
        brush.fillText("Game Over!", 75, 40);
        if (Game_over_menu == 1) {
            brush.font = "10px Arial";
            brush.fillStyle = "white"
            brush.fillText("Quit", 75, 80);
            brush.fillStyle = "grey";
            brush.fillText("Try Again", 180, 80);

        }
        if (Game_over_menu == 2) {
            brush.font = "10px Arial";
            brush.fillStyle = "grey"
            brush.fillText("Quit", 75, 80);
            brush.fillStyle = "white";
            brush.fillText("Try Again", 180, 80);
            if (keys[13] && pressed == 1) {
                pressed = 0;

            }
        };

        AF = requestAnimationFrame(SimonSays_quit_retry)

    };

    function SimonSays_quit_retry() {
        if (Game_over_menu == 1) {
            if (keys[13] && pressed == 1) {
                pressed = 0;
                cancelAnimationFrame(AF);
                SimonSays_colour = 5;
                SimonSays_pattern = [];
                SimonSays_pattern_amount = -1;
                SimonSays_user_done = 0;
                SimonSays_user_score = 0;
                SimonSays_pattern_list = 0;
                SimonSays_colour_added = 0;
                SimonSays_pattern_repeat = 0;
                SimonSays_GameOver = 0;
                Game_over_menu = 1;
                menu();
                return;

            };
            if (keys[39] && pressed == 1) {
                Game_over_menu = 2;
            };
        }
        if (Game_over_menu == 2) {
            if (keys[13] && pressed == 1) {
                pressed = 0;
                cancelAnimationFrame(AF);
                SimonSays_colour = 5;
                SimonSays_pattern = [];
                SimonSays_pattern_amount = -1;
                SimonSays_user_done = 0;
                SimonSays_user_score = 0;
                SimonSays_pattern_list = 0;
                SimonSays_colour_added = 0;
                SimonSays_pattern_repeat = 0;
                SimonSays_GameOver = 0;
                Game_over_menu = 1;
                SimonSays();
                return;

            };
            if (keys[37] && pressed == 1) {
                Game_over_menu = 1;
            };
        }
        AF = requestAnimationFrame(SimonSays_gameover)

    }
    //start the animation
    AF = requestAnimationFrame(draw_SimonSays);
}

// Space Invaders

var high_score = 0;

function SpaceInvaders() {
    // Change the title of the webpage
    document.title = "Space Invaders";
    // Change the header tag
    title.innerText = "Space Invaders";
    // Remove the subtitle and leave a gap
    sub.innerHTML = "How to play at the bottom of the screen";
    rules.innerHTML = "<h3> How To Play </h3> Move the character with left and right arrow keys <br> fire projectiles with the spacebar <br> your goal is to shoot all the aliens before they reach you. <br> killing aliens gives you points <br> if they touch the ground you lose lives! <br> if you run out of lives you lose"
    // Clear the canvas
    brush.clearRect(0, 0, 500, 500);
    // Allow the user to go back to the main menu
    cancelAnimationFrame(AF);
    var alien_image = new Image();
    alien_image.src = "../IMAGES/alien.png";
    var ship_image = new Image();
    ship_image.src = "../IMAGES/ship.png";
    var canvasWidth = 300;
    var canvasHeight = 110;

    var ship = {
        x: (canvasWidth / 2),
        y: 125,
        speed: 3,
        width: 20,
        height: 20,
    }

    var goDown = 0
    var lasers = [];
    var laserTotal = 3;
    var lives = 3;
    var enemy = {
        x: 25,
        y: 10,
        speed: 1,
        total: 5,
        width: 30,
        height: 20,
        speed_increase: 300
    };
    var score = 0;

    var enemies = [];


    for (var i = 0; i < enemy.total; i++) {
        enemies.push([enemy.x, enemy.y, enemy.width, enemy.height, enemy.speed]);
        enemy.x += 60;
    }

    function clearCanvas() {
        brush.clearRect(0, 0, 500, 500);
        brush.drawImage(Starry_background, 0, 0)
    }

    function drawShip() {

        brush.drawImage(ship_image, ship.x, ship.y, );
    }

    //check for changes in game world
    function update() {
        // left arrow key
        if (keys[37]) {
            ship.x -= ship.speed;
        }

        // right arrow key
        if (keys[39]) {
            ship.x += ship.speed;
        }
        // confine the player
        if (ship.x <= 0) {

            ship.x = 0;
        }
        if (ship.x + ship.width >= canvasWidth) {

            ship.x = canvasWidth - ship.width - 1;
        }

        moveLaser();

        hitTest();


    }

    //draw the game world
    function render() {
        if (lives > 0) {
            drawShip();
            drawEnemies();
            drawLaser();
            drawScore();
            drawHighscore();
            drawLives();
            requestAnimationFrame(gameLoop);
        } else {
            cancelAnimationFrame(AF);
            clearInterval(SI)
            clearInterval(SI2)
            SI_gameover();
        }
    }

    //game loop function
    function gameLoop() {
        clearCanvas();
        update();
        render();
    }

    function drawScore() {
        brush.fillStyle = "white";
        brush.font = "10px Arial"
        brush.fillText("score:" + score, 10, 10)
    }

    function drawHighscore() {
        brush.fillStyle = "white";
        brush.font = "10px Arial"
        brush.fillText("Highscore:" + high_score, canvasWidth / 2 - 20, 10)
    }

    function drawLives() {
        brush.fillStyle = "white";
        brush.font = "10px Arial"
        brush.fillText("lives" + lives, canvasWidth - 50, 10)
    }

    function drawLaser() {
        //if there are lasers in the lasers array, draw them

        if (lasers.length) {
            for (var i = 0; i < lasers.length; i++) {
                brush.fillStyle = '#f00';
                brush.fillRect(lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
            }
        }
    }

    function drawEnemies() {
        for (var i = 0; i < enemies.length; i++) {

            brush.drawImage(alien_image, enemies[i][0], enemies[i][1])

        }
    }

    function moveEnemies() {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i][1] < canvasHeight + 20) {
                enemies[i][1] += enemies[i][4];
            } else if (enemies[i][1] > canvasHeight) {
                enemies[i][1] = -15
                lives--;
                if (lives <= 0) {
                    console.log("console.log")
                }
            }
        }
    }

    function hitTest() {
        var remove = false;
        for (var i = 0; i < lasers.length; i++) {
            for (var j = 0; j < enemies.length; j++) {
                if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
                    remove = true;
                    enemies.splice(j, 1);
                    enemies.push([(Math.random() * 280), -20, enemy.width, enemy.height, enemy.speed]);
                    if (enemy.speed_increase >= 50) {
                        enemy.speed_increase -= 10
                    }
                    score++;
                    if (score > 0 && score > high_score) {
                        high_score = score
                    }
                    clearInterval(SI);
                    setTimeout(moveEnemies(), enemies.speed_increase)
                    clearInterval(SI2);
                    SI2 = setInterval(function () {

                        moveEnemies();
                    }, enemy.speed_increase)

                }
            }
            if (remove == true) {
                lasers.splice(i, 1);
                remove = false;
            }
        }
    }


    function moveLaser() {
        for (var i = 0; i < lasers.length; i++) {
            if (lasers[i][1] > -11) {
                lasers[i][1] -= 3;
            } else if (lasers[i][1] < -10) {
                lasers.splice(i, 1);
            }
        }
    }

    gameLoop();
    SI = setInterval(function () {
        shoot_allowed = 1;
        moveEnemies();
    }, enemy.speed_increase)
    setTimeout(function () {


        addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
            //limit player to 3 lasers at a time
            if (keys[32] && lasers.length < laserTotal) {
                lasers.push([ship.x + 7, ship.y - 4, 2, 4]);
            }
        }, false);

    }, 1000);


    function SI_gameover() {

        brush.clearRect(0, 0, 500, 500);
        brush.fillStyle = "black";
        brush.fillRect(0, 0, 500, 500)
        SI_GameOver = 1;
        brush.font = "30px Arial";
        brush.fillStyle = "red";
        brush.fillText("Game Over!", 75, 40);
        if (Game_over_menu == 1) {
            brush.font = "10px Arial";
            brush.fillStyle = "white"
            brush.fillText("Quit", 75, 80);
            brush.fillStyle = "grey";
            brush.fillText("Try Again", 180, 80);

        }
        if (Game_over_menu == 2) {
            brush.font = "10px Arial";
            brush.fillStyle = "grey"
            brush.fillText("Quit", 75, 80);
            brush.fillStyle = "white";
            brush.fillText("Try Again", 180, 80);
            if (keys[13] && pressed == 1) {
                pressed = 0;

            }
        };

        AF = requestAnimationFrame(SI_gameover_options)

    };

    function SI_gameover_options() {
        if (Game_over_menu == 1) {
            if (keys[13] && pressed == 1) {
                pressed = 0;
                cancelAnimationFrame(AF);
                SimonSays_colour = 5;
                SimonSays_pattern = [];
                SimonSays_pattern_amount = -1;
                SimonSays_user_done = 0;
                SimonSays_user_score = 0;
                SimonSays_pattern_list = 0;
                SimonSays_colour_added = 0;
                SimonSays_pattern_repeat = 0;
                SimonSays_GameOver = 0;
                Game_over_menu = 1;
                menu();
                return;

            };
            if (keys[39] && pressed == 1) {
                Game_over_menu = 2;
            };
        }
        if (Game_over_menu == 2) {
            if (keys[13] && pressed == 1) {
                pressed = 0;
                cancelAnimationFrame(AF);
                SimonSays_colour = 5;
                SimonSays_pattern = [];
                SimonSays_pattern_amount = -1;
                SimonSays_user_done = 0;
                SimonSays_user_score = 0;
                SimonSays_pattern_list = 0;
                SimonSays_colour_added = 0;
                SimonSays_pattern_repeat = 0;
                SimonSays_GameOver = 0;
                Game_over_menu = 1;
                SpaceInvaders();
                return;

            };
            if (keys[37] && pressed == 1) {
                Game_over_menu = 1;
            };
        }
        AF = requestAnimationFrame(SI_gameover())
    }


};

AF = requestAnimationFrame(menu);
