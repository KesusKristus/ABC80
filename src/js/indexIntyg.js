import jsonData from "../jsonDataIntyg.js"

const catContainer = document.getElementById("category-container");

for (let index = 0; index < jsonData.categories.length; index++) {
    const category = jsonData.categories[index];
    const catDiv = document.createElement("div");
    catDiv.className = "categories";
    catDiv.id = category.title;

    const catH2 = document.createElement("h2");
    catH2.className = "category-name";

    catH2.innerHTML = category.title;
    catDiv.appendChild(catH2);

    if(category.href) {
        catDiv.addEventListener("click", () => window.location.href = category.href)
    } else {
        catDiv.addEventListener("click", () => handleClick(category))
    }

    catContainer.appendChild(catDiv);
}

const handleClick = (category) => {
    document.getElementById("description-title").innerHTML = category.title;
    document.getElementById("description-text").innerHTML = category.desc;
    
    if (document.getElementsByClassName("selected")[0]) {
        document.getElementsByClassName("selected")[0].className = "categories";
    }
        
    document.getElementById(category.title).className = "categories selected";
}