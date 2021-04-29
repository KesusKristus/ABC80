window.onload = async () => {
    const res = await fetch('http://localhost:3000/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    const bookings = await res.json()

    const availableBookings = bookings.filter(booking => !booking.booked)
  
    // Samma gamla skit för att generara sakerna

    const mondayCont = document.getElementById("monday");

    for (let index = 0; index < bookings.length; index++) {
        const booking = bookings[index];
        const bookingDiv = document.createElement("div");
        //bookingDiv.className = "categories";
        bookingDiv.id = booking.title;
    
        const bookingTitle = document.createElement("h2");
        //bookingTitle.className = "category-name";
    
/*         const catImg = document.createElement("img");
        catImg.src = "img\right_arrow.png";
        catImg.className = "category"; */
        
    
        bookingTitle.innerHTML = booking.title;
        mondayCont.appendChild(bookingTitle);
       // mondayCont.appendChild(catImg);
    
/*         if(category.href) {
            catDiv.addEventListener("click", () => window.location.href = category.href)
        } else {
            catDiv.addEventListener("click", () => handleClick(category))
        } */
    
        mondayCont.appendChild(bookingDiv);
    }






  }