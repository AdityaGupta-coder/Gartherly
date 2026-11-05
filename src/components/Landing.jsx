import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export const events = [
  {
    id: 1,
    title: "City Lights Music Festival",
    date: "November 6, 2026",
    time: "Happening now",
    venue: "Pier 27, San Francisco",
    description:
      "An open-air celebration of live music, local food, and the artists shaping the city's sound.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Crowd enjoying a live music performance under colorful lights",
    status: "live",
    category: "Music",
  },
  {
    id: 2,
    title: "Design Forward 2026",
    date: "November 14, 2026",
    time: "9:30 AM – 5:00 PM",
    venue: "The Glasshouse, New York",
    description:
      "A day of fresh ideas, creative workshops, and conversations with people making what comes next.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Audience gathered at a modern conference",
    status: "upcoming",
    category: "Conference",
  },
  {
    id: 3,
    title: "Harvest Table: An Autumn Supper",
    date: "November 21, 2026",
    time: "6:30 PM – 10:00 PM",
    venue: "Marlowe Farm, Hudson Valley",
    description:
      "Gather around a candlelit table for a seasonal, farm-to-table dinner celebrating local growers.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Warmly lit dinner table set for a special gathering",
    status: "upcoming",
    category: "Food & Drink",
  },
  {
    id: 4,
    title: "Makers & Market Weekend",
    date: "December 5, 2026",
    time: "10:00 AM – 6:00 PM",
    venue: "The Foundry, Brooklyn",
    description:
      "Meet independent makers, find one-of-a-kind gifts, and enjoy a weekend full of creative finds.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7aed7b626f9?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colorful community market with people browsing local stalls",
    status: "upcoming",
    category: "Community",
  },
  {
    id: 5,
    title: "The Future of Good",
    date: "December 12, 2026",
    time: "11:00 AM – 4:30 PM",
    venue: "Lighthouse Hall, Austin",
    description:
      "An inspiring afternoon for people building a more thoughtful and sustainable future.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Speaker presenting on stage at a community event",
    status: "upcoming",
    category: "Talks",
  },
  {
    id: 6,
    title: "Sunday Sounds in the Garden",
    date: "December 20, 2026",
    time: "2:00 PM – 7:00 PM",
    venue: "Brooklyn Botanic Garden, Brooklyn",
    description:
      "Wind down the year with an easygoing afternoon of live sets surrounded by winter blooms.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Live outdoor music event with a crowd",
    status: "upcoming",
    category: "Music",
  },
  {
    id: 7,
    title: "The Winter Makers Fair",
    date: "November 28, 2026",
    time: "11:00 AM – 5:00 PM",
    venue: "Union Hall, Seattle",
    description:
      "Shop small and meet local artists, craftspeople, and independent makers at this cozy seasonal market.",
    image:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Thoughtfully wrapped gifts arranged for a winter market",
    status: "upcoming",
    category: "Market",
  },
  {
    id: 8,
    title: "Indie Film Night: New Voices",
    date: "December 3, 2026",
    time: "7:00 PM – 10:00 PM",
    venue: "The Roxie Theater, San Francisco",
    description:
      "Catch a handpicked collection of short films from emerging filmmakers, followed by a relaxed Q&A.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Rows of seats inside a movie theater",
    status: "upcoming",
    category: "Film",
  },
  {
    id: 9,
    title: "Coffee, Code & Community",
    date: "December 9, 2026",
    time: "9:00 AM – 1:00 PM",
    venue: "Workshop Coffee, Portland",
    description:
      "Meet fellow builders for a friendly morning of lightning talks, creative demos, and great coffee.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Welcoming cafe set up for a community gathering",
    status: "upcoming",
    category: "Community",
  },
  {
    id: 10,
    title: "Move Together: Winter Run Club",
    date: "December 16, 2026",
    time: "8:00 AM – 10:00 AM",
    venue: "Golden Gate Park, San Francisco",
    description:
      "Start the morning with a welcoming group run, followed by a warm drink and good company.",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "People taking part in an outdoor fitness event",
    status: "upcoming",
    category: "Wellness",
  },
  {
    id: 11,
    title: "New Year, New Ideas",
    date: "January 9, 2027",
    time: "10:00 AM – 3:00 PM",
    venue: "The Assembly, Chicago",
    description:
      "Set fresh intentions with creative workshops, thoughtful conversations, and practical inspiration.",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "People sharing ideas at a collaborative workshop",
    status: "upcoming",
    category: "Workshop",
  },
  {
    id: 12,
    title: "Sunday Brunch & Jazz",
    date: "January 17, 2027",
    time: "11:30 AM – 2:30 PM",
    venue: "The Blue Note, New York",
    description:
      "Enjoy a laid-back brunch with live jazz, seasonal plates, and a little room to linger.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A beautifully set table ready for brunch",
    status: "upcoming",
    category: "Food & Drink",
  },
  {
    id: 13,
    title: "Build with AI: Tech Meetup",
    date: "January 23, 2027",
    time: "6:00 PM – 9:00 PM",
    venue: "The Tech Hub, San Francisco",
    description:
      "Explore practical AI demos, hear from local builders, and connect with people shaping the next wave of technology.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Close-up of a circuit board at a technology meetup",
    status: "upcoming",
    category: "Tech",
  },
  {
    id: 14,
    title: "Stories of the City",
    date: "January 30, 2027",
    time: "1:00 PM – 5:00 PM",
    venue: "The Cultural Center, Los Angeles",
    description:
      "Celebrate the voices, art, and traditions that make our neighborhoods unique with performances and local exhibits.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Visitors exploring an art and culture exhibition",
    status: "upcoming",
    category: "Cultural",
  },
  {
    id: 15,
    title: "Community Courts: Winter Classic",
    date: "February 6, 2027",
    time: "10:00 AM – 4:00 PM",
    venue: "Riverside Sports Center, Austin",
    description:
      "Cheer on local teams, join a friendly game, and spend a spirited day celebrating community sports.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Athletes competing at a community sports event",
    status: "upcoming",
    category: "Sports",
  },
  {
    id: 16,
    title: "Make Your Own Ceramic Tableware",
    date: "February 13, 2027",
    time: "2:00 PM – 5:00 PM",
    venue: "Clay House Studio, Portland",
    description:
      "Get hands-on with clay in a relaxed beginner-friendly workshop and create a piece to take home.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Handmade ceramic pottery displayed in a studio",
    status: "upcoming",
    category: "Workshop",
  },
  {
    id: 17,
    title: "Careers in Creative Tech",
    date: "February 20, 2027",
    time: "10:00 AM – 2:00 PM",
    venue: "Founders Hall, New York",
    description:
      "Meet creative teams, hear honest career stories, and get practical advice for your next professional step.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colleagues connecting at a career networking event",
    status: "upcoming",
    category: "Career",
  },
  {
    id: 18,
    title: "After Hours: Local Live Sessions",
    date: "February 27, 2027",
    time: "7:30 PM – 11:00 PM",
    venue: "The Sound Room, Nashville",
    description:
      "Discover up-and-coming local musicians during an intimate night of live sets and good company.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Musician performing live on a warmly lit stage",
    status: "upcoming",
    category: "Music",
  },
  {
    id: 19,
    title: "Bengaluru AI & Startup Meetup",
    date: "November 6, 2026",
    time: "Happening now",
    venue: "St. Marks Road, Bengaluru, India",
    description:
      "Meet India's builders and founders for live product demos, practical AI conversations, and startup networking.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Circuit board representing a technology meetup",
    status: "live",
    category: "Tech",
  },
  {
    id: 20,
    title: "Diwali Lights & Traditions",
    date: "November 14, 2026",
    time: "5:00 PM – 9:00 PM",
    venue: "Shilpgram, Jaipur, India",
    description:
      "Experience regional crafts, festive lights, music, and traditions shared by artists from across Rajasthan.",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colorful festive lights at an Indian cultural celebration",
    status: "upcoming",
    category: "Cultural",
  },
  {
    id: 21,
    title: "Mumbai City Run",
    date: "November 22, 2026",
    time: "6:00 AM – 10:00 AM",
    venue: "Bandra Fort Promenade, Mumbai, India",
    description:
      "Run or cheer along the coast at a friendly community race with distances for first-timers and seasoned runners.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Runners taking part in an outdoor race",
    status: "upcoming",
    category: "Sports",
  },
  {
    id: 22,
    title: "Block Printing with Natural Dyes",
    date: "November 29, 2026",
    time: "11:00 AM – 2:00 PM",
    venue: "Anokhi Museum Courtyard, Jaipur, India",
    description:
      "Learn the basics of Rajasthan's block-printing tradition and create your own hand-printed textile to take home.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colorful materials arranged for a hands-on art workshop",
    status: "upcoming",
    category: "Workshop",
  },
  {
    id: 23,
    title: "India Careers & Creative Futures",
    date: "December 5, 2026",
    time: "10:00 AM – 3:00 PM",
    venue: "India Habitat Centre, New Delhi, India",
    description:
      "Connect with employers and mentors, hear career stories, and explore opportunities across India's creative industries.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Professionals networking at a career event",
    status: "upcoming",
    category: "Career",
  },
  {
    id: 24,
    title: "Kochi Sound & Sea Festival",
    date: "December 12, 2026",
    time: "4:00 PM – 10:00 PM",
    venue: "Fort Kochi Beach, Kochi, India",
    description:
      "Spend an evening by the water with independent Indian artists, local food, and live music from across Kerala.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Musician performing at an outdoor music festival",
    status: "upcoming",
    category: "Music",
  },
  {
    id: 25,
    title: "India Design & Technology Summit",
    date: "December 19, 2026",
    time: "9:00 AM – 5:30 PM",
    venue: "Jio World Convention Centre, Mumbai, India",
    description:
      "Hear from designers, engineers, and founders building thoughtful products for India's next generation.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Audience attending a design and technology conference",
    status: "upcoming",
    category: "Conference",
  },
  {
    id: 26,
    title: "A Winter Table in the Hills",
    date: "December 26, 2026",
    time: "6:30 PM – 10:00 PM",
    venue: "The Kumaon, Kasar Devi, India",
    description:
      "Share a seasonal dinner inspired by Kumaoni ingredients, local farms, and the warmth of a mountain evening.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A warmly lit table prepared for a shared dinner",
    status: "upcoming",
    category: "Food & Drink",
  },
  {
    id: 27,
    title: "Pune Neighbourhood Makers Market",
    date: "January 3, 2027",
    time: "10:00 AM – 6:00 PM",
    venue: "Mahalaxmi Lawns, Pune, India",
    description:
      "Browse handmade goods, meet independent makers, and enjoy a relaxed day celebrating local small businesses.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7aed7b626f9?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Visitors browsing stalls at a community market",
    status: "upcoming",
    category: "Community",
  },
  {
    id: 28,
    title: "Ideas for a Better Tomorrow",
    date: "January 10, 2027",
    time: "2:00 PM – 5:00 PM",
    venue: "NCPA Experimental Theatre, Mumbai, India",
    description:
      "Hear local changemakers share short talks about education, climate action, and building stronger communities.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Speaker sharing ideas on stage",
    status: "upcoming",
    category: "Talks",
  },
  {
    id: 29,
    title: "Crafts of Kutch Winter Bazaar",
    date: "January 17, 2027",
    time: "11:00 AM – 7:00 PM",
    venue: "Riverfront Event Centre, Ahmedabad, India",
    description:
      "Discover embroidery, textiles, pottery, and other handmade crafts from artisans across the Kutch region.",
    image:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Handcrafted goods displayed at a seasonal bazaar",
    status: "upcoming",
    category: "Market",
  },
  {
    id: 30,
    title: "Indian Independent Film Showcase",
    date: "January 24, 2027",
    time: "5:00 PM – 9:30 PM",
    venue: "Nandan Cultural Centre, Kolkata, India",
    description:
      "Watch a curated selection of independent films from emerging Indian filmmakers, followed by a director conversation.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Audience seats inside a cinema",
    status: "upcoming",
    category: "Film",
  },
  {
    id: 31,
    title: "Sunrise Yoga by the Sea",
    date: "January 31, 2027",
    time: "6:30 AM – 8:00 AM",
    venue: "Palolem Beach, Goa, India",
    description:
      "Welcome the morning with a gentle, all-levels yoga session followed by fresh fruit and time by the shore.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "People practicing yoga outdoors in the morning",
    status: "upcoming",
    category: "Wellness",
  },
];

