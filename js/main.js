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
let gamer_money = 100
let comp_money = 100
let bank = 0
const bet1 = 5
const bet2 = 10
let bet_maked = false

//Генерация случайных чисел
function dice_random() {
    return(Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min)
}

//Инициализация игры
function start() {
    if (bet_maked) {
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
}

//Проверка на автовыигрыш и автопроигрыш по комбинациям костей
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

//Окрашивание активных клавиш в зависимости от стадии игры
function button_coloring() {
    if (bet_maked) {
        $('#start').attr('class','w-100 button_active')
        $('#bet1').attr('class','button_inactive')
        $('#bet2').attr('class','button_inactive')
        $('#bet3').attr('class','button_inactive')
        $('#make_bet').attr('class','button_inactive')
    }
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

//Ход игрока
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

//Ход компьютера
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

//Выставление картинок костей
function dice_img() {
    $('#dice1').attr('src', 'img/dice' + dice1 + '.png');
    $('#dice2').attr('src', 'img/dice' + dice2 + '.png');
    $('#dice3').attr('src', 'img/dice' + dice3 + '.png');
    $('#comp_dice1').attr('src', 'img/dice' + comp_dice1 + '.png');
    $('#comp_dice2').attr('src', 'img/dice' + comp_dice2 + '.png');
    $('#comp_dice3').attr('src', 'img/dice' + comp_dice3 + '.png');
}

//Переброс костей
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

//Окончание игры
function end_move() {
    if (move_maked & comp_move_maked & !game_ended || auto_fail || auto_win) {
        if ((result > comp_result) & !auto_fail || auto_win) {
            let text = 'Вы выиграли!'
            if (auto_win) {
                text+=' (выпала комбинация 4-5-6)'
            }
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

//Ставки

function bet_number(i) {
    if (!bet_maked) {
        switch (i) {
            case 1: $('#bet').val(bet1); break;
            case 2: $('#bet').val(bet2); break;
            case 3: $('#bet').val(gamer_money); break;
        }
    }
}

function make_bet() {
    let g = Number($('#bet').val())
    if (($('#bet').val().match(/^\d+$/) != null) & (g <= gamer_money) & (g > 0) & (!bet_maked)) {
        let c = Math.floor(Math.random() * (Math.abs(comp_money - g) + 1)) + g
        bank = g + c
        gamer_money-=g
        comp_money-=c
        $('#bank').text(bank)
        $('#gamer_money').text(gamer_money)
        $('#comp_money').text(comp_money)
        $('#bet').val(0)
        bet_maked = true
        $('#ask_for_bet1').text('Ставка сделана')
        $('#ask_for_bet2').text('Ставка сделана')
        button_coloring()
    }
}

//Обработка кнопок
$('#start').click(start)
$('#make_move').click(make_move)
$('#change1').click(function (){change_dice(1)})
$('#change2').click(function (){change_dice(2)})
$('#change3').click(function (){change_dice(3)})
$('#end_move').click(end_move)


$('#bet1').click(function (){bet_number(1)})
$('#bet2').click(function (){bet_number(2)})
$('#bet3').click(function (){bet_number(3)})

$('#make_bet').click(make_bet)

$(document).ready($('#bet').val(0))