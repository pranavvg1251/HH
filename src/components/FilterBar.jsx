export default function FilterBar({ search, setSearch, day, setDay, time, setTime, hhOnly, setHhOnly, onSearch }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search bars or neighborhoods…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <div className="filter-row">
        <label>
          Day:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Any</option>
            <option value="Mon">Mon</option>
            <option value="Tue">Tue</option>
            <option value="Wed">Wed</option>
            <option value="Thu">Thu</option>
            <option value="Fri">Fri</option>
            <option value="Sat">Sat</option>
            <option value="Sun">Sun</option>
          </select>
        </label>
        <label>
          Time:
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Any</option>
            <option value="4PM">4 PM</option>
            <option value="5PM">5 PM</option>
            <option value="6PM">6 PM</option>
            <option value="7PM">7 PM</option>
            <option value="8PM">8 PM</option>
            <option value="9PM">9 PM</option>
          </select>
        </label>
        <button className="btn-search" onClick={onSearch}>SEARCH HH →</button>
      </div>
      <label className="hh-now-toggle">
        <input type="checkbox" checked={hhOnly} onChange={(e) => setHhOnly(e.target.checked)} />
        <span className={hhOnly ? "hh-now-active" : ""}>HH Now</span>
      </label>
    </div>
  );
}   