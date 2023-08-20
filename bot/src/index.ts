import { App, AppMentionEvent, SayFn, SocketModeReceiver } from "@slack/bolt";
import axios from "axios";
import cheerio from "cheerio";
import * as dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { desc } from "drizzle-orm";
import { readingList } from "../drizzle/schema";

dotenv.config();
const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client);

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN!;
const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN!;

const app = new App({
  token: SLACK_BOT_TOKEN,
  receiver: new SocketModeReceiver({ appToken: SLACK_APP_TOKEN }),
  signingSecret: "", // You might need this based on your Slack app's configuration
});

app.event("app_mention", async ({ event, say }) => {
  handleDirectMessage(event, say);
});

app.command("/list", async ({ say, ack, respond }) => {
  // Acknowledge command request

  await ack();
  const rl = await db
    .select()
    .from(readingList)
    .orderBy(desc(readingList.createdAt));

  let text = "The current reading list: ";
  for (const item of rl) {
    text += `${item.title} \n${item.url} \n \n`;
  }

  await say({
    text: text,
  });
});

interface Link {
  title: string;
  url: string;
}

async function handleDirectMessage(event: AppMentionEvent, say: SayFn) {
  const attachments = event.attachments;
  const links: Link[] = [];
  if (attachments) {
    for (const attachment of attachments) {
      const link: Link = {
        title: attachment.title as string,
        // @ts-ignore
        url: attachment.from_url as string,
      };
      links.push(link);
    }
  }

  const regexLinks = parseLinks(event.text);
  if (regexLinks) {
    for (const regexLink of regexLinks) {
      if (links.find((link) => link.url === regexLink)) {
        continue;
      }
      const title = await fetchTitle(regexLink);
      const link: Link = {
        title: title as string,
        url: regexLink,
      };
      links.push(link);
    }
  }

  const replyText = links
    .map(
      (link) =>
        `Title: ${link.title} \nLink: ${link.url} \nAdded to reading list.`,
    )
    .join("\n \n");
  for (const link of links) {
    await db.insert(readingList).values({
      url: link.url,
      title: link.title,
    });
  }

  await say({
    text: replyText,
    thread_ts: event.ts,
  });
}

function parseLinks(text: string) {
  var urlRegex = /(https?:\/\/[^\s>]+)/g;
  return text.match(urlRegex);
}
async function fetchTitle(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const title = $("title").text();
    return title;
  } catch (error) {
    console.error("Error fetching the title:", error);
    return null;
  }
}

(async () => {
  await app.start();
  console.log("App is running!");
})();
