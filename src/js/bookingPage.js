
let selectedBooking;

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
  const tuesdayCont = document.getElementById("tuesday");
  const wednesdayCont = document.getElementById("wednesday");
  const thursdayCont = document.getElementById("thursday");
  const fridayCont = document.getElementById("friday");

  for (let index = 0; index < availableBookings.length; index++) {
    const booking = availableBookings[index];
    const bookingDiv = document.createElement("div");
    //bookingDiv.className = "categories";
    bookingDiv.id = booking.title;
    bookingDiv.className = "timeslot"

    const bookingTitle = document.createElement("p");
    const bookingTime = document.createElement("p");
    bookingTitle.className = "bookingTitle";
    bookingTime.className = "bookingTime";
    

    bookingTitle.innerHTML = booking.title;
    bookingTime.innerHTML = booking.startTimeHour;

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

    bookingDiv.addEventListener("click", () => handleClick(booking))

  }

  document.getElementById("bookBtn").addEventListener("click", (e) => handleBook(e))

}

const handleBook = async (e) => {
  e.preventDefault()
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("eMail");
  const phoneNumber = document.getElementById("phoneNumber");
  const comment = document.getElementById("comment");

  selectedBooking.booked = true;
  selectedBooking.firstName = firstName.value;
  selectedBooking.lastName = lastName.value;
  selectedBooking.email = email.value;
  selectedBooking.phoneNumber = phoneNumber.value;
  selectedBooking.comment = comment.value;

  const res = await fetch('http://localhost:3000/booking', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(selectedBooking)
  })
  
  if (res.status === 200) {
    alert('Tid Bokad!')
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

  selectedBooking = booking;
}

