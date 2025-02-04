import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchThunk } from "../store/thunks/searchThunk";
import { debounce } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import SearchResultsList from "../components/SearchResultsList";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Input } from "../components/ui/input";
import { resetSearch } from "../store/reducers/searchSlice";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const dispatch = useAppDispatch();

    useDocumentTitle(query ? query : "Search");

    useEffect(() => {
        if (!searchParams.has("query")) {
            dispatch(resetSearch());
        }
    }, [dispatch, query.length, searchParams]);

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                dispatch(searchThunk(query));
                setSearchParams({ query });
            }, 500),
        [dispatch, setSearchParams]
    );

    useEffect(() => {
        if (query.length > 0) debouncedSearch(query);
    }, [debouncedSearch, dispatch, query]);

    return (
        <div className="container flex-col gap-4">
            <h1 className="text-4xl font-bold text-primary mt-16 text-center">
                Roamify
            </h1>
            <div className="flex items-center flex-col max-w-[800px] w-3/5">
                <Input
                    className="search-input border-muted-foreground/50 dark:border-input p-3 rounded-lg shadow-md focus:ring-1 focus:ring-primary focus:ring-offset-1 h-12 dark:bg-neutral-900 drop-shadow-xl"
                    type="search"
                    name="query"
                    id="search-query"
                    placeholder="Search..."
                    value={query}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(event.target.value)
                    }
                />
                <SearchResultsList />
            </div>
        </div>
    );
}