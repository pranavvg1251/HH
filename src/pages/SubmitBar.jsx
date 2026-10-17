import { useState } from "react";

export default function SubmitBar() {
  const [form, setForm] = useState({
    name: "", neighborhood: "", address: "", type: "Bar & Restaurant",
    hhDays: "", hhStart: "", hhEnd: "", deals: "", food: "",
  });

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    alert("Thank you! Your bar has been submitted for review.");
    setForm({ name: "", neighborhood: "", address: "", type: "Bar & Restaurant", hhDays: "", hhStart: "", hhEnd: "", deals: "", food: "" });
  };

  return (
    <div className="submit-page">
      <h1 className="page-title">Add a Bar</h1>
      <p className="subtitle">Know a bar with great happy hours? Add it to the list.</p>
      <form onSubmit={submit} className="submit-form">
        <input name="name" placeholder="Bar name *" value={form.name} onChange={set} required />
        <input name="neighborhood" placeholder="Neighborhood *" value={form.neighborhood} onChange={set} required />
        <input name="address" placeholder="Address" value={form.address} onChange={set} />
        <select name="type" value={form.type} onChange={set}>
          <option>Bar & Restaurant</option>
          <option>Bar</option>
          <option>Lounge</option>
          <option>Dive Bar</option>
          <option>Rooftop Bar</option>
          <option>Waterfront Bar</option>
        </select>
        <input name="hhDays" placeholder="HH Days (e.g. Mon–Fri)" value={form.hhDays} onChange={set} />
        <div className="time-row">
          <input name="hhStart" type="time" value={form.hhStart} onChange={set} />
          <span>to</span>
          <input name="hhEnd" type="time" value={form.hhEnd} onChange={set} />
        </div>
        <input name="deals" placeholder="Deals (e.g. ₹199 beer, ₹299 cocktails)" value={form.deals} onChange={set} />
        <input name="food" placeholder="Food options" value={form.food} onChange={set} />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
}   