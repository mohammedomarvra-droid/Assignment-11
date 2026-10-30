// WRITE YOUR JS CODE HERE
const buttons = document.querySelectorAll('[data-section]') //[محدد السمات والخصائص]=هات كل العناصر الي جوه الخاصيه attribute[]
const sections = document.querySelectorAll('section[id]')

buttons.forEach(button => {
    button.addEventListener('click', () => {

        const targetSectionId = button.getAttribute('data-section')

        sections.forEach(section => {
            section.style.display = 'none'

            const targetSection = document.getElementById(targetSectionId) //=>ازاي حطينهtaregetSectionId جوه getIdدا اختصار انت الي بتحدده بس يكون data-sectionبتاعت الزرار بتساوي id بتاع section
            if (targetSection)
                targetSection.style.display = 'block'
        })
        buttons.forEach(btn=>{
            btn.classList.remove('bg-blue-500/10', 'text-blue-400')
            btn.classList.add('text-slate-300')
        })
        button.classList.remove('text-slate-300')
        button.classList.add('bg-blue-500/10', 'text-blue-400')

    })
})


const apodImage = document.querySelector('#apod-image')
const apodTitle = document.querySelector('#apod-title')
const apodDateDetail = document.querySelector('#apod-date-detail')
const apodExplanation = document.querySelector('#apod-explanation')


async function getDate() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8HFmHpnkbHcwcKdw7nrkRHQgPtMWTmgHbkGdBFLR')
    const data = await response.json()
    return data
}
async function renderResponse() {
    const responseDate = await getDate()
    console.log(responseDate);

    const { date, title, explanation, url } = responseDate

    apodDateDetail.innerHTML = date
    apodTitle.innerHTML = title
    apodExplanation.innerHTML = explanation
    apodImage.setAttribute("src", url)


}
renderResponse()



const cardImage = document.querySelectorAll('.card-image')
const nameTitle = document.querySelectorAll('.name-title ')
const cards = document.querySelectorAll('.card')

async function Launches() {
    const Launchesearth = await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10')
    const earhtDate = await Launchesearth.json()
    return earhtDate

}

async function retern() {
    const reternDate = await Launches()
    console.log(reternDate);
    cards.forEach((card, i) => {

        const item = reternDate.results[i]
        console.log(item);
        cardImage[i].src = item.image.image_url
        nameTitle[i].innerHTML = item.name

    })

}
retern()




async function plant() {
    const plants = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets')
    const planrsItem = await plants.json()
    return planrsItem.bodies                     //====>bodiesدي الااري الي فيها الاوبجكت العناصر بتاعت الكوكب بعمل ريترن ليها غلشان اخرج الاوبجكت منها


}

async function displayPlanets() {
    const plantReternItem = await plant()        //====>دي لازمتها انها تعرفني تظهرلي الا اوبجكت في الكونسل علشان اخد الحاجه الي عايزه يعني لو اتشالت مش هتاثر
    console.log(plantReternItem);
}
displayPlanets()

const planetDetailImage = document.getElementById('planet-detail-image')
const planetDetaiName = document.getElementById('planet-detail-name')
const planetDetailDescription = document.getElementById('planet-detail-description')
const planetDistance = document.getElementById('planet-distance')
const planetRadius = document.getElementById('planet-radius')
const planetMass = document.getElementById('planet-mass')
const planetDensity = document.getElementById('planet-density')
const planetOrbitalDeriod = document.getElementById('planet-orbital-period')
const planetRotation = document.getElementById('planet-rotation')
const planetMoons = document.getElementById('planet-moons')
const planeTgravity = document.getElementById('planet-gravity')

function updatePlanentUI(x) {



    const { englishName, description, semimajorAxis, meanRadius, density, sideralOrbit, sideralRotation, moons, gravity,mass:{massValue}} = x


    planetDetaiName.textContent = englishName;
    planetDetailImage.src = `./images/${x.id}.png`;  //=====>دي مهمه بردو انا ليه نديت علي الصور كده علشان هي عندي علي الجهاز هتبقي اسر متيجي من apiومش هيحصل مشاكل في التحميل
    planetDetailDescription.textContent = description;


    planetDistance.textContent = semimajorAxis ? `${semimajorAxis} km` : 'N/A';
    planetRadius.textContent = meanRadius ? `${meanRadius} km` : 'N/A';



    planetMass.textContent = `${massValue} × 10²⁴ kg`;


    planetDensity.textContent = density ? `${density} g/cm³` : 'N/A';
    planetOrbitalDeriod.textContent = sideralOrbit ? `${sideralOrbit} days` : 'N/A';
    planetRotation.textContent = sideralRotation ? `${sideralRotation} hours` : 'N/A';


    planetMoons.textContent = moons ? moons.length : 0;

    planeTgravity.textContent = gravity ? `${gravity} m/s²` : 'N/A';
}






async function setupPlanetClicker() {
    const clickPlantes = await plant()
    const planetCards = document.querySelectorAll('.planet-card')
    planetCards.forEach(card => {
        card.addEventListener("click", function () {
            const clickId = this.getAttribute('data-planet-id')
            const chosenPlanet = clickPlantes.find(p => p.id === clickId)

            if (chosenPlanet)
                updatePlanentUI(chosenPlanet)
        })
    })

}
setupPlanetClicker() 