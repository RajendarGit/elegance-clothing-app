export const categories: string[] = ["Women", "Men", "Kids", "Accessories"];

export const colors: string[] = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#0000FF",
    "#FFFF00",
    "#00FF00",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
];

export const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface SortOption {
    value: string;
    label: string;
}

export const sortOptions: SortOption[] = [
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];
