/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    const gamesContainer = document.getElementById('games-container');

    games.forEach(game => {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');
    
        // Add the class game-card to the list
        gameCard.classList.add('game-card');
    
        // Set the inner HTML of the div using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
            `;
    
        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// 4.1: grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((accumulator, currentGame) => {
    return accumulator + currentGame.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalBackers.toLocaleString()}`;


// 4.2: grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// use reduce() to count the number of total raised by summing the pledged
const totalRaised = GAMES_JSON.reduce((accumulator, currentGame) => {
    return accumulator + currentGame.pledged;
}, 0).toLocaleString();

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised}`;

// 4.3: grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numberOfGames = GAMES_JSON.length;
gamesCard.innerHTML = `${numberOfGames}`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// 5.1 show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(currentGame => {
        return currentGame.goal > currentGame.pledged;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Set button states
    setActiveButton(unfundedBtn);
}


// 5.2 show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(currentGame => {
        return currentGame.goal <= currentGame.pledged;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)

    // Set button states
    setActiveButton(fundedBtn);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // Set button states
    setActiveButton(allBtn);
}

// Helper function to set the active button
function setActiveButton(activeButton) {
    // Remove the selected class from all buttons
    unfundedBtn.classList.remove('selected');
    fundedBtn.classList.remove('selected');
    allBtn.classList.remove('selected');

    // Add the selected class to the active button
    activeButton.classList.add('selected');
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnfunded = GAMES_JSON.filter(currentGame => {
    return currentGame.goal > currentGame.pledged;
}).length;


// create a string that explains the number of unfunded games using the ternary operator
const descriptionString = `
    A total of $${totalRaised} has been raised for ${numberOfGames } game${numberOfGames  > 1 ? 's' : ''}. 
    Currently, ${totalUnfunded} game${totalUnfunded !== 1 ? 's remain' : ' remains'} unfunded.
    We need your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement('p');
newParagraph.textContent = descriptionString;
descriptionContainer.appendChild(newParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstP = document.createElement('p');
const secondP = document.createElement('p');

firstP.textContent = firstGame.name;
secondP.textContent = secondGame.name;

firstGameContainer.append(firstP);
secondGameContainer.append(secondP);