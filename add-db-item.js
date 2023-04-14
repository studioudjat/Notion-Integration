const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.TOKEN });
const databaseId = process.env.DATABASE_ID;

async function addItem(text, category) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        Category: {
          select: {
            name: category,
          },
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

addItem(process.argv[2], process.argv[3]);
