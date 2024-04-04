import {BatchDataList, InventoryDataList, ProductDataList} from "../type/type";

const GetBatchData = (range: number): BatchDataList[] => {
    const batchData: BatchDataList[] = [];

    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 1; i <= range; i++) {
        const inventoryId = getRandomInt(1, 24);

        const newBatchData: BatchDataList = {
            id: i,
            batchId: `#${i}`,
            inventoryId: inventoryId,
            productQty: getRandomInt(10, 50),
            outOfStock: getRandomInt(1, 20),
        };

        batchData.push(newBatchData);
    }

    return batchData;
};
export const batchData: BatchDataList[] = GetBatchData(240);

const GetInventoryData = (range: number): InventoryDataList[] => {
    const inventoryData: InventoryDataList[] = [];
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 1; i <= range; i++) {
        const filteredBatches: BatchDataList[] = batchData.filter(batch => batch.inventoryId === i);
        const productQty: number = filteredBatches.reduce((acc: number, cur: BatchDataList) => acc + cur.productQty, 0);
        const batchQty: number = filteredBatches.length;
        const outOfStock: number = filteredBatches.reduce((acc: number, cur: BatchDataList) => acc + cur.outOfStock, 0);

        const getRandomInventoryType = (): "JIT" | "FIFO" | "LIFO" => {
            const types: ("JIT" | "FIFO" | "LIFO")[] = ["JIT", "FIFO", "LIFO"];
            return types[getRandomInt(0, types.length - 1)];
        };

        const newInventoryData: InventoryDataList = {
            id: i,
            inventoryName: `Inventory ${i}`,
            type: getRandomInventoryType(),
            location: "In House",
            batchQty: batchQty,
            productQty: productQty,
            outOfStock: outOfStock,
            productSold: 100,
            inventoryCost: productQty * 45,
        };

        inventoryData.push(newInventoryData);
    }

    return inventoryData;
}

export const inventoryData: InventoryDataList[] = GetInventoryData(24);

export const productData: ProductDataList[] = [
    {
        id: 0,
        batchId: "#10511",
        inventoryId: 1,
        productName: "Fresh Milk",
        variationDetails: "250ml Small Pack",
        price: 18.20,
        expiryDate: "10/05/2025",
        quantity: 17,
        sold: 4,
        isActive: true
    },
    {
        id: 1,
        batchId: "#10512",
        inventoryId: 2,
        productName: "Fresh Milk",
        variationDetails: "500ml Medium Pack",
        price: 35.25,
        expiryDate: "12/08/2025",
        quantity: 21,
        sold: 8,
        isActive: true
    },
    {
        id: 2,
        batchId: "#10513",
        inventoryId: 3,
        productName: "Tea",
        variationDetails: "500gm Pack",
        price: 42.21,
        expiryDate: "08/12/2024",
        quantity: 27,
        sold: 12,
        isActive: true
    },
    {
        id: 3,
        batchId: "#10514",
        inventoryId: 4,
        productName: "Tea",
        variationDetails: "1Kg Pack",
        price: 84.25,
        expiryDate: "02/06/2024",
        quantity: 35,
        sold: 10,
        isActive: true
    },
    {
        id: 4,
        batchId: "#10515",
        inventoryId: 5,
        productName: "Vegetable Oil",
        variationDetails: "500ml Pack",
        price: 118.25,
        expiryDate: "05/10/2024",
        quantity: 25,
        sold: 12,
        isActive: true
    },
];