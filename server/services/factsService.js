const { db } = require("../config/firebase");

// Gets facts from the firebase collection since it is too expensive to store them all in memory
// 
class FactsService {
    constructor() {
        this.factCollection = db.collection("facts");
    }

    async addFact(factData) {
        try {
            const docRef = await this.factCollection.add({
                ...factData, createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            return { id: docRef.id, ...factData };
        }

        catch (error) {
            throw new Error("Error adding fact: " + error.message);
        }
    }

    async getAllFacts() {
        try {
            const snapshot = await this.factCollection.get();
            const facts = [];

            snapshot.forEach(doc => {
                facts.push({
                    id: doc.id, ...doc.data()
                });
            });
            return facts;
        }
        
        catch(error) {
            throw new Error("Error retrieving facts: " + error.message);
        }
    }
}