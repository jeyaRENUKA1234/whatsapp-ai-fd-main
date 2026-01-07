import { google } from "googleapis";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !(session as any).accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { date } = await req.json(); // "2025-11-26"

  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({ access_token: (session as any).accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  // Fetch events for that day
  const startOfDay = new Date(date + "T00:00:00Z");
  const endOfDay = new Date(date + "T23:59:59Z");

  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return Response.json(events.data.items);
}
