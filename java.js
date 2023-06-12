let form = document.querySelector('form')
let thead = document.querySelector('thead')
let tbody = document.querySelector('tbody')
let spm1 = document.querySelector(`.spm1`)
let spm2 = document.querySelector(`.spm2`)
let data_now = new Date().getFullYear()
let todos = []
form.onsubmit = (event) => {
    event.preventDefault()

    let todo = {
        isDone: false,
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        todo[key] = value
    })
    todo.age = data_now - todo.age
    todos.push(todo)
    reload(todos)

}

function reload(arr) {
    thead.innerHTML = ""
    tbody.innerHTML = ""
    let bnm = 1
let tr1 = document.createElement(`tr`)
let th1 = document.createElement(`th`)
let th2 = document.createElement(`th`)
let th3 = document.createElement(`th`)
let th4 = document.createElement(`th`)

th1.innerHTML = `No`
th2.innerHTML = `Fullname`
th3.innerHTML = `Date of birth`
th4.innerHTML = `Action`
tr1.append(th1, th2, th3, th4)
thead.append(tr1)

    for (let item of arr) {
        item.id = bnm++
        let trs = document.createElement('tr')
        let id = document.createElement('td')
        let name_td = document.createElement('td')
        let date_birth = document.createElement('td')
        let buttons_td = document.createElement('td')
        let edit_btn_td = document.createElement('button')
        let delete_btn_td = document.createElement('button')

        edit_btn_td.classList.add(`btn_td`)
        delete_btn_td.classList.add(`btn_td`)
        buttons_td.classList.add(`buttons_td`)


        id.innerHTML = item.id
        name_td.innerHTML = item.name
        date_birth.innerHTML = item.age
        edit_btn_td.innerHTML = `edit`
        delete_btn_td.innerHTML = `delete`

        buttons_td.append(edit_btn_td, delete_btn_td)
        trs.append(id, name_td, date_birth, buttons_td)
        tbody.append(trs)


        delete_btn_td.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            trs.classList.add('delete-anim')
            setTimeout(() => {
                trs.remove()
            }, 500);
            reload(todos)

        }
        edit_btn_td.onclick = () => {

            let inp_change = document.querySelector(`.modal input`)
            let modal = document.querySelector(`.modal`)
            let modal_bg = document.querySelector(`.modal_bg`)
            let back = document.querySelector(`.back`)
            let accept = document.querySelector(`.accept`)
            let accepts_name = document.querySelector(`.accepts_name`)
            let accepts_age = document.querySelector(`.accepts_age`)



            accepts_name.value = item.name
            accepts_age.value = data_now-item.age

            modal.style.display = (`flex`)
            modal_bg.style.display = (`flex`)
            setTimeout(() => {
                modal.style.opacity = "1";
                modal_bg.style.opacity = "0.6";
            }, 500);
            back.onclick = () => {
                setTimeout(() => {
                    modal.style.display = (`none`)
                    modal_bg.style.display = (`none`)
                }, 1010);
                modal.style.opacity = "0";
                modal_bg.style.opacity = "0";

            }
            accept.onclick = () => {
                setTimeout(() => {
                    modal.style.display = (`none`)
                    modal_bg.style.display = (`none`)
                }, 1010);
                modal.style.opacity = "0";
                modal_bg.style.opacity = "0";

                item.name = accepts_name.value
                item.age = data_now - accepts_age.value
                reload(todos)
                accepts_name.value = ``
                accepts_age.value = ``
            }

            reload(todos)

        }
    }
    spm1.value = ``
    spm2.value = ``
}



