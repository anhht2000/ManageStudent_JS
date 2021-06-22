let btnSubmit = document.querySelector('#btnSubmit');
let innerTable = document.querySelector('.table tbody');
let sort_name_desc = document.querySelector("#sort_name_desc");
let sort_name_asc = document.querySelector("#sort_name_asc");
let sort_math_desc = document.querySelector("#sort_math_desc");
let sort_math_asc = document.querySelector("#sort_math_asc");
let btnDeter = document.querySelector("#btnDeter");
let arrScore = JSON.parse(localStorage.getItem('listSV')) || [];
let htmls = ``;
let isActiveMath = 1;
let isActiveName = 1;

function Student(name,math,chemistry,physical){
    this.name = name;
    this.math = math;
    this.chemistry = chemistry;
    this.physical = physical;
    this.average = '?';
}
btnSubmit.onclick = function(e){
    let form = e.target.parentElement;
    form.onsubmit = function(event){
        event.preventDefault();
    }
    let name = form.querySelector('#fullName').value;
    let math = form.querySelector('#math').value;
    let chemistry = form.querySelector('#chemistry').value;
    let physical = form.querySelector('#physical').value;

    let infoStudent = new Student(name,math,chemistry,physical);
    infoStudent.average = ((Number(infoStudent.math)+Number(infoStudent.chemistry)+Number(infoStudent.physical))/3).toFixed(2);
    
    arrScore.push(infoStudent);
    console.log(arrScore);
    localStorage.setItem(`listSV`,JSON.stringify(arrScore));
    
    location.reload();

}
let btnAverage = document.querySelector("#btnAverage");
//event
btnAverage.onclick = showAverage;
btnDeter.onclick = showDetermine;
//sortname
sort_name_desc.onclick = sortNamedesc;
sort_name_asc.onclick = sortNameasc;
//sortmath
sort_math_desc.onclick = sortMathdesc;
sort_math_asc.onclick = sortMathasc;

//handdle event
//show hoc sinh gioi
function showDetermine(e){
    htmls = ``;
    arrScore.forEach(function(item,index){
        if(item.average>=8){
            htmls += `<tr class="table-dark text-light">
            <th scope="row">${++index}</th>
            <td>${item.name}</td>
            <td>${item.math}</td>
            <td>${item.chemistry}</td>
            <td>${item.physical}</td>
            <td>${item.average}</td>
            </tr>`;
        }
        else{
            htmls += `<tr>
                    <th scope="row">${++index}</th>
                    <td>${item.name}</td>
                    <td>${item.math}</td>
                    <td>${item.chemistry}</td>
                    <td>${item.physical}</td>
                    <td>${item.average}</td>
                    </tr>`;
        }
    })
    innerTable.innerHTML = htmls;
}
//tinh diem trung binh
function showAverage(e){
    htmls = ``;
    arrScore.forEach(function(item,index){
        htmls += `<tr>
                <th scope="row">${++index}</th>
                <td>${item.name}</td>
                <td>${item.math}</td>
                <td>${item.chemistry}</td>
                <td>${item.physical}</td>
                <td>${item.average}</td>
                </tr>`;
    })
    innerTable.innerHTML = htmls;
}
//sap xep truong Name tang dan
function sortNamedesc(e){
    isActiveName = !isActiveName;
    console.log(isActiveName);
    if(!isActiveName){
        sort_name_desc.style.display = "none";
        sort_name_asc.style.display = "inline";
    }
    else{
        sort_name_desc.style.display = "inline";
        sort_name_asc.style.display = "none";
    }
    let newArr = [];
    let arrName = arrScore.map(function(item,index){
        return item.name;
    })
    arrName.sort();
    for(let i of arrName){
        // console.log(Number(i));
        newArr.push(arrScore.find(function(item,index){
            return item.name === i;
        }))
    }
    htmls = ``;
    newArr.forEach(function(item,index){
        htmls += `<tr>
                <th scope="row">${++index}</th>
                <td>${item.name}</td>
                <td>${item.math}</td>
                <td>${item.chemistry}</td>
                <td>${item.physical}</td>
                </tr>`;
    })
    innerTable.innerHTML = htmls;
}
//sap xem truong Name giam dam

function sortNameasc(e){
    isActiveName = !isActiveName;
    console.log(isActiveName);
    if(!isActiveName){
        sort_name_desc.style.display = "none";
        sort_name_asc.style.display = "inline";
    }
    else{
        sort_name_desc.style.display = "inline";
        sort_name_asc.style.display = "none";
    }
    let newArr = [];
    let arrName = arrScore.map(function(item,index){
        return item.name;
    })
    arrName.sort(function(a,b){
        return b-a;
    });
    for(let i of arrName){
        // console.log(Number(i));
        newArr.push(arrScore.find(function(item,index){
            return item.name === i;
        }))
    }
    htmls = ``;
    newArr.forEach(function(item,index){
        htmls += `<tr>
                <th scope="row">${++index}</th>
                <td>${item.name}</td>
                <td>${item.math}</td>
                <td>${item.chemistry}</td>
                <td>${item.physical}</td>
                </tr>`;
    })
    innerTable.innerHTML = htmls;
}
//sap xep truong math tang dan
function sortMathdesc(e){
    isActiveMath = !isActiveMath;
    console.log(isActiveMath);
    if(!isActiveMath){
        sort_math_desc.style.display = "none";
        sort_math_asc.style.display = "inline";
    }
    else{
        sort_math_desc.style.display = "inline";
        sort_math_asc.style.display = "none";
    }
    let newArr = [];
    let arrMath = arrScore.map(function(item,index){
        return item.math;
    })
    arrMath.sort();
    for(let i of arrMath){
        // console.log(Number(i));
        newArr.push(arrScore.find(function(item,index){
            return item.math === i;
        }))
    }
    htmls = ``;
    newArr.forEach(function(item,index){
        htmls += `<tr>
                <th scope="row">${++index}</th>
                <td>${item.name}</td>
                <td>${item.math}</td>
                <td>${item.chemistry}</td>
                <td>${item.physical}</td>
                </tr>`;
    })
    innerTable.innerHTML = htmls;
}
//sap xem truong math giam dam

function sortMathasc(e){
    isActiveMath = !isActiveMath;
    console.log(isActiveMath);
    if(!isActiveMath){
        sort_math_desc.style.display = "none";
        sort_math_asc.style.display = "inline";
    }
    else{
        sort_math_desc.style.display = "inline";
        sort_math_asc.style.display = "none";
    }
    let newArr = [];
    let arrMath = arrScore.map(function(item,index){
        return item.math;
    })
    arrMath.sort(function(a,b){
        return b-a;
    });
    for(let i of arrMath){
        // console.log(Number(i));
        newArr.push(arrScore.find(function(item,index){
            return item.math === i;
        }))
    }
    htmls = ``;
    newArr.forEach(function(item,index){
        htmls += `<tr>
                <th scope="row">${++index}</th>
                <td>${item.name}</td>
                <td>${item.math}</td>
                <td>${item.chemistry}</td>
                <td>${item.physical}</td>
                </tr>`;
    })
    innerTable.innerHTML = htmls;
}
//
console.log(arrScore);
arrScore.forEach(function(item,index){
    htmls += `<tr>
            <th scope="row">${++index}</th>
            <td>${item.name}</td>
            <td>${item.math}</td>
            <td>${item.chemistry}</td>
            <td>${item.physical}</td>
            </tr>`;
})
innerTable.innerHTML = htmls;
