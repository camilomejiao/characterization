export interface IFileSigningPortRepository {
  // Recibe un key o una URL completa y devuelve una URL firmada temporal
  getSignedUrl(
    urlOrKey: string,
    opts?: { expiresIn?: number },
  ): Promise<string>;

  upload(
    file: Express.Multer.File,
    opts?: { prefix?: string },
  ): Promise<string>;
}
export const IFileSigningPortRepository = Symbol('IFileSigningPortRepository');
