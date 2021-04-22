/**
 * @author Viktor, Nils, Salvija & Malin
 * This is a class that generates the categories on the Läkarmottagning-page, as well as the dynamic descriptions. 
 */

import jsonData from "../jsonDataLakarmottagning.js"

const catContainer = document.getElementById("category-container");


/**
 * This for-loop takes the data from the JSON file and creates categories from that. 
 */
for (let index = 0; index < jsonData.categories.length; index++) {
    const category = jsonData.categories[index];
    const catDiv = document.createElement("div");
    catDiv.className = "categories";
    catDiv.id = category.title;

    const catH2 = document.createElement("h2");
    catH2.className = "category-name";

    const catImg = document.createElement("img");
    catImg.src = "img\right_arrow.png";
    catImg.className = "category";

    catH2.innerHTML = category.title;
    catDiv.appendChild(catH2);
    catDiv.appendChild(catImg);

    if(category.href) {
        catDiv.addEventListener("click", () => window.location.href = category.href)
    } else {
        catDiv.addEventListener("click", () => handleClick(category))
    }

    catContainer.appendChild(catDiv);
}


/**
 * This function sets the title and description for the category. It also sets a category to selected when it's clicked. 
 */
const handleClick = (category) => {
    document.getElementById("description-title").innerHTML = category.title;
    document.getElementById("description-text").innerHTML = category.desc;
    
    if (document.getElementsByClassName("selected")[0]) {
        document.getElementsByClassName("selected")[0].className = "categories";
    }
        
    document.getElementById(category.title).className = "categories selected";
}