import React from "react";
import { useState } from "react";
import { getSubreddits } from '../../Reddit/reddit';

export const SearchBar = () => {
    const [search, setSearch]=useState('');
    const handleChange = (e) => {
        setSearch(e => e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getSubreddits(search);

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <button onChange={handleChange} placeholder='enter what you are looking for'>
            Search
        </button>
        </form>
        
        </>
    )
}