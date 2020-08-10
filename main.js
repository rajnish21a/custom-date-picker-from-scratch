const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const yr_element = document.querySelector('.date-picker .dates .month .yr');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S','M','T','W','T','F','S'];


let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month];
yr_element.textContent = year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		dates_element.classList.toggle('active');
	}
}

function goToNextMonth (e) {
	month++;
	if (month > 11) {
		month = 0;
    year++;
    yr_element.textContent = year;
	}
	mth_element.textContent = months[month];
	populateDates();
}

function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
    year--;
    yr_element.textContent = year;
	}
	mth_element.textContent = months[month];
	populateDates();
}

function populateDates (e) {
	days_element.innerHTML = '';
  let amount_days = 31;
  
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:  
      amount_days = 31;
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      amount_days = 30;
      break;
    default:
      amount_days = 31;
      break;
  }

	if (month == 1 && (year % 4) !== 0 ) {
		amount_days = 28;
  }
  

  if (month == 1 && (year % 4) === 0 ) {
		amount_days = 29;
  }
  
  let day_element;
  for (let j = 0; j < days.length; j++) {
    day_element = document.createElement('div');
		day_element.classList.add('day');
    day_element.textContent = days[j];
    days_element.appendChild(day_element);
  }

  let firstDay = new Date(year,month, 1);
	let lastDay = new Date(year, month+1, 0);
  let offset = firstDay.getDay();
  for (let k = 0; k < offset; k++) {
    day_element = document.createElement('div');
		day_element.classList.add('day');
    days_element.appendChild(day_element);
  }
  
	for (let i = 0; i < amount_days; i++) {
		day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			day_element.classList.add('selected');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			selected_date_element.textContent = formatDate(selectedDate);
			selected_date_element.dataset.value = selectedDate;

			populateDates();
		});

		days_element.appendChild(day_element);
	}
}

// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + '/' + month + '/' + year;
}