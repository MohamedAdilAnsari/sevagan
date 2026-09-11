import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BLOOD_GROUPS, 
  COUNTRIES, 
  getStatesForCountry, 
  getDistrictsForState, 
  getCitiesForDistrict 
} from '../data/constants';

export const QuickSearch = ({ onSearch, prefix = "search" }) => {
  const { t, navigateToSection } = useApp();

  const [blood, setBlood] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Chennai");
  const [city, setCity] = useState("");

  const statesList = getStatesForCountry(country);
  const districtsList = getDistrictsForState(country, state);
  const citiesList = getCitiesForDistrict(country, state, district);

  // Update states when country changes
  useEffect(() => {
    const states = getStatesForCountry(country);
    if (states.length > 0) {
      setState(states[0]);
    } else {
      setState("");
    }
  }, [country]);

  // Update districts when state changes
  useEffect(() => {
    const districts = getDistrictsForState(country, state);
    if (districts.length > 0) {
      setDistrict(districts[0]);
    } else {
      setDistrict("");
    }
  }, [country, state]);

  // Update cities when district changes
  useEffect(() => {
    const cities = getCitiesForDistrict(country, state, district);
    if (cities.length > 0) {
      setCity(cities[0]);
    } else {
      setCity("");
    }
  }, [country, state, district]);

  const handleSearch = (e) => {
    e?.preventDefault();
    const filter = { blood, country, state, district, city };
    if (onSearch) {
      onSearch(filter);
    } else {
      navigateToSection('find-donors');
    }
  };

  return (
    <form className="search-bar glass-search-container" onSubmit={handleSearch}>
      {/* 1. Blood Group */}
      <div className="search-field">
        <select 
          id={`${prefix}-blood`} 
          className="search-input" 
          value={blood} 
          onChange={(e) => setBlood(e.target.value)}
        >
          <option value="" disabled>{t('ph_blood_group')}</option>
          {BLOOD_GROUPS.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>

      {/* 2. Select Country */}
      <div className="search-field">
        <select 
          id={`${prefix}-country`} 
          className="search-input" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="" disabled>{t('ph_select_country')}</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 3. Select State */}
      <div className="search-field">
        <select 
          id={`${prefix}-state`} 
          className="search-input" 
          value={state} 
          onChange={(e) => setState(e.target.value)}
        >
          <option value="" disabled>{t('ph_select_state')}</option>
          {statesList.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* 4. Select District */}
      <div className="search-field">
        <select 
          id={`${prefix}-district`} 
          className="search-input" 
          value={district} 
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="" disabled>{t('ph_select_district')}</option>
          {districtsList.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 5. Select City */}
      <div className="search-field">
        <select 
          id={`${prefix}-city`} 
          className="search-input" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="" disabled>{t('ph_select_city')}</option>
          {citiesList.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button type="submit" className="btn btn-primary search-btn">
        <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
        {t('btn_search')}
      </button>
    </form>
  );
};
