const output = document.querySelector(`output`);
const div = document.querySelector(`.buttons`);

//объявление переменных
let a = ``;
let b = ``;
let sign = ``;

//орисовка кнопок==============================
let bt = `C CE 7 8 9 4 5 6 1 2 3 0 . +/- * - / + =`.split(` `);
bt.map(sym => {

    let btn = document.createElement(`button`);
    btn.value = `${sym}`;
    btn.innerHTML = sym;
    div.append(btn)

    if(btn.value == `+/-` || btn.value == `.`) {
        btn.classList.add(`dot`)
    }

    if(btn.value == `=`) {
        btn.id = `equals`
    }

    if(btn.value.match(/[-/*+]/) && btn.value != `+/-`) {
        btn.className = `symbol`
    }

    if(btn.value.match(/[0-9]/)) {
        btn.className = `num`
    }
});
//===============================

div.addEventListener(`click`, printNums)


function printNums(event) {
    let result = 0;
    let target = event.target;

    if(target.value == `CE`) {
        a = ``; 
        b = ``;
        output.value = 0
    }
    if(target.value == `0` && output.value == `0`) return;
    if(target.tagName != `BUTTON`) return;
    if(output.value.length > 17) return
    if(a == `` && target.value.match(/[/+*=-]/) && target.value != `+/-`) return


    // C и CE

    if((target.value == `C` || target.value == `CE`) && output.value == 0) return

    if(target.value == `C` && b == ``) {
        a = String(a).split(``).splice(0, a.length - 1).join(``)
        output.value = a
    }

    if(target.value == `C` && sign != ``) {
        b = String(b).split(``).splice(0, b.length - 1).join(``);
        output.value = b
    }

    
 
    // дробные числа, ограничение на 1 точку

    if(target.value == `.` && a == 0) {
        result = a = 0 + target.value 
        output.value = result
    }

    if(target.value == `.` && b == `` && !output.value.includes(target.value)) {
        a += target.value;
        output.value = a;
    }

    if(target.value == `.` && sign != `` && !output.value.includes(target.value)) {
        b += target.value;
        output.value = b;
        
    }

    //===========

//=======================

    //унарный минус
    if(target.value == `+/-` && b == `` && a != 0) {
        a *= -1;
        output.value = a
    }

    if(target.value == `+/-` && (b == 0 || a == 0) ) return

    if(target.value == `+/-` && sign != `` && b != ``) {
        b *= -1;
        output.value = b
    }


    //====================

    
    if(target.value.match(/[0-9]/)) {

        // записывать а
        if(b == `` && sign == ``) {
            a += target.value
            output.value = a
        }


        // записывать b
        else {
            b += target.value;
            output.value = b
        }
    }


// результат при повторном нажатии знака
    if(b && sign && target.value.match(/[-/+*]/) && target.value != `+/-`) {
        switch(sign) {
            case `+`: {
                result = +a + +b;
                a = result;
                b = ``;
                break;
            }
            case `-`: {
                result = a - b;
                a = result;
                b = ``;
                break;
            }
            case `*`: {
                result = a * b;
                a = result;
                b = ``;
                break;
            }
            case `/`: {
                result = a / b;
                a = result;
                b = ``;
                break;
            }
            
        }
        
    }

    // записать знак
    if(target.value.match(/[-/+*]/) && target.value != `+/-`) {
        output.value = a;
        sign = target.value;
    }

    
// результат при нажатии =
    if(target.value == `=`) {
        switch(sign) {
            case `+`: {
                result = +a + +b;
                a = result;
                break;
            }
            case `-`: {
                result = a - b;
                a = result;
                break;
            }
            case `*`: {
                result = a * b;
                a = result;
                break;
            }
            case `/`: {
                result = a / b;
                a = result;
                break;
            }
    }

    b = ``
    output.value = a;
    
}


// ошибки и деление на 0
    if(output.value == `Infinity` || output.value == `NaN`) {
        output.value = `Error`;
        setTimeout(() => {
            output.value = 0;
            a = ``;
            b = ``;
            sign = ``
        }, 1000)
    }
}
