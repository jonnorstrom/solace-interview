import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";
import { AdvocatesResponse } from "./AdvocatesResponse";

export async function GET(): Promise<Response> {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  // const data = advocateData;

  return Response.json({ data } as AdvocatesResponse);
}
