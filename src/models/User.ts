import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

export interface UserFields {
    id: number;
    phoneNumber: string;
    firstName: string |  null;
    middleName: string | null;
    lastName: string | null;
    username: string  | null;
}

@Table
export class User
    extends Model<UserFields>
    implements UserFields
{
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare firstName: string | null;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare middleName: string | null;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare lastName: string | null;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare username: string | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare phoneNumber: string;
}
