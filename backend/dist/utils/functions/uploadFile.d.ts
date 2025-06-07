declare const uploadFile: (file: Express.Multer.File, userId: string) => Promise<string>;
export default uploadFile;
