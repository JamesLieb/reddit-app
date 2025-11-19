/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import { isImageUrl }  from "./IsImage.js";
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

describe("isImageUrl Helper Function", () => {
    it("returns true for valid image URLs", () => {
        expect(isImageUrl("https://example.com/image.jpg")).toBe(true);
        expect(isImageUrl("https://example.com/image.png")).toBe(true);
        expect(isImageUrl("https://example.com/image.gif")).toBe(true);
        expect(isImageUrl("https://example.com/image.webp")).toBe(true);
    });

    it("returns false for non-image URLs", () => {
        expect(isImageUrl("https://example.com/page.html")).toBe(false);
        expect(isImageUrl("https://example.com/video.mp4")).toBe(false);
        expect(isImageUrl("self")).toBe(false);
        expect(isImageUrl("default")).toBe(false);
        expect(isImageUrl("nsfw")).toBe(false);
        expect(isImageUrl("spoiler")).toBe(false);
        expect(isImageUrl("")).toBe(false);
        expect(isImageUrl(null)).toBe(false);
    });

    it("returns true for known image hosts", () => {
        expect(isImageUrl("https://i.redd.it/someimage")).toBe(true);
        expect(isImageUrl("https://i.imgur.com/someimage")).toBe(true);
    });
});


