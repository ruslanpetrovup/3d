export declare enum LinkFilesCategory {
    PHOTO = "photo",
    FILE = "file",
    VIDEO = "video",
    OTHER = "other"
}
export declare class LinkFiles {
    id: number;
    fileName: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;
}
