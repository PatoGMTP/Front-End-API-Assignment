let apiurl = "https://pokeapi.co/api/v2/";
let poke;

// let inputgroup = document.querySelector("#inputgroup");

let input = document.getElementById("inputnum").children[0];
let button = document.getElementById("inputbtn").children[0];

let h1 = document.getElementById("pokename").children[0];
let image_list = document.getElementById("pokeimage");

document.addEventListener("DOMContentLoaded", main);

async function main()
{
    console.log("Loaded!");

    input.placeholder = "Give me a number from 1 to 898!";
    input.id = "number";
    
    button.innerText = "Click me or press 'Enter' to search!";

    // poke = await getPoke();
    // console.log(poke);
}

async function getPoke(num)
{
    return fetch(apiurl+`pokemon/${num}`).then(resp => resp.json());
}

async function displayPoke(num)
{
    poke = await getPoke(num);
    h1.innerHTML = poke.name;
    // console.log(poke.sprites);
    let img;
    let div;

    image_list.innerHTML = "";

    items = Object.entries(poke.sprites);
    items.forEach(pair => {
        if (typeof(pair[1]) === "string" )
        {
            div = document.createElement("div");
            img = document.createElement("img");
            div.className = "col";
            img.src = pair[1];
            div.appendChild(img);
            image_list.appendChild(div);
        }
    });
    console.log(items);
}

function parseInput()
{
    let inner = input.value;
    let number = parseInt(inner);
    if (isNaN(number))
    {
        alert("Please enter a number!");
    }
    else if (number < 1 || number > 898)
    {
        alert("Number out of range!");
    }
    else
    {
        console.log(inner, number);
        displayPoke(number);
    }
}

document.addEventListener("keydown", evt =>{
    if (evt.key === "Enter")
    {
        parseInput();
    }
});

button.addEventListener("click", parseInput);