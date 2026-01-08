import { BaseModel } from '@/models/base-model';
import { tablesDB, ID } from '@/lib/appwrite';


const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export class BaseRepo<T extends BaseModel> {
	protected tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
        // if databaseId is not set, throw an error
        if (!databaseId) {
            throw new Error('Database ID is not set in environment variables');
        }
	}

	async getAll(queries: string[] = [], showTotal: boolean = true): Promise<{ data: T[]; total?: number }> {
        const results = await tablesDB.listRows({
            databaseId: databaseId,
            tableId: this.tableName,
        });
        return { data: results.rows as unknown as T[], total: results.total };
	}

	async getById(id: string): Promise<T | null> {
        const result = await tablesDB.getRow({
            databaseId: databaseId,
            tableId: this.tableName,
            rowId: id,
        });
        return result as unknown as T;
	
    }

	async create(item: T): Promise<T> {
        const result = await tablesDB.createRow({
            databaseId: databaseId,
            tableId: this.tableName,
            rowId: ID.unique(),
            data: item as any,
        });
        return result as unknown as T;
    }

	async update(id: string, item: Partial<T>): Promise<T> {
        const result = await tablesDB.updateRow({
            databaseId: databaseId,
            tableId: this.tableName,
            rowId: id,
            data: item as any,
        });
        return result as unknown as T;
    }

	async delete(id: string): Promise<void> {
        await tablesDB.deleteRow({
            databaseId: databaseId,
            tableId: this.tableName,
            rowId: id,
        });
    }
}
