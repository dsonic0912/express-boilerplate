import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('user_account', {
        id: 'id',
        email: { type: 'varchar(255)', notNull: true, unique: true },
        password: { type: 'varchar(255)', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    });
    pgm.createIndex('user_account', 'email', { unique: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('user_account');
}
