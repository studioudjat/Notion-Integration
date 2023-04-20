const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.TOKEN });

async function queryItem(text) {
  try {
    const databaseId = process.env.RECEIPE_DB;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "名前",
        title: {
          contains: text,
        },
      },
    });

    for (let i = 0; i < response.results.length; i++) {
      console.log(response.results[i].properties["名前"].title[0].plain_text);
    }
  } catch (error) {
    console.error(error);
  }
}

queryItem(process.argv[2]);
