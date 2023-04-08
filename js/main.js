let min = 1
let max = 6

function make_move() {
    let dice1 = Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min
    let dice2 = Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min
    let dice3 = Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min
    console.log('Кубик 1 = ' + dice1)
    console.log('Кубик 2 = ' + dice2)
    console.log('Кубик 3 = ' + dice3)
}
function dice_img() {
    switch (dice1) {
        case 1: $('#dice1').attr('src', 'img/dice1.png'); break;
        case 2: $('#dice1').attr('src', 'img/dice2.png'); break;
        case 3: $('#dice1').attr('src', 'img/dice3.png'); break;
        case 4: $('#dice1').attr('src', 'img/dice4.png'); break;
        case 5: $('#dice1').attr('src', 'img/dice5.png'); break;
        case 6: $('#dice1').attr('src', 'img/dice6.png'); break;
    }
    switch (dice2) {
        case 1: $('#dice2').attr('src', 'img/dice1.png'); break;
        case 2: $('#dice2').attr('src', 'img/dice2.png'); break;
        case 3: $('#dice2').attr('src', 'img/dice3.png'); break;
        case 4: $('#dice2').attr('src', 'img/dice4.png'); break;
        case 5: $('#dice2').attr('src', 'img/dice5.png'); break;
        case 6: $('#dice2').attr('src', 'img/dice6.png'); break;
    }
    switch (dice3) {
        case 1: $('#dice3').attr('src', 'img/dice1.png'); break;
        case 2: $('#dice3').attr('src', 'img/dice2.png'); break;
        case 3: $('#dice3').attr('src', 'img/dice3.png'); break;
        case 4: $('#dice3').attr('src', 'img/dice4.png'); break;
        case 5: $('#dice3').attr('src', 'img/dice5.png'); break;
        case 6: $('#dice3').attr('src', 'img/dice6.png'); break;
    }
}

$('#make_move').click(function (){make_move})
$('#make_move').click(function (){dice_img})