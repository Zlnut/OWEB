window.onload = setDefault;

function setDefault() { //We set all of them not to be shown once the page loads.
    document.querySelector("#home").style.display = 'block';
    document.querySelector("#models").style.display = 'none';
    document.querySelector("#testdr").style.display = 'none';
    document.querySelector("#survey").style.display = 'none';
}

//define the navigation of the site
var allSects = document.querySelectorAll('nav a, .new-categories, .used-categories, .testdr'  )

for (let i =0; i < allSects.length; i++){
    allSects[i].addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').substring(1);

        var sections = document.querySelectorAll('section');
        for (let j = 0; j < sections.length; j++){
            sections[j].style.display = 'none'; // reset the display of all sections before setting the display to one of them to block
        }
        const targetSection = document.getElementById(sectionId);  //display the clicked page  
        if(targetSection){
            targetSection.style.display = 'block';
        }
    });
}


document.querySelector('.survey-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const impression = document.getElementById('impression').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    alert("Thank you for letting us know what you thought about our site!");
    e.target.reset();
})