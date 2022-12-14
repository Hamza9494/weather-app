// api credentials
const key = '4ad9ac3293bea72bc6e974926f8b46c0'
let lon
let lat

// DOM element
const weatherIcon = document.querySelector('.weather-icon')
const todatTemp = document.querySelector('.temp')
const userLocation = document.querySelector('.location')
const min = document.querySelector('.min')
const max = document.querySelector('.max')
const weatherDescription = document.querySelector('.description')
const place = document.querySelector('.place')

// get user location and fetch data then desplay it
userLocation.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    lon = position.coords.longitude
    lat = position.coords.latitude
    if (lon && lat) {
      userLocation.classList.add('hide')
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const { icon } = data.weather[0]
        weatherIcon.src = `./icons/${icon}.png`

        place.textContent = `Place: ${data.name} `

        const { temp } = data.main
        todatTemp.textContent = `temperature: ${temp} `
        let { temp_min } = data.main
        let { temp_max } = data.main

        min.textContent = `temp_min: ${temp_min}`
        max.textContent = `temp_max: ${temp_max}`
        let { description } = data.weather[0]
        weatherDescription.textContent = `description: ${description} `
      })
  })
})
