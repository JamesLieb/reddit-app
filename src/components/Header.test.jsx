/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header.jsx";
import RedditLogo from '../Reddit_Logo.png';
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



describe("Header Component", () => {
    it("renders the header with logo, title, subtitle, and search bar", () => {
        render(<Header />); 
        // Check for logo
        const logo = screen.getByAltText("Reddit Logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", RedditLogo);
        // Check for title
        const title = screen.getByText("Reddit App");
        expect(title).toBeInTheDocument();
        // Check for subtitle
        const subtitle = screen.getByText("Explore the Front Page of the Internet");
        expect(subtitle).toBeInTheDocument();
        // Check for search bar
        const searchBar = screen.getByPlaceholderText("Search Reddit...");
        expect(searchBar).toBeInTheDocument();

        
    });

    it("renders with correct semantic HTML structure", () => {
        const { container } = render(<Header />);
        const header = container.querySelector("header");
        expect(header).toBeInTheDocument();
    });

    it("has sticky positioning classes", () => {
        const { container } = render(<Header />);
        const header = container.querySelector("header");
        expect(header).toHaveClass("sticky", "top-0", "z-50");
    });
}); 