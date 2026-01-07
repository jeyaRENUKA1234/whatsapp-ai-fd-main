import { google } from "googleapis";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  // FIX: get session using req in App Router
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !(session as any).accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Authenticate with Google
  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({
    access_token: (session as any).accessToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2,
  });

  // Load calendar events
  const events = await calendar.events.list({
    calendarId: "primary",
    maxResults: 20,
    singleEvents: true,
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
  });

  return Response.json(events.data.items);
}