const filters = [
  { id: "all", label: "All events" },
  { id: "live", label: "Live now" },
  { id: "upcoming", label: "Upcoming" },
];

const featuredCategories = ["Tech", "Cultural", "Sports", "Workshop", "Career", "Music"];
export const categories = [
  ...featuredCategories,
  ...new Set(
    events
      .map((event) => event.category)
      .filter((category) => !featuredCategories.includes(category)),
  ),
];

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#f04b0b]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4.5" width="14" height="13" rx="2" />
      <path d="M6.5 2.5v4M13.5 2.5v4M3 8h14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#71717a]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16 8.3c0 4.3-6 9.2-6 9.2S4 12.6 4 8.3a6 6 0 1 1 12 0Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12M10 4l6 6-6 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-[#888]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m13 13 4 4" strokeLinecap="round" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-[#f04b0b]" fill="currentColor">
      <path d="M10 2l1.6 4.4L16 8l-4.4 1.6L10 14l-1.6-4.4L4 8l4.4-1.6L10 2zM15 13l.8 2.2L18 16l-2.2.8L15 19l-.8-2.2L12 16l2.2-.8L15 13z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m3 9 7-6 7 6v7a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9Z" />
    </svg>
  );
}

function EventsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4.5" width="14" height="13" rx="2" />
      <path d="M6.5 2.5v4M13.5 2.5v4M3 8h14M6.5 11h2M11.5 11h2M6.5 14h2" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6a2 2 0 0 0 0 4v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4a2 2 0 0 1 0-4V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1Z" />
      <path d="M12 5.5v2M12 9.5v2M12 13.5v1" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-colors ${
        filled ? "fill-[#f04b0b] text-[#f04b0b]" : "fill-none text-stone-600 dark:text-stone-300 hover:text-[#f04b0b]"
      }`}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function EventCard({ event, isBookmarked, onToggleBookmark }) {
  const isLive = event.status === "live";
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-stone-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f9a686] hover:shadow-[0_20px_48px_rgba(240,75,11,0.12)] dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-orange-500/60 dark:hover:shadow-[0_20px_48px_rgba(240,75,11,0.2)]">
      {/* Event Image & Badges */}
      <div className="relative h-[220px] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        {!imgError ? (
          <img
            src={event.image}
            alt={event.imageAlt}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-500/10 via-stone-100 to-stone-200 dark:from-orange-500/15 dark:via-[#181822] dark:to-[#121217] p-6 text-center">
            <span className="text-3xl">🎟️</span>
            <span className="mt-2 font-machina text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              {event.category}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live Now
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-stone-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-stone-950/80 dark:text-stone-200">
              {event.category}
            </span>
          )}
        </div>

        {/* Bookmark Micro-action */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleBookmark(event.id);
          }}
          aria-label={isBookmarked ? "Remove from saved events" : "Save this event"}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-white/90 shadow-md backdrop-blur-md transition hover:scale-110 active:scale-95 dark:border-stone-700/80 dark:bg-stone-900/90"
        >
          <HeartIcon filled={isBookmarked} />
        </button>

        {/* Bottom image pill: RSVP Free */}
        <div className="absolute bottom-3 right-4">
          <span className="inline-flex items-center rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
            Free RSVP
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-machina text-lg font-bold leading-snug tracking-tight text-stone-900 group-hover:text-[#f04b0b] transition-colors dark:text-stone-100 dark:group-hover:text-[#ff7b47]">
            {event.title}
          </h3>
        </div>

        {/* Date & Location Pill Block */}
        <div className="mt-3.5 space-y-2 rounded-2xl bg-stone-50/90 border border-stone-100 p-3.5 text-xs text-stone-600 dark:bg-stone-900/80 dark:border-stone-800/80 dark:text-stone-300">
          <div className="flex items-start gap-2.5">
            <CalendarIcon />
            <div className="min-w-0">
              <p className="font-semibold text-stone-900 dark:text-stone-200">{event.date}</p>
              <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400">{event.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-400">
            <LocationIcon />
            <span className="min-w-0 leading-snug truncate">{event.venue}</span>
          </div>
        </div>

        <p className="mt-3 flex-1 text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
          {event.description}
        </p>

        {/* Action button */}
        <Link
          to={`/events/${event.id}`}
          className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border text-[13px] font-semibold transition-all duration-200 ${
            isLive
              ? "border-red-600 bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-red-500/20"
              : "border-stone-200 bg-white text-stone-800 hover:border-[#f04b0b] hover:bg-[#fff7f3] hover:text-[#e8490b] shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-500 dark:hover:bg-orange-950/30 dark:hover:text-orange-300"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f04b0b]`}
        >
          <span>{isLive ? "Join Live Stream / Venue" : "View Details & RSVP"}</span>
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export default function Landing() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gatherly_saved_events") || "[]");
    } catch {
      return [];
    }
  });

  const profileMenuRef = useRef(null);

  function toggleBookmark(id) {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("gatherly_saved_events", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  useEffect(() => {
    function handlePointerDown(event) {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setProfileMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const visibleEvents = events.filter((event) => {
    const matchesStatus =
      activeFilter === "all" || event.status === activeFilter;
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    const searchText = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      [event.title, event.category, event.venue, event.description]
        .join(" ")
        .toLowerCase()
        .includes(searchText);
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const liveEventsCount = events.filter((e) => e.status === "live").length;
  const topLiveEvent = events.find((e) => e.status === "live");
  const [spotlightImgError, setSpotlightImgError] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafafb] text-stone-900 transition-colors duration-200 dark:bg-[#08080a] dark:text-stone-100">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-colors duration-200 dark:border-stone-800/80 dark:bg-[#0a0a0c]/85 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-5 py-3 sm:px-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 lg:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="group flex w-fit shrink-0 items-center gap-3"
            aria-label="Gatherly home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#ff6a32] to-[#e8490b] text-base font-extrabold text-white shadow-[0_6px_16px_rgba(240,75,11,0.28)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
              G
            </span>
            <span className="flex flex-col">
              <span className="font-machina text-[18px] font-extrabold tracking-tight text-stone-900 transition-colors group-hover:text-[#f04b0b] dark:text-white dark:group-hover:text-[#ff7b47]">
                Gatherly
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-widest text-[#f04b0b] sm:block">
                Curated Gatherings
              </span>
            </span>
          </Link>

          {/* Desktop Sliding Pill Navigation */}
          <nav
            aria-label="Main navigation"
            onMouseLeave={() => setActiveNavIndex(0)}
            onFocusCapture={(event) => {
              const navIndex = event.target.closest("[data-nav-index]")?.dataset.navIndex;
              if (navIndex !== undefined) setActiveNavIndex(Number(navIndex));
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveNavIndex(0);
              }
            }}
            className="relative mx-auto hidden w-full max-w-[420px] grid-cols-3 items-center rounded-full border border-stone-200 bg-stone-100/80 p-1 shadow-inner md:grid dark:border-stone-800 dark:bg-stone-900/80"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 left-1 top-1 z-0 w-[calc((100%-8px)/3)] rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.2,1,0.3,1)] dark:bg-stone-800 dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
              style={{ transform: `translateX(${activeNavIndex * 100}%)` }}
            />
            <Link
              to="/"
              data-nav-index="0"
              onMouseEnter={() => setActiveNavIndex(0)}
              className={`relative z-10 inline-flex h-9 items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                activeNavIndex === 0 ? "text-[#e8490b] dark:text-[#ff7b47]" : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
            <a
              href="#events"
              data-nav-index="1"
              onMouseEnter={() => setActiveNavIndex(1)}
              className={`relative z-10 inline-flex h-9 items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                activeNavIndex === 1 ? "text-[#e8490b] dark:text-[#ff7b47]" : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <EventsIcon />
              <span>Events</span>
            </a>
            <Link
              to="/registrations"
              data-nav-index="2"
              onMouseEnter={() => setActiveNavIndex(2)}
              className={`relative z-10 inline-flex h-9 items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                activeNavIndex === 2 ? "text-[#e8490b] dark:text-[#ff7b47]" : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <TicketIcon />
              <span>My Tickets</span>
            </Link>
          </nav>

          {/* User Controls & Dark Mode Toggle */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Theme Toggle Mode Button in Navbar */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-stone-100 text-stone-700 shadow-xs transition hover:border-[#f04b0b] hover:text-[#f04b0b] dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  aria-label="Open profile menu"
                  aria-haspopup="menu"
                  aria-expanded={profileMenuOpen}
                  onClick={() => setProfileMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 p-1 pr-3 text-xs font-semibold text-stone-800 transition hover:border-[#f04b0b] hover:bg-orange-100/70 dark:border-orange-500/30 dark:bg-orange-950/40 dark:text-orange-200 dark:hover:border-orange-500"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-[#f04b0b] to-[#ff7b47] text-xs font-bold text-white shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                </button>

                {profileMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-2xl border border-stone-200 bg-white p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:border-stone-800 dark:bg-[#121217] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                  >
                    <div className="border-b border-stone-100 px-3 py-2.5 dark:border-stone-800">
                      <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">{user.name}</p>
                      <p className="truncate text-xs text-stone-500 dark:text-stone-400">{user.email}</p>
                    </div>
                    <Link
                      to="/registrations"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="mt-1.5 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-stone-700 transition hover:bg-orange-50 hover:text-[#e8490b] dark:text-stone-300 dark:hover:bg-orange-950/30 dark:hover:text-[#ff7b47]"
                    >
                      <TicketIcon />
                      <span>My Registrations & Tickets</span>
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7 16l-4-4m0 0l4-4m-4 4h11m-4 5h3a2 2 0 002-2V5a2 2 0 00-2-2h-3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden h-9 items-center rounded-full border border-stone-200 px-4 text-xs font-semibold text-stone-700 transition hover:border-[#f04b0b] hover:bg-white hover:text-[#e8490b] sm:inline-flex dark:border-stone-800 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:bg-stone-900 dark:hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f04b0b] to-[#e8490b] px-4 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(240,75,11,0.22)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(240,75,11,0.32)] hover:-translate-y-0.5"
                >
                  <span>Join Now</span>
                  <ArrowIcon />
                </Link>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-[#f04b0b] hover:bg-orange-50 md:hidden dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <nav className="border-t border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-md md:hidden dark:border-stone-800 dark:bg-[#0a0a0c]/95">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-[#e8490b] dark:bg-orange-950/40 dark:text-[#ff7b47]"
              >
                <HomeIcon /> Home
              </Link>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900"
              >
                <EventsIcon /> Explore Events
              </a>
              <Link
                to="/registrations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900"
              >
                <TicketIcon /> My Registrations
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900"
              >
                <span className="flex items-center gap-3">
                  {isDark ? <SunIcon /> : <MoonIcon />}
                  <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f04b0b]">{theme}</span>
              </button>

              {!user && (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 text-xs font-semibold text-stone-700 dark:border-stone-800 dark:text-stone-300"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#f04b0b] text-xs font-semibold text-white"
                  >
                    Join Gatherly
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section - Matching Reference Typography & Aesthetic */}
      <section className="relative overflow-hidden bg-radial-glow bg-cyber-grid px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12">
        {/* Soft Ambient Light Glow in Dark Mode */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[680px] rounded-full bg-gradient-to-b from-[#ff5500]/15 via-[#f04b0b]/5 to-transparent blur-[90px] dark:block hidden" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Upper kicker tag matching screenshot's LEARN. BUILD. GET PLACED. */}
            <p className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#ff5500] drop-shadow-sm">
              DISCOVER. CONNECT. GATHER.
            </p>

            {/* Main Headline in Neue Machina with bounded word style matching the screenshot */}
            <h1 className="mt-6 font-machina text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-stone-900 dark:text-white sm:text-6xl lg:text-[70px]">
              Become Part Of The Gatherings That{" "}
              <span className="relative inline-block border-2 border-[#ff5500] bg-[#ff5500]/10 rounded-2xl px-3 sm:px-4 py-0.5 mx-1 text-stone-900 dark:text-white shadow-[0_0_28px_rgba(255,85,0,0.28)]">
                People
              </span>{" "}
              Want To Join!
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg sm:leading-8">
              Join a growing community of seekers, creators, and builders gathering for real-world live concerts, tech meetups, and creative workshops.
            </p>

            {/* Hero Quick Search & CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#events"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#f04b0b] to-[#e8490b] px-8 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(240,75,11,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(240,75,11,0.38)]"
              >
                <span>Explore All Gatherings</span>
                <ArrowIcon />
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("live");
                  document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/80 px-6 text-sm font-semibold text-stone-700 shadow-xs backdrop-blur-md transition hover:border-orange-300 hover:bg-orange-50 hover:text-[#e8490b] dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300 dark:hover:border-orange-500/50 dark:hover:bg-orange-950/30 dark:hover:text-orange-300"
              >
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>See Live Streams ({liveEventsCount})</span>
              </button>
            </div>

            {/* Platform Stats Strip */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-stone-800 dark:bg-[#111115]/80">
                <p className="font-machina text-2xl font-extrabold text-stone-900 dark:text-white">30+</p>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Curated Events</p>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-stone-800 dark:bg-[#111115]/80">
                <p className="font-machina text-2xl font-extrabold text-[#f04b0b] dark:text-[#ff7b47]">15+</p>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Iconic Cities</p>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-stone-800 dark:bg-[#111115]/80">
                <p className="font-machina text-2xl font-extrabold text-stone-900 dark:text-white">100%</p>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Free Admission</p>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-stone-800 dark:bg-[#111115]/80">
                <p className="font-machina text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Instant</p>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Digital Tickets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Spotlight Banner (if a live event exists) */}
      {topLiveEvent && (
        <section className="px-5 pb-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50/50 p-6 shadow-[0_12px_40px_rgba(240,75,11,0.08)] sm:p-8 dark:border-orange-500/30 dark:from-[#16100c] dark:via-[#100e0d] dark:to-[#18110b] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    Happening Right Now
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {topLiveEvent.category} Spotlight
                  </span>
                </div>
                <h2 className="font-machina text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-white">
                  {topLiveEvent.title}
                </h2>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {topLiveEvent.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 dark:text-stone-400 pt-1">
                  <span className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
                    <CalendarIcon /> {topLiveEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LocationIcon /> {topLiveEvent.venue}
                  </span>
                </div>
                <div className="pt-2">
                  <Link
                    to={`/events/${topLiveEvent.id}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-red-600 px-6 text-xs font-bold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg"
                  >
                    <span>Join This Live Experience</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-2xl shadow-lg bg-stone-100 dark:bg-stone-900">
                {!spotlightImgError ? (
                  <img
                    src={topLiveEvent.image}
                    alt={topLiveEvent.imageAlt}
                    onError={() => setSpotlightImgError(true)}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-red-500/10 via-stone-100 to-stone-200 dark:from-red-950/30 dark:via-[#181822] dark:to-[#121217]">
                    <span className="text-4xl">🔴</span>
                    <span className="mt-2 font-machina text-xs font-bold text-stone-600 dark:text-stone-300">
                      Live Stream
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  📍 {topLiveEvent.venue}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Events Showcase Section */}
      <section id="events" className="scroll-mt-20 px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Container Card */}
          <div className="rounded-[32px] border border-stone-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10 dark:border-stone-800/90 dark:bg-[#101014] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {/* Top Toolbar */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <SparklesIcon />
                    <p className="text-xs font-bold uppercase tracking-widest text-[#e8490b] dark:text-[#ff7b47]">
                      Curated Experiences
                    </p>
                  </div>
                  <h2 className="mt-1 font-machina text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-white">
                    Discover Events Near You
                  </h2>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    Showing {visibleEvents.length} of {events.length} community gatherings
                  </p>
                </div>

                {/* Status Toggle Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {filters.map((filter) => {
                    const count =
                      filter.id === "all"
                        ? events.length
                        : events.filter((e) => e.status === filter.id).length;
                    const isActive = activeFilter === filter.id;

                    return (
                      <button
                        key={filter.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? "bg-[#f04b0b] text-white shadow-md shadow-[#f04b0b]/25"
                            : "border border-stone-200 bg-stone-50 text-stone-600 hover:border-orange-200 hover:bg-orange-50 hover:text-[#e8490b] dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-400 dark:hover:border-orange-500 dark:hover:text-stone-200"
                        }`}
                      >
                        {filter.id === "live" && (
                          <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                        )}
                        <span>{filter.label}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                            isActive ? "bg-white/25 text-white" : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search & Category Filter Bar */}
              <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                {/* Search Input */}
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                    <SearchIcon />
                  </div>
                  <input
                    id="event-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by title, city, category, or keyword..."
                    className="h-11 w-full rounded-full border border-stone-200 bg-stone-50/70 pl-11 pr-10 text-xs font-medium text-stone-800 placeholder:text-stone-400 outline-none transition hover:border-orange-300 focus:border-[#f04b0b] focus:bg-white focus:ring-4 focus:ring-[#f04b0b]/10 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-orange-500 dark:focus:bg-stone-900 dark:focus:ring-orange-500/10"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 grid h-5 w-5 place-items-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-300 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Reset button if filter active */}
                {(activeFilter !== "all" || activeCategory !== "all" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter("all");
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 text-xs font-semibold text-stone-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                  >
                    <span>Reset Filters</span>
                    <span className="text-[10px]">✕</span>
                  </button>
                )}
              </div>

              {/* Horizontal Category Pill Bar */}
              <div className="no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-2 flex items-center gap-2 overflow-x-auto px-2 py-1">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeCategory === "all"
                      ? "bg-stone-900 text-white shadow-xs dark:bg-white dark:text-stone-900"
                      : "border border-stone-200 bg-stone-50/90 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-400 dark:hover:border-stone-700 dark:hover:text-stone-200"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => {
                  const count = events.filter((e) => e.category === category).length;
                  const isSelected = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        isSelected
                          ? "bg-[#f04b0b] text-white shadow-xs"
                          : "border border-stone-200 bg-stone-50/90 text-stone-600 hover:border-orange-200 hover:bg-orange-50 hover:text-[#e8490b] dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-400 dark:hover:border-orange-500 dark:hover:text-[#ff7b47]"
                      }`}
                    >
                      {category} <span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event Grid */}
            {visibleEvents.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isBookmarked={bookmarkedIds.includes(event.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="mt-10 rounded-3xl border border-dashed border-stone-200 bg-stone-50/80 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange-100 text-[#f04b0b] dark:bg-orange-950/40 dark:text-[#ff7b47]">
                  <SearchIcon />
                </div>
                <h3 className="mt-4 font-machina text-base font-bold text-stone-800 dark:text-stone-200">
                  No matching events found
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  We couldn’t find anything matching your filters or search term. Try expanding your search or selecting a different category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#f04b0b] px-6 text-xs font-semibold text-white shadow-xs hover:bg-[#dc4006]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Gather With Us Feature Cards */}
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200/80 bg-white p-7 shadow-xs dark:border-stone-800/80 dark:bg-[#101014]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-xl font-bold text-[#f04b0b] dark:bg-orange-950/50 dark:text-[#ff7b47]">
                ✨
              </span>
              <h3 className="mt-4 font-machina text-base font-bold text-stone-900 dark:text-white">Handpicked Gatherings</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                Every event is vetted for quality, authentic community spirit, and unique experiences across music, tech, arts, and food.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200/80 bg-white p-7 shadow-xs dark:border-stone-800/80 dark:bg-[#101014]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-xl font-bold text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                🎟️
              </span>
              <h3 className="mt-4 font-machina text-base font-bold text-stone-900 dark:text-white">Zero-Friction RSVP</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                Reserve your tickets in one click. Receive digital passes instantly and manage or cancel easily at any time.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200/80 bg-white p-7 shadow-xs dark:border-stone-800/80 dark:bg-[#101014]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                🤝
              </span>
              <h3 className="mt-4 font-machina text-base font-bold text-stone-900 dark:text-white">Meaningful Connections</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                Step away from screens and connect with fellow creators, founders, artists, and friends in your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community CTA Banner */}
      {!user && (
        <section className="px-5 pb-16 sm:px-8 lg:px-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-8 text-white shadow-2xl sm:p-12 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 dark:border dark:border-stone-800">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#f04b0b]/20 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 sm:flex-row sm:text-left text-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f04b0b]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff7b47]">
                  Join the Gathering
                </span>
                <h2 className="mt-3 font-machina text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Ready to discover what’s happening around you?
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  Create a free Gatherly account to bookmark events and manage tickets seamlessly.
                </p>
              </div>
              <Link
                to="/signup"
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f04b0b] px-7 text-xs font-bold text-white shadow-lg transition hover:bg-[#dc4006] hover:shadow-[#f04b0b]/30"
              >
                <span>Create Free Account</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-5 py-12 sm:px-8 lg:px-12 dark:border-stone-800/80 dark:bg-[#08080a]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 pb-8 border-b border-stone-100 dark:border-stone-800/80">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f04b0b] text-xs font-bold text-white">
                  G
                </span>
                <span className="font-machina text-base font-extrabold text-stone-900 dark:text-white">Gatherly</span>
              </div>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                Connecting curious people with extraordinary local gatherings, live performances, and community celebrations.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">Explore</p>
              <ul className="mt-3 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <li><a href="#events" className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47]">All Gatherings</a></li>
                <li><a href="#events" onClick={() => setActiveFilter("live")} className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47]">Live Now</a></li>
                <li><Link to="/registrations" className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47]">My Registrations</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">Popular Categories</p>
              <ul className="mt-3 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                {featuredCategories.slice(0, 4).map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-[#f04b0b] dark:hover:text-[#ff7b47] cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">Community</p>
              <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Want to host an event with Gatherly? Reach out to host and share with your local community.
              </p>
              <span className="mt-3 inline-block rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-[11px] font-semibold text-[#f04b0b] dark:border-orange-500/30 dark:bg-orange-950/40 dark:text-[#ff7b47]">
                hello@gatherly.events
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-stone-500 dark:text-stone-400 sm:flex-row">
            <span>© {new Date().getFullYear()} Gatherly Inc. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="text-[#f04b0b] dark:text-[#ff7b47] font-medium">Find your people · Gather together</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}


