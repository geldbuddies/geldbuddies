import { NextResponse } from "next/server";
import { fetchDomainData } from "@/analysis/fetch_data";
import { GlobalScoreConfig } from "../../../analysis/config/global-score-config";
import { DomainScoreCalculator } from "../../../analysis/score-calculator";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { session, member } from "@/server/db/schemas/auth-schema";

export async function GET(req: Request) {
  try {
    // Get the session token from the cookie
    const cookieHeader = req.headers.get("cookie");
    const sessionToken = cookieHeader?.match(/(?<=session_token=)[^;]+/)?.[0];

    if (!sessionToken) {
      console.error("No session token found in cookie");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the active organization ID from the session
    const userSession = await db.query.session.findFirst({
      where: eq(session.token, sessionToken),
    });

    if (!userSession?.activeOrganizationId) {
      console.error("No active organization found for this session");
      return NextResponse.json(
        { error: "No active organization" },
        { status: 400 }
      );
    }

    // Get the member ID for the user in this organization
    const memberRecord = await db.query.member.findFirst({
      where: and(
        eq(member.userId, userSession.userId),
        eq(member.organizationId, userSession.activeOrganizationId)
      ),
    });

    if (!memberRecord) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const domainData = await fetchDomainData(memberRecord.id);

    if (domainData.length === 0) {
      return NextResponse.json([]);
    }

    const scores = domainData.map((domain) =>
      DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
    );

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
