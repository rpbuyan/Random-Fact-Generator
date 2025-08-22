const { db } = require('./firebase-seed');
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
    },

    {
        fact: "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps blood to the rest of the body.",
        category: "animals",
        source: {
            title: "National Geographic",
            url: "https://www.nationalgeographic.com/animals/invertebrates/facts/octopus",
            author: "National Geographic Society"
        }
    },

    {
        fact: "A group of flamingos is called a 'flamboyance'. They get their pink color from eating shrimp and algae.",
        category: "animals",
        source: {
            title: "San Diego Zoo",
            url: "https://zoo.sandiegozoo.org/animals/flamingo",
            author: "San Diego Zoo Wildlife Alliance"
        }
    },

    {
        fact: "The shortest war in history lasted only 38-45 minutes. It was between Britain and Zanzibar in 1896.",
        category: "history",
        source: {
            title: "Britannica",
            url: "https://www.britannica.com/event/Anglo-Zanzibar-War",
            author: "Encyclopedia Britannica"
        }
    },
    {
        fact: "Bananas are berries, but strawberries aren't. Botanically, a berry must have seeds inside its flesh.",
        category: "science",
        source: {
            title: "Scientific American",
            url: "https://www.scientificamerican.com/article/why-are-bananas-berries/",
            author: "Scientific American"
        }
    }
];

async function seedDB() {
    try {
        console.log("Seeding database with sample facts");

        for (const fact of sampleFacts) {
            const docRef = await db.collection('facts').add({
                ...fact,
                createdAt: new Date()
            });

            console.log('Added fact:', fact.fact.substring(0, 30) + '...');
            console.log('Document ID:', docRef.id);
        }
        
        // Test 
        console.log("Database seeded successfully!");
        console.log("Added ${sampleFacts.length} sample facts to Firebase.");

        process.exit(0);
    }

    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDB();