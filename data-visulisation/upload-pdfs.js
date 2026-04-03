const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db("ALD_Data");
        const collection = db.collection("Papers");

        const papers = await collection.find({}).toArray();
        console.log(`Found ${papers.length} papers in DB to process.`);

        const pdfsDir = path.join(process.cwd(), "..", "Web Scrapper", "ald_papers_naming");

        for (const paper of papers) {
            const pdfPath = path.join(pdfsDir, `${paper.id}.pdf`);

            if (fs.existsSync(pdfPath)) {
                console.log(`Uploading ${paper.id}.pdf to Vercel Blob...`);
                // Read binary file
                const fileBuffer = fs.readFileSync(pdfPath);

                // Upload
                const blob = await put(`${paper.id}.pdf`, fileBuffer, {
                    access: 'public',
                    contentType: 'application/pdf'
                });

                // Update DB with the returned URL
                await collection.updateOne(
                    { _id: paper._id },
                    { $set: { pdf_url: blob.url } }
                );
                console.log(`Success! Linked ${paper.id} to ${blob.url}`);
            } else {
                console.warn(`Warning: Could not find strict local file for ${paper.id}`);
            }
        }

        console.log("All uploads complete!");
    } catch (err) {
        console.error("Upload failed", err);
    } finally {
        await client.close();
    }
}

run();
