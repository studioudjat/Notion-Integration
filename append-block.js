const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.TOKEN });
const blockId = process.env.BLOCK_ID;

async function addItem(item) {
  try {
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: [
        {
          to_do: {
            rich_text: [
              {
                text: {
                  content: item,
                },
              },
            ],
          },
        },
      ],
    });
    console.log(response);
    console.log("Success! Item added.");
  } catch (error) {
    console.error(error.body);
  }
}

addItem(process.argv[2]);
