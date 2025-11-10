import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import useProfile from "../hooks/useProfile";


const STORAGE_KEY = "netflixClone.mylist";
const DEFAULT_LISTS = { adult: [], kids: [] };

const ListContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    isInList: () => false,
});

export const ListProvider = ({ children }) => {
    const { profile } = useProfile();
    const [lists, setLists] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return DEFAULT_LISTS;
            const parsed = JSON.parse(stored);
            return {
                adult: Array.isArray(parsed.adult) ? parsed.adult : [],
                kids: Array.isArray(parsed.kids) ? parsed.kids : [],
            };
        } catch (error) {
            console.error("Failed to load saved list", error);
            return DEFAULT_LISTS;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    }, [lists]);

    const addItem = useCallback(
        (item) => {
            if (!item || !item.id) return;
            setLists((prev) => {
                const current = prev[profile] ?? [];
                const exists = current.some(
                    (entry) => entry.id === item.id && entry.mediaType === item.mediaType
                );
                if (exists) return prev;

                const updated = [...current, { ...item, profile }];
                return { ...prev, [profile]: updated };
            });
        },
        [profile]
    );

    const removeItem = useCallback(
        (id, mediaType) => {
            setLists((prev) => {
                const current = prev[profile] ?? [];
                const updated = current.filter(
                    (entry) => !(entry.id === id && entry.mediaType === mediaType)
                );
                if (updated.length ===current.length) return prev;
                return { ...prev, [profile]: updated};
            });
        },
        [profile]
    );

    const activeItems = useMemo(() => lists[profile] ?? [], [lists, profile]);

    const value = useMemo(
        () => ({
            items: activeItems,
            addItem,
            removeItem,
            isInList: (id, mediaType) =>
                activeItems.some(
                    (entry) => entry.id === id && entry.mediaType === mediaType
                ),
        }),
        [activeItems, addItem, removeItem]
    );

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContext