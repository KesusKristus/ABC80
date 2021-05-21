
let newBooking;

window.onload = async () => {
  const res = await fetch('http://localhost:3000/bookings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  let bookings = await res.json()

  bookings = bookings.sort((a, b) => a .startTimeHour - b.startTimeHour)
  console.log(bookings)

//  const availableBookings = bookings.filter(booking => !booking.booked)

  // Samma gamla skit för att generara sakerna

  const mondayCont = document.getElementById("monday");
  const tuesdayCont = document.getElementById("tuesday");
  const wednesdayCont = document.getElementById("wednesday");
  const thursdayCont = document.getElementById("thursday");
  const fridayCont = document.getElementById("friday");

  for (let index = 0; index < bookings.length; index++) {
    const booking = bookings[index];
    const bookingDiv = document.createElement("div");
    //bookingDiv.className = "categories";
    bookingDiv.id = booking.title;
    bookingDiv.className = "timeslot"

    const bookingTitle = document.createElement("p");
    const bookingTime = document.createElement("p");
    bookingTitle.className = "bookingTitle";
    bookingTime.className = "bookingTime";

    let endMinute = parseInt(booking.startTimeMinute) + parseInt(booking.duration);
    let endHour;
    if(endMinute >= 60){
      endHour = (parseInt(booking.startTimeHour) + 1).toString();
    endMinute = (endMinute % 60).toString();
    } else {
      endHour = booking.startTimeHour;
      endMinute = endMinute.toString();
    }

    let displayTime;
    
    displayTime = booking.startTimeHour + ":" + booking.startTimeMinute + " - " + endHour + ":" + endMinute;

    bookingTitle.innerHTML = booking.title;
    bookingTime.innerHTML = displayTime;

    bookingDiv.appendChild(bookingTitle);
    bookingDiv.appendChild(bookingTime);

    if(booking.weekDay == "Måndag"){

      mondayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Tisdag"){

      tuesdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Onsdag"){

      wednesdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Torsdag"){

      thursdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Fredag"){

      fridayCont.appendChild(bookingDiv);

    }

  //Funkar bara en gång:(
    const addTimeBtn = document.getElementById("addTimeBtn")
    addTimeBtn.addEventListener("click", () => handleClick(booking))
    bookingDiv.addEventListener("click", () => handleClick(booking))


  }

  document.getElementById("closeIcon").addEventListener("click", () => handleClick())

  document.getElementById("postBtn").addEventListener("click", (e) => handlePost(e))


}

const handlePost = async (e) => {
  e.preventDefault()
  const day = document.getElementById("selectedDay");
  const startTimeHour = document.getElementById("startTimeHour");
  const startTimeMinute = document.getElementById("startTimeMinute");
  const duration = document.getElementById("selectedDuration");
  const category = document.getElementById("selectedCategory");
  const comment = document.getElementById("comment");

  newBooking.booked = false;
  newBooking.weekDay = day.value;
  newBooking.startTimeHour = startTimeHour.value;
  newBooking.startTimeMinute = startTimeMinute.value;
  newBooking.duration = duration.value;
  newBooking.title = category.value;
  newBooking.comment = comment.value;


  const res = await fetch('http://localhost:3000/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newBooking)
  })
  
  if (res.status === 201) {
    alert('Tid Tillagd')
    window.location.reload()
  }
}

const handleClick = (booking = undefined) => {

  const lightbox = document.getElementById("lightbox")
  
  if (lightbox.className == "lightbox") {
    lightbox.className = "lightbox hidden";
  } else {
    lightbox.className = "lightbox"
  }

  newBooking = booking;
}

