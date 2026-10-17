import { useState } from "react";
import { bars } from "../data/bars";
import { useHH } from "../hooks/useHH";
import FilterBar from "../components/FilterBar";
import BarListing from "../components/BarListing";
import NeighborhoodNav from "../components/NeighborhoodNav";

export default function Home() {
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [hhOnly, setHhOnly] = useState(false);
  const [appliedSearch, setAppliedSearch] = useState("");
  const { isHHNow } = useHH();

  const onSearch = () => setAppliedSearch(search);

  const filtered = bars.filter((bar) => {
    if (appliedSearch) {
      const q = appliedSearch.toLowerCase();
      if (!bar.name.toLowerCase().includes(q) && !bar.neighborhood.toLowerCase().includes(q) && !bar.address.toLowerCase().includes(q)) return false;
    }
    if (hhOnly && !isHHNow(bar)) return false;
    return true;
  });

  return (
    <div className="home">
      <h1 className="page-title">
        Mumbai · Happy Hour Guide ·
      </h1>
      <p className="subtitle">
        📍 Someone shared this bar with you? <a href="#search">Find bars near me →</a>
      </p>

      <div id="search">
        <FilterBar
          search={search} setSearch={setSearch}
          day={day} setDay={setDay}
          time={time} setTime={setTime}
          hhOnly={hhOnly} setHhOnly={setHhOnly}
          onSearch={onSearch}
        />
      </div>

      <NeighborhoodNav />

      <div className="results-count">{filtered.length} bars found</div>

      <div className="bar-list">
        {filtered.map((bar) => (
          <BarListing key={bar.id} bar={bar} isHH={isHHNow(bar)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No bars match. Try removing filters.</p>
      )}

      <section id="about" className="about">
        <h2>About 5PM Mumbai</h2>
        <p>
          5PM Mumbai is an independent happy hour guide covering Mumbai's best bars and restaurants.
          We index bars across the city, pulling happy hour times, deals, and vibe info from bar websites and local knowledge. Data is refreshed every few weeks.
        </p>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>What is 5pm.mumbai?</summary>
          <p>A free tool for discovering happy hours at bars and restaurants across Mumbai. Built to help locals find real, current deals fast, without scrolling through menus or Googling each spot individually. As for the name, 5 PM is when most of the city's best deals start pouring.</p>
        </details>
        <details>
          <summary>Does it show happy hours happening right now?</summary>
          <p>Yes. The "HH Now" filter shows which bars are currently in happy hour based on their published schedule.</p>
        </details>
        <details>
          <summary>Is this sponsored?</summary>
          <p>No. 5pm.mumbai is not sponsored by any bar or beverage brand. Listings are independent and data is sourced from public information.</p>
        </details>
      </section>
    </div>
  );
}   