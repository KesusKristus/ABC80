
let newBooking;

window.onload = async () => {
  const res = await fetch('http://localhost:3000/bookings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  const bookings = await res.json()

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

    const bookingTitle = document.createElement("h2");
    const bookingTime = document.createElement("p");

    bookingTitle.innerHTML = booking.title;
    bookingTime.innerHTML = booking.startTimeHour;

    bookingDiv.appendChild(bookingTitle);
    bookingDiv.appendChild(bookingTime);

    if(booking.weekDay == "Monday"){

      mondayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Tuesday"){

      tuesdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Wednesday"){

      wednesdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Thursday"){

      thursdayCont.appendChild(bookingDiv);

    } else if(booking.weekDay == "Friday"){

      fridayCont.appendChild(bookingDiv);

    }

    bookingDiv.addEventListener("click", () => handleClick(booking))

  }

  document.getElementById("bookBtn").addEventListener("click", (e) => handleBook(e))

}

const handleBook = async (e) => {
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

  const popup = document.getElementById("myForm")

  if (popup.className == "popup") {
    popup.className = "popup hidden";
  } else {
    popup.className = "popup";
  }

  newBooking = booking;
}

