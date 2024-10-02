import axios from "axios";

type ItemsType = {
    id: string;
    name: string;
    cost: number;
    type: "debit" | "credit";
    category_id: string;
};

const ItemsTable = async () => {
    const response = await axios.get<{ data: ItemsType[] }>(
        "http://localhost:1323/api/v1/items"
    );
    const items = response.data;

    return (
        <>
            <h1>Items table</h1>
            <div>
                {items.data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </div>
        </>
    );
};

export { ItemsTable };
