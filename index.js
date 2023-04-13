import { Client } from "@notionhq/client";
require("dotenv").config();

const notion = new Client({ auth: process.env.TOKEN });

const databaseId = process.env.DATABASE_ID;

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

addItem("Yurts in Big Sur, California");
