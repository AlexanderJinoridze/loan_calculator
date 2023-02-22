interface chartInputItem {
    value: number;
    color: string;
}

export interface chartInputData {
    [key: string]: chartInputItem;
}

export interface chartOutputItem {
    label: string;
    color: string;
    amount: number;
    share: number;
}
