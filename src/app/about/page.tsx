"use client"
import { useState, useEffect } from 'react'

export default function about() {
  const [cityName, setCityName] = useState("")
  const [temp, setTemp] = useState("")
  const [condition, setCondition] = useState("")
  const [humidity, setHumidity] = useState("")
  const [wind, setWind] = useState("")
  const [icon, setIcon] = useState("")
  const [feelsLike, setFeelsLike] = useState("")

  useEffect(() => {
    fetch("https://api.weather.gc.ca/collections/citypageweather-realtime/items/nl-24")
      .then((response) => response.json())
      .then((data) => {
        const props = data.properties
        const cc = props.currentConditions

        setCityName(props.name.en)
        setTemp(cc.temperature.value.en)
        setCondition(cc.condition.en)
        setHumidity(cc.relativeHumidity.value.en)
        setWind(cc.wind.speed.value.en)
        setIcon(cc.iconCode.url)
        
        const calculatedFeels = cc.humidex ? cc.humidex.value.en : 
                                cc.windChill ? cc.windChill.value.en : 
                                cc.temperature.value.en;
        setFeelsLike(calculatedFeels)
      })
      .catch((error) => console.error("Error fetching weather:", error))
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 w-full p-6 max-w-sm bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-bold">{cityName} Weather</h2>
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">Travel Status</span>
      </div>

      {icon && (
        <div className="flex items-center gap-4 w-full justify-center">
          <img src={icon} alt={condition} className="w-16 h-16" />
          <div>
            <h1 className="text-4xl font-extrabold">{(temp)}°C</h1>
            <p className="text-sm text-gray-500">{condition}</p>
          </div>
        </div>
      )}

      {feelsLike && (
        <div className="w-full bg-gray-50 rounded-xl p-3 text-xs text-center text-gray-700">
          It feels like <span className="font-bold">{(feelsLike)}°C</span> out there.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 w-full text-sm">
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col">
          <span className="text-xxs text-gray-400 uppercase tracking-wider font-semibold">💧 Humidity</span>
          <span className="font-bold text-gray-700">{humidity}%</span>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col">
          <span className="text-xxs text-gray-400 uppercase tracking-wider font-semibold">💨 Wind Speed</span>
          <span className="font-bold text-gray-700">{wind} km/h</span>
        </div>
      </div>
    </div>
  )
}