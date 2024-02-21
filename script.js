let totalEmissions;
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("carbon-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = parseFloat(value) || 0; // Parse as float or default to 0
        });

        // Calculate carbon footprint
        const carbonFootprint = calculateCarbonFootprint(data);

        // Display result
        displayResult(carbonFootprint);
    });

    // Function to calculate carbon footprint
    function calculateCarbonFootprint(data) {
        // Constants for emission factors (replace these with accurate values)
        // const carEmissionFactor = 2.31; // kg CO2e per liter of gasoline
        const transportEmissionFactor = 0.09; // kg CO2e per passenger-km
        const electricityEmissionFactor = 0.4; // kg CO2e per kWh
        const gasEmissionFactor = 1.92; // kg CO2e per m³ of natural gas
        const meatEmissionFactor = 14.16; // kg CO2e per kg of meat
        const dairyEmissionFactor = 3.17; // kg CO2e per L of milk
        const airTravelEmissionFactor = 0.24; // kg CO2e per passenger-km
        const wasteEmissionFactor = 0.58; // kg CO2e per kg of waste
        // Calculate emissions for each category
        const transportEmissions = data.distance * data.fuel_economy * transportEmissionFactor;
        const electricityEmissions = data.electricity_usage * electricityEmissionFactor;
        const gasEmissions = data.gas_usage * gasEmissionFactor;
        const meatEmissions = data.meat_consumption * meatEmissionFactor;
        const dairyEmissions = data.dairy_consumption * dairyEmissionFactor;
        const airTravelEmissions = data.air_travel * airTravelEmissionFactor;
        const wasteEmissions = data.waste_generation * wasteEmissionFactor;

        // Calculate the total emissions
        totalEmissions =
            transportEmissions +
            electricityEmissions +
            gasEmissions +
            meatEmissions +
            dairyEmissions +
            airTravelEmissions +
            wasteEmissions;

        return totalEmissions;
    }

    // Function to display result
    function displayResult(carbonFootprint) {
        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = `<p>Your estimated carbon footprint is: <strong>${carbonFootprint.toFixed(2)} kg CO2e</strong></p>`;
    }

});

const showAns = async ()=>{

    var country = document.getElementById("country").value
    const res = await fetch("./data.json")
    const data = await res.json()
    let country2;
    for(var i=0;i<data.length;i++){
        if(data[i]['country']==country){
            country2 = data[i]
            break;
        }
    }
    var suggestion = document.getElementById('suggestion')
    if(totalEmissions<country2['carbonFootprintByCountry_co2PerCapita2022']){
        suggestion.innerHTML=`Your commitment to maintaining a low carbon footprint is truly commendable, demonstrating an inspiring dedication to environmental sustainability. Your mindful choices contribute to a healthier planet, setting a positive example for others to follow`;
    }else{
        suggestion.innerHTML=`Consider incorporating eco-friendly practices into your daily routine, such as opting for public transportation or carpooling to reduce your carbon footprint.`;
    }
}

