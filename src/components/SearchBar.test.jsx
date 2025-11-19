/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar  from "./SearchBar.jsx";
import React from "react";

// Mock Redux hooks
vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: () => ({
        posts: [],
        loading: false,
        error: null
    })
}));

// Mock the thunks
vi.mock('./../store/thunks/searchThunks', () => ({
    fetchRedditSearch: vi.fn()
}));

vi.mock('./../store/thunks/popularThunks', () => ({
    fetchRedditPopular: vi.fn()
}));

vi.mock('./../store/slices/subbredditsSlice', () => ({
    clearResults: vi.fn()
}));

describe("SearchBar Component", () => {
    it("renders the search bar input", () => {
        render(<SearchBar />); 
        // Check for search bar
        const searchBar = screen.getByPlaceholderText("Search Reddit...");
        expect(searchBar).toBeInTheDocument();
    });

    it("renders with correct semantic HTML structure", () => {
        const { container } = render(<SearchBar />);
        const form = container.querySelector("form");
        expect(form).toBeInTheDocument();
    });
});