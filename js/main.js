const min = 1
const max = 6
let dice1 = 1
let dice2 = 1
let dice3 = 1
let comp_dice1 = 1
let comp_dice2 = 1
let comp_dice3 = 1
let change_counter = 0
let move_maked = false
let comp_move_maked = false
let game_ended = false
let result = 0
let comp_result = 0
let auto_fail = false
let auto_win = false

function dice_random() {
    return(Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min)
}

function start() {
    if (game_ended) {
        dice1 = 1
        dice2 = 1
        dice3 = 1
        comp_dice1 = 1
        comp_dice2 = 1
        comp_dice3 = 1
        change_counter = 0
        move_maked = false
        comp_move_maked = false
        game_ended = false
        result = 0
        comp_result = 0
        auto_fail = false
        auto_win = false
        $('#result').text('')
        $('#move_result').text('')
    }
    $('#start').text('Игра начата')
    comp_make_move()
}

function auto_check(){
    let text_result = String(dice1)+String(dice2)+String(dice3)
    if (text_result.match(/123|132|213|231|312|321/) != null) {
        auto_fail = true
        end_move()
    }
    if (text_result.match(/456|465|546|564|645|654/) != null) {
        auto_win = true
        end_move()
    }
}

function button_coloring() {
    if (comp_move_maked) {
        $('#start').attr('class','w-100 button_inactive')
        $('#make_move').attr('class','w-100 button_active')
    }
    if (move_maked) {
        $('#make_move').attr('class','w-100 button_inactive')
        $('#end_move').attr('class','w-100 button_active')
        $('#change1').attr('class','mt-2 button_active')
        $('#change2').attr('class','mt-2 button_active')
        $('#change3').attr('class','mt-2 button_active')
    }
    if (game_ended) {
        $('#start').attr('class','w-100 button_active')
        $('#end_move').attr('class','w-100 button_inactive')
        $('#change1').attr('class','mt-2 button_inactive')
        $('#change2').attr('class','mt-2 button_inactive')
        $('#change3').attr('class','mt-2 button_inactive')
    }
}

function make_move() {
    if (!move_maked & comp_move_maked) {
        dice1 = dice_random()
        dice2 = dice_random()
        dice3 = dice_random()
        result = dice1+dice2+dice3
        move_maked = true
        $('#result').text('Результат: ' + (result))
        dice_img()
        auto_check()
        button_coloring()
    }
}

function comp_make_move() {
    if (!comp_move_maked) {
        comp_dice1 = dice_random()
        comp_dice2 = dice_random()
        comp_dice3 = dice_random()
        comp_result = comp_dice1+comp_dice2+comp_dice3
        comp_move_maked = true
        $('#comp_result').text('Результат: ' + (comp_result))
        dice_img()
        button_coloring()
    }
}

function dice_img() {
    $('#dice1').attr('src', 'img/dice' + dice1 + '.png');
    $('#dice2').attr('src', 'img/dice' + dice2 + '.png');
    $('#dice3').attr('src', 'img/dice' + dice3 + '.png');
    $('#comp_dice1').attr('src', 'img/dice' + comp_dice1 + '.png');
    $('#comp_dice2').attr('src', 'img/dice' + comp_dice2 + '.png');
    $('#comp_dice3').attr('src', 'img/dice' + comp_dice3 + '.png');
}

function change_dice(i) {
    if ((change_counter < 3) & move_maked & comp_move_maked & !game_ended) {
        switch(i) {
            case 1: dice1 = dice_random(); break;
            case 2: dice2 = dice_random(); break;
            case 3: dice3 = dice_random(); break;
        }
        result = dice1+dice2+dice3
        $('#result').text('Результат: ' + (result))
        dice_img()
        auto_check()
        change_counter++
        if (change_counter === 3) {
            end_move()
        }
    }
}

function end_move() {
    if (move_maked & comp_move_maked & !game_ended || auto_fail || auto_win) {
        if ((result > comp_result) & !auto_fail || auto_win) {
            let text = 'Вы выиграли!'
            if (auto_win) {
                text+=' (выпала комбинация 4-5-6)'
            }
            $('#move_result').text(text)
            $('#move_result').text(text)
        } else if ((result < comp_result) || auto_fail) {
            let text = 'Вы проиграли'
            if (auto_fail) {
                text+=' (выпала комбинация 1-2-3)'
            }
            $('#move_result').text(text)
        } else {
            $('#move_result').text('Ничья')
        }
        $('#start').text('Начать заново')
        game_ended = true
        button_coloring()
    }
}

$('#start').click(start)
$('#make_move').click(make_move)
$('#change1').click(function (){change_dice(1)})
$('#change2').click(function (){change_dice(2)})
$('#change3').click(function (){change_dice(3)})
$('#end_move').click(end_move)


