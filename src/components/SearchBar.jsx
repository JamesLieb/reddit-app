import { React } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSubreddits } from "../store/slices/subbredditsSlice";

export const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get(`/reddit-api/search.json?q=${query}`);
            dispatch(setSubreddits(response.data.data.children));
            console.log("Search results:", response.data.data.children);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <form id={query} className=" mt-4 items-baseline flex-row justify-between" onSubmit={handleSubmit}>
            <div className="text-center items-center p-4">
                <input
                    name="query"
                    type="text"
                    placeholder="Search..."
                    className=" p-2 border border-gray-300 rounded"
                    onChange={handleInputChange}
                />
            </div>
            <div className="items-center text-center">
                <button
                    className=" bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={() => console.log("Searching for:", query)}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
        </form>

    );
};