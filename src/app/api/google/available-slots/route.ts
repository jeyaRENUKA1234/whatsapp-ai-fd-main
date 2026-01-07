import { google } from "googleapis";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !(session as any).accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { date } = await req.json(); // "2025-11-27"

  // Validate date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json([]);
  }

  // Setup OAuth
  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({ access_token: (session as any).accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  // Get events for the day
  const startOfDay = new Date(`${date}T00:00:00Z`);
  const endOfDay = new Date(`${date}T23:59:59Z`);

  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const bookedTimes: string[] =
  events.data.items
    ?.map(ev => ev.start?.dateTime)
    .filter((dt): dt is string => typeof dt === "string") ?? [];


  // Generate 30-minute slots
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 18;
  let current = new Date(`${date}T${String(startHour).padStart(2,"0")}:00:00Z`);

  while (current < new Date(`${date}T${String(endHour).padStart(2,"0")}:00:00Z`)) {
    slots.push(current.toISOString());
    current = new Date(current.getTime() + 30 * 60 * 1000);
  }

  // Filter free slots
  const free = slots.filter(slot =>
  !bookedTimes.some(
    b => new Date(b).getTime() === new Date(slot).getTime()
  ));


  return Response.json(free);
}
