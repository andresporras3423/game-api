
const divContent = document.getElementById("content");
const divList = document.createElement("div");
const divAdd = document.createElement("div");
const paragraph = document.createElement("p");
const buttonUpdate = document.createElement("button");
const headAdd = document.createElement("h3");
const nameAdd = document.createElement("input");
const scoreAdd = document.createElement("input");
const buttonAdd = document.createElement("button");

divContent.classList.add("col-12");
divContent.classList.add("row");
divList.classList.add("col-8");
paragraph.classList.add("child-width");
buttonUpdate.innerText="Update list";
divContent.appendChild(divList);
divContent.appendChild(divAdd);
divList.appendChild(paragraph);
divList.appendChild(buttonUpdate);

divAdd.classList.add("child-width");
divAdd.classList.add("col-4");
nameAdd.type="text";
scoreAdd.type="number";
headAdd.innerText="ADD NEW SCORE";
nameAdd.placeholder="Here username";
scoreAdd.placeholder="10";
buttonAdd.innerText="Add";
divAdd.appendChild(headAdd);
divAdd.appendChild(nameAdd);
divAdd.appendChild(scoreAdd);
divAdd.appendChild(buttonAdd);

const updateList = () => {
    // URL (required), options (optional)
    paragraph.innerHTML="";
fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/satVX3CEJZpfG8bj7ytu/scores/', {
    method: 'get'
  })
  .then(response => response.text()) // 1
  .then(json => {                    // 2
    let scores = JSON.parse(json).result;
    Object.values(scores).forEach((score, index)=>{
      const label = document.createElement("label");
      label.innerText=`${index+1}) user: ${score.user}, score: ${score.score}`;
      paragraph.appendChild(label);
    });
  })
.catch(function(err) {
  console.log(err);
});
};

const addScore = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/satVX3CEJZpfG8bj7ytu/scores/', {
    method: 'post',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify({
      user: nameAdd.value,
      score: scoreAdd.value
    })
  })
  .then(response => {                    
    nameAdd.value="";
    scoreAdd.value=0;
  })
.catch(function(err) {
  console.log(err);
});
}

buttonUpdate.onclick= function() {updateList()};
buttonAdd.onclick=function(){addScore()};

updateList();
