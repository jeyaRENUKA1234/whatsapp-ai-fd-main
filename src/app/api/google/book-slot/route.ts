import { google } from "googleapis";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !(session as any).accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { start, end } = await req.json();

  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({ access_token: (session as any).accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: "Booked Slot",
      start: { dateTime: start },
      end: { dateTime: end },
    },
  });

  return Response.json(event.data);
}
