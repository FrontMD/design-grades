document.addEventListener("DOMContentLoaded", () => {

    designGrade = document.querySelector('[data-js="designGrade"]')

    if(!designGrade) return

    let currentLocationSearch = window.top.location.search

    let currentId = currentLocationSearch.substring(1).split('&').find(item => item.startsWith('id='))

    if(currentId) {
        currentId = currentId.split('=')[1]
    } else {
        currentId = "1"
    }

    const designGradeBtnList = designGrade.querySelectorAll('[data-js="designGradeBtn"]')

    designGradeBtnList.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentNum = btn.dataset.value
            getResult(currentId, currentNum, designGrade)
        })
    })
})

function getResult(id, num, parentBlock) {
    const designGrades = parentBlock.querySelector('[data-js="designGradeGrades"]')
    const designResults = parentBlock.querySelector('[data-js="designGradeResults"]')

    fetch("https://ostinschool.woman.ru/save_data", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          num: num
        })
      })    
      .then( (response) => {
        return response.json();
      })
      .then((data) => {
        data = JSON.parse(data);
        designResults.querySelector('[data-js="designGradeValue"]').innerHTML = data.percent + "%"
        designGrades.classList.remove("active")
        designResults.classList.add("active")
      });

}
