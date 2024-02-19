import { useState } from 'react';

export const Filters = () => {
  const title = localStorage.getItem('title') ?? '';
  const price_from = localStorage.getItem('price_from') ?? '';
  const price_to = localStorage.getItem('price_to') ??  '';
  const from = localStorage.getItem('from') ?? '';
  const to = localStorage.getItem('to') ?? '';

  const [name, setName] = useState(title);
  const [minPrice, setMinPrice] = useState(price_from);
  const [maxPrice, setMaxPrice] = useState(price_to);
  const [startDate, setStartDate] = useState(from);
  const [endDate, setEndDate] = useState(to);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleMinPriceChange = event => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = event => {
    setMaxPrice(event.target.value);
  };

  const handleStartDateChange = event => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (minPrice !== '' && maxPrice !== '' && parseFloat(minPrice) > parseFloat(maxPrice)) {
        alert("End price cannot be less than start price");

        return;
    }

    if (startDate !== '' && endDate !== '' && endDate < startDate) {
        alert('End date cannot be before start date');

        return;
    }

    localStorage.setItem('title', name);
    localStorage.setItem('price_from', minPrice);
    localStorage.setItem('price_to', maxPrice);
    localStorage.setItem('from', startDate);
    localStorage.setItem('to', endDate);

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="filters-section">
        <label>
          Name:
          <input type="text" value={name} className="" onChange={handleNameChange} />
        </label>
        <label>
          Min Price:
          <input type="number" min="0" value={minPrice} onChange={handleMinPriceChange} />
        </label>
        <label>
          Max Price:
          <input type="number" min="0" value={maxPrice} onChange={handleMaxPriceChange} />
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={handleStartDateChange} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </label>
        <button type="submit">Apply Filters</button>
      </form>
    </section>
  );
};
