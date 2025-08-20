const factsService = require('../services/factsService');

// Ingest some sample data into the firebase

const sampleFacts = [
    {
        fact: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible.",
        category: "food",
        source: {
            title: "Smithsonian Magazine",
            url: "https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/",
            author: "Amina Khan"
            }
    },

    {
        fact: "The mitocondria is referred to as the powerhouse of the cell.",
        category: "science",
        source: {
            title: "I made it up",
            url: "https://www.youtube.com",
            author: "Eceer Nayub"
        }
    }
];

async function seedDB() {
    try {
        for (const fact of sampleFacts) {
            await factsService.addFact(fact);
            console.log('Added fact:', fact.fact.substring(0, 30) + '...');

        }

        console.log("Database seeded successfully!");
    }

    catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedDB();