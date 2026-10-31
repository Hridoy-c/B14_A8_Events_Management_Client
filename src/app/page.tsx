"use client";

import React from "react";
import Banner from "@/components/home/Banner";
import CommunityInAction from "@/components/home/CommunityInAction";
import GrassrootsAction from "@/components/home/GrassrootsAction";
import LocalCauseAlerts from "@/components/home/LocalCauseAlerts";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* HERO BANNER SECTION */}
      <Banner />

      {/* GRASSROOTS ACTION SECTION */}
      <GrassrootsAction />

      {/* RECENT UPCOMING EVENTS SECTION */}
      <RecentUpcomingEvents />

      {/* COMMUNITY IN ACTION SECTION */}
      <CommunityInAction />

      {/* LOCAL CAUSE ALERTS SECTION */}
      <LocalCauseAlerts />
    </div>
  );
}