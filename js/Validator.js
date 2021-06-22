
var name = document.querySelector('#name')
var email = document.querySelector('#email')
var phone = document.querySelector('#phone')
var address = document.querySelector('#address')
var table = document.querySelector("table")
    
function Validator(form){
    var formValidate = document.querySelector(form)
    var formRulesAction = {
        required:function(value){
            return value?undefined:'Please enter character'
        },
        email:function(value){
            var regex=/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
            return regex.test(value)?undefined:'Please enter type of email correct'
        },
        min:function(min){
            return function(value){
                return value.length >= min ?undefined:`Please enter more than ${min} character`
            }
        },
    }
    var formRules = {}
    if(formValidate){
        var inputs = formValidate.querySelectorAll('input[name][rules]')
        for(var input of inputs){
            var optionsRules = input.getAttribute('rules').split("|")
            // console.log(optionsRules)
            for(var rule of optionsRules){
                var ruleInfo;
                var ruleHasValue = rule.includes(':')
                if(ruleHasValue){
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }
                var rulesFunc = formRulesAction[rule]
                if(ruleHasValue){
                    rulesFunc = rulesFunc(ruleInfo[1]) // goi min(6)
                    // console.log(rulesFunc)
                }
                // console.log(rulesFunc)
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(rulesFunc)
                }
                else{
                    formRules[input.name] = []
                    formRules[input.name].push(rulesFunc)
                }
            }
            //bat su kien blur onchange
            input.onblur = handleEvent;
        }
        //thuc hien validate
        function handleEvent(e){
            var rules = formRules[e.target.name]
            var errorMessage;

            rules.find(function (rule) {
                errorMessage = rule(e.target.value)
                return errorMessage
            });
            // console.log([e.target])

            var formGroup = e.target.parentElement
            var spanE = formGroup.querySelector('.form-text')
            if(errorMessage){
                    // formGroup.classList.add('invalid')
                    spanE.innerText = errorMessage
            }
            else{
                // formGroup.classList.remove('invalid')
                spanE.innerText = ''

            }
            return !errorMessage;
        }
        // console.log(formRules)
    }
    //xu ly hanh vi submit
    var btnSubmit = document.querySelector('button[type=submit]')
    // console.log(btnSubmit)
    formValidate.addEventListener('submit',function(e){
        let students= JSON.parse(localStorage.getItem('students')) || []
        let isValid =true;
        let htmls='',html=''
        let inputs = formValidate.querySelectorAll('input[name][rules]')
        for(var input of inputs){
            if(!handleEvent({   //{} chinsh la e truyen vao ham va target chinhs la e.target
                target: input
            })){
                isValid = false //neu co loi thi tra ve false
            }
        }
        //neu form sai thi k gui
        //neu dung thi gui
        let content = document.querySelector('tbody')
        if(!isValid){
            e.preventDefault()
            alert('Vui long nhap dung thong tin')
        }
        else{
            e.preventDefault()
            let stt=1;
            for(var input of inputs){
                html += `<td>${input.value}</td>`
            }
            htmls=`<tr>${html}<td><a href='#' class='delete'>Delete</a>|<a href='#'>Edit</a></td></tr>`
        }
        students.push(htmls)
        students.forEach((student)=>{
            content.innerHTML = student
        })
        // console.log(students)
        localStorage.setItem('students',JSON.stringify(students))
        loadPage();
    })
    //load table khi f5
    const loadPage = function(){
        let students= JSON.parse(localStorage.getItem('students')) || [];
        let inputs = formValidate.querySelectorAll('input[name][rules]');
        let content = document.querySelector('tbody')
        let htmls = ``
        // console.log(students)
        students.forEach((student,index)=>{
            htmls+=student
        })
        content.innerHTML = htmls
    }
    document.querySelector('body').onload = loadPage
    
}
