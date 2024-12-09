const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

let imgFrom = document.querySelector("#from img")
let imgTo = document.querySelector("#to img")

let selectFrom = document.querySelector("#from select")
let selectTo = document.querySelector("#to select")
let btn = document.querySelector("button")
let amount = document.querySelector("input")
let msg = document.querySelector("#message h4")
let currFrom
let currTo

for (data in countryList)
{
    let opt1 = document.createElement("option")
    opt1.textContent = data
    selectFrom.append(opt1)

    let opt2 = document.createElement("option")
    opt2.textContent = data
    selectTo.append(opt2)
}

selectFrom.addEventListener("change", (details)=>
{
    let country = countryList[details.target.value]
    currFrom = details.target.value
    console.log(country)
    imgFrom.src = `https://flagsapi.com/${country}/flat/64.png`
})

selectTo.addEventListener("change", (details)=>
{
    let country = countryList[details.target.value]
    currTo = details.target.value
    console.log(country)
    imgTo.src = `https://flagsapi.com/${country}/flat/64.png`
})

let result
let rate

btn.addEventListener("click", (event)=>
{
    event.preventDefault()
    let url = `${base_url}${currFrom.toLowerCase()}.json`

    if (amount.value === "" || amount.value < 1)
    {
        alert("enter valid amount")
        amount.value = 1
        
    }

    async function getRate()
    {
        let response = await fetch(url)
        console.log(response)
        result = await response.json()
        console.log(result)
        rate = result[`${currFrom.toLowerCase()}`][`${currTo.toLowerCase()}`]

        amount.value = amount.value*rate
        msg.textContent = `1 ${currFrom} = ${rate} ${currTo}`
    }

    
    getRate()
})

