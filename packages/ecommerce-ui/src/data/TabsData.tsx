export const TabsData = [
  { title: "New Arrival" },
  { title: "Best Seller" },
  { title: "Featured" },
  { title: "Top Rated" },
  { title: "Most Popular" },
];

export const OrderTabsData = [{ title: "Active" }, { title: "Completed" }, { title: "Cancelled" }];
// composant : TabsData.tsx
export const generateTabsData = (categories: string[]) => {
  return categories.map((category, index) => ({ title: category, id: index }));
};